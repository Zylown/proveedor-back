import { z } from 'zod';

export const CreateProveedorDto = z.object({
  ruc: z
    .string()
    .min(11, { message: 'El RUC debe tener al menos 11 caracteres' })
    .max(15, { message: 'El RUC debe tener como máximo 15 caracteres' }),
  razon_social: z
    .string()
    .min(3, { message: 'La razón social debe tener al menos 3 caracteres' })
    .max(150, {
      message: 'La razón social no puede tener más de 150 caracteres',
    }),

  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email({ message: 'Debe ser un correo válido' }).optional(),
  contacto_principal: z.string().optional(),
  calificacion_promedio: z.number().optional(),
  estado: z.string().optional(),
  id_categoria: z.number().optional(),
});

export type CreateProveedorDtoType = z.infer<typeof CreateProveedorDto>;