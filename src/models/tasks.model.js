import mongoose, {Schema} from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
    },
    dept: {
      type: String,
      required: true,
      maxlength: 50,
    },
    status: {
      active: {type: Boolean, default: false},
      newTask: {type: Boolean, default: true},
      completed: {type: Boolean, default: false},
      failed: {type: Boolean, default: false},
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {timestamps: true}
);

export const Task = mongoose.model("Task", TaskSchema);
