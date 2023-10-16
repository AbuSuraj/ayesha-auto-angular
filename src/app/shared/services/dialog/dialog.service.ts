import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/products';
import { BookingModalComponent } from 'src/app/products/home/categories/products-details/booking-modal/booking-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openBookingModal(product: Product): void {
    this.dialog.open(BookingModalComponent, {
      width: '500px', // Set the width as needed
      data: { product },
    });
  }
}
