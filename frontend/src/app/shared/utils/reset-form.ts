import { FormGroup } from "@angular/forms";

export class ResetForm {
  /**
   * Description: function to reset all values of a form
   *
   * @static function
   * @param {FormGroup} form group
   */
  static reset(form: FormGroup): void {
    Object.keys(form.controls).forEach((key: string) => {
      form.get(key)?.setValue("1");
      form.get(key)?.setValue(null);
    });
  }
}
