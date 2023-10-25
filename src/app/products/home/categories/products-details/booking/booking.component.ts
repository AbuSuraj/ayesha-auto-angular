import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less']
})
export class BookingComponent implements OnInit {
  product!: Product;
  bookingForm!: FormGroup;
  userInfoLocalStorage:any;
  user!:User ;
  constructor(private route: ActivatedRoute, private productsService: ProductsService, private formBuilder: FormBuilder, private userService: UsersService) {
    // get selected product 
    this.productsService.currentProduct.subscribe(product => {
      this.product = product
  
    });
  }

  ngOnInit() {
    // this is the way we can retrive data from route 

    // this.route.paramMap
    //   .pipe(map(() => window.history.state)).subscribe(res=>{
    //         console.log(res)                        
    //    })
    this.getUserInfoFromLoclStorage();
   

    // get loggedInUser 
    // this.userService.getLoggedInUserInfo(this.userInfoLocalStorage).subscribe((user:User) =>{
    // this.user = user;
    // console.log(this.user);      
    // })

    this.initialiseBookingForm();
    this.getBookingFormsPatchValue()
  }

  private getUserInfoFromLoclStorage(){
    this.userInfoLocalStorage = localStorage.getItem('user');
    this.userInfoLocalStorage = JSON.parse(this.userInfoLocalStorage)
  }

  private initialiseBookingForm(): void {
    console.log(this.user?.name , this.user?.email,this.product?.productName,);
    
    this.bookingForm = this.formBuilder.group({
      productName: [{ value: this.product?.productName, disabled: true }],
      name: [{ value: this.user?.name, disabled: true }],
      email: [{ value: this.user?.email, disabled: true }],
      resalePrice: [{ value: this.product?.resalePrice, disabled: true }],
      phone: ['', [Validators.required]],
      meetingLocation: ['', [Validators.required]],
    })
  }


getBookingFormsPatchValue(){
  this.userService.getLoggedInUserInfo(this.userInfoLocalStorage).subscribe((user:User) =>{
    this.user = user;
    console.log(this.user);      
    this.bookingForm.patchValue({
    productName: this.product?.productName,
    name:   this.user?.name,
    email:  this.user?.email,
    resalePrice: this.product?.resalePrice,
    })
  })
}

  handleBooking() {
    if (this.bookingForm.valid) {
      // Handle form submission here
      // You can access form values using this.bookingForm.value
      console.log(this.bookingForm.value);
    }
  }
}
