import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { catchError, forkJoin, switchMap } from 'rxjs';
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
  sortColumn:string = 'productName';
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

  sortData(column: string){
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortColumn = column;
    this.sortIcon = this.sortDirection === 'asc' ? this.faArrowUp : this.faArrowDown;
    this.getReports(this.currentPage);
  
  }

  deleteReportedItems(reportId:string, reportedProductId:string){
    console.log(reportId, reportedProductId);
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        forkJoin([
          this.productsService.deleteReport(reportId),
          this.productsService.deleteReportedProduct(reportedProductId)
        ]).pipe(
          switchMap(([reportResponse, reportedProductResponse]) => {
            if (reportedProductResponse?.deletedCount > 0) {
              this.getReports(this.currentPage);
             
            }
            return [];
          }),
          catchError((error) => {
            this.toaster.error(`${error} `, 'Internal Server Error');
            return [];
          })
        ).subscribe(res =>{
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
        // this.productsService.deleteReport(reportId).subscribe(res =>{
        //   this.productsService.deleteReportedProduct(reportedProductId).subscribe(res =>{
        //     if(res?.deletedCount>0){
        //       this.getReports(this.currentPage);
        //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
        //     }
        //   },
        //   err =>{
        //     this.toaster.error('Error deleting', 'Internal Server Error')
        //   }
        //    )
        // })

      }
    })
  }

}
