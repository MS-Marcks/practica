import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { Book } from '../../interfaces/book.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { BookShelfComponent } from './book-shelf.component';
import { BookService } from '../../services/book.service';
import { of } from 'rxjs';
import { CategoryService } from '../../services/category.service';

let DATA: Book = {
  title: "React",
  author: "example",
  url: "https://itbook.store/books/9781617291609",
  image: "https://itbook.store/img/books/9781617291609.png",
  summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  idCategory: [
    "Ciencia Ficción",
    "Novelas",
    "Drama"
  ],
  publish: true,
  userRegister: "w7qfsa5f21",
  id: "oh3kk5moj2"
}

describe('BookShelfComponent', () => {
  let component: BookShelfComponent;
  let fixture: ComponentFixture<BookShelfComponent>;
  let compiled: any;
  let bookService: BookService;
  let categoryService: CategoryService;


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
      }, BookService,CategoryService],
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

});
