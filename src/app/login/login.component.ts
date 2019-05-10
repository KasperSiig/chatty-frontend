import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { UserDTO } from '../shared/models/dto/UserDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  selected = 0;
  hide = true;
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
   * Gets chosen username, password and avatar and calls createUser method from UserService.
   * @param username and password the user has chosen
   */
  onSubmit(username: string, password: string, email: string) {
    const userDTO = new UserDTO();
    userDTO.username = username;
    userDTO.email = email;
    userDTO.password = password;
    userDTO.avatarUrl = this.imgUrls[this.selected];
    this.us.createUser(userDTO).subscribe(token => {
      this.us.saveToken(token);
    });
    this.router.navigate(['/']);
  }
}
