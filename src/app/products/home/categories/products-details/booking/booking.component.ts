import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { LocationsService } from 'src/app/shared/services/service-proxies/locations/locations.service';
import { Booking } from 'src/app/shared/interfaces/booking.interface';
import { ToastrService } from 'ngx-toastr';
 

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
  allDistricts: any
  divWisedistricts: any
  divisions:any;
  booking!:Booking;
  showLoader:Boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productsService: ProductsService, private formBuilder: FormBuilder, private userService: UsersService, private locationsService: LocationsService, private toaster: ToastrService) {
    // get selected product 
    this.productsService.currentProduct.subscribe(product => {
      this.product = product
    console.log(product.image)
    });
  }

  ngOnInit() {
    // this is the way we can retrive data from route 

    // this.route.paramMap
    //   .pipe(map(() => window.history.state)).subscribe(res=>{
    //         console.log(res)                        
    //    })
    
    this.getUserInfoFromLoclStorage();
    this.initialiseBookingForm();
    this.getBookingFormsPatchValue()
    this.getAllDistricts()
    // this.getDivisionWiseDistricts('sylhet');
    this.getDivision();
  }

  private getUserInfoFromLoclStorage(){
    this.userInfoLocalStorage = localStorage.getItem('user');
    this.userInfoLocalStorage = JSON.parse(this.userInfoLocalStorage)
  }

  private initialiseBookingForm(): void {
    // console.log(this.user?.name , this.user?.email,this.product?.productName,);
    
    this.bookingForm = this.formBuilder.group({
      productName: new FormControl( { value: this.product?.productName, disabled: false  }),
      name: new FormControl({value: this.user?.name, disabled: false }), 
      email: new FormControl ({ value: this.user?.email, disabled: false  }),
      resalePrice: new FormControl({ value: this.product?.resalePrice, disabled: false }),
      phone: new FormControl( '', [Validators.required, Validators.pattern('(?:(?:\\+|00)88|01)?\\d{11}')]),
      meetingLocation: this.formBuilder.group({
        selectedDivision: new FormControl(''),
        selectedDistrict: new FormControl(''),
      })
    })
  }


getBookingFormsPatchValue(){
  this.showLoader = true;
  this.userService.getLoggedInUserInfo(this.userInfoLocalStorage).subscribe((user:User) =>{
    this.user = user;
    this.showLoader = false;
    // console.log(this.user);      
    this.bookingForm.patchValue({
    productName: this.product?.productName,
    name:   this.user?.name,
    email:  this.user?.email,
    resalePrice: this.product?.resalePrice,
    })
  })
}

getAllDistricts(){
  this.locationsService.getAllDistricts().subscribe(data=>{
    this.allDistricts = data.data;
    // console.log(this.allDistricts)
  })
}

getDivisionWiseDistricts(division:string){
  this.locationsService.getDivisionwiseDistricts(division).subscribe(data=>{
    this.divWisedistricts = data.data;
    // console.log(this.divWisedistricts)
  })
}
getDivision(){
  this.locationsService.getDivissions().subscribe(data=>{
    this.divisions = data.data;
    // console.log(this.divisions)
  })
}

onDivisionChange() {
  const selectedDivision = this.bookingForm.get('meetingLocation.selectedDivision')?.value;
  if (selectedDivision) {
    this.getDivisionWiseDistricts(selectedDivision);
  } else {
    this.bookingForm.get('selectedDistrict')?.setValue(''); // Clear selectedDistrict when no division is selected
  }
}

handleBooking(booking: any) {
  
  if (this.bookingForm.valid) {
    this.booking = {...booking, productId:this.product._id, image:this.product.image} ;
    // console.log(this.booking)
    this.productsService.bookProduct(this.booking).subscribe(data => {
      this.router.navigate(['/dashboard']);
      this.toaster.success('Product Booked Successfully!', 'Success');
    },
    (err) => {
      this.toaster.error('Failed to Book product!', 'Error');
    }
    )
     
  }
  else {this.toaster.error('There is an error, Please fill this form!', 'Error');}
}
}
