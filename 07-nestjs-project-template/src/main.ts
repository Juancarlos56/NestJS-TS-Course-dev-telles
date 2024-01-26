import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Strategic Indicators API Documentation')
    .setDescription("The 'Strategic Indicators' API documentation allows storing information on daily indicators from different areas of the UEPT")
    .setVersion('1.0')
    .setContact("Ing. Juan Barrera", "https://www.linkedin.com/in/juan-carlos-barrera-barrera-2b94331b0/", "barrerajuan930@gmail.com")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
