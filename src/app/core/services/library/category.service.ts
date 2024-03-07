import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlbase: string = `${environment.URLBASE}category`;

  constructor(private http: HttpClient) { }

  async getCategories(): Promise<Category[]> {
    return lastValueFrom(this.http.get<Category[]>(`${this.urlbase}`).pipe());
  }

}
