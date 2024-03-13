import { AbstractControl } from "@angular/forms";

// TODO: CAMBIAR EL TIPADO
const ERROS_DEFAULT: any = {
  required: "Este campo es requerido",
  email: "Formato del correo electronico invalido",
  passowrd: "Contraseña no cumple con los requisitos"
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
