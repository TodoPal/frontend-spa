import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs';
import { GuardService } from '../service/guard.service';

export const canActivate: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    return inject(GuardService).canActivate().pipe(
      tap(result => {
        if (!result) {
          router.navigate([ '' ]);
        }
      })
    );
  };
