import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SpecialValidations } from 'src/app/core/validators/special-validations';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  inputCheckedCategoryInterest: any = [];
  status: any = {
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

  constructor(private fb: FormBuilder) {
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

    console.log("correct");
  }

  getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors: any = this.registerForm.get(key)?.errors;
      Object.keys(this.status[key]).forEach(keyError => {
        if (keyError === "state") {
          this.status[key].state = "";
        } else {
          this.status[key][keyError] = false;
        }
      });
      if (controlErrors === null) {
        return;
      }
      Object.keys(controlErrors).forEach(keyError => {
        this.status[key].state = "error";
        this.status[key][keyError] = true;
      });
    });

    if (this.registerForm.value.password !== this.registerForm.value.rePassword) {
      this.status["rePassword"].state = "error";
      this.status["rePassword"].compare = true;
    }

    if (this.inputCheckedCategoryInterest.length < 3) {
      this.status["categoryInterest"].state = "error";
      this.status["categoryInterest"].required = true;
      return;
    }

    this.status["categoryInterest"].state = "";
    this.status["categoryInterest"].required = false;
  }

  getCategoryInterest(e: Event) {
    const { detail } = e as unknown as CustomEvent;

    if (detail.checked === true) {
      this.inputCheckedCategoryInterest.push(detail);
      return;
    }
    this.inputCheckedCategoryInterest = this.inputCheckedCategoryInterest.filter((e: any) => {
      return e.value !== detail.value;
    })
  }
}
