import { z } from 'zod';

export const TagSchema = z.array(
    z.object({
        tagId: z.string().uuid(),
        jobId: z.string().uuid(),
    })
);
