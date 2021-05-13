import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short')
    .max(10, 'Name is too long')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password needs to be atleast 8 characters long')
    .required('Password is required'),
  agreeOnTerms: Yup.boolean().oneOf([true], 'Term of conditions are required'),
});
