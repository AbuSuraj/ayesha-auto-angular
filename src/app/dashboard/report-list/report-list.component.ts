import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.less']
})
export class ReportListComponent implements OnInit  {
  reports:any[] = [];
  itemsPerPage:number = 5;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  currentPage = 1;
  p: number = 1;
  sortColumn:string = 'name';
  sortDirection:string = 'asc';
  loading: boolean = false;
  total!: number;
  sortIcon  = faArrowUp; 

  
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
};

constructor(private productsService: ProductsService, private toaster: ToastrService){}

  ngOnInit(): void {
  this.getReports(1)
  }

  getReports(page: number){
    this.loading = true;
    this.productsService.getReportedProducts(page,this.itemsPerPage, this.sortColumn, this.sortDirection).subscribe(res =>{
      this.total = res.total;
      this.reports = res.data;
      this.currentPage = page;
      this.loading = false;
      console.log(res);
    },
    err =>{
      this.loading = false;
      this.toaster.error("Fail to load reports-list", 'Internal Error');
    }
    )
  }

}
