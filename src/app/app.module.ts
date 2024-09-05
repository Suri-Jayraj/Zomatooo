import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { RestuarantItemsComponent } from './restuarant-items/restuarant-items.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import {AdminaddrestComponent} from  './adminaddrest/adminaddrest.component'
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';


import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';




import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


import { msalConfig } from './msal-config';
// import { MsalModule, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
// import { InteractionType } from '@azure/msal-browser';

import { MsalModule, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MsalInterceptor } from '@azure/msal-angular';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';






// Create an MSAL instance using the configuration
const msalInstance = new PublicClientApplication(msalConfig);

export function initializeMsalInstance() {
  return () => msalInstance.initialize();
}


@NgModule({
  declarations: [
    AppComponent,
     LoginComponent,
    CategoriesComponent,
    RestuarantItemsComponent,
    CreateOrderComponent,
    LandingPageComponent,
    SignupComponent,
    AdminaddrestComponent,
    AdmindashboardComponent,
    ResetPasswordComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MsalModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MsalModule.forRoot(msalInstance, {
      interactionType: InteractionType.Redirect, // or InteractionType.Popup
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect, // or InteractionType.Popup
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsalInstance,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { 
 
}








