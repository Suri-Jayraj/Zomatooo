import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router


declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadGoogleIdentityServices().then(() => {
      google.accounts.id.initialize({
        client_id: '1016816198866-9cifad087c95mfkv9an62looe6a95a1o.apps.googleusercontent.com',
        callback: (response: any) => {
          console.log(response);
          this.handleLoginSuccess(response);

        },
      });
      google.accounts.id.renderButton(
        document.getElementById('g_id_signin'), {
          theme: 'filled_blue',
          size: 'large',
        }
      );
      google.accounts.id.prompt();
    });
  }
  handleLoginSuccess(response: any) {
    // Process login response, then redirect
    console.log("Login successful:", response);
    this.router.navigate(['/Landing']); // Redirect to /Landing
  }

  loadGoogleIdentityServices() {
    const scriptId = 'google-identity-services';
    return new Promise<void>((resolve) => {
      if (document.getElementById(scriptId)) {
        // Script already loaded
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });

    
  }

}
