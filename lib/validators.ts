import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export const organizationSchema = z.object({
  name: z.string().min(2)
});

export const projectSchema = z.object({
  organizationId: z.string().min(1),
  category: z.string().min(1),
  planId: z.string().min(1),
  title: z.string().min(2)
});

export const ticketSchema = z.object({
  projectId: z.string().min(1),
  subject: z.string().min(3),
  priority: z.enum(["BAIXA", "MEDIA", "ALTA"]).optional()
});
