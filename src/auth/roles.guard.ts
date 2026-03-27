// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Récupère les rôles définis sur la route
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // Pas de rôle requis → route publique

    // Récupère l'utilisateur connecté
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    // Vérifie si le rôle de l'utilisateur correspond
    return requiredRoles.includes(user.role);
  }
}