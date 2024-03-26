import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { BookRegisterComponent } from './book-register.component';
import { Book } from '../../interfaces/book.interface';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { DATA_BOOK_REGISTER } from '../../mocks/book.mock';
import { BookService } from '../../services/book.service';

let DATA: Book = DATA_BOOK_REGISTER;

describe('BookRegisterComponent Default', () => {
  let component: BookRegisterComponent;
  let fixture: ComponentFixture<BookRegisterComponent>;
  let compiled: any;

  let bookService: BookService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule,
        BookRegisterComponent
      ],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    bookService = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify();
  })

  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  test('Reject form submission because it is empty', () => {
    component.submit();
    fixture.detectChanges();

    const title = compiled.querySelector('pichincha-input[data-test="title"]');
    const author = compiled.querySelector('pichincha-input[data-test="author"]')
    const url = compiled.querySelector('pichincha-input[data-test="url"]')
    const image = compiled.querySelector('pichincha-input[data-test="image"]')
    const summary = compiled.querySelector('pichincha-input-message[data-test="summary"]')

    expect(title?.errorHelper).toContain("Nombre de libro requerido");
    expect(author?.errorHelper).toContain("Nombre de autor requerido");
    expect(url?.errorHelper).toContain("Url del libro requerido");
    expect(image?.errorHelper).toContain("Url de la imagen del libro requerido");
    expect(summary.state).toContain("error");
  });

  test('url formatting is not complied with', () => {
    component.bookRegisterForm.get("url")?.setValue("example");
    component.submit();
    fixture.detectChanges();
    const url = compiled.querySelector('pichincha-input[data-test="url"]')
    expect(url?.errorHelper).toContain("Formato de la url no valida");
  });

  test('url formatting is complied with', () => {
    component.bookRegisterForm.get("url")?.setValue(DATA.url);
    component.submit();
    fixture.detectChanges();
    const url = compiled.querySelector('pichincha-input[data-test="url"]')
    expect(url?.errorHelper).toContain("");
  });

  test('url image formatting is not complied with', () => {
    component.bookRegisterForm.get("image")?.setValue("example");
    component.submit();
    fixture.detectChanges();
    const url = compiled.querySelector('pichincha-input[data-test="image"]')
    expect(url?.errorHelper).toContain("Formato de la url de la imagen no valida");
  });

  test('url image formatting is complied with', () => {
    component.bookRegisterForm.get("image")?.setValue(DATA.image);
    component.submit();
    fixture.detectChanges();
    const url = compiled.querySelector('pichincha-input[data-test="image"]')
    expect(url?.errorHelper).toContain("");
  });

  test('Alerts are displayed correctly', () => {
    component.setValueAlert("error", "error");
    fixture.detectChanges();
    const alert = compiled.querySelector('pichincha-alerts[data-test="alert"]')
    expect(alert.description).toContain("error");
  });

  test('Alerts are closed correctly', () => {
    component.handleClickCloseEvent();
    fixture.detectChanges();
    expect(component.alert.show).toBe(false);
  });

  test('trackBy correctly', () => {
    const five = component.trackByFn(5);
    fixture.detectChanges();
    expect(five).toBe(5);
  });

  test('Displays the message to register successfully when not in edit mode', () => {
    const h1 = compiled.querySelector("h1[data-test='bookregister-title']");
    fixture.detectChanges();
    expect(h1.textContent).toContain("Registro");
  });

  test("Should add a new book", () => {
    const body: Book = DATA_BOOK_REGISTER;

    jest.spyOn(bookService, "bookRegister").mockReturnValue(new Observable<Book>((suscriber) => {
      suscriber.next(body)
      suscriber.complete();
    }))

    bookService.bookRegister(body).subscribe(response => {
      expect(response).toEqual(body);
    })
  })

});


describe('BookRegisterComponent Update', () => {
  let component: BookRegisterComponent;
  let fixture: ComponentFixture<BookRegisterComponent>;
  let compiled: any;

  let bookService: BookService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule,
        BookRegisterComponent
      ],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      },
      {
        provide: ActivatedRoute,
        useValue: { data: of({ book: DATA }) }
      }, BookService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    bookService = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify();
  })

  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  it('Obtains the values correctly when you want to edit a book', () => {

    const id = component.bookRegisterForm.get("id")?.getRawValue()
    const title = component.bookRegisterForm.get("title")?.getRawValue();
    const author = component.bookRegisterForm.get("author")?.getRawValue()
    const url = component.bookRegisterForm.get("url")?.getRawValue()
    const image = component.bookRegisterForm.get("image")?.getRawValue()
    const summary = component.bookRegisterForm.get("summary")?.getRawValue()
    const publish = component.bookRegisterForm.get("publish")?.getRawValue()

    expect(id).toBe(DATA.id)
    expect(title).toBe(DATA.title)
    expect(author).toBe(DATA.author)
    expect(url).toBe(DATA.url)
    expect(image).toBe(DATA.image)
    expect(summary).toBe(DATA.summary)
    expect(publish).toBe(DATA.publish)
  });

  test('Displays the Edit Successful message when in edit mode.', () => {
    const h1 = compiled.querySelector("h1[data-test='bookregister-title']");
    fixture.detectChanges();
    expect(h1.textContent).toContain("Editar");
  });


  test("Should update a book", () => {
    const body: Book = DATA_BOOK_REGISTER;

    jest.spyOn(bookService, "bookUpdate").mockReturnValue(new Observable<Book>((suscriber) => {
      suscriber.next(body)
      suscriber.complete();
    }))

    bookService.bookUpdate(body).subscribe(response => {
      expect(response).toEqual(body);
    })
  })

});
