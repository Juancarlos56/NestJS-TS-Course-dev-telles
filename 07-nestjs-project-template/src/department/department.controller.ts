import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ValidRoles } from 'src/auth/enum/valid-roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Department } from './entities/department.entity';

@ApiTags('Jefatura')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({description: "intance of Deparment", type: Department})
  @ApiBadRequestResponse({description: 'Data is incorrect, please check server logs'})
  @ApiInternalServerErrorResponse({description: 'Data sent appears to be incorrect, check server logs encryption'})
  @ApiUnauthorizedResponse({description:"Unauthorized: Access to the requested resource is not allowed. Please ensure valid authentication credentials."})
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description:"Unauthorized: Access to the requested resource is not allowed. Please ensure valid authentication credentials."})
  @ApiResponse({status:403, description:'Forbidden - Token related.'})
  @ApiOkResponse({description: "list of all deparments", type: [Department]})
  @ApiNotFoundResponse({description:'Not Found'})
  @ApiBadRequestResponse({description: 'Bad Request, check data'})
  @ApiInternalServerErrorResponse({description: 'Data sent appears to be incorrect, check server logs'})
  findAll(@Query() paginationDto:PaginationDto) {
    return this.departmentService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Auth(ValidRoles.user)
  @ApiUnauthorizedResponse({description:"Unauthorized: Access to the requested resource is not allowed. Please ensure valid authentication credentials."})
  @ApiResponse({status:403, description:'Forbidden - Token related.'})
  @ApiOkResponse({description: "instance of Department", type: Department})
  @ApiNotFoundResponse({description:'Not Found'})
  @ApiBadRequestResponse({description: 'Bad Request, check data'})
  @ApiInternalServerErrorResponse({description: 'Data sent appears to be incorrect, check server logs'})
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description:"Unauthorized: Access to the requested resource is not allowed. Please ensure valid authentication credentials."})
  @ApiBadRequestResponse({description: 'Bad Request, check data'})
  @ApiOkResponse({description: "instance of Department", type: Department})
  @ApiNotFoundResponse({description:'Not Found'})
  @ApiBadRequestResponse({description: 'Bad Request, check data'})
  @ApiInternalServerErrorResponse({description: 'Data sent appears to be incorrect, check server logs'})
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description:"Unauthorized: Access to the requested resource is not allowed. Please ensure valid authentication credentials."})
  @ApiBadRequestResponse({description: 'Bad Request, check data'})
  @ApiOkResponse({description: "instance of Department", type: Department})
  @ApiNotFoundResponse({description:'Not Found'})
  @ApiBadRequestResponse({description: 'Bad Request, check data'})
  @ApiInternalServerErrorResponse({description: 'Data sent appears to be incorrect, check server logs'})
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
