import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';





import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InterceptorInterceptor } from './Authorization/interceptor.interceptor';
import { ProductComponent } from './product/product.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavGuard } from './Authorization/nav.guard';



const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[NavGuard]},
  {path:'product',component:ProductComponent,canActivate:[NavGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    OrderComponent,
    DashboardComponent,
    NavigationComponent,
    ProductComponent,
    SpinnerComponent
    

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(), 
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})



export class AppModule { }
