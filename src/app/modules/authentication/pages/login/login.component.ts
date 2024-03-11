import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUserService } from '../../services/login-user.service';
import { SpecialValidations } from '../../../../shared/validators/special-validations';
import { LoginUser } from '../../../../shared/interfaces/login-user.interface';
import { GetFormValidationErrors } from '../../../../shared/utils/get-form-validation-errors';
import { ResetForm } from '../../../../shared/utils/reset-form';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm!: FormGroup;
  private loginUserService: LoginUserService = inject(LoginUserService);

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

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8), SpecialValidations.password]]
    });
  }

  submit(): void {
    GetFormValidationErrors.Errors(this.loginForm, this.states);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    try {
      const body: LoginUser = {
        username: this.loginForm.getRawValue().email,
        password: this.loginForm.getRawValue().password,
      }

      this.loginUserService.login(body).subscribe({
        next: (response) => this.loginUserService.saveToken(response),
        error: (error) => {
          if (error.status === 401) {
            this.setValueAlert("error", error.error.message);
            return;
          }
          this.setValueAlert("error", "Ops... Ocurrio un problema");
        },
        complete: () => ResetForm.reset(this.loginForm)
      })

    } catch (error) {
      this.setValueAlert("error", "Ops... Ocurrio un problema");
    }
  }

  setValueAlert(alertType: string, message: string): void {
    this.alert.type = alertType;
    this.alert.description = message;
    this.alert.show = true;
  }

  handleClickCloseEvent(): void {
    this.alert.show = false;
  }

}
