import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chatty-frontend';

  constructor(private auth: AngularFireAuth) {}

  async ngOnInit() {
    await this.auth.auth.signInWithEmailAndPassword('test@test.com', 'password');
  }
}
