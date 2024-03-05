import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from '../../../../../src/app/modules/authentication/pages/register/register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Validar: Todos los campos deben ser obligatorios", () => {
    component.onSubmit();
    fixture.detectChanges();
    const userName = compiled.querySelector("#username-help");
    const email = compiled.querySelector("#email-help");
    const password = compiled.querySelector("#password-help");
    const rePassword = compiled.querySelector("#repassword-help");
    const categoryInterest = component.categoryInterest;
    expect(userName?.textContent).toContain("Nombre de usuario es requerido");
    expect(email?.textContent).toContain("Correo es requerido");
    expect(password?.textContent).toContain("Contraseña requerida");
    expect(rePassword?.textContent).toContain("Contraseña requerida");
    expect(categoryInterest.length).toBeGreaterThanOrEqual(3);
  })

  it("Validar: Rango de la contraseña ingresada", () => {
    component.onSubmit();
    fixture.detectChanges();
    const userName = compiled.querySelector("#username-help");
    const email = compiled.querySelector("#email-help");
    const password = compiled.querySelector("#password-help");
    const rePassword = compiled.querySelector("#repassword-help");
    const categoryInterest = component.categoryInterest;
    expect(userName?.textContent).toContain("Nombre de usuario es requerido");
    expect(email?.textContent).toContain("Correo es requerido");
    expect(password?.textContent).toContain("Contraseña requerida");
    expect(rePassword?.textContent).toContain("Contraseña requerida");
    expect(categoryInterest.length).toBeGreaterThanOrEqual(3);
  })

});
