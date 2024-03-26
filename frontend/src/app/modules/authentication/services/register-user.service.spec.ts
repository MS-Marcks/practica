import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../shared/interceptors/principal.interceptor.service';
import { RegisterUserService } from './register-user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BODY_USER_EXIST, DATA_USER_EXIST, BODY_REGISTER, DATA_REGISTER } from '../mocks/register-user.mock';

describe('RegisterUserService', () => {
  let registerUserService: RegisterUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, RegisterUserService],
    });
  });

  beforeEach(() => {
    registerUserService = TestBed.inject(RegisterUserService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  })

  test('The service is created correctly', () => {
    expect(registerUserService).toBeTruthy();
  });

  test('the user already exists', () => {
    const body = BODY_USER_EXIST;
    registerUserService.isExistName(body).subscribe((response) => {
      expect(response).toEqual(DATA_USER_EXIST)
    })
    const request = httpMock.expectOne(`${registerUserService.urlbase}/exist-name/${body}`);
    expect(request.request.method).toBe("GET");
    request.flush(DATA_USER_EXIST);
  });

  test('A new user is registered', () => {
    const body = BODY_REGISTER;

    registerUserService.registerUser(body).subscribe((response) => {
      expect(response.message).toEqual("Created user")
    });

    const request = httpMock.expectOne(`${registerUserService.urlbase}`);
    expect(request.request.method).toBe("POST");
    request.flush(DATA_REGISTER);
  });

});
