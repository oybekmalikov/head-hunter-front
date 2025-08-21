// import { z } from 'zod';

// export const signInSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// export const signUpSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string(),
//   role: z.enum(['employer', 'jobseeker']),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// export const jobSchema = z.object({
//   title: z.string().min(1, 'Job title is required'),
//   company: z.string().min(1, 'Company name is required'),
//   location: z.string().min(1, 'Location is required'),
//   description: z.string().min(10, 'Description must be at least 10 characters'),
//   requirements: z.array(z.string()).min(1, 'At least one requirement is needed'),
//   salary: z.object({
//     min: z.number().min(0, 'Minimum salary must be positive'),
//     max: z.number().min(0, 'Maximum salary must be positive'),
//     currency: z.string().min(1, 'Currency is required'),
//   }),
//   type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
// });

// export const resumeSchema = z.object({
//   title: z.string().min(1, 'Resume title is required'),
//   summary: z.string().min(10, 'Summary must be at least 10 characters'),
//   skills: z.array(z.string()).min(1, 'At least one skill is required'),
//   experience: z.array(z.object({
//     company: z.string(),
//     position: z.string(),
//     startDate: z.date(),
//     endDate: z.date().optional(),
//     description: z.string(),
//   })),
//   education: z.array(z.object({
//     institution: z.string(),
//     degree: z.string(),
//     field: z.string(),
//     startDate: z.date(),
//     endDate: z.date().optional(),
//   })),
// });
