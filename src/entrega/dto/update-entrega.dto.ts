import { z } from 'zod';
import { CreateEntregaDto } from './create-entrega.dto';

export const UpdateEntregaDto = CreateEntregaDto.partial();

export type UpdateEntregaDtoType = z.infer<typeof UpdateEntregaDto>;
