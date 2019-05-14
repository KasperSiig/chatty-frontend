import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements AfterViewInit {

  constructor(private userSvc: UserService,
              private router: Router) {
  }

  async ngAfterViewInit() {
    const userCheck = await this.userSvc.userCheck();
    if (userCheck !== null || userCheck !== undefined) {
      this.router.navigate(['/chat']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
