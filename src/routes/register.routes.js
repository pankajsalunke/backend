import {Router} from "express";

import {userRegister} from "../controller/employee.controller.js/registration.controller.js";
import {adminRegistration} from "../controller/admin.controller.js/adminRegistration.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/admin").post(adminRegistration);

export default router;
 