import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit(): Promise<void> {
    this.getFormValidationErrors();

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log("correct");
  }

  getFormValidationErrors() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const controlErrors: any = this.loginForm.get(key)?.errors;
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
  }

}
