"use client"
import { Button, Card, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import '@ant-design/v5-patch-for-react-19';

const OtpPage = () => {
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        if (timeLeft <= 0) return
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [timeLeft])

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? "0" : ""}${s}`
    }
    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <Card className='w-[450px] h-[350px] shadow-xl'>
                <h1 className='text-center text-3xl font-bold'>Verification</h1>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 450, maxHeight: 350, marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
                    initialValues={{ remember: true }}
                    autoComplete="on"
                    layout='vertical'
                >
                    <p className='text-center text-gray-500'>Please enter the code sent to your email</p>
                    <p className='text-center text-gray-600'>
                        {timeLeft > 0
                            ? `Time left: ${formatTime(timeLeft)}`
                            : "Time expired"}
                    </p>
                    <Form.Item name="otp" rules={[{ required: true }]}>
                        <Input.OTP
                            className='w-full'
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item>
                        {timeLeft > 0 ? (
                            <Button type='primary' size='large' className="w-[100px] h-[40px]" onClick={() => { window.location.href = "/auth/sign-in" }} >Verify</Button>
                        ): (
                            <Button type='primary' size='large' className="w-[100px] h-[40px]" >Resend</Button>
                        )}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default OtpPage