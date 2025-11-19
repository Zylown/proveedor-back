import { Controller, Get } from '@nestjs/common';
import { CategoriaProveedorService } from './categoria-proveedor.service';

@Controller('categoria-proveedor')
export class CategoriaProveedorController {
  constructor(private readonly service: CategoriaProveedorService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('select')
  async getForSelect() {
    return this.service.getForSelect();
  }
}
