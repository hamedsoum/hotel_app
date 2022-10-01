import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentification/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HotleListGuard implements CanActivate {

  constructor(private router : Router, private authService : AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    let  enabledToConnect : boolean;

    enabledToConnect = this.authService.getEnableToConnecte();

    if (enabledToConnect == false) {
      this.router.navigateByUrl("auth/login")
       return false;
    }

    return true;
  }
  
}
