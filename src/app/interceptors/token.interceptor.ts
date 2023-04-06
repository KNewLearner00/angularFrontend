import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private auth:AuthService , private toast: NgToastService , private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    const myToken =this.auth.getToken();  // modify this token in such a way that it can appended on header.

    if(myToken){
      request = request.clone({
        setHeaders : {Authorization:`Bearer ${myToken}`}  // this is how  String interpolation is in ES6. //"Bearer"+myToken.
      })    // modify the header and set the header.
    }
     
    return next.handle(request).pipe(
      catchError((err)=>{           //Handling Exceptions.
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
             //this.toast.warning({detail:"Warning" , summary:"Token is expired,Please Login Again"});
             //this.router.navigate(['login'])
             //handle
             return this.handleUnAuthorizedError(request,next);        
              }
        }
        return throwError(()=> new Error("Some other error occured")) // other error handled .
      })
    );   // handle the next pipeline to run.
  }
  handleUnAuthorizedError(req: HttpRequest<any> , next: HttpHandler){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel. accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel) =>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders : {Authorization :`Bearer ${data.accessToken}`}
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
            this.toast.warning({detail:"Warning" , summary:"Token is expired,Please Login Again"});
             this.router.navigate(['login'])
        })
      })
    )
  }
}
