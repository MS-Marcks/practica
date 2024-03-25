import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GetFormControlError } from './get-form-control-error';

const ERROS_DEFAULT: any = {
  required: "Este campo es requerido",

}

describe('GetFormControlError', () => {
  it('Obtains errors correctly', () => {
    const form: FormGroup = new FormBuilder().group({
      name: [null,[Validators.required]]
    });
    const error = GetFormControlError.error(form.controls["name"]);
    expect(error.error).toEqual(ERROS_DEFAULT.required);
    expect(error.state).toEqual("error");

  });
});
