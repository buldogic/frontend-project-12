import * as yup from 'yup';

const formSchema = (required) => yup.object().shape({
  username: yup.string()
    .required(required),
  password: yup.string()
    .required(required),
});

export const modalSchema = (
  channels,
  required,
  nameLength,
  duplicates,
) => yup.object().shape({
  name: yup.string()
    .required(required)
    .min(3, nameLength)
    .max(20, nameLength)
    .notOneOf(channels, duplicates),
});

export const messageSchema = (required) => yup.object().shape({
  body: yup
    .string()
    .trim()
    .required(required),
});

export const signupSchema = (
  required,
  nameLength,
  minPassword,
  matchPasswords,
) => yup.object().shape({
  username: yup.string()
    .required(required)
    .min(3, nameLength)
    .max(20, nameLength),
  password: yup.string()
    .required(required)
    .min(6, minPassword),
  confirmPassword: yup.string()
    .required(required)
    .oneOf([yup.ref('password'), null], matchPasswords),
});

export default formSchema;
