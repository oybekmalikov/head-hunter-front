"use client"
import React from 'react';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Modal } from 'antd';
import Image from 'next/image';
import { useUser } from '../../hooks/useUser';
import { useParams } from 'next/navigation';


const LogOut = () => {
    const openModal = () => {
        const open = true;
        return (
            <Modal
                title="Basic Modal"
                centered
                style={{
                    width: '400px',
                    height: '200px',
                    borderRadius: '8px',
                }}
                open={open}
                onOk={handleOk}
                onCancel={() => { }}
            >
                <p>Are you sure you want to log out?</p>
            </Modal>
        )
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
            extra: '⌘P',
        },
        {
            key: '3',
            label: 'Billing',
            extra: '⌘B',
        },
        {
            key: '4',
            label: <div className='text-red-600'>Log out</div>,
            icon: <LogoutOutlined style={{color: "red"}}/>,
        },
    ];
    
    const { userProfile } = useUser();
    const userInfo = userProfile?.data?.data;
    console.log(userInfo);
    const handleOk = () => {
        console.log("Logged out");
    };
    return (
        <Dropdown menu={{ items }}> 
            <a  className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full pt-1" onClick={(e) => e.preventDefault()}>
                <Image
                    src={`${userInfo?.avatarUrl || "/user.png"}`}
                    alt="userAvatar"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] rounded-full"
                />
            </a>
        </Dropdown>
    )
};

export default LogOut; 