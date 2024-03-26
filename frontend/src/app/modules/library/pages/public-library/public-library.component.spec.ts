import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';

import { PublicLibraryComponent } from './public-library.component';
import { SearchPanelComponent } from '../../../../shared/component/search-panel/search-panel.component';
import { CoversComponent } from '../../components/covers/covers.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/book.interface';
import { DATA_BOOK_REGISTER } from '../../mocks/book.mock';

describe('PublicLibraryComponent', () => {
  let component: PublicLibraryComponent;
  let fixture: ComponentFixture<PublicLibraryComponent>;
  let compiled: any;

  let bookService: BookService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicLibraryComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule,
        SearchPanelComponent,
        CoversComponent
      ], providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, BookService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    bookService = TestBed.inject(BookService);
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

  test('Called method getPublicBooks in catalog service correctly', () => {
    component.user = { "user": { "userId": "w7qfsa5f21", "username": "ksuarez" }, "access_token": "", "tokenType": "" }
    const service = jest.spyOn(bookService, "getPublicBooks")
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

  test("Should get public books", () => {
    const body: Book[] = [DATA_BOOK_REGISTER];

    jest.spyOn(bookService, "getPublicBooks").mockReturnValue(new Observable<Book[]>((suscriber) => {
      suscriber.next(body)
      suscriber.complete();
    }))

    bookService.getPublicBooks().subscribe(response => {
      expect(response).toEqual(body);
    })
  })

});
