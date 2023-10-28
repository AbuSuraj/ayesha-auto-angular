import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import Swal from 'sweetalert2';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.less']
})
export class BuyersComponent implements OnInit {
  // loading: boolean;
  buyers: any = { data: [], total: 0, currentPage: 1, totalPages: 1 };
  pageNumber = 1;
  buyersPerPage = 5;
  sortColumn = 'name';
  sortDirection = 'asc';
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  constructor(
    private userService: UsersService, 
  ) {}

  ngOnInit(): void {
    // this.loading = this.authService.isLoading;
    this.fetchBuyers();
  }

  fetchBuyers(): void {
    this.userService.getBuyers(
      this.pageNumber,
      this.buyersPerPage,
      this.sortColumn,
      this.sortDirection
    ).subscribe((data: any) => {
      this.buyers = data;
      console.log(this.buyers);
      
    });
  }

  handlePageClick(selected: number): void {
    this.pageNumber = selected + 1;
    this.fetchBuyers();
  }

  handleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.fetchBuyers();
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
            this.fetchBuyers();
          }
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  }
}
