import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/rol.enum';

// ROLES_KEY es la clave que se utiliza para almacenar el rol en los metadatos de la ruta.
export const ROLES_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
