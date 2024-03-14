import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginUserService } from '../../services/login-user.service';
import { LoginUser } from '../../../../shared/interfaces/login-user.interface';
import { ResetForm } from '../../../../shared/utils/reset-form';
import { GetFormControlError } from 'src/app/shared/utils/get-form-control-error';
import { SpecialValidations } from 'src/app/shared/validators/special-validations';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm!: FormGroup;
  private loginUserService: LoginUserService = inject(LoginUserService);

  states: any = {
    email: { state: "", error: "" },
    password: { state: "", error: "" }
  }

  alert = {
    type: "error",
    description: "",
    show: false,
    autoClose: true,
    closeTime: 5000
  }

  constructor(private fb: FormBuilder) {
    this.buildForm()
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [SpecialValidations.required("El correo electronico es requerido"), SpecialValidations.email("Formato del correo no válido")]],
      password: [null, [SpecialValidations.required("La contraseña es requerido"), SpecialValidations.password()]]
    });
  }

  submit(): void {

    // gets the form errors
    this.getError();

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

  getError(): void {
    Object.keys(this.states).forEach((key: string) => {
      const getError = GetFormControlError.error(this.loginForm.controls[key]);
      this.states[key] = getError;
    })
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
