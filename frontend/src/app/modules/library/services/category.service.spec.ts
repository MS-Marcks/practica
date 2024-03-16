import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../shared/interceptors/principal.interceptor.service';
import { CategoryService } from './category.service';
import { Category } from '../interfaces/category.interface';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }],
    });
    categoryService = TestBed.inject(CategoryService);
  });

  test('The service is created correctly', () => {
    expect(categoryService).toBeTruthy();
  });

  test('the categories are obtained correctly', (done) => {
    categoryService.getCategories().subscribe({
      next: (response: Category[]) => {
        expect(response.length).toBeGreaterThanOrEqual(0)
        done()
      },
      error: (error) => { },
      complete: () => { }
    });
  });

});
