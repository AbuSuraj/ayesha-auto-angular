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
 
  currentPage = 1;
  sortIcon = this.faArrowUp; 

    asyncBuyers!: Observable<any[]>;
    p: number = 1;
    total!: number;
    loading: boolean = false;

    sortColumn: string = 'name';
    sortDirection: string = 'asc';
  asyncMeals: any;
  options: AnimationOptions = {
    path: 'https://lottie.host/71158c69-388c-4ac1-bbfb-2a8b9a27b139/IZFik2D6BT.json', 
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
    this.getBuyers(1)
    // this.getBuyers()
  }

  getBuyers(page: number) {
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
      this.currentPage = page;
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
    this.sortColumn = column;
    this.sortIcon = this.sortDirection === 'asc' ? this.faArrowUp : this.faArrowDown;
    this.getBuyers(this.currentPage);
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
            this.getBuyers(this.currentPage);
          }
          Swal.fire('Deleted!', 'This buyer has been deleted.', 'success');
        });
      }
    });
  }
}
