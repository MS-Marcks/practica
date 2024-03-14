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

  /**
   * Description: custom function to validate if a field is required, in which a custom message for the error can be placed
   *
   * @static function
   * @param {?string} [message] message that will be displayed if the error exists
   * @returns {ValidatorFn} Returns error validation
   */
  static required(message?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const error = Validators.required(control);
      return error ? { required: this.getMessage("required", message) } : null
    }
  }

  /**
   * Description: custom function to validate if a field complies with being an email, in which you can put a custom message for the error
   *
   * @static function
   * @param {?string} [message] message that will be displayed if the error exists
   * @returns {ValidatorFn} Returns error validation
   */
  static email(message?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const error = Validators.email(control);
      return error ? { email: this.getMessage("email", message) } : null
    }
  }

  /**
   * Description: custom function to validate if a field meets the requirements of a secure password, in which a custom message for the error can be placed
   *
   * @static function
   * @param {?string} [message] message that will be displayed if the error exists
   * @returns {ValidatorFn} Returns error validation
   */
  static password(message?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const urlRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!$%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const isCorrect = urlRegex.test(control?.value);
      if (isCorrect) return null;
      return { passowrd: this.getMessage("passowrd", message) }
    }
  }

  /**
   * Description: custom function to validate if a field complies with the format of a link, in which a custom message can be set for the error
   *
   * @static function
   * @param {?string} [message] message that will be displayed if the error exists
   * @returns {ValidatorFn} Returns error validation
   */
  static url(message?: string): ValidatorFn {
    return (control: AbstractControl) => {
      const urlRegex = /^https:\/\/[^ "]+$/;
      const isCorrect = urlRegex.test(control?.value);
      if (isCorrect) return null;
      return { url: this.getMessage("url", message) }
    }
  }

  /**
   * Description: custom function to validate if two fields have the same value, in which you can put a custom message for the error
   *
   * @static function
   * @param {string} firstControlName name control form
   * @param {string} secondControlName  name control form
   * @param {?string} [message] message that will be displayed if the error exists
   * @returns {(fg: FormGroup) => { mismatch: string; }}  Returns error validation
   */
  static match(firstControlName: string, secondControlName: string, message?: string) {
    return (fg: FormGroup) => {
      if (fg.get(firstControlName)?.value === fg.get(secondControlName)?.value) {
        return null;
      }
      return { mismatch: this.getMessage("url", message) }
    }
  }

  /**
   * Description:  custom function to validate if a record has already been created, in which a custom message can be set for the error
   *
   * @static function
   * @param {RegisterUserService} registerUserService service
   * @param {?string} [message] message that will be displayed if the error exists
   * @returns {AsyncValidatorFn} Returns error validation
   */
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

  /**
   * Description: obtain the value of the default error if in each case a custom one does not exist
   *
   * @private
   * @static function
   * @param {keyof typeof VALIDATOR_MESSAGE_DEFAULT} type error control
   * @param {?string} [message] message that will be displayed if the error exists
   * @param {?{ [key: string]: unknown }[]} [paramsMessage] message that will be displayed if the error exists
   * @returns {string} new message error control
   */
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
