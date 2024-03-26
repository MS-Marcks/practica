import { TestBed } from '@angular/core/testing';
import { LoginUserService } from './login-user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../shared/interceptors/principal.interceptor.service';
import { LoginUser } from '../../../shared/interfaces/login-user.interface';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DATA_LOGIN_USER, USER } from '../mocks/login-user.mock';


describe('LoginUserService', () => {
  let loginUserService: LoginUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, LoginUserService],
    });
  });

  beforeEach(() => {
    loginUserService = TestBed.inject(LoginUserService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  })

  test('The service is created correctly', () => {
    expect(loginUserService).toBeTruthy();
  });

  test("should login a user", () => {
    const body: LoginUser = DATA_LOGIN_USER;
    loginUserService.login(body).subscribe(response => {
      expect(response).toEqual(USER);
    })
    const request = httpMock.expectOne(`${loginUserService.urlbase}/login`);
    expect(request.request.method).toBe("POST");
    request.flush(USER);
  })

});
