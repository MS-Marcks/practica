import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseEndpointService } from '../../abstract/base-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseEndpointService<any> {

  constructor(private http: HttpClient) {
    super(`${environment.URLBASE}`, http);
  }

}

