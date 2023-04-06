import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { FilterPipe } from './shared/filter.pipe';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ProductComponent,
    CartComponent,
    HeaderComponent,
    FilterPipe,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:  [{
    provide : HTTP_INTERCEPTORS ,  // what you want to Provide.
      useClass:TokenInterceptor,   // Which Classshould I Use.
        multi : true//it can provide many.
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
