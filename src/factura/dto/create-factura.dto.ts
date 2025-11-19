import { z } from 'zod';

export const CreateFacturaDto = z.object({
  numero_factura: z
    .string()
    .min(3, {
      message: 'El número de factura debe tener al menos 3 caracteres',
    })
    .max(30)
    .optional(),

  monto_total: z.number().nonnegative().optional(),

  moneda: z.string().max(10).optional(), // en DB tienes default 'PEN'

  fecha_emision: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha de emisión debe tener formato YYYY-MM-DD',
  }),

  fecha_vencimiento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),

  igv: z.number().nonnegative().optional(),

  estado: z
    .enum(['pagada', 'pendiente', 'vencida'])
    .optional()
    .default('pendiente'),

  id_proveedor: z
    .number()
    .refine((value) => value !== undefined, {
      message: 'El proveedor es obligatorio',
    })
    .int()
    .positive(),

  id_orden: z.number().int().positive().optional(), // si quieres asociarla a una orden
});

export type CreateFacturaDtoType = z.infer<typeof CreateFacturaDto>;
