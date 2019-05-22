import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './messages/message/message.component';
import { SendComponent } from './messages/send/send.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseModule } from './shared/modules/firebase.module';
import { MaterialModule } from './shared/modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatComponent,
    MessageComponent,
    SendComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FirebaseModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
