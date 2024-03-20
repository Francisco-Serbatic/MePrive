import { Component, Input, OnInit } from '@angular/core';
import { ScrollInPageService } from 'src/app/services/scroll-in-page.service';
//import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-intro-images',
  templateUrl: './intro-images.component.html',
  styleUrls: ['./intro-images.component.scss']
  /*  animations: [
    trigger('miAnimacion', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],*/
})
export class IntroImagesComponent {
  @Input() mealsUrl: string | undefined;

  images: string[] = ['prive01.jpg', 'prive02.jpg', 'prive03.jpg'];
  currentImageIndex: number = 0;

  constructor(private scroller: ScrollInPageService) { }

  ngOnInit() {
    this.rotateImages();
  }

  rotateImages() {
    setInterval(() => {
      this.nextImage();
    }, 10000);
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  scrollTo = this.scroller.scrollToTarget;

  getImageUrl(indexOrName: number | string): string {
    if (typeof indexOrName == 'number')
    {
      return `../../../../assets/${this.images[indexOrName]}`;
    } else  {
      return `../../../assets/${indexOrName}`;
    }
  }
}
