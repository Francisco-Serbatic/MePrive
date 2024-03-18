import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  logOut() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);

  }

}
