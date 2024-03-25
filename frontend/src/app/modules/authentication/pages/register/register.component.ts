import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { RouterModule } from '@angular/router';

import { CATEGORIESINTEREST } from '../../../../shared/configs/category-interest.consts';
import { RegisterUserService } from '../../services/register-user.service';
import { CustomValidations } from '../../../../shared/validations/custom-validations.validations';
import { ResetForm } from '../../../../shared/utils/reset-form';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { GetFormControlError } from '../../../../shared/utils/get-form-control-error';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PichinchaDesignSystemModule,
    PichinchaReactiveControlsModule,
  ]
})
export class RegisterComponent {

  registerForm!: FormGroup;
  private registerUserService: RegisterUserService = inject(RegisterUserService);

  inputCheckedCategoryInterest: any = [];
  categorySelected = JSON.parse(JSON.stringify(CATEGORIESINTEREST));

  states: any = {
    name: { state: "", error: "" },
    email: { state: "", error: "" },
    password: { state: "", error: "" },
    rePassword: { state: "", error: "" }
  }
  specialState: any = {
    categoryInterest: { state: "", required: false }
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
    this.registerForm = this.fb.group({
      name: [null, [CustomValidations.required("Nombre de usuario es requerido")], CustomValidations.isExistUserName(this.registerUserService, "El nombre de usuario ya existe")],
      email: [null, [CustomValidations.required("Correo electronico es requerido"), CustomValidations.email("Formato del correo no válido")]],
      password: [null, [CustomValidations.required("Contraseña es requerido"), CustomValidations.password("Contraseña no cumple con los requisitos")]],
      rePassword: [null, [CustomValidations.required("Contraseña es requerido"), CustomValidations.password("Contraseña no cumple con los requisitos")]]
    }, {
      validator: CustomValidations.match("password", "rePassword", "Las contraseñsa no son iguales")
    });
  }

  submit(): void {

    //gets the form errors
    this.getError();
    let error: boolean = false;

    if (this.registerForm.invalid) {
      const errors: any = this.registerForm?.errors;
      if (errors)
        if (errors["mismatch"]) {
          this.states["rePassword"].state = "error";
          this.states["rePassword"].error = errors.mismatch;
        }
      this.registerForm.markAllAsTouched();
      error = true;
    }

    // customized validation for categories
    if (this.inputCheckedCategoryInterest.length < 3) {
      this.specialState["categoryInterest"].state = "error";
      this.specialState["categoryInterest"].required = true;
      error = true;
    }

    if (error) return;

    try {
      const body: RegisterUser = {
        name: this.registerForm.getRawValue().name,
        email: this.registerForm.getRawValue().email,
        password: this.registerForm.getRawValue().password,
        category: this.inputCheckedCategoryInterest
      }

      this.registerUserService.registerUser(body).subscribe({
        next: (response) => {
          if (response.message === "Created user") {
            this.setValueAlert("success", "El usuario se creo correctamente");
          }
        },
        error: () => this.setValueAlert("error", "Ops... Ocurrio un problema"),
        complete: () => {
          ResetForm.reset(this.registerForm);
          this.inputCheckedCategoryInterest = [];
          this.categorySelected = JSON.parse(JSON.stringify(CATEGORIESINTEREST));
          this.specialState["categoryInterest"].state = "";
          this.specialState["categoryInterest"].required = false;
        }
      })

    } catch (error: any) {
      this.setValueAlert("error", "Ops... Ocurrio un problema");
    }

  }

  getCategoryInterest(e: Event, index: number): void {
    const { detail } = e as unknown as CustomEvent;

    // add if a checkbox was checked
    if (detail.checked === true) {
      this.inputCheckedCategoryInterest.push((index + 1));
      this.categorySelected[index].value = true;
      return;
    }

    this.categorySelected[index].value = false;

    // remove if a checkbox was unchecked
    this.inputCheckedCategoryInterest = this.inputCheckedCategoryInterest.filter((e: any) => {
      return e !== (index + 1);
    })
  }

  getError(): void {
    Object.keys(this.states).forEach((key: string) => {
      const getError = GetFormControlError.error(this.registerForm.controls[key]);
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
