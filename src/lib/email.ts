export async function sendEmail(
	to: string,
	subject: string,
	content: string
): Promise<boolean> {
	try {
		// Email sending logic
		console.log(`Sending email to ${to}: ${subject}`);
		return true;
	} catch (error) {
		console.error("Failed to send email:", error);
		return false;
	}
}

export async function sendVerificationEmail(
	email: string,
	token: string
): Promise<boolean> {
	const subject = "Verify your email address";
	const content = `Please verify your email by clicking this link: /verify-otp?token=${token}`;

	return sendEmail(email, subject, content);
}

export async function sendPasswordResetEmail(
	email: string,
	token: string
): Promise<boolean> {
	const subject = "Reset your password";
	const content = `Reset your password by clicking this link: /reset-password?token=${token}`;

	return sendEmail(email, subject, content);
}

export async function sendWelcomeEmail(
	email: string,
	name: string
): Promise<boolean> {
	const subject = "Welcome to HeadHunter!";
	const content = `Welcome ${name}! Thank you for joining our platform.`;

	return sendEmail(email, subject, content);
}
