import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService


declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private CommonServiceService: CommonServiceService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService // Inject the ToastrService

  ) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });

    // google authentication
    this.loadGoogleIdentityServices().then(() => {
      google.accounts.id.initialize({
        client_id:
          '1016816198866-9cifad087c95mfkv9an62looe6a95a1o.apps.googleusercontent.com',
        callback: (response: any) => {
          console.log(response);
          this.handleLoginSuccess(response);
        },
      });
      google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
        theme: 'filled_blue',
        size: 'large',
      });
      google.accounts.id.prompt();
    });
  }
  handleLoginSuccess(response: any) {
    // Process login response, then redirect
    console.log('Login successful:', response);
    this.toastr.success('Login successful!!');
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.CommonServiceService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(this.loginForm.value);
          console.log('Login successful', response);
          localStorage.setItem('token', response.token); // Store the token
          this.toastr.success('Login successful!!');
          this.router.navigate(['/Landing']); // Redirect to /Landing
          // Handle successful login here
        },
        error: (error) => {
          this.toastr.error('Login Failed')
          console.error('Login failed', error);
          // Handle login failure here
        },
      });
    }
  }


  logout() {
    // Remove JWT token
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']); // Redirect to /Landing


    // Redirect to login page or do other cleanup
}

}
