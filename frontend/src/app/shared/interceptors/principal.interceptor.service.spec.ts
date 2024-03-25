import { TestBed } from '@angular/core/testing';

import { PrincipalInterceptorService } from './principal.interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('PrincipalInterceptorService', () => {

  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

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
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('Custom headers are added to the request', () => {
    httpClient.get("/data").subscribe(response => {
      expect(response).toBeTruthy();
    })

    const httpRequest = httpMock.expectOne("/data");
    expect(httpRequest.request.headers.has("ID")).toBeTruthy();
    expect(httpRequest.request.headers.get("ID")).toEqual("test");
  })

});
