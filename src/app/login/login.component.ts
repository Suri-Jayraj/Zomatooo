import { Component } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: SocialUser | null = null;

  constructor(private authService: SocialAuthService) {}

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.user = user;
      console.log(user);
      // Handle successful sign-in, e.g., redirect or fetch user data
    });
  }

  signOut(): void {
    this.authService.signOut().then(() => {
      this.user = null;
      // Handle sign-out if needed
    });
  }

}





