import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { UserStoreService } from '../service/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  IsloggedIn: boolean=false;
  public role!: string ;
  public users:any =[];
  public fullName : string ="";
  public totalItem : number = 0;
  public searchTerm: string='';
  constructor( private cartService : CartService , private auth: AuthService ,private api :ApiService ,private userStore : UserStoreService){ }

  ngOnInit(): void{
    // this.IsloggedIn=this.auth.getIsloggedIn();
    
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    });
    this.api.getUsers()
   .subscribe(res =>{
    this.users = res;
   });
   this .userStore.getFullNameFromStore()
   .subscribe(val=>{
    const fullNameFromToken = this.auth.getfullNameFromToken();
    this.fullName = val || fullNameFromToken
   });

   this.userStore.getRoleFromStore()
   .subscribe(val =>
   {
    let roleFromToken = this.auth.getRoleFromToken();
    this.role = val || roleFromToken;
   })
  }
  search(event:any){
     this.searchTerm =(event.target as HTMLInputElement).value; //send whatever inside value.
     console.log(this.searchTerm);
     this.cartService.search.next(this.searchTerm);  //it should be used inside my product(inside my Product list wher is my search key item it will apped the Item.)
  }
  logout():void{
    this .auth.signOut();
   
   this.IsloggedIn=this.auth.getIsloggedIn();
   }
   show()
   {
    this.IsloggedIn=this.auth.getIsloggedIn();
   }
}
