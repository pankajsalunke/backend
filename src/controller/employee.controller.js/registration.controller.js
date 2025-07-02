import {Employee} from "../../models/employee.model.js";

const userRegister = async (req, res) => {
  const {fullname, email, dept, password, role} = req.body;
  // console.log(name, fullname, email, dept, role);
  try {
    if (!fullname?.firstname || !fullname?.lastname) {
      return res.status(401).json({message: "Full name is required"});
    }
    if ([email, dept, password, role].some((field) => field?.trim() === "")) {
      return res.status(401).json({message: "please fill neccessary fields"});
    }

    if (role !== "admin" && role !== "employee") {
      return res.status(401).json({message: "role is required"});
    }

    const existingEmployee = await Employee.findOne({email});

    if (existingEmployee) {
      return res.status(401).json({message: "employee are Aleready exist "});
    }

    const employee = await Employee.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      dept,
      password,
      role,
    });
    const token = await employee.generateToken(employee._id, employee.role);
    return res
      .status(201)
      .json({employee: employee, token, message: "emplyee registered"});
  } catch (error) {
    console.log("Employee Registration error::", error);
  }
};

// create employee login functionality

const empLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const employee = await Employee.findOne({email});
    if (!employee) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isPasswordCorrect = await employee.isPasswordCorrect(password);

    const token = await employee.generateToken(employee._id, employee.role);

    const loggedInemp = await Employee.findById(employee._id).select(
      "-password"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({message: "login suceessfull", token, loggedInemp});
  } catch (error) {
    res.status(500).json({message: "Server Error", error: error.message});
  }
};

export {userRegister, empLogin};
