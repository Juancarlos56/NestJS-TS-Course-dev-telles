import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTStrategy } from './strategies/jwt.strategie';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/auth.entity';
import { Role } from './entities/role.entity';
import { RoleUser } from './entities/role-user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([UserAuth, Role, RoleUser]),
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ ConfigModule],
      inject: [ ConfigService],
      useFactory: (configService: ConfigService)=>{
        return {
          secret:  configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'2h'
          }
        }
      }
    })
  ],
  exports: [TypeOrmModule, PassportModule, JwtModule, JWTStrategy]
})
export class AuthModule {}
