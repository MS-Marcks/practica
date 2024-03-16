import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../shared/interceptors/principal.interceptor.service';
import { BookService } from './book.service';
import { Book } from '../interfaces/book.interface';

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

describe('bookService', () => {
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }],
    });
    bookService = TestBed.inject(BookService);
  });

  test('The service is created correctly', () => {
    expect(bookService).toBeTruthy();
  });

  test('a book is created correctly', (done) => {
    bookService.bookRegister(DATA).subscribe({
      next: (response: Book) => {
        expect(response.message).toBe("Se registro un nuevo libro")
        done()
      },
      error: (error) => { },
      complete: () => { }
    });
  });

  test('a book is updated correctly', (done) => {
    DATA.author = "prueba";
    bookService.bookUpdate(DATA).subscribe({
      next: (response: Book) => {
        expect(response.message).toBe("Se actualizo un libro")
        done()
      },
      error: (error) => { },
      complete: () => { }
    });
  });

  test('a users books are retrieved correctly', (done) => {
    bookService.getBooks("w7qfsa5f21").subscribe({
      next: (response: Book[]) => {
        expect(response.length).toBeGreaterThanOrEqual(0);
        done()
      },
      error: (error) => { },
      complete: () => { }
    });
  });

  test('a public books are retrieved correctly', (done) => {
    bookService.getPublicBooks().subscribe({
      next: (response: Book[]) => {
        expect(response.length).toBeGreaterThanOrEqual(0);
        done()
      },
      error: (error) => { },
      complete: () => { }
    });
  });

  test('the data of a book is obtained correctly', (done) => {
    bookService.getBook("oh3kk5moj2").subscribe({
      next: (response: Book) => {
        expect(response.id).not.toBeNull();
        done()
      },
      error: (error) => { },
      complete: () => { }
    });
  });

});
