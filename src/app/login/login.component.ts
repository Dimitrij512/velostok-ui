import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/loginService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorOccured: Boolean;
  unexpectedErrorOccured: Boolean;
  authenticationErrorMessage = 'Неправильний логін або пароль';
  defaultErrorMessage = 'Сталася невідома помилка, спробуйте пізніше';
  hide = true;

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createEmptyForm();
  }

  createEmptyForm() {
    this.loginForm = this.fb.group({
      login: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    })
  }

  onSubmit() {
    this.errorOccured = false;
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(resp => this.errorOccured = !resp);
  }

  private authenticationErrorHandler(status: Number) {
    if (status === 401) { this.errorOccured = true }
    else { console.log('Error occured, status: ' + status), this.unexpectedErrorOccured = true }
  }

  facebookLogin(){
    this.loginService.facebookLogin();
  }

}
