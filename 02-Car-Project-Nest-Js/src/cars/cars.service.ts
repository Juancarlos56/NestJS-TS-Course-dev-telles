import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid} from 'uuid'
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';
@Injectable()
export class CarsService {
    private cars:Car[] = [
        {
            id:uuid(),
            brand:'Toyata', 
            model: 'Corolla'
        },
        {
            id:uuid(),
            brand:'Honda', 
            model: 'Civic'
        },
        {
            id:uuid(),
            brand:'Jeep', 
            model: 'Cherokee'
        }
    ];

    findAll(){
        return this.cars;
    }

    findOneById(id:string){
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
        return car
    }

    create(createCarDTO: CreateCarDTO){
        // const carNew:Car = {
        //     id:uuid(),
        //     brand:createCarDTO.brand, 
        //     model: createCarDTO.model
        // } 
        const carNew:Car = {
            id: uuid(),
            ...createCarDTO
        }
        this.cars.push(carNew)
        return carNew;
    }

    update(id: string, updateCarDTO: UpdateCarDTO){
        let carDB  = this.findOneById(id);
        
        if (updateCarDTO.id && updateCarDTO.id !== id) throw new BadRequestException(`Car id is not valid inside body`)
        
        this.cars = this.cars.map(car =>{
            if (car.id === id) {
                carDB = {  ...carDB,  ...updateCarDTO, id,}
                return carDB;
            }
            return car;
        });
        return carDB;
    }

    delete(id: string){
        const carDB  = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== carDB.id);
    }

    fillCarsWithSeedData(cars: Car[]){
        this.cars = cars;
    }
}
