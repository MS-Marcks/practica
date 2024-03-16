import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../shared/interceptors/principal.interceptor.service';
import { RegisterUserService } from './register-user.service';
import { RegisterUser } from '../interfaces/register-user.interface';
import { ExtraRegister } from '../interfaces/extra-register.interface';


describe('RegisterUserService', () => {
  let registerUserservice: RegisterUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }],
    });
    registerUserservice = TestBed.inject(RegisterUserService);
  });

  test('The service is created correctly', () => {
    expect(registerUserservice).toBeTruthy();
  });

  test('the user already exists', (done) => {
    const body: string = "ksuarez";
    registerUserservice.isExistName(body).subscribe({
      next: (response: ExtraRegister) => {
        expect(response.exists).toBe(true)
        done()
      },
      error: (error) => { console.error(error) },
      complete: () => { }
    });
  });

  test('the user does not exist', (done) => {
    const body: string = "ksuarez1";
    registerUserservice.isExistName(body).subscribe({
      next: (response: ExtraRegister) => {
        expect(response.exists).toBe(false)
        done()
      },
      error: (error) => { console.error(error) },
      complete: () => { }
    });
  });

  test('A new user is registered', (done) => {
    const body: RegisterUser = {
      name: "David",
      email: "david@gmail.com",
      password: "@Dd1234567",
      category: [1, 2, 3]
    }
    registerUserservice.registerUser(body).subscribe({
      next: (response: ExtraRegister) => {
        expect(response.message).toBe("Created user")
        done()
      },
      error: (error) => { },
      complete: () => { }
    });
  });
});
