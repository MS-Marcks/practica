import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ResetForm } from './reset-form';

describe('ResetForm', () => {
  it('The form is correctly emptied', () => {
    const form: FormGroup = new FormBuilder().group({
      name: ["hello"],
      lastName: ["world"]
    });
    expect(form.controls["name"].getRawValue()).toEqual("hello");
    expect(form.controls["lastName"].getRawValue()).toEqual("world");
    ResetForm.reset(form);
    expect(form.controls["name"].getRawValue()).toBeNull();
    expect(form.controls["lastName"].getRawValue()).toBeNull();
  });
});
