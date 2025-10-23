import { LoginDto } from './dto/login.dto';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService, // esto sirve para inyectar el servicio de usuarios y poder usar sus métodos
    private jwtService: JwtService,
  ) {}

  async login(LoginDto: LoginDto) {
    const user = await this.UsersService.findByEmail(LoginDto.email); // esto es para buscar el usuario por email

    console.log('auth.service.ts - user:', user);
    if (!user) {
      // en caso de que no exista el usuario
      throw new UnauthorizedException('Credenciales inválidas'); // lanza una excepción de credenciales inválidas
    }

    const isPasswordValid = await bcrypt.compare(
      LoginDto.password,
      user.password,
    );

    // acá se valida la contraseña usando el servicio de usuarios
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // el payload es la información que se va a guardar en el token de acceso
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload); // se firma el token de acceso con el payload

    console.log('auth.service.ts:', { user, token });
    return {
      access_token: token, // se retorna el token de acceso
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
