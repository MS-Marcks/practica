import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { LoginComponent } from './login.component';
import { LoginUserService } from '../../services/login-user.service';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { LoginUser } from '../../../../shared/interfaces/login-user.interface';
import { User } from '../../../../shared/interfaces/user.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: any;

  let loginUserservice: LoginUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule
      ],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, LoginUserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    loginUserservice = TestBed.inject(LoginUserService);
  })

  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  test('Reject form submission because it is empty', () => {
    component.submit();
    fixture.detectChanges();

    const email = compiled.querySelector('pichincha-input[data-test="email"]')
    const password = compiled.querySelector('pichincha-input[data-test="password"]')

    expect(email?.errorHelper).toContain("El correo electronico es requerido");
    expect(password?.errorHelper).toContain("La contraseña es requerido");

  });

  test('Email formatting is not complied with', () => {
    component.loginForm.get("email")?.setValue("example");
    component.submit();
    fixture.detectChanges();
    const email = compiled.querySelector('pichincha-input[data-test="email"]')
    expect(email?.errorHelper).toContain("Formato del correo no válido");
  });

  test('If email formatting is complied with', () => {
    component.loginForm.get("email")?.setValue("example@gmail.com");
    component.submit();
    fixture.detectChanges();
    const email = compiled.querySelector('pichincha-input[data-test="email"]')
    expect(email?.errorHelper).toContain("");
  });

  test('Password format is not complied with', () => {
    component.loginForm.get("password")?.setValue("11111");
    component.submit();
    fixture.detectChanges();
    const password = compiled.querySelector('pichincha-input[data-test="password"]')
    expect(password?.errorHelper).toContain("Contraseña no cumple con los requisitos");
  });

  test('If password format is complied with', () => {
    component.loginForm.get("password")?.setValue("@qSs123@@w");
    component.submit();
    fixture.detectChanges();
    const password = compiled.querySelector('pichincha-input[data-test="password"]')
    expect(password?.errorHelper).toContain("");
  });

  test('Alerts are displayed correctly', () => {
    component.setValueAlert("error", "error");
    fixture.detectChanges();
    const alert = compiled.querySelector('pichincha-alerts[data-test="alert"]')
    expect(alert.description).toContain("error");
  });

  test('Alerts are closed correctly', () => {
    component.handleClickCloseEvent();
    fixture.detectChanges();
    expect(component.alert.show).toBe(false);
  });

  test('Successfully logged in', () => {
    const body: LoginUser = {
      username: "albert-dominguez@gmail.com",
      password: "@Dd1234567"
    }
    component.loginForm.get("email")?.setValue(body.username);
    component.loginForm.get("password")?.setValue(body.password);
    const service = jest.spyOn(loginUserservice, "login");
    component.submit();
    fixture.detectChanges();
    expect(service).toHaveBeenCalled()
  });
});
