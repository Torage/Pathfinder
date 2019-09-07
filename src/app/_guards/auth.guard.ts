﻿import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.isAuthenticated = false;
  }
  getAuth(): Observable<boolean> {
    return this.http.get<boolean>('https://vps723941.ovh.net:9090/user/validate', { observe: 'response' })
      .pipe(map(response => {
        if (response) {
          console.log(response);
          this.isAuthenticated = response.body;
          console.log('isauthenticated: ', this.isAuthenticated);
          return response.body;
        }
        return null;
      }));
  }
  canActivate() {
    console.log('trying to auth');
    const auth: Observable<boolean> = this.getAuth();
    auth.forEach(res => {
      console.log(res);
      res ? this.router.navigate(['']) : this.router.navigate(['login']);
    });
    // if (this.authenticationService.isAuthenticated()) {
    //   if (this.isAuthenticated) {
    //     console.log(this.isAuthenticated);
    //     this.router.navigate(['']);
    //   } else {
    //     console.log(this.isAuthenticated);
    //   }
    //   return false;
    // }
    return true;
  }
}
//