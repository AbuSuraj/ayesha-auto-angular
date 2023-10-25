import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.less']
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  products:any;
  sellers:any;
  date = new Date();
  year = this.date.getFullYear()
  faCheck = faCheck;
  constructor(private activateRoute: ActivatedRoute, private productsService: ProductsService, private userService: UsersService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    console.log(id);
  
    this.id = id; 
    this.getProducts();
    this.getSellers();
  }

  getProducts(){
    this.productsService.getProductsByCategory(this.id).pipe(
      catchError((error) =>{
        this.toastr.error('Internal Error!', 'Error');
        console.error(error)
        return []
      })
    )
    .subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  getSellers(){
    this.userService.getSellers().subscribe(data => {
      this.sellers = data.data;
      console.log(this.sellers);
    })
  }

  addBooking(product: Product){
    this.productsService.changeProduct(product);
    this.router.navigate(['/category',this.id, 'booking'])
  }
}
