import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  //Exponer servicio para que se pueda utilizar desde cualquier servicio
  exports: [CarsService]
})
export class CarsModule {}
