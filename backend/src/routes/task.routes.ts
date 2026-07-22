import { Router } from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} from "../controllers/task.controller";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { taskSchema } from "../validators/task.validator";

const router = Router();

//Dashbor Status
router.get(
  "/stats",
  authenticate,
  getTaskStats
);

//Get All Task
router.get(
  "/",
  authenticate,
  getTasks
);

//Get Single Task
router.get(
  "/:id",
  authenticate,
  getTaskById
);

//Create Task
router.post(
  "/",
  authenticate,
  validate(taskSchema),
  createTask
);

//Update Task
router.put(
  "/:id",
  authenticate,
  validate(taskSchema),
  updateTask
);

//Delete Task
router.delete(
  "/:id",
  authenticate,
  deleteTask
);

export default router;