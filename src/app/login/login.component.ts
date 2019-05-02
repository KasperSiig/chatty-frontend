import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { forEach } from "@angular/router/src/utils/collection";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  selected = 0;

  imgUrls = [];

  constructor(private us: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.us.getAllAvatarsNames().subscribe(names => {
      names.forEach(name => {
        this.us.getAvatarDownloadURL(name).subscribe(url => {
          this.imgUrls.push(url);
        });
      });
    });
  }

  /**
   * Gets chosen username and avatar and calls login method from UserService.
   * @param username user have chosen
   */
  onSubmit(username: string) {
    const user = new User();
    user.userName = username;
    user.avatarUrl = this.imgUrls[this.selected];
    this.us.login(user);
    this.router.navigate(['/']);
  }
}
