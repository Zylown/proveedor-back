import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSchema } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const result = LoginSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    console.log('auth.controller.ts:', result.data);
    // esto devuelve el resultado del login
    return this.authService.login(result.data);
  }
}
