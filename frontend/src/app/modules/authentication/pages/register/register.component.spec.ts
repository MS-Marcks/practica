import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { RegisterComponent } from './register.component';
import { RegisterUserService } from '../../services/register-user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { RegisterUser } from '../../interfaces/register-user.interface';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let compiled: any;
  let registerService: RegisterUserService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule,
        RegisterComponent
      ],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, RegisterUserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    registerService = TestBed.inject(RegisterUserService)
  })

  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  test('Reject form submission because it is empty', () => {
    component.submit();
    fixture.detectChanges();

    const name = compiled.querySelector('pichincha-input[data-test="name"]');
    const email = compiled.querySelector('pichincha-input[data-test="email"]')
    const password = compiled.querySelector('pichincha-input[data-test="password"]')
    const rePassword = compiled.querySelector('pichincha-input[data-test="rePassword"]')
    const categories = compiled.querySelector('pichincha-input-message[data-test="category"]')

    expect(name?.errorHelper).toContain("Nombre de usuario es requerido");
    expect(email?.errorHelper).toContain("Correo electronico es requerido");
    expect(password?.errorHelper).toContain("Contraseña es requerido");
    expect(rePassword?.errorHelper).toContain("Contraseña es requerido");
    expect(categories.state).toContain("error");
  });

  test('Email formatting is not complied with', () => {
    component.registerForm.get("email")?.setValue("example");
    component.submit();
    fixture.detectChanges();
    const email = compiled.querySelector('pichincha-input[data-test="email"]')
    expect(email?.errorHelper).toContain("Formato del correo no válido");
  });

  test('If email formatting is complied with', () => {
    component.registerForm.get("email")?.setValue("example@gmail.com");
    component.submit();
    fixture.detectChanges();
    const email = compiled.querySelector('pichincha-input[data-test="email"]')
    expect(email?.errorHelper).toContain("");
  });

  test('Password format is not complied with', () => {
    component.registerForm.get("password")?.setValue("11111");
    component.submit();
    fixture.detectChanges();
    const password = compiled.querySelector('pichincha-input[data-test="password"]')
    expect(password?.errorHelper).toContain("Contraseña no cumple con los requisitos");
  });

  test('Si se cumple con formato de la contraseña', () => {
    component.registerForm.get("password")?.setValue("@qSs123@@w");
    component.submit();
    fixture.detectChanges();
    const password = compiled.querySelector('pichincha-input[data-test="password"]')
    expect(password?.errorHelper).toContain("");
  });

  test('If password format is complied with', () => {
    component.registerForm.get("password")?.setValue("11111");
    component.registerForm.get("rePassword")?.setValue("@qSs123@@w");
    component.submit();
    fixture.detectChanges();
    const password = compiled.querySelector('pichincha-input[data-test="rePassword"]')
    expect(password?.errorHelper).toContain("Las contraseñsa no son iguales");
  });

  test('Passwords are the same', () => {
    component.registerForm.get("password")?.setValue("@qSs123@@w");
    component.registerForm.get("rePassword")?.setValue("@qSs123@@w");
    component.submit();
    fixture.detectChanges();
    const password = compiled.querySelector('pichincha-input[data-test="rePassword"]')
    expect(password?.errorHelper).toContain("");
  });

  test('Alerts are displayed correctly', () => {
    component.setValueAlert("error", "error");
    fixture.detectChanges();
    const alert = compiled.querySelector('pichincha-alerts[data-test="alert"]')
    expect(alert.description).toContain("error");
  });


  test('Successfully Register', () => {
    const body: RegisterUser = {
      name: "gq",
      email: "pruebaa@gmail.com",
      password: "@qQs12321312",
      category: [1, 2, 3]
    }
    component.registerForm.get("name")?.setValue(body.name);
    component.registerForm.get("email")?.setValue(body.email);
    component.registerForm.get("password")?.setValue(body.password);
    component.registerForm.get("rePassword")?.setValue(body.password);
    component.inputCheckedCategoryInterest = body.category;
    const service = jest.spyOn(registerService, "registerUser");

    component.submit();
    fixture.detectChanges();
    expect(service).toHaveBeenCalled()
  });


  test('The value of the alert was correctly changed to false', () => {
    component.alert.show = true;
    expect(component.alert.show).toEqual(true);
    component.handleClickCloseEvent();
    expect(component.alert.show).toEqual(false);
  });
});

