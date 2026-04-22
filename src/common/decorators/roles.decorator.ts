import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// there may be multiple roles for a route handler, so we use rest parameters to accept any number of roles and set them as metadata using SetMetadata function.