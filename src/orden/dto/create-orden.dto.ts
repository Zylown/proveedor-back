import { z } from 'zod';

export const CreateOrdenDto = z.object({
  numero_orden: z
    .string()
    .min(1, { message: 'El número de orden es obligatorio' })
    .max(20, { message: 'El número de orden no puede exceder 20 caracteres' }),

  // Recibimos string desde el frontend, lo convertimos a Date en el service
  fecha_emision: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha de emisión debe tener formato YYYY-MM-DD',
  }),

  fecha_entrega_esperada: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'La fecha de entrega esperada debe tener formato YYYY-MM-DD',
    })
    .optional(),

  monto_total: z.number().nonnegative().optional(),

  moneda: z.string().max(10).optional(),

  terminos_pago: z.string().max(100).optional(),

  estado: z
    .enum(['pendiente', 'completada', 'cancelada'])
    .optional()
    .default('pendiente'),

  id_proveedor: z
    .number()
    .refine((value) => value !== undefined, {
      message: 'El proveedor es obligatorio',
    })
    .int()
    .positive(),
});

export type CreateOrdenDtoType = z.infer<typeof CreateOrdenDto>;
