import { PartialType } from '@nestjs/swagger';
import { CreateIndicatorValueDto } from './create-indicator-value.dto';

export class UpdateIndicatorValueDto extends PartialType(CreateIndicatorValueDto) {}
