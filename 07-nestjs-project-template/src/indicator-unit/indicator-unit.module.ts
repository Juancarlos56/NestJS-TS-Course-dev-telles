import { Module } from '@nestjs/common';
import { IndicatorUnitService } from './indicator-unit.service';
import { IndicatorUnitController } from './indicator-unit.controller';

@Module({
  controllers: [IndicatorUnitController],
  providers: [IndicatorUnitService],
})
export class IndicatorUnitModule {}
