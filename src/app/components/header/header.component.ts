import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  authentication: Observable<boolean>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authentication = this.userService.getAuthentication();
  }

  signOut(event: Event) {
    event.preventDefault();
    this.userService.signOut();
  }

}
