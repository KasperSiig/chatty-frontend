import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  selected = 0;

  imgUrls = [
    'https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar1.png?alt=media&token=bea84094-ad9c-49ac-b7ee-1eacd458591d',
    'https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar2.png?alt=media&token=d4d82edd-069b-48bf-aa83-b873223ca787',
    'https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar3.png?alt=media&token=7bcf7b96-b39d-496a-988c-35e1fdf247d2',
    'https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar4.png?alt=media&token=d37bd253-be84-469c-a229-9eaca29aaac6',
    'https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar5.png?alt=media&token=b690e5f4-28fc-468e-9a3b-07216bffc18c',
    'https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar6.png?alt=media&token=a7131593-babf-486f-9bd7-3d0396e420e9',
    'https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar7.png?alt=media&token=db27eed5-48d5-4424-aafe-86a176d4986d',
    'https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar8.png?alt=media&token=b7951298-cbd0-4b7a-bc14-7737e5bad76b'
  ];

  constructor(private us: UserService) {
  }

  ngOnInit() {
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
  }
}
