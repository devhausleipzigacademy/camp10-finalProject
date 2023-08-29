import { z } from 'zod';

export const JobSchema = z.object({
    title: z.string().min(2).max(30),
    companyName: z.string().min(2).max(35),
    url: z.string().url(),
    location: z.string().optional(),
    companyWebsite: z.string().optional(),
    deadline: z.coerce.date().optional().refine((val) => {
      if (!val) return true
      return new Date(val) > new Date()
    }, {
        message: 'Deadline must be in the future.',
    }),
    remoteType: z.enum(['Remote', 'Hybrid', 'Onsite']).default('Onsite'),
    priority: z.enum(['High', 'Medium', 'Low']).optional(),
    currentStage: z.string().optional(),
    description: z.string().max(500).optional(),
    labels: z.string().array().optional(),
});

export const JobSchemaAPI = JobSchema.omit({ currentStage: true }).extend({
    columnId: z.string().uuid(),
    positionInColumn: z.number().int().positive(),
});
