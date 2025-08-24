"use client";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { Button, Card, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getItem } from "../../../helpers/localstorage";
import { useSignIn } from "../../../hooks/useAuth";

const SignIn = () => {
	const { mutate, isPending } = useSignIn();
	const router = useRouter();
	const handleSubmit = (values: any) => {
		mutate(values, {
			onSuccess: () => {
				// router.push(`/jobseeker`);
				const role = getItem("role");
				if (role) {
					router.push(`/${role}`);
				} else {
					router.push(`/jobseeker`);
				}
			},
		});
	};
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
					onFinish={handleSubmit}
				>
					<Form.Item
						label="Email Address"
						name="email"
						rules={[
							{ required: true, message: "Please enter your email" },
							{
								pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email address",
							},
						]}
					>
						<Input
							prefix={<MailOutlined style={{ color: "#6B7280" }} />}
							className="flex gap-1"
							type="email"
							placeholder="Enter your email"
							size="large"
							id="email"
							required
						/>
					</Form.Item>
					<Form.Item
						label="Password:"
						name="password"
						rules={[
							{ required: true, message: "Please enter your password" },
							{ min: 8, message: "Password must be at least 8 characters" },
						]}
					>
						<Input.Password
							prefix={<LockOutlined style={{ color: "#6B7280" }} />}
							className="flex gap-1"
							type="password"
							placeholder="Enter your password"
							size="large"
							id="password"
							required
						/>
					</Form.Item>
					<div className="flex justify-center">
						<Link className="text-sm text-blue-500" href={"/forgot-password"}>
							Forgot Password?
						</Link>
					</div>
					<Form.Item>
						<Button
							type="primary"
							size="large"
							className="w-[100%] mt-6"
							htmlType="submit"
							loading={isPending}
						>
							{isPending ? "Signing In..." : "Sign In"}
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
