import {Task} from "../../models/tasks.model.js";
import {Admin} from "../../models/admin.model.js";
import {Employee} from "../../models/employee.model.js";

const createTask = async (req, res) => {
  const {title, description, dueDate, dept, e_email, a_email} = req.body;

  if (
    [title, description, dueDate, dept, e_email, a_email].some(
      (field) => field?.trim() === ""
    )
  ) {
    return res
      .status(400)
      .json({message: "fill all field that are neccesary!"});
  }

  const eid = await Employee.findOne({email: e_email});

  if (!eid) {
    return res.status(401).json({message: "Invalid employee email"});
  }

  const aid = await Admin.findOne({email: a_email});

  if (!aid) {
    return res.status(401).json({message: "Invalid admin name"});
  }

  const assignedTo = eid?._id;

  const assignedBy = aid?._id;

  const task = await Task.create({
    title,
    description,
    dueDate,
    dept,
    assignedBy,
    assignedTo,
  });

  eid.taskNumbers.newTask += 1;
  await eid.save();

  return res.status(201).json({task, message: "task created successfully!"});
};

// admin can get task on there dashboard to view task complete, accept , faild or completed

const getTasksByAdmin = async (req, res) => {
  try {
    const adminId = req.admin._id; 

    const tasks = await Task.find({assignedBy: adminId}).populate({
        path: "assignedTo",
        select: "fullname",
      });

    res.status(200).json({tasks});
  } catch (err) {
    console.error("Error getting admin tasks:", err);
    res.status(500).json({error: "Failed to get tasks assigned by admin"});
  }
};

export {createTask, getTasksByAdmin};
