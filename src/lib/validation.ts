import { z } from "zod";

export const projectTypeValues = [
  "Website",
  "Web Application",
  "AI-Powered Solution",
  "Digital Experience",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address.")
    .max(160, "That email is too long."),
  company: z
    .string()
    .trim()
    .max(160, "That company name is too long.")
    .optional()
    .or(z.literal("")),
  projectType: z.enum(projectTypeValues, {
    message: "Choose a project type.",
  }),
  budget: z
    .string()
    .trim()
    .max(80, "That budget note is too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters.")
    .max(4000, "That message is too long."),
  // Honeypot: must stay empty. Real users never see or fill this field.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
