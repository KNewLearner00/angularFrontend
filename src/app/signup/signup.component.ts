import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { d } from 'ng-angular-popup';
import { AuthService } from '../service/auth.service';
import ValidateForm from './helper/validateform';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcons : string = "fa-eye-slash";
  signUpForm!: FormGroup;
 constructor(private fb : FormBuilder ,private auth: AuthService, private router: Router,private toast:NgToastService) {}
 ngOnInit(): void{
  this.signUpForm= this.fb.group({
    firstname:['',Validators.required ],
    lastname:['',Validators.required],
    Gender:['',Validators.required],
    Email:['',Validators.required],
    Mobile:['',Validators.required],
    username:['',Validators.required],
    password:['',Validators.required],
  })
 }

 hideShowPas(){
  this.isText = !this.isText;
  this.isText ? this.eyeIcons ="fa-eye" : this.eyeIcons = "fa-eye-slash";
  this.isText ? this.type ="text" : this.type ="password";
}
 onSignUp(){
  if(this.signUpForm.valid){
    //sent the object to database.
    this.auth.signUp(this.signUpForm.value)
    .subscribe({
      next:(res=>{
        this.signUpForm.reset();
        this.toast.success({detail:"User Is Added", summary : res.message ,duration:5000 });
        this.router.navigate(['login']);
      }),
       error:(err=>{
      //   alert(err?.error.message)
        this.toast.error({ detail:"ERROR", summary:"Something Went Wrong!",duration:5000});

       })
    })
    }
    else{
      console.log("Form is not Valid");
      //throw an error using toaster and with required fields
       ValidateForm.validateAllFormFileds(this.signUpForm);
       alert("Your Form Is InValid")
    }
  }
     
}
