import { Component } from '@angular/core';
import{ Router ,NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   showNavbar: boolean=true;
  constructor(private router:Router) {
   this.router.events.subscribe((event) =>{
    if(event instanceof NavigationEnd){
      //check if the current Url is the login router.
       if(this.router.url ==='/login' || this.router.url==='/signup'){
        this.showNavbar =false;  //set the showNavbar property to false.
       } 
    
       else{
        this.showNavbar=true; //set the showNavbar property to true.
       }
    }
   })
}
title = 'Welcome to My Angular Hub';
}
