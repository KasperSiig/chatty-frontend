import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateDTO } from '../shared/models/dto/CreateDTO';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  selected = 0;
  hide = false;
  imgUrls = [];

  createForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl('')
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private us: UserService,
              private router: Router,
              private auth: AngularFireAuth) {
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
   * Submits on Create
   */
  onCreateSubmit() {
    const form = this.createForm;
    if (form.get('password1').value !== form.get('password2').value) {
      return 'User was not created';
    }

    const createDTO = new CreateDTO();
    createDTO.email = form.get('email').value;
    createDTO.userName = form.get('username').value;
    createDTO.password = form.get('password1').value;
    createDTO.avatarURL = this.imgUrls[this.selected];

    this.us.create(createDTO)
      .subscribe(async () => {
        await this.auth.auth.signInWithEmailAndPassword(createDTO.email, createDTO.password);
        this.us.fetchUser().then(() => {
          this.router.navigate(['/chat']);
        });
      });
    return createDTO;
  }

  /**
   * Submits on login
   */
  onLoginSubmit() {
    const form = this.loginForm;
    this.us.login(form.get('email').value, form.get('password').value)
      .then(() => {
        this.router.navigate(['/chat']);
      });
  }
}
