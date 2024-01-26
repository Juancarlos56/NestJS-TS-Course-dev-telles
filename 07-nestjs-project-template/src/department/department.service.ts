import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { StateDeparmentEnum } from './enums/state-deparment.enum';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department) private readonly deparmentRepository: Repository<Department>,
   ){
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const newDeparment = this.deparmentRepository.create({...createDepartmentDto});
      await this.deparmentRepository.save(newDeparment);
      delete newDeparment.updatedAt;
      delete newDeparment.deletedAt;
      delete newDeparment.createdAt;
      return {...newDeparment}
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit = 10, offset =0} = paginationDto;
    return await this.deparmentRepository.find({take: limit, skip: offset, where: {
      isActive: StateDeparmentEnum.ACTIVE
    }});
  }

  findOne(id: number) {
    const deparment = this.deparmentRepository.findOneBy({id, isActive: StateDeparmentEnum.ACTIVE});
    if (!deparment) throw new NotFoundException(`deparment with id: '${id}' not exists`);
    return deparment;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const deparment = await this.deparmentRepository.preload({
      id, ...updateDepartmentDto
    });
    if (!deparment) throw new NotFoundException(`deparment with id: '${id}' not exists`);
    try {
      const updateDeparment = await this.deparmentRepository.save(deparment);
      delete updateDeparment.updatedAt;
      delete updateDeparment.deletedAt;
      delete updateDeparment.createdAt;
      return {...updateDeparment}
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const deparment = await this.findOne(id);
    deparment.isActive = StateDeparmentEnum.INACTIVE;
    const deparmentUpdate = await this.deparmentRepository.preload({
      id, ...deparment
    });
    try {
      const deleteDeparment = await this.deparmentRepository.save(deparmentUpdate);
      delete deleteDeparment.updatedAt;
      delete deleteDeparment.deletedAt;
      delete deleteDeparment.createdAt;
      return {...deleteDeparment}
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any):never{
    if (error.code ==='23505' || error instanceof QueryFailedError && error.message.includes('ORA-00001')) {
      throw new BadRequestException(error.detail || `Duplicate key violation: ${error.message}. `);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs')    
  }
}
