import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email = '';
  password = '';

  formInvalid: boolean = false;
  isNextClicked: boolean = false;
  passwordError:boolean = false;

  constructor (private router: Router) {}

  onSubmit() {
    this.isNextClicked = true;
    if (!this.checkFormInvalid() && this.isValidEmail() && !this.passwordError === true) {
      console.log('Form is valid');
      this.router.navigateByUrl('/main');
    } 
    else {
      console.log('Form is invalid');
    }
  };

  checkFormInvalid(): boolean {
    this.formInvalid = (this.email.trim() === '' || this.password.trim() === '');
    return this.formInvalid;
  }

  isValidEmail(): boolean {
    return this.email.includes('@') && this.email.includes('.');
  }

  checkPassword(){
    this.passwordError = this.password.length < 8;
  }

}
