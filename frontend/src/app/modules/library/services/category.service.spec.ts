import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../shared/interceptors/principal.interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../interfaces/category.interface';
import { DATA_CATEGORIES } from '../mocks/category.mock';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, CategoryService],
    });
  });

  beforeEach(() => {
    categoryService = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  })

  test('The service is created correctly', () => {
    expect(categoryService).toBeTruthy();
  });

  test("should get categories", () => {
    const categories: Category[] = DATA_CATEGORIES;
    categoryService.getCategories().subscribe(response => {
      expect(response).toEqual(categories);
    })
    const request = httpMock.expectOne(`${categoryService.urlbase}`);
    expect(request.request.method).toBe("GET");
    request.flush(categories);
  })

});
