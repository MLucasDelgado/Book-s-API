import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from '../types/request-with-user.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@/common/enums/rol.enum';

@Injectable()
// canActivate es el método que se ejecuta para determinar si el usuario tiene acceso a la ruta.
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay roles definidos, acceso libre
    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    // Seguridad básica
    if (!user) return false;

    // ADMIN puede todo
    if (user.role === Role.ADMIN) return true;

    // USER u otros roles
    return roles.includes(user.role);
  }
}
