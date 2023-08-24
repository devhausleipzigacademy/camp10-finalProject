import { z } from "zod";

export const ColumnSchema = z.object({
  title: z.string().trim().min(2).max(30),
  positionInBoard: z.number().min(0).max(10),
  color: z.string().optional().default("#ffffff"),
  userId: z.string().startsWith("user_")
})
