import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
console.log('JWT_SECRET:', process.env.JWT_SECRET); // 👈 DEBUG SOLO EN DESARROLLO

bootstrap();
