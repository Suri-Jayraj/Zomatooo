import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService


@Component({
  selector: 'app-adminaddrest',
  templateUrl: './adminaddrest.component.html',
  styleUrls: ['./adminaddrest.component.css'] // Note: styleUrls should be an array
})
export class AdminaddrestComponent {
  restaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toaster :ToastrService,
    private restaurantService: CommonServiceService
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      cuisine: ['', Validators.required],
      location: ['', Validators.required],
      rating: [null],
      description: [''],
      imageUrl: [''],
      deliveryAreas: [''],
      deliveryFee: [null],
      minOrderAmount: [null],
      operatingHours: [''],
      isActive: [true]
    });
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      const restaurant = this.restaurantForm.value;
      this.restaurantService.createresta(restaurant).subscribe(
        response => {
          console.log('Restaurant added successfully', response);
          this.toaster.success('Restaurant added successfully')
        },
        error => {
          console.error('Error adding restaurant', error);
        }
      );
    }
  }
}
