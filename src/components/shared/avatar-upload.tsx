// components/AvatarUpload.js
"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { PlusOutlined, CameraOutlined } from '@ant-design/icons';

const AvatarUpload = ({
    src,
    alt = "Profile Picture",
    width = 120,
    height = 120,
    className = "",
    onImageSelect,
    onUploadSuccess,
    onUploadError,
    uploadUrl = "/api/upload-avatar",
    acceptedTypes = "image/jpeg,image/png,image/gif,image/webp",
    maxFileSize = 5 * 1024 * 1024, // 5MB
    showFileName = false
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // File type validation
        if (!file.type.startsWith('image/')) {
            const error = 'Iltimos, faqat rasm fayllarini tanlang!';
            setUploadStatus(error);
            onUploadError && onUploadError(error);
            setTimeout(() => setUploadStatus(''), 3000);
            return;
        }

        // File size validation
        if (file.size > maxFileSize) {
            const error = `Fayl hajmi ${Math.round(maxFileSize / (1024 * 1024))}MB dan oshmasligi kerak!`;
            setUploadStatus(error);
            onUploadError && onUploadError(error);
            setTimeout(() => setUploadStatus(''), 3000);
            return;
        }

        // Callback for immediate preview
        if (onImageSelect) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onImageSelect(e.target.result, file);
            };
            reader.readAsDataURL(file);
        }

        // Upload to server
        await uploadImage(file);
    };

    const uploadImage = async (file) => {
        setIsUploading(true);
        setUploadStatus('Yuklanmoqda...');

        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                setUploadStatus('Muvaffaqiyatli yuklandi!');
                onUploadSuccess && onUploadSuccess(result, file);
                setTimeout(() => setUploadStatus(''), 3000);
            } else {
                throw new Error('Server xatosi');
            }
        } catch (error) {
            console.error('Upload error:', error);
            const errorMessage = 'Yuklashda xato yuz berdi!';
            setUploadStatus(errorMessage);
            onUploadError && onUploadError(errorMessage);
            setTimeout(() => setUploadStatus(''), 3000);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div
                className={`relative cursor-pointer group ${isUploading ? 'pointer-events-none' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleImageClick}
            >
                <Image
                    src={src || '/user.png'}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`rounded-full shadow-[0px_0px_30px_0px_rgba(0,0,0,0.2)] transition-all duration-300 ${!isUploading ? 'group-hover:brightness-75' : 'brightness-50'
                        } ${className}`}
                />

                {/* Hover overlay */}
                <div
                    className={`absolute inset-0 bg-black bg-opacity-80 rounded-full transition-all duration-300 flex items-center justify-center ${(isHovering && !isUploading) ? 'opacity-70' : 'opacity-0'}`}
                >
                    <div className="flex items-center gap-2 text-white text-sm">
                        <PlusOutlined className="text-base" />
                        <CameraOutlined className="text-base" />
                        <span className="font-medium">Rasm</span>
                    </div>
                </div>

                {/* Loading spinner */}
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedTypes}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploading}
                />
            </div>

            {/* Status message */}
            {uploadStatus && (
                <div className={`mt-2 px-3 py-1 rounded-md text-sm text-center ${uploadStatus.includes('Muvaffaqiyatli')
                        ? 'bg-green-100 text-green-800'
                        : uploadStatus.includes('Yuklanmoqda')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                    {uploadStatus}
                </div>
            )}

            {/* File name (optional) */}
            {showFileName && uploadStatus.includes('Muvaffaqiyatli') && (
                <p className="mt-1 text-xs text-gray-500">
                    Rasm yangilandi
                </p>
            )}
        </div>
    );
};

export default AvatarUpload;