import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from './entities/auth.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { RoleUser } from './entities/role-user.entity';
import { Role } from './entities/role.entity';
import { RoleEnum } from './enum/role.enum';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserAuth)
    private readonly userRepository: Repository<UserAuth>,
    @InjectRepository(RoleUser)
    private readonly roleIfiRepository: Repository<RoleUser>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService
  ){

  }

  private getUserRole(){
    return this.roleRepository.findOneBy({id:RoleEnum.USER});
  }

  async create(createUserDto: CreateUserAuthDto) {
    const {password,...userDate} = createUserDto;
    const role = await this.getUserRole();
    if (!role) throw new InternalServerErrorException(`Role not found, contact administrator`);
    const existUser = await this.userRepository.findOneBy({username: userDate.username});
    if (existUser) throw new BadRequestException(`User with ussername:'${userDate.username}' already exists`);

    try {
      const user = this.userRepository.create({
        ...userDate, 
        password: bcrypt.hashSync(password, 10),
      })
      await this.userRepository.save(user);
      const roleIfi = this.roleIfiRepository.create({role, user });
      await this.roleIfiRepository.save(roleIfi);
      //not show password
      delete user.password;
      delete user.isActive;
      const token = this.getJwtToken({id: user.id});
      delete user.id;
      delete user.listRolesUser;

      return {
        ...user, 
        token
      };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(loginUserDto: LoginUserAuthDto){
    const {password, username} = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {username: username}, 
      select: {username: true, password: true, id: true}
    }) 
    if (!user) 
      throw new UnauthorizedException(`Credentials are not valid(username)`);
    if (!bcrypt.compareSync(password, user.password)) 
      throw new UnauthorizedException(`Credentials are not valid(password)`);
    
    const token = this.getJwtToken({id: user.id});
    //not show password and id
    delete user.password;
    delete user.isActive;
    delete user.id;
    delete user.listRolesUser
    return {
      ...user, 
      token
    };
  }

  async chechAuthStatus(user: UserAuth){
    const token = this.getJwtToken({id: user.id});
    delete user.id;
    delete user.password;
    delete user.isActive;
    delete user.listRolesUser
    return {
      ...user, 
      token
    };
  }

  private handleDBError(error: any):never{
    if (error.code ==='23505' || error instanceof QueryFailedError && error.message.includes('ORA-00001')) {
      throw new BadRequestException(error.detail || `Duplicate key violation: ${error.message}. Remember that the union between username and ifi must be unique`);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs')    
  }

  private getJwtToken(payload: JWTPayload){
    return this.jwtService.sign(payload);
  }
  
}
