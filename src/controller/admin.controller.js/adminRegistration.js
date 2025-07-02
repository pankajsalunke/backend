import {Admin} from "../../models/admin.model.js";

const adminRegistration = async (req, res) => {
  const {fullname, email, role, password, dept} = req.body;

  try {
    if (!fullname?.firstname || !fullname?.lastname) {
      return res.status(401).json({message: "Full name is required"});
    }
    if ([email, role, password, dept].some((field) => field?.trim === "")) {
      return res.status(401).json({message: "Please fill all required fields"});
    }
    if (role !== "admin") {
      return res.status(401).json({
        message: "please Enter valid role",
      });
    }

    const existingAdmin = await Admin.findOne({email});

    if (existingAdmin) {
      return res.status(401).json({message: "Admin Already exists"});
    }

    const admin = await Admin.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      role,
      password,
      dept,
    });
    const admintoken = await admin.generateToken(admin._id, admin.role);

    return res.status(201).json({
      admin,
      admintoken,
      message: "Admin registration complete successfully!",
    });
  } catch (error) {
    console.log("Admin registration error::", error);
  }
};

// create admin login functionality login functionality here

const adminLogin = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(401).json({message: "All feilds are required"});
  }
  const admin = await Admin.findOne({email});

  if (!admin) {
    return res.status(404).json({message: "Invalid Detail"});
  }
  if (!admin.role === "admin") {
    return res.status(404).json({message: "Please login as admin"});
  }

  const ispassCorrect = await admin.isPasswordCorrect(password);

  const admintoken = await admin.generateToken(admin._id, admin.role);

  const loggedInAdmin = await Admin.findById(admin._id).select("-password");

  res
    .status(200)
    .cookie("admintoken", admintoken)
    .json({message: "Login successFull", admintoken, loggedInAdmin});
};

const getAdminProfile = async (req, res) => {
  res.status(200).json(req.admin);
};

const adminLogout = async (req, res) => {
  res.clearCookie("admintoken");

  const admintoken =
    req.cookies.admintoken || req.headers.authorization?.split(" ")[1];

  res.status(200).json({message: "logged out"});
};

export {adminRegistration, adminLogin, getAdminProfile, adminLogout};
