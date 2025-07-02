// check employee is authorized or not

import jwt from "jsonwebtoken";
import {Employee} from "../models/employee.model.js";

export const verifyEmp = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


    if (!token) {
      return res
        .status(401)
        .json({message: " TOken not found First UnAuthorized Request"});
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE);

    const employee = await Employee.findById(decodeToken?._id).select(
      "-password"
    );

    if (!employee) {
      res.status(401).json({message: "Invalid token "});
    }

    req.employee = employee;
    next();
  } catch (error) {
    console.log("auth  error::", error);
  }
};
