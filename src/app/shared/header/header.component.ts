import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  avatarUrl: string;
  subscription: Subscription;

  constructor(private userSvc: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userSvc.fetchUser();
    this.subscription = this.userSvc.getUserObs().subscribe(user => {
      this.avatarUrl = user !== null ? user.avatarUrl : null;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.userSvc.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }
}
