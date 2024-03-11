import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../interfaces/register-user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  urlbase: string = `${environment.URLBASE}users`;
  constructor(private http: HttpClient) {
  }

  isExistName(name: string): Observable<any> {
    return this.http.get<any>(`${this.urlbase}/exist-name/${name}`).pipe();
  }

  registerUser(user: RegisterUser): Observable<any> {
    return this.http.post<any>(`${this.urlbase}/`, user).pipe();
  }

}

