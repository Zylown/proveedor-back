import { z } from 'zod';

export const ListProveedorQueryDto = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  estado: z.enum(['activo', 'inactivo']).optional(),
  categoriaId: z.coerce.number().int().positive().optional(),
  sortBy: z
    .enum(['razon_social', 'fecha_creacion', 'calificacion_promedio'])
    .default('fecha_creacion'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type ListProveedorQueryDtoType = z.infer<typeof ListProveedorQueryDto>;

//GET /proveedor?page=1&limit=20&search=concremix&estado=activo&sortBy=razon_social&order=asc
