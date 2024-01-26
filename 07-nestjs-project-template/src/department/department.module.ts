import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Department } from './entities/department.entity';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports:[
    TypeOrmModule.forFeature([Department]),
    AuthModule
  ],
  exports:[
    DepartmentService
  ]
})
export class DepartmentModule {}
