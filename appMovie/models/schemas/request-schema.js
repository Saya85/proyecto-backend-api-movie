const yup = require("yup");

// Hidden for simplicity


// email, name, password, roles
exports.userRegisterSchema = yup.object({
  body: yup.object({
    name: yup.string().min(3).max(32).required(),
    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "body.password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    email: yup.string().email().required(),
    roles: yup.array().min(1).default(() => ['user'])
  }),
  /*params: yup.object({
    id: yup.number().required(),
  }),*/
});