import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

//Interceptor service to set header with bearer token from local storage
// without this token api would give unauthorized error
@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('jwtToken') != null) {
      const clonedReq = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'))
      });
      return next.handle(clonedReq).pipe(
          tap(
              succ => { },
              err => {
                  if (err.status == 401){
                      localStorage.removeItem('jwtToken');
                      this.router.navigateByUrl('');
                  }
              }
          )
      )
  }
  else
      return next.handle(request.clone());
  }
}
