import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { IndicatorUnitModule } from './indicator-unit/indicator-unit.module';
import { IndicatorValueModule } from './indicator-value/indicator-value.module';
import { IndicatorModule } from './indicator/indicator.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', //modify only env is dev or prod -- FOR POSTGRESQL you must COMMENT  connectString
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password:  process.env.DB_PASSWORD,
      autoLoadEntities: true, //charge entities 
      synchronize: true // (true) NOT USE IN PRODUCTION -- DELETE COLUMNS ON ENTITY -- SYNC ON DATABASE 
    }),
    CommonModule,
    AuthModule,
    IndicatorModule,
    IndicatorUnitModule,
    IndicatorValueModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
