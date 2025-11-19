import { z } from 'zod';
import { CreateEvaluacionDto } from './create-evaluacion.dto';

export const UpdateEvaluacionDto = CreateEvaluacionDto.partial();
export type UpdateEvaluacionDtoType = z.infer<typeof UpdateEvaluacionDto>;
