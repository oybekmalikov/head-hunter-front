"use client";
import { Button, Form, Input } from "antd";
import Countdown from "antd/es/statistic/Countdown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getItem } from "../../../helpers/localstorage";
import { useVerifyOtp } from "../../../hooks/useAuth";
export default function VerifyOtp() {
	const router = useRouter();
	const { mutate: verifyOtp, isPending: isVerifyOtpPending } = useVerifyOtp();
	const email = getItem("email");
	const onFinishOtp = async (values: any) => {
		const { otp } = values;
		verifyOtp(
			{ otp: String(otp), email, type: "signup" },
			{
				onSuccess: () => {
					router.push("/complete-profile");
				},
			}
		);
	};
	const [countdown, setCountdown] = useState(Date.now() + 3 * 60 * 1000);
	return (
		<div className="w-[100vw] h-[100vh] flex items-center justify-center">
			<Form
				name="otp-verification"
				style={{
					maxWidth: 400,
					width: "100%",
					padding: "32px",
					background: "#fff",
					borderRadius: "8px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					margin: "16px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
				onFinish={onFinishOtp}
			>
				<h2
					style={{
						textAlign: "center",
						marginBottom: "24px",
						color: "#1a1a1a",
						fontWeight: 600,
					}}
				>
					OTP Verification
				</h2>
				<div className="flex justify-center items-center mb-4">
					<label className="text-center text-lg mr-2">Expire in: </label>
					<Countdown
						value={countdown}
						format="mm:ss"
						valueStyle={{
							color: "#000",
							fontSize: "18px",
						}}
						onFinish={() => {
							router.push("/");
						}}
					/>
				</div>
				<Form.Item
					name="otp"
					rules={[{ required: true, message: "Please input your Email!" }]}
				>
					<Input.OTP autoFocus formatter={(str) => str.toUpperCase()} />
				</Form.Item>
				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						size="large"
						loading={isVerifyOtpPending}
						style={{
							borderRadius: "6px",
							background: "#1677ff",
							border: "none",
							fontWeight: 500,
							transition: "all 0.3s",
						}}
					>
						Verify
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
