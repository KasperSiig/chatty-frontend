import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  avatarUrl: string;
  subscription: Subscription;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.subscription = this.userSvc.getUserObs().subscribe(user => {
      this.avatarUrl = user !== null ? user.avatarUrl : null;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
