"use client";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { Button, Card, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setItem } from "../../../helpers/localstorage";
import { authService } from "../../../services/auth.service";

const SignUpPage = () => {
	const router = useRouter();
	const onFinish = async (values: any) => {
		try {
			const response = await authService.signUp(values);
			setItem("email", values.email);
			setItem("user_id", response.data.data.id);
			setItem("firstName", values.firstName);
			setItem("lastName", values.lastName);
			router.push("/verify-otp");
		} catch (error: any) {
			console.error("Sign up error:", error);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Form validation failed:", errorInfo);
		message.error("Please fill in all required fields correctly.");
	};
	return (
		<div className="w-[100vw] h-[100vh] flex items-center justify-center">
			<Card className="w-[450px] h-[600px] shadow-xl">
				<h1 className="text-center text-3xl font-bold">Create Account</h1>
				<h2 className="text-center text-[15px] text-gray-500 mt-2">
					Sign up for a new account
				</h2>
				<Form
					name="signup"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					style={{ maxWidth: 450, maxHeight: 600, marginTop: 20 }}
					initialValues={{ remember: true }}
					autoComplete="on"
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<div className="flex gap-4 mb-6">
						<Form.Item
							label="First Name"
							name="firstName"
							rules={[
								{ required: true, message: "Please enter your first name!" },
							]}
							className="flex-1"
						>
							<Input
								prefix={<UserOutlined />}
								style={{ color: "#6B7280" }}
								placeholder="Enter your first name"
								size="large"
							/>
						</Form.Item>
						<Form.Item
							label="Last Name"
							name="lastName"
							rules={[
								{ required: true, message: "Please enter your last name!" },
							]}
							className="flex-1"
						>
							<Input
								prefix={<UserOutlined />}
								style={{ color: "#6B7280" }}
								placeholder="Enter your last name"
								size="large"
							/>
						</Form.Item>
					</div>
					<Form.Item
						label="Email Address"
						name="email"
						rules={[
							{ required: true, message: "Please enter your email!" },
							{ type: "email", message: "Please enter a valid email!" },
						]}
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
						label="Password"
						name="password"
						rules={[
							{ required: true, message: "Please enter your password!" },
							{ min: 6, message: "Password must be at least 6 characters!" },
						]}
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
					<Form.Item
						label="Confirm Password"
						name="confirmPassword"
						dependencies={["password"]}
						rules={[
							{ required: true, message: "Please confirm your password!" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("Passwords do not match!"));
								},
							}),
						]}
						tooltip="This is a required field"
						htmlFor="confirmPassword"
					>
						<Input.Password
							prefix={<LockOutlined style={{ color: "#6B7280" }} />}
							className="flex gap-1"
							type="password"
							placeholder="Confirm your password"
							size="large"
							id="confirmPassword"
							autoComplete="off"
						/>
					</Form.Item>
					{/* <Form.Item>
              <Checkbox>I agree to the <Link href="/">Terms of Service</Link> and <Link href="/">Privacy Policy</Link></Checkbox>
            </Form.Item> */}
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							className="w-[100%]"
						>
							{"Create Account"}
						</Button>
					</Form.Item>
					<div className="">
						<p className="text-center">
							Already have an account? <Link href="/sign-in">Sign In</Link>
						</p>
					</div>
				</Form>
			</Card>
		</div>
	);
};

export default SignUpPage;
