import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUserService } from 'src/app/core/services/authentication/login-user.service';
import { LoginUser } from 'src/app/shared/interfaces/login-user';
import { GetFormValidationErrors } from 'src/app/shared/utils/get-form-validation-errors';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  states: any = {
    "email": {
      state: "",
      required: false,
      email: false
    },
    "password": {
      state: "",
      required: false
    }
  }

  alert = {
    type: "error",
    description: "",
    show: false,
    autoClose: true,
    closeTime: 5000
  }

  constructor(private fb: FormBuilder, private service: LoginUserService) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    GetFormValidationErrors.Errors(this.loginForm, this.states);

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {
      const body: LoginUser = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }
      const response = await this.service.login(body);
      this.service.saveToken(response);
    } catch (error: any) {
      if (error.status === 401) {
        this.setValueAlert("error", error.error.message);
        return;
      }
      this.setValueAlert("error", "Ops... Ocurrio un problema");
    }
  }

  setValueAlert(alertType: string, message: string): void {
    this.alert.type = alertType;
    this.alert.description = message;
    this.alert.show = true;
  }

  handleClickCloseEvent() {
    this.alert.show = false;
  }

}
