import { Component, HostListener } from '@angular/core';
import { ScrollInPageService } from 'src/app/services/scroll-in-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logoUrl = "../../../assets/prive-eventos-catering-logo-blanco.png";
  // isScrolledDown = false;
  // isScrolledUp = true;
  // lastScrollTop = 0;
  

  constructor(private scroller: ScrollInPageService) { }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  //   const st = window.pageYOffset || document.documentElement.scrollTop;
  //   if (st > this.lastScrollTop) {
  //     // Downscroll code
  //     this.isScrolledDown = true;
  //     this.isScrolledUp = false;
  //   } else {
  //     // Upscroll code
  //     this.isScrolledDown = false;
  //     this.isScrolledUp = true;
  //   }
  //   this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  // }

  scrollTo = this.scroller.scrollToTarget;

}
