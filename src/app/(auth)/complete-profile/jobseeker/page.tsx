"use client";
import {
	Button,
	Card,
	Checkbox,
	DatePicker,
	Form,
	Input,
	message,
	Select,
} from "antd";
import dayjs from "dayjs";
import { FileText, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getItem } from "../../../../helpers/localstorage";
import { jobSeekersService } from "../../../../services/job-seekers.service";

const { TextArea } = Input;
const { Option } = Select;

const CompleteProfileJobseeker = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const firstName = getItem("firstName");
	const lastName = getItem("lastName");

	const onFinish = async (values: any) => {
		try {
			console.log(values);
			setLoading(true);
			const userId = getItem("user_id");
			await jobSeekersService.createJobSeeker({
				userId: +userId,
				dateOdBirth: values.dateOfBirth,
				phoneNumber: values.phoneNumber,
				gender: values.gender,
				experience: +values.experienceLevel.split("-")[1],
				city: values.city,
				address: values.address,
				resumeFilename: "/",
				summary: values.summary,
				githubUrl: "https://github.com",
				linkedIn: "https://linkedin.com",
				resumeUrl: "/",
				isOpenToWork: true,
				avgSalary: values.avgSalary || 0,
			});
			router.push("/sign-in");
		} catch (error) {
			console.error("Profile submission error:", error);
			message.error("Failed to complete profile. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Form validation failed:", errorInfo);
		message.error("Please fill in all required fields correctly.");
	};

	return (
		<div className="w-[100vw] min-h-[100vh] bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<Card className="shadow-xl border-0">
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<User className="w-8 h-8 text-blue-600" />
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Complete Your Job Seeker Profile
						</h1>
						<p className="text-gray-600">
							Tell us about yourself to get started with job hunting
						</p>
					</div>

					<Form
						form={form}
						name="jobseeker-profile"
						layout="vertical"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						className="max-w-2xl mx-auto"
					>
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<User className="w-5 h-5 text-blue-600" />
								Personal Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="First Name"
									name="firstName"
									initialValue={firstName}
									rules={[
										{
											required: true,
											message: "Please enter your first name!",
										},
									]}
								>
									<Input
										disabled={true}
										prefix={<User className="w-4 h-4 text-gray-400" />}
										placeholder="Enter your first name"
										size="large"
									/>
								</Form.Item>

								<Form.Item
									label="Last Name"
									name="lastName"
									initialValue={lastName}
									rules={[
										{ required: true, message: "Please enter your last name!" },
									]}
								>
									<Input
										disabled={true}
										prefix={<User className="w-4 h-4 text-gray-400" />}
										placeholder="Enter your last name"
										size="large"
									/>
								</Form.Item>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="Phone Number"
									name="phoneNumber"
									rules={[
										{
											required: true,
											message: "Please enter your phone number!",
										},
									]}
								>
									<Input
										prefix={<Phone className="w-4 h-4 text-gray-400" />}
										placeholder="Enter your phone number"
										size="large"
									/>
								</Form.Item>

								<Form.Item
									label="Gender"
									name="gender"
									rules={[
										{ required: true, message: "Please select your gender!" },
									]}
								>
									<Select placeholder="Select gender" size="large">
										<Option value="male">Male</Option>
										<Option value="female">Female</Option>
										<Option value="other">Other</Option>
									</Select>
								</Form.Item>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="Date of Birth"
									name="dateOfBirth"
									rules={[
										{
											required: true,
											message: "Please select your date of birth!",
										},
									]}
								>
									<DatePicker
										placeholder="Select date of birth"
										size="large"
										className="w-full"
										format="YYYY-MM-DD"
										disabledDate={(current) =>
											current && current > dayjs().endOf("day")
										}
									/>
								</Form.Item>

								<Form.Item
									label="Experience Level"
									name="experienceLevel"
									rules={[
										{
											required: true,
											message: "Please select your experience level!",
										},
									]}
								>
									<Select placeholder="Select experience level" size="large">
										<Option value="0-2">Entry Level (0-2 years)</Option>
										<Option value="3-5">Mid Level (3-5 years)</Option>
										<Option value="6-10">Senior Level (6-10 years)</Option>
										<Option value="10+">Executive Level (10+ years)</Option>
									</Select>
								</Form.Item>
							</div>
						</div>

						<div className="mb-8">
							<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<MapPin className="w-5 h-5 text-blue-600" />
								Location Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="City"
									name="city"
									rules={[
										{ required: true, message: "Please enter your city!" },
									]}
								>
									<Input
										prefix={<MapPin className="w-4 h-4 text-gray-400" />}
										placeholder="Enter your city"
										size="large"
									/>
								</Form.Item>
							</div>

							<Form.Item
								label="Address"
								name="address"
								rules={[
									{ required: true, message: "Please enter your address!" },
								]}
							>
								<TextArea
									rows={3}
									placeholder="Enter your full address..."
									className="resize-none"
								/>
							</Form.Item>
						</div>

						<div className="mb-8">
							<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<FileText className="w-5 h-5 text-blue-600" />
								Professional Summary
							</h3>

							<Form.Item
								label="Summary"
								name="summary"
								rules={[
									{
										required: true,
										message: "Please write a professional summary!",
									},
								]}
							>
								<TextArea
									rows={5}
									placeholder="Write a brief summary about yourself, your experience, and what you're looking for in your next role..."
									className="resize-none"
								/>
							</Form.Item>
						</div>
						<div className="mb-8">
							<Form.Item name="isOpenToWork">
								<Checkbox />
								<label className="ml-2 text-sm font-medium text-gray-700">
									Is open to work opportunities
								</label>
							</Form.Item>
						</div>
						<Form.Item className="text-center">
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								loading={loading}
								className="w-full md:w-auto px-12 py-3 h-auto text-lg font-semibold"
							>
								{loading ? "Completing Profile..." : "Complete Profile"}
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default CompleteProfileJobseeker;
