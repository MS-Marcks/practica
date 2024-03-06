import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseEndpointService } from '../../abstract/base-endpoint.service';
import { registerUser } from 'src/app/shared/interfaces/registerUser';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService extends BaseEndpointService<registerUser> {

  constructor(private http: HttpClient) {
    super(`${environment.URLBASE}users`, http);
  }

  async isExistName(name: string): Promise<any> {
    return lastValueFrom(this.http.get<any>(this._urlBase + "/exist-name/" + name).pipe());
  }

}

