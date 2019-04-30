import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { LoggedInGuard } from './shared/guards/logged-in.guard';

const routes: Routes = [
  {path: '', component: ChatComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
