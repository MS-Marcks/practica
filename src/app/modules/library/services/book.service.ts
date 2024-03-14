import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Book } from 'src/app/modules/library/interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlbase: string = `${environment.URLBASE}books`;

  constructor(private http: HttpClient) { }

  /**
   * Description: function to register a new book
   *
   * @param {Book} book book information
   * @returns {Observable<Book>} returns the request in an observable
   */
  bookRegister(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.urlbase}`, book).pipe();
  }

  /**
   * Description: function to update a book
   *
   * @param {Book} book book information
   * @returns {Observable<Book>}  returns the request in an observable
   */
  bookUpdate(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.urlbase}`, book).pipe();
  }

  /**
   * Description: function to get the books of a user
   *
   * @param {string} owner  book owner
   * @param {number} [count=-1]
   * @returns {Observable<Book[]>}  returns the request in an observable
   */
  getBooks(owner: string, count: number = -1): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.urlbase}/owner/${owner}/${count}`).pipe();
  }

  /**
   * Description: function to obtain the publics books
   *
   * @returns {Observable<Book[]>}  returns the request in an observable
   */
  getPublicBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.urlbase}/public`).pipe();
  }

  /**
   * Description: function to get a book by its ID
   *
   * @param {string} id id book
   * @returns {Observable<Book>}  returns the request in an observable
   */
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.urlbase}/${id}`).pipe();
  }

}
