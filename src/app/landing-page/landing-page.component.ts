import {  Component, ElementRef, ViewChild,Renderer2 } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

import { ToastrService } from 'ngx-toastr'; // Import ToastrService


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router: Router,private toastr: ToastrService ) {}
  @ViewChild('imagesContainer') imagesContainer!: ElementRef;
 

  scrollLeft() {
    if (this.imagesContainer) {
      this.imagesContainer.nativeElement.scrollTo({
        left: this.imagesContainer.nativeElement.scrollLeft - 200,
        behavior: 'smooth',
      });
    }
  }

  scrollRight() {
    if (this.imagesContainer) {
      this.imagesContainer.nativeElement.scrollTo({
        left: this.imagesContainer.nativeElement.scrollLeft + 200,
        behavior: 'smooth',
      });
    }
  }





  textElements = [
    { text: 'Order Biryani 🥘 🤤', opacity: 0 },
    { text: 'Desi Thali Taste Karo 🍱🤗 !!!', opacity: 0 },
    { text: 'Chill With Shakes & Bevarages 🍹🥂🧋 !!!', opacity: 0 }
  ];





  restaurants: any[] = [
    {
      restaurantName: 'Cake Factory',
      imageSource: 'assets/chocolate-cake-with-chocolate-sprinkles.jpg',
      foodItem: 'Item 1',
    },
    {
      restaurantName: 'Behrouz Biryani',
      imageSource: 'assets/behrouz-biryani (1).jpg',
      foodItem: 'Chicken biryani',
    },
    {
      restaurantName: 'Pizza Hut',
      imageSource: 'assets/behrouz-biryani (2).jpg',
      foodItem: 'Pizza',
    },
    {
      restaurantName: 'KFC',
      imageSource: 'assets/KFC.png',
      foodItem: 'Chicken',
    },
    {
      restaurantName: 'Subway',
      imageSource: 'assets/hotdogs.jpg',
      foodItem: 'Sub',
    },
    {
      restaurantName: 'Taco Bell',
      imageSource: 'assets/Tacos.jpg',
      foodItem: 'Tacos',
    },
   
  ];

  // imagePaths: string[] = [
  //   'assets\McD.png',
  //   'assets\Noodle.png',
  //   'assets\pepsi.png',
  //   'src\app\assets\pizzahut.png',
  //   'assets\Cake.png',
  //   'assets\Mask group.png'
  // ];
  ngOnInit(): void {
    console.log('Redirected to Landing page after authentication');
  }


  
  logout() {
    // Remove JWT token
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']); // Redirect to /Landing
    this.toastr.success('logout successful!!');

    // Redirect to login page or do other cleanup
}

}


