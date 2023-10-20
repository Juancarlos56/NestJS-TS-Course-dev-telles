import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

    constructor(private readonly carService: CarsService){}
    
    @Get()
    getAllCars(){
        return this.carService.findAll();
    }

    @Get(':id')
    getCarByID(@Param('id', ParseUUIDPipe) id:string){
        const car = this.carService.findOneById(id)
        return {car};
    }

    @Post()
    create(@Body() createCarDTO:CreateCarDTO){
        return this.carService.create(createCarDTO)
    }

    @Put(':id')
    put(@Param('id', ParseUUIDPipe) id:string, @Body() body:any){
        return {body}
    }

    @Patch(':id')
    patch(@Param('id', ParseUUIDPipe) id:string, @Body() updateCarDTO:UpdateCarDTO){
        return this.carService.update(id, updateCarDTO);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id:string){
        return this.carService.delete(id);
    }
}
