import { Component , OnInit} from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../service/auth.service';
import { UserStoreService } from '../service/user-store.service';
import ValidateForm from '../signup/helper/validateform';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
 eyeIcon : string = "fa-eye-slash";
    loginForm!:FormGroup;
  constructor(private fb: FormBuilder ,
     private auth: AuthService ,
      private router:Router , 
      private toast:NgToastService,
      private userStore : UserStoreService 
      ) { }
  ngOnInit() : void {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type ="text" : this.type ="password";
  }
  onSubmit(){
    if(this.loginForm.valid){
    //sent the object to database.
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        console.log(res.message);
        this.loginForm.reset();
        this.auth.storeToken(res.accessToken);
        this.auth.storeRefreshToken(res.refreshToken);
        const tokenPayload = this.auth.decodeToken();
        this.userStore.setFullNameForStore(tokenPayload.name);
        this.userStore.setRoleForStore(tokenPayload.role);
        this.toast.success({detail:"SUCESS", summary : res.message ,duration:5000 });
        this.router.navigate(['/cart'])
      },
      error:(err)=>{
        this.toast.error({ detail:"ERROR", summary:"Something Went Wrong!",duration:5000})
    }
    })
    }
    else{
      console.log("Form is not Valid");
      //throw an error using toaster and with required fiels
       ValidateForm.validateAllFormFileds(this.loginForm);
       alert("Your Form Is InValid")
    }
  }
}
