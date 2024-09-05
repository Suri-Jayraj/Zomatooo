import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { RestuarantItemsComponent } from './restuarant-items/restuarant-items.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import {AdminaddrestComponent} from './adminaddrest/adminaddrest.component'
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'Foodcategory',
    component:CategoriesComponent,canActivate: [authGuard]
  },
  {
    path:'Restuarant-items',
    component:RestuarantItemsComponent,canActivate: [authGuard]
  },
  {
    path:'Create-Order',
    component:CreateOrderComponent,canActivate: [authGuard]
  },
  {
    path: 'Landing', component: LandingPageComponent, canActivate: [authGuard]
  },
  {
    path: 'Signup', component: SignupComponent
  },
  {
    path: 'app-create-order', component:CreateOrderComponent,canActivate: [authGuard]
  },
  {
    path: 'AdminAddrest', component:AdminaddrestComponent,canActivate: [authGuard]
  },
  {
    path:'AdminDashboard',
    component:AdmindashboardComponent ,canActivate: [authGuard]
  },
  {
    path:'ResetPassword',
    component:ResetPasswordComponent 
  },
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
