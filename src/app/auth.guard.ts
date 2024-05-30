import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService)
  
  if(!auth.isLoggedIn()){
      router.navigate(['']);
      return false;
  }
  return true;
  
};