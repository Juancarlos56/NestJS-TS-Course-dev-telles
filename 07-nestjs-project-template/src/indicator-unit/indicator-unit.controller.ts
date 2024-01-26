import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndicatorUnitService } from './indicator-unit.service';
import { CreateIndicatorUnitDto } from './dto/create-indicator-unit.dto';
import { UpdateIndicatorUnitDto } from './dto/update-indicator-unit.dto';

@Controller('indicator-unit')
export class IndicatorUnitController {
  constructor(private readonly indicatorUnitService: IndicatorUnitService) {}

  @Post()
  create(@Body() createIndicatorUnitDto: CreateIndicatorUnitDto) {
    return this.indicatorUnitService.create(createIndicatorUnitDto);
  }

  @Get()
  findAll() {
    return this.indicatorUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indicatorUnitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndicatorUnitDto: UpdateIndicatorUnitDto) {
    return this.indicatorUnitService.update(+id, updateIndicatorUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indicatorUnitService.remove(+id);
  }
}
