import { z } from "zod";

export const JobSchema = z.object({
  title: z.string().min(2).max(30),
  companyName: z.string().min(2).max(35),
  url: z.string().url(),
  location: z.string().optional(),
  companyWebsite: z.string().url().optional(),
  deadline: z.coerce.date().optional(),
  remoteType: z.enum(["Remote", "Hybrid", "Onsite"]).default("Onsite"),
  priority: z.enum(["High", "Medium", "Low"]).optional(),
  // currentStage: z.string(), //TODO: default first stage from db
  description: z.string().max(500).optional(),
  labels: z.string().array().optional(),
})
