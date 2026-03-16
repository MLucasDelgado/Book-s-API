import { Role } from '../enums/rol.enum';

export type JwtPayload = {
  sub: string;
  // email: string;
  role: Role;
};
