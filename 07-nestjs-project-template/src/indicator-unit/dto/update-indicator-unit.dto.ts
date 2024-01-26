import { PartialType } from '@nestjs/swagger';
import { CreateIndicatorUnitDto } from './create-indicator-unit.dto';

export class UpdateIndicatorUnitDto extends PartialType(CreateIndicatorUnitDto) {}
