import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';

const app = express();

app.use(cors());

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
// app.use(express.
app.use(cookieParser());
app.use(express.static(path.resolve("public")));
// app.use(express.static("public"));
app.get('*', (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

// import routes
import RegisterRouter from "./src/routes/register.routes.js";
import taskrouter from "./src/routes/task.routes.js";
import emprouter from "./src/routes/employee/employee.routes.js";
import adminrouter from "./src/routes/adimn.routes.js";

// routes

app.use("/api/v1/register", RegisterRouter);
app.use("/api/v1/task", taskrouter);
app.use("/api/v1/employee", emprouter);
app.use("/api/v1/admin", adminrouter);

export {app};
