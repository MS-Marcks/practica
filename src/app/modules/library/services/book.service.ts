import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { Book } from 'src/app/modules/library/interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlbase: string = `${environment.URLBASE}books`;

  constructor(private http: HttpClient) { }

  async bookRegister(book: Book): Promise<Book> {
    return lastValueFrom(this.http.post<Book>(`${this.urlbase}`, book).pipe());
  }

  async getBooks(owner: string): Promise<Book[]> {
    return lastValueFrom(this.http.get<Book[]>(`${this.urlbase}/owner/${owner}`).pipe());
  }

  async getBook(id: string): Promise<Book> {
    return lastValueFrom(this.http.get<Book>(`${this.urlbase}/${id}`).pipe());
  }

}
