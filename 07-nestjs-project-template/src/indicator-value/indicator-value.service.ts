import { Injectable } from '@nestjs/common';
import { CreateIndicatorValueDto } from './dto/create-indicator-value.dto';
import { UpdateIndicatorValueDto } from './dto/update-indicator-value.dto';

@Injectable()
export class IndicatorValueService {
  create(createIndicatorValueDto: CreateIndicatorValueDto) {
    return 'This action adds a new indicatorValue';
  }

  findAll() {
    return `This action returns all indicatorValue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} indicatorValue`;
  }

  update(id: number, updateIndicatorValueDto: UpdateIndicatorValueDto) {
    return `This action updates a #${id} indicatorValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} indicatorValue`;
  }
}
