import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path: '', component:WelcomePageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'main', component:MainPageComponent},
  {path: 'register', component:RegisterPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
