"use client";
import { Button } from 'antd'
import React from 'react'
import SignInModal from './modal';
import '@ant-design/v5-patch-for-react-19';

const Users = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <h1>Users</h1>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      {isOpen && <SignInModal setIsOpen={setIsOpen} isOpen={isOpen}/>}
    </div>
    
  )
}

export default Users