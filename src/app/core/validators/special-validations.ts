import { AbstractControl } from "@angular/forms";

export class SpecialValidations {

  static password(control: AbstractControl): any {
    if (!control?.value) return;
    const urlRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!$%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isCorrect = urlRegex.test(control?.value);
    if (isCorrect) return null;
    return { [`password_invalid_format`]: true };
  };

}
