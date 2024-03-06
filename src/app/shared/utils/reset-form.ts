import { FormGroup } from "@angular/forms";

export class ResetForm {
  static reset(form: FormGroup): void {
    Object.keys(form.controls).forEach((key: string) => {
      form.get(key)?.setValue("1");
      form.get(key)?.setValue(null);
    });
  }
}
