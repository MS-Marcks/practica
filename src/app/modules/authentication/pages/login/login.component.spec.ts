import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
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
});
