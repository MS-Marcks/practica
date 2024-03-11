import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';

import { CATEGORIESINTEREST } from '../../../../shared/configs/category-interest.consts';
import { RegisterUserService } from '../../services/register-user.service';
import { SpecialValidations } from '../../../../shared/validators/special-validations';
import { GetFormValidationErrors } from '../../../../shared/utils/get-form-validation-errors';
import { ResetForm } from 'src/app/shared/utils/reset-form';
import { RegisterUser } from '../../interfaces/register-user.interface';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PichinchaDesignSystemModule,
    PichinchaReactiveControlsModule,
  ]
})
export class RegisterComponent {

  registerForm!: FormGroup;
  private registerUserService: RegisterUserService = inject(RegisterUserService);

  inputCheckedCategoryInterest: any = [];
  categorySelected = [...CATEGORIESINTEREST];
  states: any = {
    "name": {
      state: "",
      required: false,
      exist_username: false
    },
    "email": {
      state: "",
      required: false,
      email: false
    },
    "password": {
      state: "",
      required: false,
      password_invalid_format: false
    },
    "rePassword": {
      state: "",
      required: false,
      compare: false
    },
    "categoryInterest": {
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


  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required], SpecialValidations.isExistUserName(this.registerUserService)],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), SpecialValidations.password]],
      rePassword: [null, [Validators.required, Validators.minLength(8)]]
    }, {
      validator: SpecialValidations.match("password", "rePassword")
    });
  }

  submit(): void {
    GetFormValidationErrors.Errors(this.registerForm, this.states);

    if (this.registerForm.invalid) {
      const errors: any = this.registerForm?.errors;
      if (errors["mismatch"]) {
        this.states["rePassword"].state = "error";
        this.states["rePassword"].compare = true;
      }
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.inputCheckedCategoryInterest.length < 3) {
      this.states["categoryInterest"].state = "error";
      this.states["categoryInterest"].required = true;
      return;
    }

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
          this.categorySelected = [...CATEGORIESINTEREST];
        }
      })

    } catch (error: any) {
      this.setValueAlert("error", "Ops... Ocurrio un problema");
    }
  }

  getCategoryInterest(e: Event, index: number): void {
    const { detail } = e as unknown as CustomEvent;

    if (detail.checked === true) {
      this.inputCheckedCategoryInterest.push((index + 1));
      this.categorySelected[index].value = true;
      return;
    }
    this.categorySelected[index].value = false;
    this.inputCheckedCategoryInterest = this.inputCheckedCategoryInterest.filter((e: any) => {
      return e !== (index + 1);
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

  trackByFn(index: number): number {
    return index;
  }

}
