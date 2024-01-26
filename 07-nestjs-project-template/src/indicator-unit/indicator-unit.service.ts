import { Injectable } from '@nestjs/common';
import { CreateIndicatorUnitDto } from './dto/create-indicator-unit.dto';
import { UpdateIndicatorUnitDto } from './dto/update-indicator-unit.dto';

@Injectable()
export class IndicatorUnitService {
  create(createIndicatorUnitDto: CreateIndicatorUnitDto) {
    return 'This action adds a new indicatorUnit';
  }

  findAll() {
    return `This action returns all indicatorUnit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} indicatorUnit`;
  }

  update(id: number, updateIndicatorUnitDto: UpdateIndicatorUnitDto) {
    return `This action updates a #${id} indicatorUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} indicatorUnit`;
  }
}
