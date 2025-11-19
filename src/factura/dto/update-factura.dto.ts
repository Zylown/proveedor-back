import { z } from 'zod';
import { CreateFacturaDto } from './create-factura.dto';

export const UpdateFacturaDto = CreateFacturaDto.partial();
export type UpdateFacturaDtoType = z.infer<typeof UpdateFacturaDto>;
