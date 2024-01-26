import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { UserAuth } from '../entities/auth.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(private readonly reflector: Reflector){
    
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());
    if (!validRoles) return true;
    if (validRoles.length === 0) return true; 

    const req = context.switchToHttp().getRequest();
    const user = req.user as UserAuth;
    if (!user) {
      throw new BadRequestException('User not found');
    }
    
    for (const role of user.listRolesUser) {
      if (validRoles.includes(role.role.rolName)) {
        return true;
      }
    }
    
    throw new ForbiddenException(`User ${user.username} need a valid role: [${validRoles}]`);
  }
}