"use client"
import { LockOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input } from 'antd'
import '@ant-design/v5-patch-for-react-19';
import React from 'react'

const ForgotPassword = () => {
    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <Card className='w-[450px] h-[350px] shadow-xl'>
                <h1 className='text-center text-3xl font-bold'>Reset Password</h1>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 450, maxHeight: 450, marginTop: 20 }}
                    initialValues={{ remember: true }}
                    autoComplete="on"
                    layout='vertical'
                >
                    <Form.Item label="New Password">
                        <Input.Password
                            className='flex gap-1'
                            prefix={<LockOutlined style={{ color: "#6B7280" }} />}
                            placeholder='Enter your new password'
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                        <Input.Password
                            className='flex gap-1'
                            prefix={<LockOutlined style={{ color: "#6B7280" }} />}
                            placeholder='Enter your new password again'
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' type='primary' htmlType='submit' className='w-[100%]'>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default ForgotPassword