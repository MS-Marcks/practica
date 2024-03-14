import { AbstractControl } from "@angular/forms";

const ERROS_DEFAULT: any = {
  required: "Este campo es requerido",
  email: "Formato del correo electronico invalido",
  passowrd: "Contraseña no cumple con los requisitos",
  url: "Url requerido",
  mismatch: "Los campos deben ser iguales",
  existField: "Ya existe el campo"
}

export class GetFormControlError {

  static error(formControl: AbstractControl): { error: string, state: string } {
    if (!formControl.errors) return { error: "", state: "" };

    const firstErrorKey = Object.keys(formControl.errors!)[0];
    if (formControl.errors[firstErrorKey] === true) {
      return { error: ERROS_DEFAULT[firstErrorKey], state: "error" };
    }
    return { error: formControl.errors![firstErrorKey], state: "error" };
  }
}
