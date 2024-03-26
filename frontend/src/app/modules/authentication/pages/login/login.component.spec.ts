import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { LoginComponent } from './login.component';
import { LoginUserService } from '../../services/login-user.service';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { LoginUser } from '../../../../shared/interfaces/login-user.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DATA_LOGIN_USER, USER } from '../../mocks/login-user.mock';
import { Observable } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: any;

  let loginUserService: LoginUserService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule,
        HttpClientTestingModule
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
    loginUserService = TestBed.inject(LoginUserService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
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

  test("Should send Login request", () => {
    const body: LoginUser = DATA_LOGIN_USER;
    const user: User = USER;

    jest.spyOn(loginUserService, "login").mockReturnValue(new Observable<User>((suscriber) => {
      suscriber.next(user)
      suscriber.complete();
    }))

    loginUserService.login(body).subscribe(response => {
      expect(response).toEqual(user);
    })
  })

  test("Should save token to localStorage", () => {
    const user: User = USER;
    jest.spyOn(localStorage, "setItem");
    loginUserService.saveToken(user);
    expect(localStorage.setItem).toHaveBeenLastCalledWith("user", JSON.stringify(user))
  })

});
