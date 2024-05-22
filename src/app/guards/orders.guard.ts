import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ordersGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // return true --> Load route
      // return false --> Do not load route

      let token = sessionStorage.getItem('token');

      if (token) {
        return true;
      } else {
        this.router.navigate(['orders']);
        return false;
      }

    return true; // Returns true if route must be activated, else returns false

    }

}