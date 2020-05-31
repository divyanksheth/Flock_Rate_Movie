import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
  
  @Injectable()
  export class SessionGuard implements CanActivate {
    constructor(private dataService : DataService) {}
    private req_tkn;
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        if(this.dataService.session_ID != null){
            return true;
        } else {
            this.dataService.createReqToken().then(res => {
                this.req_tkn = res.request_token;
                let path = 'http://localhost:4405/help/';
                
                let url = 'https://www.themoviedb.org/authenticate/'.concat(this.req_tkn).concat('?redirect_to=')
                .concat(path);
    
                window.open(url,"_self");
                return true;
            });
    
        }
    }
  
    // canActivateChild(route: ActivatedRouteSnapshot,
    //                  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   return this.canActivate(route, state);
    // }
  }
  