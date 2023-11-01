import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import Swal from 'sweetalert2';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Observable, tap } from 'rxjs';
import {PaginationInstance} from 'ngx-pagination';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.less']
})
export class BuyersComponent implements OnInit {
   
  itemsPerPage = 5;
  
  responsive = true;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  buyers: any[] = [];
  psize = 5;
  currentPage = 1;

    asyncBuyers!: Observable<any[]>;
    p: number = 1;
    total!: number;
    loading: boolean = false;

    sortColumn: string = 'name';
    sortDirection: string = 'asc';
  asyncMeals: any;
  options: AnimationOptions = {
    path: 'https://lottie.host/36f5b322-54e6-47a5-ba5e-2541e295fc40/AF6vrQPxj1.json', 
  };
  //   public config: PaginationInstance = {
       
  //     itemsPerPage: 5,
  //     currentPage: 1
  // };

    public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  constructor(
    private userService: UsersService, 
  ) {}

  ngOnInit(): void {
    // this.loading = this.authService.isLoading;
    this.getPage(1)
    // this.getBuyers()
  }

  getPage(page: number) {
    this.loading = true;
    // const page1 = this.currentPage;
    // const buyersPerPage = 5;
    this.userService.getBuyers(
      page,
      this.itemsPerPage,
      this.sortColumn,
      this.sortDirection
    ).subscribe((res: any) => {
      // this.buyers = data;
      this.total = res.total;
      this.p = page;
      this.buyers = res.data;
      this.loading = false;
      console.log(res);
      console.log(this.buyers);
      
    });
  }

//   getPage(page: number) {
//     this.loading = true;
//     this.asyncMeals = this.getBuyers(page).pipe(
//         tap(res => {
//             this.total = res.total;
//             this.p = page;
//             this.loading = false;
//         }),
//         map(res => res.items)
//     );
// }
// }

  // onPageChange(number: number) {
  //   this.currentPage = number;
  //   this.getBuyers(); // Load data for the new page
  // }

  // handlePageClick(selected: number): void {
  //   this.currentPage = selected + 1;
  //   this.getBuyers(this.currentPage);
  // }

  handleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.getPage(this.p);
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
            this.getPage(this.p);
          }
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  }
}
