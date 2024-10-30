import { z } from 'zod';

export const zodCommentSchema = z.object({
    content: z.string().min(1),
    onModel: z.string().min(3),
    commentableId: z.string().min(10),
});