import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  title: string;

  constructor(
    private router: Router
  ) {
    this.title = environment.title;
  }

  ngOnInit() {
  }

  signOut() {

  }

}
