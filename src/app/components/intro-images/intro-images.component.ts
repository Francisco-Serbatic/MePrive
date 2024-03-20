import { Component, Input, OnInit } from '@angular/core';
import { GetImageService } from 'src/app/services/get-image.service';
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

  carouselImages: string[] = ['prive01.jpg', 'prive02.jpg', 'prive03.jpg'];
  arrowImages: string[] = [this.getImagesByName.getImageUrl('leftArrow.png'), this.getImagesByName.getImageUrl('rightArrow.png')]
  currentImageIndex: number = 0;

  constructor(private scroller: ScrollInPageService, private getImagesByName: GetImageService) { }

  ngOnInit() {
    this.rotateImages();
  }

  rotateImages() {
    setInterval(() => {
      this.nextImage();
    }, 10000);
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  scrollTo = this.scroller.scrollToTarget;

  getImageUrl(index: number): string {
    return this.getImagesByName.getImageUrl(this.carouselImages[index])
  }

}
