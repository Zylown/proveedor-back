import { z } from 'zod';

export const CreateEvaluacionDto = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  calidad: z.number().min(1).max(10).optional(),
  puntualidad: z.number().min(1).max(10).optional(),
  precio: z.number().nonnegative().optional(),
  servicio: z.string().max(100).optional(),
  observaciones: z.string().max(255).optional(),

  id_proveedor: z.number().int().positive(),
});

export type CreateEvaluacionDtoType = z.infer<typeof CreateEvaluacionDto>;
