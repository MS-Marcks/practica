import { FormGroup } from "@angular/forms";

export class GetFormValidationErrors {

  static Errors(form: FormGroup, states: any): void {
    Object.keys(form.controls).forEach((key: string) => {
      const controlErrors: any = form.get(key)?.errors;
      Object.keys(states[key]).forEach(keyError => {
        if (keyError === "state") {
          states[key].state = "";
        } else {
          states[key][keyError] = false;
        }
      });
      if (controlErrors === null) {
        return;
      }
      Object.keys(controlErrors).forEach(keyError => {
        states[key].state = "error";
        states[key][keyError] = true;
      });
    });
  }

}
