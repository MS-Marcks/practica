import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { Book } from '../../interfaces/book.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { BookShelfComponent } from './book-shelf.component';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { DATA_BOOK_REGISTER } from '../../mocks/book.mock';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import { DATA_CATEGORIES } from '../../mocks/category.mock';

let DATA: Book = DATA_BOOK_REGISTER;

describe('BookShelfComponent', () => {
  let component: BookShelfComponent;
  let fixture: ComponentFixture<BookShelfComponent>;
  let compiled: any;

  let bookService: BookService;
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookShelfComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule
      ], providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, BookService, CategoryService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    bookService = TestBed.inject(BookService);
    categoryService = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  })


  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  test('Called method getBooks in book service correctly', () => {
    component.user = { "user": { "userId": "w7qfsa5f21", "username": "ksuarez" }, "access_token": "", "tokenType": "" }
    const service = jest.spyOn(bookService, "getBooks")
    component.ngOnInit();
    fixture.detectChanges();
    expect(service).toHaveBeenCalled();
  });

  test('Called method getCategories in catalog service correctly', () => {
    component.user = { "user": { "userId": "w7qfsa5f21", "username": "ksuarez" }, "access_token": "", "tokenType": "" }
    const service = jest.spyOn(categoryService, "getCategories")
    component.ngOnInit();
    fixture.detectChanges();
    expect(service).toHaveBeenCalled();
  });

  test("Should get user books", () => {
    const body: Book[] = [DATA_BOOK_REGISTER];
    const owner: string | any = DATA_BOOK_REGISTER.userRegister;

    jest.spyOn(bookService, "getBooks").mockReturnValue(new Observable<Book[]>((suscriber) => {
      suscriber.next(body)
      suscriber.complete();
    }))

    bookService.getBooks(owner, 4).subscribe(response => {
      expect(response).toEqual(body);
    })
  })

  test("Should get categories book", () => {
    const body: Category[] = DATA_CATEGORIES;

    jest.spyOn(categoryService, "getCategories").mockReturnValue(new Observable<Category[]>((suscriber) => {
      suscriber.next(body)
      suscriber.complete();
    }))

    categoryService.getCategories().subscribe(response => {
      expect(response).toEqual(body);
    })
  })

});
