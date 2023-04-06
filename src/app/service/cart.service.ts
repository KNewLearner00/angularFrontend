import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { order } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[];

  public search = new BehaviorSubject<string>("");  //act as a Observable as well as Amit.
  public productList = new BehaviorSubject<any>([]); // Act as a borier we can amid  also pass the value data [act as observable anyone can subscriber whatever data been amedded].
  constructor() { }
  getProducts(){
    return this.productList.asObservable(); // get the data whatever present inside this.
  }
  setProduct(product : any){
    this.cartItemList.push(...product) ; // push whatever data comming inside this.
    this.productList.next(this.productList) ; //data get pass whenever it get subscribed. 
  }

  addtoCart(product: any)
  {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList); //passing the cartItems whenever it get subscribing.
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice(): number{
   let grandTotal=0;
   this.cartItemList.map((a:any)=>{
    grandTotal += a.total;
   })
   return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id===a.id){
        this.cartItemList.splice(index,1); //remove one item from the cart.
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){   
  this.cartItemList=[]
  this.productList.next(this.cartItemList);
  }  
  orderNow(data:order){
    //return this.http.post('https://localhost:7039/api/Order',data)
  }
    deleteCartItems(){
      this.cartItemList=[]
      this.productList.next(this.cartItemList);
    }
  }

