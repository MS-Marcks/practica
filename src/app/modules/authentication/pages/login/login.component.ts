import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUserService } from 'src/app/core/services/authentication/login-user.service';
import { SpecialValidations } from 'src/app/core/validators/special-validations';
import { LoginUser } from 'src/app/shared/interfaces/login-user.interface';
import { GetFormValidationErrors } from 'src/app/shared/utils/get-form-validation-errors';
import { ResetForm } from 'src/app/shared/utils/reset-form';

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
      required: false,
      password_invalid_format: false
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
      password: [null, [Validators.required, Validators.min(8), SpecialValidations.password]]
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
      ResetForm.reset(this.loginForm);

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
