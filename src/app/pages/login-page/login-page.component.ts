import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Input() originRoute: string = "orders";

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    let token = sessionStorage.getItem('token');

    
  }

  
}
