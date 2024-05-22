import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    let token = sessionStorage.getItem('token');

    if (token == "asd") {
      this.router.navigate(['orders']);
    }
    else {
      this.router.navigate(['admin']);
    }
  }

  loginAdmin() {
    sessionStorage.setItem('token', 'asd');
    this.router.navigate(['orders']);
  }
  loginUser() {
    sessionStorage.setItem('token', '123456789');
    this.router.navigate(['admin']);
  }

}
