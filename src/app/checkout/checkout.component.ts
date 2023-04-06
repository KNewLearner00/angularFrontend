import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { order } from '../data-type';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public grandTotal! :number;
  public products : any=[];
  
  orderMsg:string|undefined;
  constructor( private cartService : CartService,private router:Router){}
  ngOnInit(): void{
    this.cartService.getProducts()
    .subscribe(res =>{
      this.products = res;
     this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  orderNow(data:{email:string,address:string,contact:string,city:string,state:string,zip:string}){
      console.warn(data);
      let user = localStorage.getItem('user');
      let userId=user&& JSON.parse(user).id;

      if(this.grandTotal){
        let orderData:order={
        ...data,
        grandTotal:this.grandTotal,
        userId
        }
       this.orderMsg="Your Order Has Been Placed"
      //  alert('Order Placed...!')
        setTimeout(()=>{
          this.router.navigate(['/product'])
          this.orderMsg=undefined
        },4000);  //4 sec later it will rediresct To HomePage.
      }
      this.cartService.deleteCartItems();
  }
}
