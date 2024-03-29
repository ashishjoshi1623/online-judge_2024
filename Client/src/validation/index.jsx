import * as Yup from "yup";

export const validateSchema = Yup.object({
  username: Yup.string().min(2).max(25).matches(/^[A-Za-z][A-Za-z0-9_]{2,25}$/, 'only alphanumeric/"_" allowed').required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});