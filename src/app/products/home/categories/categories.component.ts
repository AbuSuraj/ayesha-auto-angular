import { Component, OnInit } from '@angular/core';
// import { ProductsService } from './../../../shared/services/service-proxies/products.service';
import { Categories } from 'src/app/shared/interfaces/categories.interface';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {
  isLoading = false;
  categories: Categories [] = [];

  constructor(private productService: ProductsService) { }
  
  ngOnInit(): void {
  this.getCategories();
}

getCategories(): void {
  this.isLoading = true;
  this.productService.getCategories().subscribe(result => {
    this.categories = result;
    this.isLoading = false;
    console.log(this.categories)
    },
    error => {
      console.error("Error: " + error)
      this.isLoading = false;
    });
  }
}
