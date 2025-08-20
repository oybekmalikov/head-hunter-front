"use client"
import '@ant-design/v5-patch-for-react-19';
import { Button } from 'antd';
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex gap-2'>
      <Link href="/auth/sign-in" className='w-[100px] h-[40px] rounded-[8px] border border-blue-600 text-blue-600 flex items-center justify-center'>SignIn</Link>
      <Button type='primary' size='large' className="w-[100px] h-[40px]" onClick={() => { window.location.href = "/auth/sign-up" }} >Sign Up</Button>
    </div>
  );
}
