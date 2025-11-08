import { z } from 'zod';
import { CreateProveedorDto } from './create-proveedor.dto';

export const UpdateProveedorDto = CreateProveedorDto.partial();

export type UpdateProveedorDtoType = z.infer<typeof UpdateProveedorDto>;
