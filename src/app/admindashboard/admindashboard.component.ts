import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  // standalone: true,
  // imports: [],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
