import { z } from "zod";

export const postRequestBodySchema = z.object({
  id: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1),
      parts: z.array(z.any()).optional(), 
    }),
  ),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
