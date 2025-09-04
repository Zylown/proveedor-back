import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres',
    })
    .max(32, {
      message: 'La contraseña debe tener como máximo 32 caracteres',
    }),
});

export type LoginDto = z.infer<typeof LoginSchema>;
