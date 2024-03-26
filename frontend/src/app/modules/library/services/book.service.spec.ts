import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../shared/interceptors/principal.interceptor.service';
import { BookService } from './book.service';
import { Book } from '../interfaces/book.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DATA_BOOK_REGISTER } from '../mocks/book.mock';



describe('BookService', () => {
  let bookService: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, BookService],
    });
  });

  beforeEach(() => {
    bookService = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  })

  test('The service is created correctly', () => {
    expect(bookService).toBeTruthy();
  });

  test("should register a new book", () => {
    const book: Book = DATA_BOOK_REGISTER;
    bookService.bookRegister(book).subscribe(response => {
      expect(response.message).toEqual("Se registro un nuevo libro");
    })
    const request = httpMock.expectOne(`${bookService.urlbase}`);
    expect(request.request.method).toBe("POST");
    request.flush(book);
  })

  test("should update a book", () => {
    const book: Book = DATA_BOOK_REGISTER;
    bookService.bookUpdate(book).subscribe(response => {
      expect(response.message).toEqual("Se actualizo un libro");
    })
    const request = httpMock.expectOne(`${bookService.urlbase}`);
    expect(request.request.method).toBe("PUT");
    request.flush(book);
  })


  test("should get book of a user", () => {
    const owner: string | any = DATA_BOOK_REGISTER.userRegister;
    const count = 1;
    const book: Book = DATA_BOOK_REGISTER;

    bookService.getBooks(owner, count).subscribe(response => {
      expect(response).toEqual(book);
    })

    const request = httpMock.expectOne(`${bookService.urlbase}/owner/${owner}/${count}`);
    expect(request.request.method).toBe("GET");
    request.flush(book);
  })

  test("should get public books", () => {
    const book: Book = DATA_BOOK_REGISTER;

    bookService.getPublicBooks().subscribe(response => {
      expect(response).toEqual(book);
    })

    const request = httpMock.expectOne(`${bookService.urlbase}/public`);
    expect(request.request.method).toBe("GET");
    request.flush(book);
  })

  test("should get a book by its ID", () => {
    const ID: string | any = DATA_BOOK_REGISTER.id;
    const book: Book = DATA_BOOK_REGISTER;

    bookService.getBook(ID).subscribe(response => {
      expect(response).toEqual(book);
    })

    const request = httpMock.expectOne(`${bookService.urlbase}/${ID}`);
    expect(request.request.method).toBe("GET");
    request.flush(book);
  })

});
