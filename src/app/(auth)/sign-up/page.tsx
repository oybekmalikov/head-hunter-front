'use client'
import React from 'react'
import '@ant-design/v5-patch-for-react-19';
import { Button, Card, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const SignUpPage = () => {
  const {} = useAuth()
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <Card
        className='w-[450px] h-[600px] shadow-xl'
      >
        <h1 className='text-center text-3xl font-bold'>Create Account</h1>
        <h2 className='text-center text-[15px] text-gray-500 mt-2'>Sign up for a new account</h2>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 450, maxHeight: 600, marginTop: 20 }}
          initialValues={{ remember: true }}
          autoComplete="on"
          layout='vertical'
        >
          <div
            style={{
              width: "100%",
              height: "40px",
              display: "flex",
              marginBottom: "50px"
            }}
          >
            <Form.Item label="First Name" >
              <Input
                prefix={<UserOutlined />}
                style={{ width: '100%', color: "#6B7280" }}
                placeholder='Enter your first name'
                size='large'
              />
            </Form.Item>
            <div className="w-[20px]"></div>
            <Form.Item label="Last Name">
              <Input
                prefix={<UserOutlined />}
                style={{ width: '100%', color: "#6B7280" }}
                placeholder='Enter your last name'
                size='large'
              />
            </Form.Item>
          </div>
          <Form.Item label="Email Address" name="email" tooltip="This is a required field" htmlFor='email'>
            <Input
              prefix={<MailOutlined style={{ color: "#6B7280" }} />}
              className='flex gap-1'
              type='email'
              placeholder='Enter your email'
              size='large'
              id='email'
            />
          </Form.Item>
          <Form.Item label="Password:" name="password" tooltip="This is a required field" htmlFor='password'>
            <Input.Password
              prefix={<LockOutlined style={{ color: "#6B7280" }} />}
              className='flex gap-1'
              type='password'
              placeholder='Enter your password'
              size='large'
              id='password'
            />
          </Form.Item>
          <Form.Item label="Confirm Password:" name="confirmPassword" tooltip="This is a required field" htmlFor='confirmPassword'>
            <Input.Password
              prefix={<LockOutlined style={{ color: "#6B7280" }} />}
              className='flex gap-1'
              type='password'
              placeholder='Confirm your password'
              size='large'
              id='confirmPassword'
              autoComplete='off'
            />
          </Form.Item>
          {/* <Form.Item>
              <Checkbox>I agree to the <Link href="/">Terms of Service</Link> and <Link href="/">Privacy Policy</Link></Checkbox>
            </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" size='large' className='w-[100%]'>
              Create Account
            </Button>
          </Form.Item>
          <div className="">
            <p className='text-center'>Already have an account? <Link href="/sign-in">Sign In</Link></p>
          </div>
        </Form>

      </Card>
    </div>
  )
}

export default SignUpPage