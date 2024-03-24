import { Injectable } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {

  constructor(private ngxToastr: NgxToastrService) {}

  success(message: string, title?: string) {
    this.ngxToastr.success(message, title, {
      closeButton: true,
      progressBar: true,
    });
  }

  error(message: string, title?: string) {
    this.ngxToastr.error(message, title, {
      closeButton: true,
      progressBar: true,
    });
  }

  info(message: string, title?: string) {
    this.ngxToastr.info(message, title, {
      closeButton: true,
      progressBar: true,
    });
  }

  warning(message: string, title?: string) {
    this.ngxToastr.warning(message, title, {
      closeButton: true,
      progressBar: true,
    });
  }
}
