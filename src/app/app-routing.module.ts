import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { RestuarantItemsComponent } from './restuarant-items/restuarant-items.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'Foodcategory',
    component:CategoriesComponent
  },
  {
    path:'Restuarant-items',
    component:RestuarantItemsComponent
  },
  {
    path:'Create-Order',
    component:CreateOrderComponent
  },
  {
    path:'Landing',
    component:LandingPageComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
