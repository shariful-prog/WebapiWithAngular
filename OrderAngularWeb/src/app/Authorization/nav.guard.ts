import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// this Navguard will protect application from visiting by unathorized request
//this will varify by jwtToken
export class NavGuard implements CanActivate {
  
  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    

    if (localStorage.getItem('jwtToken') != null){
      return true;
    }
  
    else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
