"use client";
import "@ant-design/v5-patch-for-react-19";
import { Button, Card, Form, Input, message, Select } from "antd";
import { Building2, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { getItem } from "../../../../helpers/localstorage";
import { useCreateEmployer } from "../../../../hooks/useEmployer";
import { companyService } from "../../../../services/company.service";

const { TextArea } = Input;
const { Option } = Select;

const CompleteProfileEmployer = () => {
	const { mutate, isPending } = useCreateEmployer();
	const { createCompany } = companyService;
	const router = useRouter();
	const [form] = Form.useForm();

	const onFinish = async (values: any) => {
		try {
			const userId = getItem("user_id");
			const companyData = await createCompany({
				name: values.companyName||"no name",
				industry: values.industry||"no industry",
				description: values.companyDescription||"no description",
				companySize: values.companySize||"no size",
				establishedYear: +values.foundedYear||"no year",
				webSiteUrl: values.companyWebsite||"no website",
				logoUrl: values.companyLogoUrl||"no logo",
				address: values.companyAddress||"no address",
				email: values.email||"no email",
				callNumber: values.phoneNumber||"no phone",
				isVerified: true,
			});
			mutate({
				userId:+userId,
				position: values.position,
				department: values.department,
				companyId: companyData.id || 1,
			});
			router.push("/sign-in");
		} catch (error) {
			console.error("Profile submission error:", error);
			message.error("Failed to submit profile. Please try again.");
		} finally {
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
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Building2 className="w-8 h-8 text-green-600" />
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Complete Your Employer Profile
						</h1>
						<p className="text-gray-600">
							Tell us about your company to get started with hiring
						</p>
					</div>

					<Form
						form={form}
						name="employer-profile"
						layout="vertical"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						className="max-w-2xl mx-auto"
					>
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<Building2 className="w-5 h-5 text-green-600" />
								Company Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="Company Name"
									name="companyName"
									rules={[
										{ required: true, message: "Please enter company name!" },
									]}
								>
									<Input
										prefix={<Building2 className="w-4 h-4 text-gray-400" />}
										placeholder="Enter company name"
										size="large"
									/>
								</Form.Item>

								<Form.Item
									label="Industry"
									name="industry"
									rules={[
										{ required: true, message: "Please select industry!" },
									]}
								>
									<Select placeholder="Select industry" size="large">
										<Option value="technology">Technology</Option>
										<Option value="finance">Finance</Option>
										<Option value="healthcare">Healthcare</Option>
										<Option value="education">Education</Option>
										<Option value="retail">Retail</Option>
										<Option value="manufacturing">Manufacturing</Option>
										<Option value="consulting">Consulting</Option>
										<Option value="it">IT</Option>
										<Option value="other">Other</Option>
									</Select>
								</Form.Item>
							</div>

							<Form.Item
								label="Company Description"
								name="companyDescription"
								rules={[
									{
										required: true,
										message: "Please enter company description!",
									},
								]}
							>
								<TextArea
									rows={4}
									placeholder="Describe your company, its mission, and what makes it unique..."
									className="resize-none"
								/>
							</Form.Item>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="Company Size"
									name="companySize"
									rules={[
										{ required: true, message: "Please select company size!" },
									]}
								>
									<Select placeholder="Select company size" size="large">
										<Option value="1-10">1-10 employees</Option>
										<Option value="11-50">11-50 employees</Option>
										<Option value="51-200">51-200 employees</Option>
										<Option value="201-500">201-500 employees</Option>
										<Option value="500+">500+ employees</Option>
									</Select>
								</Form.Item>

								<Form.Item
									label="Founded Year"
									name="foundedYear"
									rules={[
										{ required: true, message: "Please enter founded year!" },
									]}
								>
									<Input
										type="number"
										placeholder="e.g., 2020"
										size="large"
										min="1900"
										max={new Date().getFullYear()}
									/>
								</Form.Item>
							</div>
						</div>

						<div className="mb-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="Company Website"
									name="contactPersonName"
									rules={[
										{
											required: true,
											message: "Please enter company website!",
										},
									]}
								>
									<Input
										prefix={<User className="w-4 h-4 text-gray-400" />}
										placeholder="Enter contact person name"
										size="large"
									/>
								</Form.Item>

								<Form.Item
									label="Phone Number"
									name="phoneNumber"
									rules={[
										{ required: true, message: "Please enter phone number!" },
									]}
								>
									<Input
										prefix={<Phone className="w-4 h-4 text-gray-400" />}
										placeholder="Enter phone number"
										size="large"
									/>
								</Form.Item>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="Company Email"
									name="email"
									rules={[
										{ required: true, message: "Please enter company email!" },
									]}
								>
									<Input placeholder="Enter company email" size="large" />
								</Form.Item>

								<Form.Item
									label="Company logo url	"
									name="companyLogoUrl"
									rules={[
										{
											required: true,
											message: "Please enter company logo url!",
										},
									]}
								>
									<Input placeholder="Enter company logo url" size="large" />
								</Form.Item>
							</div>
							<Form.Item
								label="Company Address"
								name="companyAddress"
								rules={[
									{ required: true, message: "Please enter company address!" },
								]}
							>
								<Input
									prefix={<MapPin className="w-4 h-4 text-gray-400" />}
									placeholder="Enter company address"
									size="large"
								/>
							</Form.Item>
						</div>

						{/* Hiring Information */}
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<User className="w-5 h-5 text-green-600" />
								Hiring Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="Your Position in Company"
									name="position"
									rules={[
										{ required: true, message: "Please enter your position!" },
									]}
								>
									<Input placeholder="e.g., HR Manager, CEO" size="large" />
								</Form.Item>

								<Form.Item
									label="Department"
									name="department"
									rules={[
										{ required: true, message: "Please enter department!" },
									]}
								>
									<Input
										placeholder="e.g., Human Resources, Engineering"
										size="large"
									/>
								</Form.Item>
							</div>

							<Form.Item
								label="Hiring Goals"
								name="hiringGoals"
								rules={[
									{
										required: true,
										message: "Please describe your hiring goals!",
									},
								]}
							>
								<TextArea
									rows={3}
									placeholder="Describe what type of candidates you're looking for and your hiring goals..."
									className="resize-none"
								/>
							</Form.Item>
						</div>

						<Form.Item className="text-center">
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								loading={isPending}
								className="w-full md:w-auto px-12 py-3 h-auto text-lg font-semibold"
							>
								{isPending ? "Submitting Profile..." : "Submit for Review"}
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default CompleteProfileEmployer;
