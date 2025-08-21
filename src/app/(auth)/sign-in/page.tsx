"use client";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { Button, Card, Checkbox, Form, Input } from "antd";
import Link from "next/link";

const SignIn = () => {
	return (
		<div className="w-[100vw] h-[100vh] flex items-center justify-center ">
			<Card className="w-[450px] h-[480px] shadow-xl">
				<h1 className="text-center text-3xl font-bold">Welcome Back</h1>
				<h2 className="text-center text-[15px] text-gray-500 mt-2">
					Sign in to your account
				</h2>
				<Form
					name="basic"
					layout="vertical"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					style={{ maxWidth: 450, maxHeight: 500, marginTop: 20 }}
					initialValues={{ remember: true }}
					autoComplete="on"
				>
					<Form.Item
						label="Email Address"
						name="email"
						tooltip="This is a required field"
						htmlFor="email"
					>
						<Input
							prefix={<MailOutlined style={{ color: "#6B7280" }} />}
							className="flex gap-1"
							type="email"
							placeholder="Enter your email"
							size="large"
							id="email"
						/>
					</Form.Item>
					<Form.Item
						label="Password:"
						name="password"
						tooltip="This is a required field"
						htmlFor="password"
					>
						<Input.Password
							prefix={<LockOutlined style={{ color: "#6B7280" }} />}
							className="flex gap-1"
							type="password"
							placeholder="Enter your password"
							size="large"
							id="password"
						/>
					</Form.Item>
					<div className="w-[100%] h-[30px] flex justify-between items-center">
						<Checkbox>Remember me</Checkbox>
						<Link href={"/forgot-password"}>Forgot Password?</Link>
					</div>
					<Form.Item>
						<Button type="primary" size="large" className="w-[100%] mt-6">
							Sign In
						</Button>
					</Form.Item>
					<div className="">
						<p className="text-center">
							Don`t have an account? <Link href="/sign-up">Register</Link>
						</p>
					</div>
				</Form>
			</Card>
		</div>
	);
};

export default SignIn;
