import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user.interface';
import { LoginUser } from '../../../shared/interfaces/login-user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  urlbase: string = `${environment.URLBASE}users`;

  constructor(private http: HttpClient) { }

  /**
   * Description: function to make a HTTP request to log in to the system
   *
   * @param {LoginUser} body login information
   * @returns {Observable<User>} returns the request in an observable
   */
  login(body: LoginUser): Observable<User> {
    return this.http.post<User>(this.urlbase + "/login", body).pipe();
  }

  /**
   * Description: function to store the token and data of the current user in the localstorage
   *
   * @param {User} user
   */
  saveToken(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

}
