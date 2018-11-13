import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  signIn() {
    const signedIn = this.userService.signIn({
      email: 'ass',
      password: 'asd'
    });
    if (signedIn) {
      this.router.navigate(['']);
    }
  }

}
