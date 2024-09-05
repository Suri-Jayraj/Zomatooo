import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService, // Inject the ToastrService
    private router: Router

  ) {
    // Initialize the form with validators
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Capture the token from the query parameter when the component initializes
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log('Token:', this.token);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.authService.resetPassword(this.token, newPassword).subscribe(
        response => {
          console.log('Password reset successful', response);
          this.toastr.success('Password reset successful');
          this.router.navigate(['/login']); // Redirect to /Landing
        },
        error => {
          console.error('Error resetting password', error);
          this.toastr.error('Error resetting password')
        }
      );
    } else {
      console.error('Form is invalid or token is missing');
      this.toastr.error('Form is invalid or token is missing')

    }
  }
}
