export interface SignInType {
    email: string;
    password: string;
}

export interface SignUpType extends SignInType {
    firstName: string;
    lastName: string;
    confirmPassword: string;
}

export interface VerifyOtpType {
    email: string;
    otp: string;
    type: string
}

export interface ResetPasswordType {
    email: string;
    password: string;
    confirmPassword: string;
}