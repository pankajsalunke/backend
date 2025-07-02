// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from 'path';

// const app = express();

// app.use(cors());

// app.use(express.json({limit: "16kb"}));
// app.use(express.urlencoded({extended: true, limit: "16kb"}));
// // app.use(express.
// app.use(cookieParser());
// app.use(express.static(path.resolve("public")));
// // app.use(express.static("public"));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve("dist", "index.html"));
// });

// // import routes
// import RegisterRouter from "./src/routes/register.routes.js";
// import taskrouter from "./src/routes/task.routes.js";
// import emprouter from "./src/routes/employee/employee.routes.js";
// import adminrouter from "./src/routes/adimn.routes.js";

// // routes

// app.use("/api/v1/register", RegisterRouter);
// app.use("/api/v1/task", taskrouter);
// app.use("/api/v1/employee", emprouter);
// app.use("/api/v1/admin", adminrouter);

// export {app};

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// API Routes
import RegisterRouter from "./src/routes/register.routes.js";
import taskrouter from "./src/routes/task.routes.js";
import emprouter from "./src/routes/employee/employee.routes.js";
import adminrouter from "./src/routes/adimn.routes.js";

app.use("/api/v1/register", RegisterRouter);
app.use("/api/v1/task", taskrouter);
app.use("/api/v1/employee", emprouter);
app.use("/api/v1/admin", adminrouter);

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

export { app };
