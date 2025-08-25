"use client"
import '@ant-design/v5-patch-for-react-19';
import { Button, Card, Form, Input } from 'antd';
import Link from 'next/link';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { SignInType } from '@/types/auth';
import { setItem } from '@/helpers/storage';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const router = useRouter()
    const [form] = Form.useForm();
    const { SignInUser } = useAuth();
    const { mutate: signInFn, isPending: loading } = SignInUser();

    const onSubmit = (data: SignInType) => {
        console.log(data, "data");
        signInFn(data, {
            onSuccess: (res) => {
                setItem("accessToken", res.data.accessToken);
                router.push("/users")
            }
        });
    };

    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <Card className='w-[450px] shadow-xl'>
                <div className="p-4">
                    <h1 className='text-center text-3xl font-bold'>Welcome Back</h1>
                    <h2 className='text-center text-[15px] text-gray-500 mt-2 mb-6'>
                        Sign in to your account
                    </h2>

                    <Form
                        form={form}
                        name="signin"
                        layout='vertical'
                        onFinish={onSubmit}
                        initialValues={{ remember: true }}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="Email Address"
                            name="email"
                        >
                            <Input
                                prefix={<MailOutlined style={{ color: "#6B7280" }} />}
                                type='email'
                                placeholder='Enter your email'
                                size='large'
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: "#6B7280" }} />}
                                placeholder='Enter your password'
                                size='large'
                            />
                        </Form.Item>

                        <div className="flex justify-between items-center mb-6">
                            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item> */}
                            <p
                                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                onClick={() => router.push("/auth/forgot-password")}
                            >
                                Forgot Password?
                            </p>
                        </div>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type='primary'
                                size='large'
                                className='w-full'
                                loading={loading}
                            >
                                Sign In
                            </Button>
                        </Form.Item>

                        <p className='text-center text-gray-600'>
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/auth/sign-up"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Register
                            </Link>
                        </p>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default SignIn;