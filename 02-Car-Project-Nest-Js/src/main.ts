import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Esto solo deja la data que estoy esperando, si esta demas borra data que no esta en el modelo
      forbidNonWhitelisted: true,//Esto me devuelve el error de que ese atributo no existe dentro de dto 
    })
  )
  await app.listen(3000);
}
bootstrap();
