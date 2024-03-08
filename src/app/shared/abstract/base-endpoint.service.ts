import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseEndpointService<T> {

  constructor(@Inject(String) protected _urlBase: string, protected _http: HttpClient) { }

  async Get(): Promise<T[]> {
    return lastValueFrom(this._http.get<T[]>(this._urlBase).pipe());
  }

  async Filter(item: string): Promise<T> {
    return lastValueFrom(this._http.get<T>(`${this._urlBase}?${item}`).pipe());
  }

  async Post(item: T): Promise<T> {
    return lastValueFrom(this._http.post<T>(this._urlBase, item).pipe());
  }

  async Put(item: T): Promise<T> {
    return lastValueFrom(this._http.put<T>(this._urlBase, item).pipe());
  }

  async Patch(item: T): Promise<T> {
    return lastValueFrom(this._http.patch<T>(this._urlBase, item).pipe());
  }

  async Delete(item: string): Promise<any> {
    return lastValueFrom(this._http.delete(`${this._urlBase}?${item}`, { responseType: 'text' }).pipe());
  }

}
