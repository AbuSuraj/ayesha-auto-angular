import { Component } from '@angular/core';
import { SlideInterface } from 'src/app/shared/interfaces/sliders.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  slides: SlideInterface[] = [
    { url: '../../../../assets/images/banner1', title: 'Ford' },
    { url: '../../../../assets/images/banner2.jpg', title: 'Nissan' },
    { url: '../../../../assets/images/banner3.jpg', title: 'BMW' },
    { url: '../../../../assets/images/banner4.jpg', title: 'Toyeta' },
    { url: '../../../../assets/images/banner-2.jpg', title: 'Axela' },
  ];
}
