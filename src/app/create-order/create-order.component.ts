import { Component , OnInit} from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
interface UserData {
  userId: number;
  name: string;
  email: string;
  phone: string;
}
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  data: any[] = [];
  // filteredData: any[] = [];
  error:any;
  // originalData = []; // Populate with original data
  // filters = {};
  originalData: UserData[] = []; // Populate with original data
  filteredData: UserData[] = [];

  // This object now uses an index signature.
  filters: { [key: string]: string } = {};


  constructor(private CommonServiceService: CommonServiceService,private toastr: ToastrService ) {
    // this.filteredData = this.originalData;
   }

   ngOnInit(): void {
    this.CommonServiceService.UserData().subscribe({
      next: (data: UserData[]) => { // Ensure data is typed as UserData[]
        this.originalData = data; // Assigning directly to originalData
        this.filteredData = [...this.originalData]; // Copy originalData to filteredData
        console.log('Data received:', this.data); // Optionally log data for debugging
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.toastr.error('Failed to fetch data');
      }
    });
  }
  
 
  applyFilter(event: Event): void {
      const target = event.target as HTMLInputElement; // Safely cast to HTMLInputElement
      const filterValue = target.value; // Now you can safely access 'value'
    
      this.filteredData = this.data.filter(item =>
        item.userId.toString().includes(filterValue.toLowerCase()) ||
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.phone.toString().includes(filterValue.toLowerCase())
      );
    }
  
 // Type Guard to check if a string is a key of UserData
//  private isKeyOfUserData(key: any): key is keyof UserData {
//   return key in this.originalData[0];
// }



// applyColumnFilter(event: any, column: keyof UserData) {
//   const filterValue = event.target.value.toLowerCase();
//   this.filters[column] = filterValue;

//   this.filteredData = this.originalData.filter(item => {
//     return Object.keys(this.filters).every(key => {
//       const itemValue = item[key as keyof UserData]?.toString().toLowerCase() || '';
//       return itemValue.includes(this.filters[key]);
//     });
//   });
// }


  
}



