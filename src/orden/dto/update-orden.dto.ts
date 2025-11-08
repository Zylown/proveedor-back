import { z } from 'zod';
import { CreateOrdenDto } from './create-orden.dto';

export const UpdateOrdenDto = CreateOrdenDto.partial();

export type UpdateOrdenDtoType = z.infer<typeof UpdateOrdenDto>;
