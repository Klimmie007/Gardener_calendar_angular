import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: BackendService, private router: Router){}
  canActivate(): boolean {
    if(this.authService.loggedIn())
    {
      console.log("co")
      return true;
    }
    else
    {
      this.router.navigate(['/login'])
      return false;
    }
  }
  
}
