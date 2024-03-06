import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/interfaces/user';
import { LoginUser } from 'src/app/shared/interfaces/login-user';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  urlbase: string = `${environment.URLBASE}users`;

  constructor(private http: HttpClient) { }

  async login(body: LoginUser): Promise<User> {
    return lastValueFrom(this.http.post<User>(this.urlbase + "/login", body).pipe());
  }

  saveToken(user: User) {
    localStorage.setItem("access_token", user.access_token);
    localStorage.setItem("tokenType", user.tokenType);
  }

}
