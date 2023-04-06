import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public products : any=[];
  public grandTotal! :number;
  quantity: number = 0;
 constructor( private cartService : CartService,private auth: AuthService,private router:Router) { }

 ngOnInit(): void{
   this.cartService.getProducts()
   .subscribe(res =>{
    this.products = res;
    this.grandTotal = this.cartService.getTotalPrice();
   })
 }
 getrquanty(){
  return this.quantity++;
 }
 removeItem(item:any){
  this.cartService.removeCartItem(item);
 }
 emptycart(){
  this.cartService.removeAllCart();
 }

 checkout(){
  this.router.navigate(['/checkout'])
 }
 
}
