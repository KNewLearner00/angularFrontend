import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:'',redirectTo:'product',pathMatch:'full'},
  {path:'product', component:ProductComponent},
  {path:'cart', component:CartComponent,canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path:'signup', component:SignupComponent },
  {path:'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  {path:'checkout', component:CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
