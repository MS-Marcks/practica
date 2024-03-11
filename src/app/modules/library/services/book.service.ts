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

  bookRegister(book: Book): Observable<Book> {
   return this.http.post<Book>(`${this.urlbase}`, book).pipe();
  }

  getBooks(owner: string): Observable<Book[]> {
   return this.http.get<Book[]>(`${this.urlbase}/owner/${owner}`).pipe();
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.urlbase}/${id}`).pipe();
  }

}
