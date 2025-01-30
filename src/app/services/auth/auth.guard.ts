import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const user_perfil: string = localStorage.getItem('user_perfil') || '';
  if (!user_perfil) {
    router.navigate(['/login']).then();
    return false;
  }
  if (route.data['perfis'] && !route.data['perfis'].includes(user_perfil)) {
    router.navigate(['/home']).then();
    return false;
  }
  return true;
};


