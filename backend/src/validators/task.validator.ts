import { z } from "zod";


export const taskSchema = z.object({

    title: z
        .string()
        .min(1, "Title is required"),


    description: z
        .string()
        .optional(),


    priority: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH"
    ]),


    status: z.enum([
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED"
    ]),


    dueDate:z.string()
        .refine(
            (date)=> new Date(date) >= new Date(),
            {
                message:"Due date cannot be in the past"
            }
        )

});