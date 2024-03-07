import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { Book } from 'src/app/shared/interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlbase: string = `${environment.URLBASE}books`;

  constructor(private http: HttpClient) { }

  async getBooks(owner: string): Promise<Book[]> {
    return lastValueFrom(this.http.get<Book[]>(`${this.urlbase}/owner/${owner}`).pipe());
  }

}
