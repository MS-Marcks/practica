import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlbase: string = `${environment.URLBASE}category`;

  constructor(private http: HttpClient) { }

  /**
   * Description: function to get all book categories
   *
   * @returns {Observable<Category[]>} returns the request in an observable
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.urlbase}`).pipe();
  }

}
