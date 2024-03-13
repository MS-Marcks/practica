import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../interfaces/register-user.interface';
import { Observable } from 'rxjs';
import { ExtraRegister } from '../interfaces/extra-register.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  urlbase: string = `${environment.URLBASE}users`;
  constructor(private http: HttpClient) {
  }

  isExistName(name: string): Observable<ExtraRegister> {
    return this.http.get<ExtraRegister>(`${this.urlbase}/exist-name/${name}`).pipe();
  }

  registerUser(user: RegisterUser): Observable<ExtraRegister> {
    return this.http.post<ExtraRegister>(`${this.urlbase}/`, user).pipe();
  }

}

