import { TestBed } from '@angular/core/testing';

import { CustomValidations } from './custom-validations.validations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegisterUserService } from '../../modules/authentication/services/register-user.service';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PrincipalInterceptorService } from '../interceptors/principal.interceptor.service';

const VALIDATOR_MESSAGE_DEFAULT = {
  required: "Este campo es requerido",
  email: "Formato del correo electronico invalido",
  password: "Contraseña no cumple con los requisitos",
  url: "Url requerido",
  mismatch: "Los campos deben ser iguales",
  existField: "Ya existe el campo"
}

describe('CustomValidations', () => {

  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let registerUserService: RegisterUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: PrincipalInterceptorService,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    registerUserService = TestBed.inject(RegisterUserService);
  });

  it('The default message of the required custom validation is displayed when not specified.', () => {
    const validator = CustomValidations.required();
    const control = new FormControl(null);
    const result: any = validator(control);
    expect(result["required"]).toBe(VALIDATOR_MESSAGE_DEFAULT.required);
  });

  it('The default message of the custom email validation is displayed when not specified.', () => {
    const validator = CustomValidations.email();
    const control = new FormControl("example");
    const result: any = validator(control);
    expect(result["email"]).toBe(VALIDATOR_MESSAGE_DEFAULT.email);
  });

  it('The default message of the custom password validation is displayed when not specified.', () => {
    const validator = CustomValidations.password();
    const control = new FormControl(null);
    const result: any = validator(control);
    expect(result["password"]).toBe(VALIDATOR_MESSAGE_DEFAULT.password);
  });

  it('The default message of custom url validation is displayed when not specified.', () => {
    const validator = CustomValidations.url();
    const control = new FormControl(null);
    const result: any = validator(control);
    expect(result["url"]).toBe(VALIDATOR_MESSAGE_DEFAULT.url);
  });

  it('The default custom validation message of not equal is displayed when not specified.', () => {
    const form: any = new FormBuilder().group({
      password: ["hello"],
      rePassword: ["world"]
    }, {
      validator: CustomValidations.match("password", "rePassword")
    });

    expect(form.errors["mismatch"]).toBe(VALIDATOR_MESSAGE_DEFAULT.mismatch);
  });


  it('The default message of the custom validation of exists user is displayed when not specified.', () => {
    const form: FormGroup = new FormBuilder().group({
      userName: ["ksuarez",[],CustomValidations.isExistUserName(registerUserService)],
    });
     expect(form.controls["userName"].errors).toBeNull();
  });

  it('The custom message of the required custom validation is displayed when not indicated.', () => {
    const validator = CustomValidations.required("El campo nombre es requerido");
    const control = new FormControl(null);
    const result: any = validator(control);
    expect(result["required"]).toBe("El campo nombre es requerido");
  });


  it('Custom email validation custom message is displayed when not indicated.', () => {
    const validator = CustomValidations.email("El formato del correo electronico es invalido");
    const control = new FormControl("example");
    const result: any = validator(control);
    expect(result["email"]).toBe("El formato del correo electronico es invalido");
  });

  it('Custom password validation custom message is displayed when not indicated.', () => {
    const validator = CustomValidations.password("La contraseña no cumple con el formato requerido");
    const control = new FormControl(null);
    const result: any = validator(control);
    expect(result["password"]).toBe("La contraseña no cumple con el formato requerido");
  });

  it('Custom url validation custom message is displayed when not specified.', () => {
    const validator = CustomValidations.url("El enlace no cumple con la estructura requerida");
    const control = new FormControl(null);
    const result: any = validator(control);
    expect(result["url"]).toBe("El enlace no cumple con la estructura requerida");
  });

  it('The custom message of the custom validation of not equal is displayed when not indicated.', () => {
    const form: any = new FormBuilder().group({
      password: ["hello"],
      rePassword: ["world"]
    }, {
      validator: CustomValidations.match("password", "rePassword", "Las contraseñas deben ser iguales")
    });

    expect(form.errors["mismatch"]).toBe("Las contraseñas deben ser iguales");
  });

  it('Custom validation of required is NULL when the field complies with the requirement', () => {
    const validator = CustomValidations.required("El campo nombre es requerido");
    const control = new FormControl("Example");
    const result: any = validator(control);
    expect(result).toBeNull();
  });

  it('Custom email validation is NULL when the field meets the required criteria.', () => {
    const validator = CustomValidations.email("El formato del correo electronico es invalido");
    const control = new FormControl("example@gmail.com");
    const result: any = validator(control);
    expect(result).toBeNull();
  });

  it('Custom password validation is NULL when the field meets the requirement', () => {
    const validator = CustomValidations.password("La contraseña no cumple con el formato requerido");
    const control = new FormControl("@qQ123dDe123");
    const result: any = validator(control);
    expect(result).toBeNull();
  });

  it('Custom url validation is NULL when the field complies with the requirement', () => {
    const validator = CustomValidations.url("El enlace no cumple con la estructura requerida");
    const control = new FormControl("https://google.com");
    const result: any = validator(control);
    expect(result).toBeNull();
  });

  it('Custom validation of equality is NULL when the field meets the requirement', () => {
    const form: any = new FormBuilder().group({
      password: ["hello"],
      rePassword: ["hello"]
    }, {
      validator: CustomValidations.match("password", "rePassword", "Las contraseñas deben ser iguales")
    });

    expect(form.errors).toBeNull();
  });
});
