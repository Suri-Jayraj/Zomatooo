import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  
} from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../auth.service';
import { Modal } from 'bootstrap';



declare var google: any;

@Component({
  selector: 'app-login',  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showForgotPassword = false;
  forgotPasswordForm: FormGroup | any;


  constructor(
    private AuthService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService, // Inject the ToastrService
    private msalService: MsalService // msal
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  

    // google authentication
    this.loadGoogleIdentityServices().then(() => {
      google.accounts.id.initialize({
        client_id:
          '1016816198866-9cifad087c95mfkv9an62looe6a95a1o.apps.googleusercontent.com',
        callback: (response: any) => {
          console.log(response);
          this.handleLoginSuccess(response);
          this.AuthService.setToken(response.credential); // Store the Google token

        },
      });
      google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
        theme: 'filled_blue',
        size: 'large',
      });
      google.accounts.id.prompt();
    });

    // Initialize Microsoft authentication
    this.msalService.instance.handleRedirectPromise().then((res) => {
      if (res != null && res.account != null) {
        this.msalService.instance.setActiveAccount(res.account);
      }
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
      this.AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(this.loginForm.value);
          console.log('Login successful', response);
          this.AuthService.setToken(response.token); // Store the token
          this.toastr.success('Login successful!!');
          this.router.navigate(['/Landing']); // Redirect to /Landing
          // Handle successful login here
        },
        error: (error) => {
          this.toastr.error('Login Failed');
          console.error('Login failed', error);
          // Handle login failure here
        },
      });
    }
  }

  isLoginInProgress = false;

  // Add Microsoft login method
  loginWithMicrosoft(): void {
    this.isLoginInProgress = true;
    this.msalService.loginPopup().subscribe({
      next: (result) => {
        console.log(result);
        this.AuthService.setToken(result.idToken); // Store the Microsoft token
        this.handleLoginSuccess(result);
      },
      error: (error) => {
        console.error(error);
        this.isLoginInProgress = false;
        this.toastr.error('Microsoft login failed');
      },
    });
  }
  logout(): void {
    this.AuthService.clearToken(); // Remove the token
    this.router.navigate(['/login']); // Redirect to login page
    this.msalService.logout(); // Microsoft logout (optional)
  }
  

  closeModal() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        new Modal(modalElement).hide();
      }
    }
  }

  //Forgot Paasword
  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email').value;
      this.AuthService.Forgotpassword(email).subscribe(
        response => {
          console.log('Password reset link sent', response);
          this.toastr.success('Password reset link sent to mail !!!');
          this.closeModal();
        },
        error => {
          console.error('Error sending reset link', error);
          this.toastr.error('Failed to send password reset link.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  
}
