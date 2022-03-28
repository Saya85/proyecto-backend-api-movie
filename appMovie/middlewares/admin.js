// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/UserModel");

// const admin = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const data = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await UserModel.findOne({ _id: data._id, "tokens.token": token });
//     if (user.role !== 'admin') {
//       throw new Error();
//     }

//     next();
//   } catch (error) {
//     res.status(401).send({ error: "Not authorized to access this resource" });
//   }
// };
// module.exports = admin;

const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const admin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ _id: data._id, "tokens.token": token });
    if (!Object.values(user.roles).includes('admin'))
      throw new Error();
    return next();
  } catch (error) {
    return res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = admin;