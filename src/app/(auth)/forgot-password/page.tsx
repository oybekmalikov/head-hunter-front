"use client"

import { Button, Card, Form, Input, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { CheckOutlined, LeftOutlined, LockOutlined, MailOutlined, RightOutlined, SafetyOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth';
import { ResetPasswordType } from '../../../types/auth';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordSchema } from '../../../utils/validation-schema';

const ForgotPasswordPage = () => {
    const router = useRouter()

    // Forgot Password Hook
    const { ForgotPassword, VerifyOtp, ResetPassword } = useAuth()
    const { mutate: forgotPasswordFn, isPending: isForgotPasswordPending } = ForgotPassword()
    const [email, setEmail] = useState("");
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    })


    const onFinishForgotPassword = (email: string) => {
        forgotPasswordFn(email, {
            onSuccess: () => {
                next();
                setTimeLeft(180);
            }
        })
        // next()
    }


    const { mutate: verifyOtpFn } = VerifyOtp()
    const onFinishVerifyOtp = (otp: string) => {
        console.log(otp, "otp");
        verifyOtpFn({ email, otp, type: "forget-password" }, {
            onSuccess: () => {
                next();
            }
        })
    }
    const { mutate: resetPasswordFn, isPending: isResetPasswordPending } = ResetPassword()
    const onFinishResetPassword = (email: string) => {
        resetPasswordFn({ email: email, ...form }, {
            onSuccess: () => {
                router.push("/sign-in")
            }
        })
    }

    // Timer
    const [timeLeft, setTimeLeft] = useState(0)
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? "0" : ""}${s}`
    }

    useEffect(() => {
        if (timeLeft <= 0) return
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [timeLeft])

    // Steps
    const steps = [
        {
            title: <MailOutlined />,
            content: <div className="mt-4 flex flex-col gap-4">
                <p>Please enter your email for reset password</p>

                <Input
                    className='flex gap-1'
                    prefix={<MailOutlined style={{ color: "#6B7280" }} />}
                    placeholder='Email'
                    size='large'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    type='primary'
                    size='large'
                    loading={isForgotPasswordPending}
                    className="w-[100px] h-[40px]"
                    onClick={() => onFinishForgotPassword(email)}
                >
                    Next <RightOutlined />
                </Button>
            </div>,
        },
        {
            title: <SafetyOutlined />,
            content: <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 450, marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
                initialValues={{ remember: true }}
                autoComplete="on"
                layout='vertical'
            >

                <p className='text-center text-gray-500'>Please enter the code sent to your email</p>
                <p className='text-center text-gray-600'>
                    {formatTime(timeLeft)}
                </p>
                <Form.Item name="otp" rules={[{ required: true }]}>
                    <Input.OTP
                        className='w-full'
                        size='large'
                        onChange={(value) => onFinishVerifyOtp(value)}
                    />
                </Form.Item>
                <div className="flex justify-start">
                    <Form.Item>
                        <Button
                            type='primary'
                            size='large'
                            onClick={() => prev()}
                        >
                            <LeftOutlined /> Back
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        },
        {
            title: <LockOutlined />,
            content: <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 450, maxHeight: 450, marginTop: 20 }}
                initialValues={{ remember: true }}
                autoComplete="on"
                layout='vertical'
            >
                <Form.Item>
                    <Input.Password
                        className='flex gap-1'
                        prefix={<LockOutlined style={{ color: "#6B7280" }} />}
                        placeholder='New Password'
                        size='large'
                        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Password
                        className='flex gap-1'
                        prefix={<LockOutlined style={{ color: "#6B7280" }} />}
                        placeholder='Confirm Password'
                        size='large'
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    />
                </Form.Item>
                <div className="flex justify-start gap-4">
                    <Form.Item>
                        <Button
                            type='primary'
                            size='large'
                            onClick={() => prev()}
                        >
                            <LeftOutlined /> Back
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            size='large'
                            loading={isResetPasswordPending}
                            onClick={() => onFinishResetPassword(email)}
                        >
                            Done <CheckOutlined />
                        </Button>
                    </Form.Item>
                </div>
            </Form>,
        },
    ];
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    // HTML Part
    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <Card
                style={{
                    width: '450px',
                }}
            >
                <Steps current={current} items={items} />
                <div className='w-[100%] flex flex-col !items-center justify-center gap-2' >
                    <div></div>
                    {steps[current].content}
                </div>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage