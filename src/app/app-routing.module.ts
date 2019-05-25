import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { LoadingComponent } from './loading/loading.component';
import { EditComponent } from './edit/edit.component';
import { InitGuard } from './shared/guards/init.guard';

const routes: Routes = [
  {path: '', component: LoadingComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [InitGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [LoggedInGuard, InitGuard]},
  {path: 'edit', component: EditComponent, canActivate: [LoggedInGuard, InitGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
