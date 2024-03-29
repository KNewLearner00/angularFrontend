import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{
  public role!: string ;
  public users:any =[];
  public fullName : string ="";
  constructor (private api :ApiService  , private auth: AuthService ,private userStore : UserStoreService){}
  ngOnInit(){
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

  logout(){
   this .auth.signOut();
  }
  }


