import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  //   private users = [
  //     {
  //       id: 1,
  //       email: 'admin@example.com',
  //       name: 'Admin',
  //       // bcrypt hash de: admin1234
  //       password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
  //     },
  //   ];

  private users: Array<{
    id: number;
    email: string;
    name: string;
    password: string; // hash
  }> = [];

  async onModuleInit() {
    const password = 'admin1234';
    const hash = await bcrypt.hash(password, 10);

    this.users.push({
      id: 1,
      email: 'admin@example.com',
      name: 'Admin',
      password: hash,
    });

    console.log('✅ Usuario cargado automáticamente con hash:', hash);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
