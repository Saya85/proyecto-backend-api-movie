const yup = require("yup");
// const validateUUID = require("uuid-validate");
var ObjectId = require('mongoose').Types.ObjectId;
// Hidden for simplicity


// email, name, password, roles
exports.userParamsIdSchema = yup.object({
  params: yup.object({
    //id: yup.number().required(),
    id: yup
    .string()
    .test("is-uuid", "${path} is not uuid", value => ObjectId.isValid(value))
  }),
});