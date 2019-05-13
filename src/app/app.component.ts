import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chatty-frontend';

  constructor(private auth: AngularFireAuth, private http: HttpClient) {
  }

  async ngOnInit() {
    await this.auth.auth.signInWithEmailAndPassword('testmail@test.com', 'password');
    const res = await this.auth.auth.currentUser.getIdTokenResult();
    console.log(res.claims);
  }
}
