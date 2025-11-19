import { z } from 'zod';

export const CreateEntregaDto = z.object({
  numero_guia: z
    .string()
    .min(3, { message: 'El número de guía debe tener al menos 3 caracteres' })
    .max(30, { message: 'El número de guía no puede exceder 30 caracteres' })
    .optional(),

  fecha_entrega: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'La fecha de entrega debe tener formato YYYY-MM-DD',
    })
    .optional(),

  cantidad_recibida: z.number().int().nonnegative().optional(),

  observaciones: z.string().max(255).optional(),

  estado: z
    .enum(['pendiente', 'completada', 'retrasada', 'cancelada'])
    .optional()
    .default('pendiente'),

  id_orden: z
    .number()
    .refine(value => value !== undefined, { message: 'La orden asociada es obligatoria' })
    .int()
    .positive(),
});

export type CreateEntregaDtoType = z.infer<typeof CreateEntregaDto>;
