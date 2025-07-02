// // creating actions like accept task , reject , mark as complete etc... .

// import {Task} from "../../models/tasks.model.js";

// // Accept a Task (New → Active)
// const acceptTask = async (req, res) => {
//   try {
//     const {taskId} = req.params;

//     const task = await Task.findById(taskId);
//     if (!task) return res.status(404).json({message: "Task not found"});

//     // Only accept if task is currently New
//     if (!task.status.newTask) {
//       return res.status(400).json({message: "Only new tasks can be accepted"});
//     }

//     task.status = {
//       newTask: false,
//       active: true,
//       completed: false,
//       failed: false,
//     };

//     await task.save();
//     res.status(200).json({message: "Task accepted and marked as Active"});
//   } catch (error) {
//     res
//       .status(500)
//       .json({message: "Error accepting task", error: error.message});
//   }
// };

// // Reject a Task (New → Failed)
// const rejectTask = async (req, res) => {
//   try {
//     const {taskId} = req.params;

//     const task = await Task.findById(taskId);
//     if (!task) return res.status(404).json({message: "Task not found"});

//     if (!task.status.newTask) {
//       return res.status(400).json({message: "Only new tasks can be rejected"});
//     }

//     task.status = {
//       newTask: false,
//       active: false,
//       completed: false,
//       failed: true,
//     };

//     await task.save();
//     res.status(200).json({message: "Task rejected and marked as Failed"});
//   } catch (error) {
//     res
//       .status(500)
//       .json({message: "Error rejecting task", error: error.message});
//   }
// };

// // Complete a Task (Active → Completed)
// const completeTask = async (req, res) => {
//   try {
//     const {taskId} = req.params;

//     const task = await Task.findById(taskId);
//     if (!task) return res.status(404).json({message: "Task not found"});

//     if (!task.status.active) {
//       return res
//         .status(400)
//         .json({message: "Only active tasks can be completed"});
//     }

//     task.status = {
//       newTask: false,
//       active: false,
//       completed: true,
//       failed: false,
//     };

//     await task.save();
//     res.status(200).json({message: "Task marked as Completed"});
//   } catch (error) {
//     res
//       .status(500)
//       .json({message: "Error completing task", error: error.message});
//   }
// };

// // Fail a Task (Active → Failed)
// const failTask = async (req, res) => {
//   try {
//     const {taskId} = req.params;

//     const task = await Task.findById(taskId);
//     if (!task) return res.status(404).json({message: "Task not found"});

//     if (!task.status.active) {
//       return res.status(400).json({message: "Only active tasks can be failed"});
//     }

//     task.status = {
//       newTask: false,
//       active: false,
//       completed: false,
//       failed: true,
//     };

//     await task.save();
//     res.status(200).json({message: "Task marked as Failed"});
//   } catch (error) {
//     res.status(500).json({message: "Error failing task", error: error.message});
//   }
// };

// export {
//     acceptTask,
//     rejectTask,
//     completeTask,
//     failTask
// }

import {Task} from "../../models/tasks.model.js";

// Accept Task
const acceptTask = async (req, res) => {
  try {
    const {taskId} = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({message: "Task not found"});

    if (!task.status.newTask) {
      return res.status(400).json({message: "Only new tasks can be accepted"});
    }

    task.status = {
      newTask: false,
      active: true,
      completed: false,
      failed: false,
    };
    await task.save();
    res.status(200).json({message: "Task accepted", status: task.status});
  } catch (err) {
    res.status(500).json({message: "Error accepting task", error: err.message});
  }
};

// Reject Task
const rejectTask = async (req, res) => {
  try {
    const {taskId} = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({message: "Task not found"});

    if (!task.status.newTask) {
      return res.status(400).json({message: "Only new tasks can be rejected"});
    }

    task.status = {
      newTask: false,
      active: false,
      completed: false,
      failed: true,
    };
    await task.save();
    res.status(200).json({message: "Task rejected", status: task.status});
  } catch (err) {
    res.status(500).json({message: "Error rejecting task", error: err.message});
  }
};

// Complete Task
const completeTask = async (req, res) => {
  try {
    const {taskId} = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({message: "Task not found"});

    if (!task.status.active) {
      return res
        .status(400)
        .json({message: "Only active tasks can be completed"});
    }

    task.status = {
      newTask: false,
      active: false,
      completed: true,
      failed: false,
    };
    await task.save();
    res.status(200).json({message: "Task completed", status: task.status});
  } catch (err) {
    res
      .status(500)
      .json({message: "Error completing task", error: err.message});
  }
};

// Fail Task
const failTask = async (req, res) => {
  try {
    const {taskId} = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({message: "Task not found"});

    if (!task.status.active) {
      return res.status(400).json({message: "Only active tasks can be failed"});
    }

    task.status = {
      newTask: false,
      active: false,
      completed: false,
      failed: true,
    };
    await task.save();
    res.status(200).json({message: "Task failed", status: task.status});
  } catch (err) {
    res.status(500).json({message: "Error failing task", error: err.message});
  }
};

export {acceptTask, rejectTask, completeTask, failTask};
