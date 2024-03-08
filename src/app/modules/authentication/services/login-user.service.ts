import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user.interface';
import { LoginUser } from '../../../shared/interfaces/login-user.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  private urlbase: string = `${environment.URLBASE}users`;

  constructor(private http: HttpClient) { }

  async login(body: LoginUser): Promise<User> {
    return lastValueFrom(this.http.post<User>(this.urlbase + "/login", body).pipe());
  }

  saveToken(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

}
