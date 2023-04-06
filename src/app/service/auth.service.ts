import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedin=false;
  private baseUrl:string="https://localhost:7039/api/User/";
  private userPayload : any ;
  constructor(private http : HttpClient , private router:Router) { 
    this.userPayload = this.decodeToken();
  }
      
    signUp( userObj :any ){
       return this.http.post<any>(`${this.baseUrl}register`,userObj)
    }

    login( loginObj :any){
      return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
      
    }
    signOut(){
      localStorage.clear();
      this.router.navigate(['/product'])
    }

    storeRefreshToken(tokenValue : string){
      localStorage.setItem(`refreshToken`,tokenValue)
    }

     storeToken(tokenValue : string){
      localStorage.setItem('token',tokenValue)  //setting the token
     }
      getToken(){
       return localStorage.getItem('token')   //getting the token.
      }

      getRefreshToken(){
        return localStorage.getItem('refreshToken')   //getting the refreshed token.
       }

      isLoggedIn(): boolean{
         return !! localStorage.getItem('token');
      }
      decodeToken(){
        const jwtHelper = new JwtHelperService();
        const token = this.getToken()!;
        console.log(jwtHelper.decodeToken(token))
        return jwtHelper.decodeToken(token)  //  will sent payloaded data.
      }

      getfullNameFromToken(){
       if(this.userPayload)
        return this.userPayload.name;
      }

      getRoleFromToken(){
        if(this.userPayload)
        return this.userPayload.role;
      }

      renewToken(tokenApi : TokenApiModel){
        return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
      }
      getIsloggedIn():boolean{
        return this.isLoggedin;
      }
  }
  