import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { RegisterUserService } from "src/app/modules/authentication/services/register-user.service";

export class SpecialValidations {

  static password(control: AbstractControl): any {
    if (!control?.value) return;
    const urlRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!$%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isCorrect = urlRegex.test(control?.value);
    if (isCorrect) return null;
    return { [`password_invalid_format`]: true };
  };

  static url(control: AbstractControl): any {
    if (!control?.value) return;
    const urlRegex = /^https:\/\/[^ "]+$/;
    const isURL = urlRegex.test(control?.value);
    if (isURL) return null;
    return { [`url_invalid_format`]: true };
  }

  static isExistUserName(registerUserService: RegisterUserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = (control.value as string).trim();
      return registerUserService
        .isExistName(username)
        .pipe(map(isExisting => (isExisting.exists ? { [`exist_username`]: true } : null)));
    };
  }

  static match(firstControlName: string, secondControlName: string) {
    return (fg: FormGroup) => {
      return fg.get(firstControlName)?.value === fg.get(secondControlName)?.value ? null : { ["mismatch"]: true };
    };
  }
}
