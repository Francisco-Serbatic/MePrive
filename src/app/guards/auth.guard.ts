import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // return true --> Cargamos la ruta
      // return false --> No cargamos la ruta

      let token = sessionStorage.getItem('token');

      if (token) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }

    return true; // Devuelve true si la ruta debe ser activada, o false si no

    }

}
  


