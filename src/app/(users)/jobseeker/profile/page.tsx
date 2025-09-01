"use client"
import React, { useState, useEffect } from 'react'
import { useJobSeeker } from '../../../../hooks/useJobSeeker';
import { FaBriefcase, FaFileAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuUsers, LuDollarSign, LuGithub, LuLinkedin, LuGraduationCap } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineFemale, MdOutlineMail, MdOutlineMale, MdOutlinePhone, MdOutlineWork, MdOutlineWorkHistory } from "react-icons/md";

import AvatarUpload from '../../../../components/shared/avatar-upload';

const Profile = () => {
  const { JobSeekersProfile } = useJobSeeker();
  const profile = JobSeekersProfile?.data?.data;
  const user = profile?.user;
  const skills = profile?.skills || [];
  const education = profile?.education || [];
  console.log(profile, "profile");
  console.log(education, "education");
  const [currentAvatar, setCurrentAvatar] = useState("/user.png");
  const birthDate = profile?.dateOdBirth.split('T')[0];

  const handleImageSelect = (imageUrl: string, file: File) => {
    console.log('Rasm tanlandi:', file.name);
    // Vaqtincha preview uchun
    setCurrentAvatar(imageUrl);
  };

  const handleUploadSuccess = (result: { avatarUrl: string }, file: File) => {
    console.log('Upload muvaffaqiyatli:', result);
    // Server dan qaytgan avatar URL ni saqlash
    if (result.avatarUrl) {
      setCurrentAvatar(result.avatarUrl);
      // User state ni yangilash
      // updateUserProfile({ avatarUrl: result.avatarUrl });
    }
  };

  const handleUploadError = (error: any) => {
    console.error('Upload xatosi:', error);
    // Xato bo'lsa, eski rasmni qaytarish
    setCurrentAvatar(profile?.data?.data?.avatarUrl);
  };

  return (
    <div className="w-full">
      <header className='w-full h-[11rem] bg-gradient-to-r from-blue-600 to-blue-800 flex flex-wrap'>
        <div className="w-[13%] h-full flex items-center justify-center">
          <AvatarUpload
            src={currentAvatar || profile?.data?.data?.avatarUrl}
            width={120}
            height={120}
            onImageSelect={handleImageSelect}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            uploadUrl="/api/users/avatar" // O'z API endpoint ingiz
            maxFileSize={10 * 1024 * 1024} // 10MB
            showFileName={true}
          />
        </div>
        <div className="w-[87%] h-full flex items-center justify-start">
          <div className="w-full h-[9rem] flex flex-col justify-around">
            {/* USERNAME, ADDRESS, EXPERIENCE */}
            <div className="flex flex-col justify-between h-[4.75rem]">
              <h1 className="text-4xl font-bold text-white">{user?.firstName || 'User Name'} {user?.lastName || ''}</h1>
              <div className="w-full flex gap-16">
                <p className="text-lg text-white flex gap-1">
                  <span className='w-[1.75rem] h-[1.75rem] flex items-center justify-center'><FaBriefcase style={{ color: 'white' }} /></span>
                  {profile?.experience || 'Experience'} years of experience
                </p>
                <p className="text-lg text-white flex gap-2">
                  <span className='w-[1.75rem] h-[1.75rem] flex items-center justify-center'><FaMapLocationDot style={{ color: 'white', fontSize: '1.5rem' }} /> </span>
                  {profile?.address || 'Location'}
                </p>
              </div>
            </div>
            {profile?.isOpenToWork ? (
              <div className="w-[10rem] h-[2.25rem] bg-green-500 rounded-full flex items-center justify-center gap-2">
                <LuUsers style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }} />
                <p className="text-white text-sm">Open to Work</p>
              </div>
            ) : (
              <div className="w-[12rem] h-[2.25rem] bg-red-400 rounded-full flex items-center justify-center gap-2">
                <LuUsers style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }} />
                <p className="text-white text-sm">Not Open to Work</p>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className='w-full h-[55rem] p-[1rem] flex flex-col items-center gap-5'>
        {/* User Information Card */}
        <div className="w-[100%] h-[15rem] mt-3 rounded-lg shadow-[0px_5px_15px_5px_rgba(0,0,0,0.1)] flex items-center justify-between px-4">
          {/* User Informations */}
          <div className="w-[48%] h-[90%] flex flex-col items-start justify-center gap-3">
            <h2 className="text-2xl ml-8 font-sans font-semibold">User Informations</h2>
            <div className="w-[90%] h-[70%] ml-8 flex flex-col justify-around">
              <p className="w-full flex text-lg text-gray-600 items-center gap-3"> <MdOutlineMail style={{ color: "#2563EB", fontSize: '25px' }} /> {user?.email || 'N/A'}</p>
              <p className="w-full flex text-lg text-gray-600 items-center gap-3"> <MdOutlinePhone style={{ color: "#2563EB", fontSize: '25px' }} /> {user?.phone || 'N/A'}</p>
              {profile?.gender === "male" ? (
                <p className="w-full flex text-lg text-gray-600 items-center gap-3"> <MdOutlineMale style={{ color: "#2563EB", fontSize: '25px' }} /> {profile?.gender || 'N/A'}</p>
              ) : (
                <p className="w-full flex text-lg text-gray-600 items-center gap-3"> <MdOutlineFemale style={{ color: "#2563EB", fontSize: '25px' }} /> {profile?.gender || 'N/A'}</p>
              )}
              <p className="w-full flex text-lg text-gray-600 items-center gap-3"> <MdOutlineWork style={{ color: "#2563EB", fontSize: '25px' }} /> {user?.role || 'N/A'}</p>
            </div>
          </div>
          {/* Professional summary */}
          <div className="w-[48%] h-[80%] flex flex-col items-start justify-start gap-3 py-3 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-sans font-semibold ml-8">Professional Summary</h2>
            <p className="w-[90%] ml-8 text-[16px] text-gray-600">{profile?.summary || 'N/A'}</p>
          </div>
        </div>

        {/* User Details */}
        <div className="w-[100%] h-[35rem] rounded-lg shadow-[0px_5px_15px_5px_rgba(0,0,0,0.1)] p-8 flex flex-col gap-2">
          <h2 className='text-3xl font-sans font-semibold'>Professional Details</h2>
          <div className="w-full h-[8rem] flex items-center justify-between">
            <div className="w-[32%] h-[6.5rem] bg-blue-50 rounded-lg flex items-center justify-start px-4 gap-4">
              <CiCalendar style={{ color: '#2563EB', fontSize: '3rem' }} />
              <div className="w-[50%] h-[100%] flex flex-col justify-center gap-1">
                <p className='text-2xl font-semibold'>Date of Birth</p>
                <p className='text-lg text-gray-500'>{birthDate || 'N/A'}</p>
              </div>
            </div>
            <div className="w-[32%] h-[6.5rem] bg-blue-50 rounded-lg flex items-center justify-start px-4 gap-4">
              <LuDollarSign style={{ color: '#2563EB', fontSize: '2.5rem' }} />
              <div className="w-[60%] h-[100%] flex flex-col justify-center gap-1">
                <p className='text-2xl font-semibold'>Expected Salary</p>
                <p className='text-lg text-gray-500'>{profile?.avgSalary ? profile.avgSalary.toLocaleString("uz-UZ") : "Noma’lum"} sum</p>
              </div>
            </div>
            <div className="w-[32%] h-[6.5rem] bg-blue-50 rounded-lg flex items-center justify-start px-4 gap-4">
              <MdOutlineWorkHistory style={{ color: '#2563EB', fontSize: '2.5rem' }} />
              <div className="w-[60%] h-[100%] flex flex-col justify-center gap-1">
                <p className='text-2xl font-semibold'>Experience</p>
                <p className='text-lg text-gray-500'>{profile?.experience} years</p>
              </div>
            </div>
          </div>
          <h3 className='text-2xl font-semibold mt-2'>Professional links</h3>
          <div className="flex justify-between mt-3">
            <a href={`${profile?.githubUrl}`}
              target="_blank" rel="noopener noreferrer"
              className='w-[31%] h-[4.5rem] bg-gray-100 rounded-lg flex items-center justify-center px-4 gap-4 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all'>
              <p className='text-lg flex justify-center items-center gap-2'>
                <LuGithub /> GitHub Profile
              </p>
            </a>
            <a href={`${profile?.linkedIn}`}
              target="_blank"
              rel="noopener noreferrer"
              className='w-[32%] h-[4.5rem] bg-gray-100 rounded-lg flex items-center justify-center px-4 gap-4 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all'>
              <p className='text-lg flex justify-center items-center gap-2'>
                <LuLinkedin /> LinkedIn Profile</p>
            </a>
            <a href={`${profile?.resumeUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[32%] h-[4.5rem] bg-gray-100 rounded-lg flex items-center justify-center px-4 gap-4  text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all">
              <p className='text-lg flex justify-center items-center gap-2'>
                <FaFileAlt /> View Resume</p>
            </a>
          </div>
          {/* Skills and Education */}
          <div className="w-full h-[12rem] flex items-center">
            {/* Skills */}
            <div className="w-[55%] h-[100%] flex flex-col justify-center gap-4">
              <p className='w-[30%] h-[2.5rem] flex items-center justify-start gap-2 text-2xl'>
                < HiOutlineLightningBolt style={{ color: "blue", fontSize: "2rem" }} />
                <span className='font-bold'>Skills:</span>
              </p>
              <ul className='w-[100%] h-[7rem] max-h-[7rem] flex gap-2 flex-wrap'>
                {skills.map((data: any) => (
                  <li key={data?.id} className="px-4 h-[2.5rem] flex items-center justify-center text-blue-600 bg-blue-100 rounded-full cursor-pointer">{data?.skill?.name}</li>
                ))}
              </ul>
            </div>
            {/* Education */}
            <div className="w-[40%] h-[80%] flex flex-col justify-center gap-4">
              <p className='w-[50%] h-[2.5rem] flex items-center justify-start gap-2'>
                <LuGraduationCap style={{ fontSize: "2rem", color: "blue" }} />
                <span className='font-bold text-2xl'>Education:</span>
              </p>
              <div className="w-[100%] h-[60%] bg-gray-100">
                {education.map((edu: any) => (
                  <div key={edu?.id} className="w-full h-[100%] flex flex-col justify-center px-4 border-gray-300">
                    <p className='text-lg font-semibold'>{edu?.dagree || 'N/A'}-year at {edu?.universityName || 'N/A'}</p>
                    <p className='text-md text-gray-600'>{edu?.faculty || 'N/A'} | {new Date(edu?.startDate).getFullYear()} - {edu?.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Profile