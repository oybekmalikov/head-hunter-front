"use client"
import { LeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

export default function VerifyOtp() {
	const router = useRouter()
	const { VerifyOtp } = useAuth();
	const {mutate: verifyOtpFn} = VerifyOtp()
	const [timeLeft, setTimeLeft] = useState(0)
	const email = useSearchParams().get("email") || ""
	
	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
		const s = seconds % 60
		return `${m}:${s < 10 ? "0" : ""}${s}`
	}
	useEffect(() => {
		if (email) {
			setTimeLeft(180)
		} else {
			router.push("/sign-up")
		}
	}, [email])

	useEffect(() => {
		if (timeLeft <= 0) return
		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [timeLeft])

	const onFinishVerifyOtp = (otp: string) => {
		console.log(otp, "otp");
		verifyOtpFn({ email, otp, type: "signup" }, {
			onSuccess: () => {
				router.push("/");
			}
		})
	}
	return <div className="w-full h-screen flex justify-center items-center">
		<div className="w-[500px] h-[320px] shadow-lg border border-gray-100 rounded-xl flex flex-col items-center gap-4">
			<h1 className="text-center text-2xl font-bold mt-4">Verify OTP</h1>
			<p className="text-center text-gray-600 mt-2">Enter the OTP sent to your email</p>
			<p className='text-center text-gray-600 mt-5'>
				{formatTime(timeLeft)}
			</p>
			<Form>
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
							onClick={() => router.push("/jobs")}
						>
							<LeftOutlined /> Back
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	</div>
}