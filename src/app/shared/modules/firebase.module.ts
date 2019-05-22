import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.config)
  ]
})
export class FirebaseModule { }
