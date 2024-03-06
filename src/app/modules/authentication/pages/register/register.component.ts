import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RegisterUserService } from 'src/app/core/services/authentication/register-user.service';
import { SpecialValidations } from 'src/app/core/validators/special-validations';
import { RegisterUser } from 'src/app/shared/interfaces/register-user';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  inputCheckedCategoryInterest: any = [];
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
      password: [null, [Validators.required, Validators.minLength(8), SpecialValidations.password("password")]],
      rePassword: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit(): Promise<void> {
    this.getFormValidationErrors();

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.inputCheckedCategoryInterest.length < 3) {
      this.states["categoryInterest"].state = "error";
      this.states["categoryInterest"].required = true;
      return;
    }

    try {
      const isExistUser = await this.service.isExistName(this.registerForm.value.name);
      if (isExistUser.exists) {
        this.alert.type = "error";
        this.alert.description = "El usuario ya existe";
        this.alert.show = true;
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
        this.registerForm.reset();
        this.inputCheckedCategoryInterest = [];
      }

    } catch (error: any) {
      this.setValueAlert("error", "Ops... Ocurrio un problema");
    }
  }

  getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors: any = this.registerForm.get(key)?.errors;
      Object.keys(this.states[key]).forEach(keyError => {
        if (keyError === "state") {
          this.states[key].state = "";
        } else {
          this.states[key][keyError] = false;
        }
      });
      if (controlErrors === null) {
        return;
      }
      Object.keys(controlErrors).forEach(keyError => {
        this.states[key].state = "error";
        this.states[key][keyError] = true;
      });
    });

    if (this.registerForm.value.password !== this.registerForm.value.rePassword) {
      this.states["rePassword"].state = "error";
      this.states["rePassword"].compare = true;
    }

    this.states["categoryInterest"].state = "";
    this.states["categoryInterest"].required = false;
  }

  getCategoryInterest(e: Event) {
    const { detail } = e as unknown as CustomEvent;

    if (detail.checked === true) {
      this.inputCheckedCategoryInterest.push(detail.value);
      return;
    }

    this.inputCheckedCategoryInterest = this.inputCheckedCategoryInterest.filter((e: any) => {
      return e !== detail.value;
    })
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
