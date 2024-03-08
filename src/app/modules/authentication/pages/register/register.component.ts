import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { categoriesInterest } from '../../configs/category-interest';
import { RegisterUserService } from '../../services/register-user.service';
import { SpecialValidations } from '../../../../shared/validators/special-validations';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { GetFormValidationErrors } from '../../../../shared/utils/get-form-validation-errors';
import { ResetForm } from '../../../../shared/utils/reset-form';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  inputCheckedCategoryInterest: any = [];
  categorySelected = [...categoriesInterest];
  states: any = {
    "name": {
      state: "",
      required: false
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


  constructor(private fb: FormBuilder, private service: RegisterUserService) {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), SpecialValidations.password]],
      rePassword: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit(): Promise<void> {
    GetFormValidationErrors.Errors(this.registerForm, this.states);

    if (this.inputCheckedCategoryInterest.length < 3) {
      this.states["categoryInterest"].state = "error";
      this.states["categoryInterest"].required = true;
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.rePassword) {
      this.states["rePassword"].state = "error";
      this.states["rePassword"].compare = true;
      return;
    }

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    try {
      const isExistUser = await this.service.isExistName(this.registerForm.value.name);
      if (isExistUser.exists) {
        this.setValueAlert("error", "El usuario ya existe");
        return;
      }

      const body: RegisterUser = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        category: this.inputCheckedCategoryInterest
      }

      const response = await this.service.Post(body);
      if (response.message === "Created user") {
        this.setValueAlert("success", "El usuario se creo correctamente");
        ResetForm.reset(this.registerForm);
        this.inputCheckedCategoryInterest = [];
        this.categorySelected = [...categoriesInterest];
      }

    } catch (error: any) {
      this.setValueAlert("error", "Ops... Ocurrio un problema");
    }
  }

  getCategoryInterest(e: Event, index: number) {
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

  trackByFn(index: number) {
    return index;
  }

}
