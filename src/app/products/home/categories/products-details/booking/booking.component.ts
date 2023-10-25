import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import { User } from 'src/app/shared/interfaces/user';
import { LocationsService } from 'src/app/shared/services/locations/locations.service';

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
  constructor(private route: ActivatedRoute, private productsService: ProductsService, private formBuilder: FormBuilder, private userService: UsersService, private locationsService: LocationsService) {
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
    console.log(this.user?.name , this.user?.email,this.product?.productName,);
    
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

getAllDistricts(){
  this.locationsService.getAllDistricts().subscribe(data=>{
    this.allDistricts = data.data;
    console.log(this.allDistricts)
  })
}

getDivisionWiseDistricts(division:string){
  this.locationsService.getDivisionwiseDistricts(division).subscribe(data=>{
    this.divWisedistricts = data.data;
    console.log(this.divWisedistricts)
  })
}
getDivision(){
  this.locationsService.getDivissions().subscribe(data=>{
    this.divisions = data.data;
    console.log(this.divisions)
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
  console.log(booking);
  
  if (this.bookingForm.valid) {
    const selectedDivision = this.bookingForm.get('selectedDivision')?.value;
    const selectedDistrict = this.bookingForm.get('selectedDistrict')?.value;
    // You can now use `selectedDivision` and `selectedDistrict` in your submission
    console.log(booking, selectedDivision, selectedDistrict);
  }
  else {console.log('abu')}
}
}
