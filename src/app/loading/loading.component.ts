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
      this.router.navigate(['/chat'])
        .then(data => console.log('succes: ' + data))
        .catch(err => console.log(err));
    } else {
      console.log('hello');
      this.router.navigate(['/login']);
    }
  }
}
