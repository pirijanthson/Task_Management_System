import { Request, Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { Priority, Status } from "@prisma/client";

// CREATE TASK
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        dueDate: new Date(dueDate),
        userId: req.userId!,
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Create task failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// GET ALL TASKS
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { search, status, priority, sort } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId,

        title: search
          ? {
              contains: String(search),
              mode: "insensitive",
            }
          : undefined,

        status: status ? (String(status) as Status) : undefined,

        priority: priority ? (String(priority) as Priority) : undefined,
      },

      orderBy:
        sort === "oldest"
          ? { createdAt: "asc" }
          : sort === "dueDate"
            ? { dueDate: "asc" }
            : { createdAt: "desc" },
    });

    return res.json(tasks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Get tasks failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// GET TASK BY ID
export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.json(task);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// UPDATE TASK
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const { title, description, priority, status, dueDate } = req.body;

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    return res.json(task);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Update failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// DELETE TASK
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Delete failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// DASHBOARD STATS
export const getTaskStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const [
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
    ] = await Promise.all([
      prisma.task.count({
        where: { userId },
      }),

      prisma.task.count({
        where: {
          userId,
          status: "PENDING",
        },
      }),

      prisma.task.count({
        where: {
          userId,
          status: "IN_PROGRESS",
        },
      }),

      prisma.task.count({
        where: {
          userId,
          status: "COMPLETED",
        },
      }),

      prisma.task.count({
        where: {
          userId,
          dueDate: {
            lt: new Date(),
          },
          status: {
            not: "COMPLETED",
          },
        },
      }),
    ]);

    return res.json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Stats failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};
