import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndicatorValueService } from './indicator-value.service';
import { CreateIndicatorValueDto } from './dto/create-indicator-value.dto';
import { UpdateIndicatorValueDto } from './dto/update-indicator-value.dto';

@Controller('indicator-value')
export class IndicatorValueController {
  constructor(private readonly indicatorValueService: IndicatorValueService) {}

  @Post()
  create(@Body() createIndicatorValueDto: CreateIndicatorValueDto) {
    return this.indicatorValueService.create(createIndicatorValueDto);
  }

  @Get()
  findAll() {
    return this.indicatorValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indicatorValueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndicatorValueDto: UpdateIndicatorValueDto) {
    return this.indicatorValueService.update(+id, updateIndicatorValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indicatorValueService.remove(+id);
  }
}
