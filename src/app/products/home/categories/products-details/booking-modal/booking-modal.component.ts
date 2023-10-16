import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.less']
})
export class BookingModalComponent {
  @Input() visible: boolean | undefined;
  @Output() close = new EventEmitter<void>();

  closeModal(){}
}
