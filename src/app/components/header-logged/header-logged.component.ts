import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GetImageService } from 'src/app/services/get-image.service';
import { ScrollInPageService } from 'src/app/services/scroll-in-page.service';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.scss']
})
export class HeaderLoggedComponent {
  logoUrl = this.getImageUrl.getImageUrl('logoBlanco.png');
  

  constructor(private scroller: ScrollInPageService, private getImageUrl: GetImageService, private router: Router) { }

  scrollTo = this.scroller.scrollToTarget;

  logOut() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);

  }

}