import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  data: any;

  constructor(
    private fb: FormBuilder,
    private CommonServiceService: CommonServiceService,
    private toastr: ToastrService // Inject the ToastrService

  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['', Validators.required],
      Password: ['', Validators.required],
      // Note: Fields like created_time, created_by, etc., should be handled server-side
    });
    console.log(this.userForm);
    this.CommonServiceService.UserData().subscribe({
      next: (data: any) => {
        this.data = data;
        console.log(data);
        // return this.data;
      },
      error: (error) => {
        console.log('There was an error!', error);
      },
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.CommonServiceService.signUpUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User created', response);
          this.toastr.success('successful Created!!'); // Display success notification
        },
        error: (error) => {
          console.error('Error creating user', error);
          this.toastr.error('Failed to create user.'); // Display error notification
        },
      });
    }
    //  else {
    //   this.toastr.error('Please correct the errors in the form.'); // Display form validation error
    // }
  }
  
}
