import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  formData = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  phoneError: boolean = false;
  ageError: boolean = false;
  formInvalid: boolean = false;
  isNextClicked: boolean = false;
  passwordError: boolean = false;

  constructor(private router: Router) { }

  onSubmit() {
    this.isNextClicked = true;

    if (this.checkFormInvalid()) {
      this.formInvalid = true;
      return;
    }
    else if (this.passwordError) {
      if (this.formData.password != this.formData.confirmPassword) {
        alert('Password ไม่ถูกต้อง')
        this.clearPassword();
      }
      this.passwordError = true;
      return; 
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  cancel() {
    this.clearForm();
  }

  clearForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.ageError = false;
    this.passwordError = false;
    this.formInvalid = false;
    this.phoneError = false;
  }

  clearPassword(){
    this.formData.password = '';
    this.formData.confirmPassword = '';
  }

  checkPhone(event: any) {
    let value = event.target.value.replace(/[^0-9]/g, '');
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    event.target.value = value;
    this.phoneError = value.length < 10;
  }

  checkAge(event: any) {
    let value = event.target.value.replace(/[^0-9]/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    event.target.value = value;
  }

  checkPassword() {
    this.passwordError = this.formData.password.length < 8;
  }
  checkFormInvalid(): boolean {
    return (
      this.formData.firstName.trim() === '' ||
      this.formData.lastName.trim() === '' ||
      this.formData.age.trim() === '' ||
      this.formData.gender === null ||
      this.formData.phone.trim() === '' ||
      this.formData.email.trim() === '' ||
      this.formData.password.trim() === '' ||
      this.formData.confirmPassword.trim() === '' ||
      this.phoneError ||
      this.ageError
    );
  }

  isValidEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.formData.email.trim());
  }

}
