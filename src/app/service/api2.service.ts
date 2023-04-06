import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Api2Service {

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<any>("https://fakestoreapi.com/products")
    .pipe(map((res: any)=>{    //Inside the map we have to take the request and that response we have to Return.
       return res;
    }))
  }
}
