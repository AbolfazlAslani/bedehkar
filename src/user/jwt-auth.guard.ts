// src/auth/jwt-auth.guard.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom logic here before calling the canActivate method of the parent class
    // For example, you can check if the user has a specific role or any other custom condition

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // This method is called after the canActivate method
    if (err || !user) {
      // If there is an error or the user is not found, throw an UnauthorizedException
      throw new UnauthorizedException();
    }

    return user;
  }
}
