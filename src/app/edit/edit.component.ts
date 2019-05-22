import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../shared/models/User';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isEditing = false;
  user = new User();
  usernameForm = new FormGroup({
    username: new FormControl('')
  });

  constructor(private userSvc: UserService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.userSvc.getUserObs().subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Submits form and changes users username
   */
  onSubmit() {
    this.userSvc.update(this.usernameForm.get('username').value);
    this.isEditing = !this.isEditing;
  }

  onDelete() {
    this.userSvc.delete().then(() => {
      this.router.navigate(['/']);
    });
  }
}
