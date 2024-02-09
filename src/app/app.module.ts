import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {  } from 'angularx-social-login';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { RestuarantItemsComponent } from './restuarant-items/restuarant-items.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriesComponent,
    RestuarantItemsComponent,
    CreateOrderComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule

  ],
  // providers: [
  //   {
  //     provide: 'SocialAuthServiceConfig',
  //     useValue: {
  //       autoLogin: false,
  //       providers: [
  //         {
  //           id: GoogleLoginProvider.PROVIDER_ID,
  //           provider: new GoogleLoginProvider('1016816198866-9cifad087c95mfkv9an62looe6a95a1o.apps.googleusercontent.com'),
  //         },
  //         // Add other providers if needed
  //       ],
  //     } as SocialAuthServiceConfig,
  //   },
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}





