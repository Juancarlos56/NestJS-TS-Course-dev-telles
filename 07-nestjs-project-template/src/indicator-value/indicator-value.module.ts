import { Module } from '@nestjs/common';
import { IndicatorValueService } from './indicator-value.service';
import { IndicatorValueController } from './indicator-value.controller';

@Module({
  controllers: [IndicatorValueController],
  providers: [IndicatorValueService],
})
export class IndicatorValueModule {}
