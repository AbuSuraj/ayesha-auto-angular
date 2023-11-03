import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.less']
})
export class SellersComponent implements OnInit {

  sellers:any;
  itemsPerPage:number = 3;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  currentPage = 1;
  p = 1;
  sortColumn:string = 'name';
  sortDirection:string = 'asc';
  loading: boolean = false;
  total!:number;
  sortIcon  = faArrowUp;

  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
};

  constructor(private userService: UsersService){
  }
  ngOnInit(): void {
    this.getSellers(1);
  }

  getSellers(page:number){
    this.loading = true;

    this.userService.getSellers(page, this.itemsPerPage, this.sortColumn, this.sortDirection).subscribe(res =>{
      this.total = res.total;
      this.sellers = res.data;
      this.currentPage = page;
      this.loading = false;
      console.log(res);
      
    })
  }

  handleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortColumn = column;
    this.sortIcon = this.sortDirection === 'asc' ? this.faArrowUp : this.faArrowDown;
    this.getSellers(this.p);
  }

  handleDelete(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteBuyer(id).subscribe((data: any) => {
          if (data?.deletedCount > 0) {
            this.getSellers(this.p);
          }
          Swal.fire('Deleted!', 'This seller has been deleted.', 'success');
        });
      }
    });
  }

  handleVerify(id:string){
    Swal.fire({
      title: "Are you sure to verify this seller?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, verify it!",
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.verifySeller(id).subscribe((data: any) => {
          // if (data?.deletedCount > 0) {
          //   this.getSellers(this.p);
          // }
          this.getSellers(this.p);
          Swal.fire('Verified!', 'This seller has been verified.', 'success');
        });
      }
    })
  }

}
