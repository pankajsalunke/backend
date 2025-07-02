import {Task} from "../../models/tasks.model.js";
import {Employee} from "../../models/employee.model.js";

const getEmployeeProfile = async (req, res) => {
  res.status(200).json(req.employee);
};

const getEmployeeTasks = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const tasks = await Task.find({assignedTo: employeeId})
      .populate({
        path: "assignedTo",
        select: "fullname",
      })
      .populate({
        path: "assignedBy",
        select: "fullname",
      })
      .sort({dueDate: 1});

    const taskNumbers = {
      active: tasks.filter((task) => task.status.active).length,
      newTask: tasks.filter((task) => task.status.newTask).length,
      completed: tasks.filter((task) => task.status.completed).length,
      failed: tasks.filter((task) => task.status.failed).length,
    };

    res.status(200).json({tasks, taskNumbers});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const empLogout = async (req, res) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  res.status(200).json({message: "logged out"});
};

const getTaskById = async (req,res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId)
      .populate("assignedTo", "fullname email")  // populate employee info
      .populate("assignedBy", "fullname email"); // populate admin info

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


export {getEmployeeTasks, getEmployeeProfile, empLogout, getTaskById};
