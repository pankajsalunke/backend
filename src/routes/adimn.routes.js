import {Router} from "express";

import {
  adminLogin,
  adminLogout,
  getAdminProfile,
} from "../controller/admin.controller.js/adminRegistration.js";
import {verifyAdmin} from "../middleware/checkAdmin.js";

const router = Router();

router.route("/login").post(adminLogin);

router.route("/admin-profile").get(verifyAdmin, getAdminProfile);

router.route("/logout").get(verifyAdmin, adminLogout );

export default router;
