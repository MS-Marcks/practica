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

  private urlbase: string = `${environment.URLBASE}users`;

  constructor(private http: HttpClient) {
  }

  /**
   * Description: function to check if a user already exists
   *
   * @param {string} name user name
   * @returns {Observable<ExtraRegister>}  returns the request in an observable
   */
  isExistName(name: string): Observable<ExtraRegister> {
    return this.http.get<ExtraRegister>(`${this.urlbase}/exist-name/${name}`).pipe();
  }

  /**
   * Description: function to register a new user in the system
   *
   * @param {RegisterUser} user register information
   * @returns {Observable<ExtraRegister>}  returns the request in an observable
   */
  registerUser(user: RegisterUser): Observable<ExtraRegister> {
    return this.http.post<ExtraRegister>(`${this.urlbase}/`, user).pipe();
  }

}

