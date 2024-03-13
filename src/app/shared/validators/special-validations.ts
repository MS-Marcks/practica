import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Observable, map } from "rxjs";
import { RegisterUserService } from "src/app/modules/authentication/services/register-user.service";

const VALIDATOR_MESSAGE_DEFAULT = {
  required: "Este campo es requerido",
  email: "Formato del correo electronico invalido",
  passowrd: "Contraseña no cumple con los requisitos",
  url: "Url requerido",
  mismatch: "Los campos deben ser iguales",
  existField: "Ya existe el campo"
}

export class SpecialValidations {

  static required(message?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const error = Validators.required(control);
      return error ? { required: this.getMessage("required", message) } : null
    }
  }

  static email(message?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const error = Validators.email(control);
      return error ? { email: this.getMessage("email", message) } : null
    }
  }

  static password(message?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const urlRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!$%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const isCorrect = urlRegex.test(control?.value);
      if (isCorrect) return null;
      return { passowrd: this.getMessage("passowrd", message) }
    }
  };

  static url(message?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const urlRegex = /^https:\/\/[^ "]+$/;
      const isCorrect = urlRegex.test(control?.value);
      if (isCorrect) return null;
      return { url: this.getMessage("url", message) }
    }
  }

  static match(firstControlName: string, secondControlName: string, message?: string) {
    return (fg: FormGroup) => {
      if (fg.get(firstControlName)?.value === fg.get(secondControlName)?.value) {
        return null;
      }

      return { mismatch: this.getMessage("url", message) }
    }
  }

  static isExistUserName(registerUserService: RegisterUserService, message?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = (control.value as string).trim();
      return registerUserService
        .isExistName(username)
        .pipe(
          map(isExisting => {
            if (!isExisting.exists) {
              return null;
            }
            return { existField: this.getMessage("existField", message) }
          })
        )
    };
  }

  private static getMessage(
    control: keyof typeof VALIDATOR_MESSAGE_DEFAULT,
    message?: string,
    paramsMessage?: { [key: string]: unknown }[]
  ) {
    if (message) return message;
    let messageControl = VALIDATOR_MESSAGE_DEFAULT[control];
    const existParams = paramsMessage && paramsMessage.length > 0
    if (existParams) {
      paramsMessage.forEach((params) => {
        Object.keys(params)
          .filter((key) => params[key])
          .forEach((key) => {
            messageControl = messageControl.replace(`\${${key}}`, params[key]!.toString())
          })
      })
      return messageControl;
    }
    return messageControl;
  }

}
