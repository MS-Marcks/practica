import { TestBed } from '@angular/core/testing';
import { LoginUserService } from './login-user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../shared/interceptors/principal.interceptor.service';
import { LoginUser } from '../../../shared/interfaces/login-user.interface';
import { User } from '../../../shared/interfaces/user.interface';


describe('LoginUserService', () => {
  let loginUserservice: LoginUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }],
    });
    loginUserservice = TestBed.inject(LoginUserService);
  });

  test('The service is created correctly', () => {
    expect(loginUserservice).toBeTruthy();
  });

  test('Successfully logged in', (done) => {
    const body: LoginUser = {
      username: "albert-dominguez@gmail.com",
      password: "@Dd1234567"
    }
    loginUserservice.login(body).subscribe({
      next: (response: User) => {
        console.log(response)
        expect(response.user.userId).not.toBeNull()
        done()
      },
      error: (error) => { },
      complete: () => { }
    });
  });

  test('Failed to log in correctly', (done) => {
    const body: LoginUser = {
      username: "albert-dominguez1@gmail.com",
      password: "@Dd1234567"
    }
    loginUserservice.login(body).subscribe({
      next: (response: User) => { },
      error: (error) => {
        expect(error.status).toBe(401)
        done()
      },
      complete: () => { }
    });
  });
});
