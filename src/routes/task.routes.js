// import {Router} from "express";
// import {createTask} from "../controller/admin.controller.js/task.js";
// import {verifyAdmin} from "../middleware/checkAdmin.js";
// import {getEmployeeTasks} from "../controller/employee.controller.js/employeedash.js";
// import {getTaskById} from "../controller/employee.controller.js/employeedash.js";
// import {verifyEmp} from "../middleware/authorizedemp.js";
// import {
//   acceptTask,
//   rejectTask,
//   failTask,
//   completeTask,
// } from "../controller/employee.controller.js/empactions.js";

// const router = Router();

// router.route("/createtask").post(verifyAdmin, createTask);
// router.route("/gettask/:employeeId").get(verifyAdmin, getEmployeeTasks);
// router.route("/task/:taskId").get(verifyEmp, getTaskById);

// router.route("/task/:taskId/accept").put(verifyEmp, acceptTask);
// router.route("/task/:taskId/reject").put(verifyEmp, rejectTask);
// router.route("/task/:taskId/complete").put(verifyEmp, completeTask);
// router.route("/task/:taskId/fail").put(verifyEmp, failTask);

// export default router;

import { Router } from "express";
import { createTask,  getTasksByAdmin } from "../controller/admin.controller.js/task.js";
import { verifyAdmin } from "../middleware/checkAdmin.js";
import { getEmployeeTasks, getTaskById } from "../controller/employee.controller.js/employeedash.js";
import { verifyEmp } from "../middleware/authorizedemp.js";
import {
  acceptTask,
  rejectTask,
  failTask,
  completeTask,
} from "../controller/employee.controller.js/empactions.js";

const router = Router();

router.route("/createtask").post(verifyAdmin, createTask);
router.route("/gettask/:employeeId").get(verifyEmp, getEmployeeTasks);
router.route("/task/:taskId").get(verifyEmp, getTaskById);

router.route("/task/:taskId/accept").put(verifyEmp, acceptTask);
router.route("/task/:taskId/reject").put(verifyEmp, rejectTask);
router.route("/task/:taskId/complete").put(verifyEmp, completeTask);
router.route("/task/:taskId/fail").put(verifyEmp, failTask);


// admin get Task
 router.route("/task").get(verifyAdmin,getTasksByAdmin)

export default router;
