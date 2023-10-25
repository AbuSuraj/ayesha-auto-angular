import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import { TooltipDirective } from 'src/app/shared/tool-tip/tool-tip.directives';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.less'],
  // directives: [TooltipDirective],
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  products:any;
  sellers:any;
  date = new Date();
  year = this.date.getFullYear()
  faCheck = faCheck;
  tooltipText: string='Price ';

  
  constructor(private activateRoute: ActivatedRoute, private productsService: ProductsService, private userService: UsersService, private toastr: ToastrService, private router: Router) {}
  
  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    console.log(id);
    
    this.id = id; 
    this.getProducts();
    this.getSellers();
  }
  
  changeTooltip(newText: any) {
    // console.log(newText);
    this.tooltipText = "Price $" + newText;
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
        // console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  getSellers(){
    this.userService.getSellers().subscribe(data => {
      this.sellers = data.data;
      // console.log(this.sellers);
    })
  }

  addBooking(product: Product){
    this.productsService.changeProduct(product);
    this.router.navigate(['/category',this.id, 'booking'])
  }

  handleReport(product:Product){
    // console.log(product);
    this.productsService.reportProduct(product).subscribe(res =>{
      this.toastr.success('Report sent to admin')
    },
    (er)=>{
      this.toastr.error('Error sending report to admin', 'Erro')
    }
    )
    
  }
}
