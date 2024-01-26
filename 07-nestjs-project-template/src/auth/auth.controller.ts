import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserAuth } from './entities/auth.entity';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({description: "Instance of User", type: UserAuth})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiNotFoundResponse({description:'Not Found'})
  create(@Body() createUserDto: CreateUserAuthDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiCreatedResponse({description: "Instance of User", type: UserAuth})
  @ApiUnauthorizedResponse({description:"Unauthorized: Access to the requested resource is not allowed. Please ensure valid authentication credentials."})
  loginUser(@Body() loginUserDto: LoginUserAuthDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiBearerAuth()
  @ApiOkResponse({description: "Ok", type: UserAuth})
  @ApiResponse({status:403, description:'Forbidden - Token related.'})
  @ApiUnauthorizedResponse({description:"Unauthorized: Access to the requested resource is not allowed. Please ensure valid authentication credentials."})
  chechAuthStatus(
    @GetUser() user: UserAuth
  ) {
    return this.authService.chechAuthStatus(user);
  }
}
