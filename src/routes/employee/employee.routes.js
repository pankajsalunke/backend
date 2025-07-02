import {Router} from "express";
import {empLogin} from "../../controller/employee.controller.js/registration.controller.js";
import {
  empLogout,
  getEmployeeProfile,
  getEmployeeTasks,
} from "../../controller/employee.controller.js/employeedash.js";
import {verifyEmp} from "../../middleware/authorizedemp.js";

const router = Router();

router.route("/login").post(empLogin);

router.route("/emp-profile").get(verifyEmp, getEmployeeProfile);

router.route("/emp-logout").get(verifyEmp, empLogout);

// emp dashboard to get emp task
router.route("/gettask/:employeeId").get(verifyEmp, getEmployeeTasks);

export default router;
