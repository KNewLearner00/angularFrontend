import { Component ,OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { Api2Service } from '../service/api2.service';
import { CartService } from '../service/cart.service';
import { UserStoreService } from '../service/user-store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public filterCategory : any;
  public productList : any; //store all the products comming throw api .
  searchKey:string=""; //send the value comming from that Observable  inside the searchKey.
   constructor(private api2 :Api2Service,private cartService : CartService,private userStore : UserStoreService) { }
   ngOnInit(): void{
    this.api2.getProducts()
    .subscribe(res=>{   //inside subscribe I Have Succes Response.
      this.productList = res;
       this.filterCategory =res;
      this.productList.forEach((a:any)=> {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price})
      });
      console.log(this.productList)
    });
    this.cartService.search.subscribe((val: any)=>{
      this.searchKey = val; //help us to serach particular term.
    })
   }
   addtocart(item:any){
    this.cartService.addtoCart(item);  
   }
   filter(category:string){
      this.filterCategory = this.productList //hold the filtered Valued ehich we are creating.
       .filter((a:any)=>{  //filter the value that category matches.
         if(a.category == category || category==''){
          return a;
         }
       })
   }
}
