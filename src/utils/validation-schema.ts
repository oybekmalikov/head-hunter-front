import * as yup from "yup";
export const ResetPasswordSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});