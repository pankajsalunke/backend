// check if role === admin then go to the admin route

import jwt from "jsonwebtoken";
import {Admin} from "../models/admin.model.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies.admintoken || req.headers.authorization?.split(" ")[1];
    // console.log("Token from authAdmin::", token);

    if (!token) {
      return res.status(401).json({message: "UnAuthorized Request"});
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE);

    const admin = await Admin.findById(decodeToken?._id).select("-password");

    if (!admin) {
      res.status(401).json({message: "Invalid token "});
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log("auth  error::", error);
  }
};
