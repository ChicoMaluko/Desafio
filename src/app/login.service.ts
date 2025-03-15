import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public apiUrl =  "http://desafio.viaapia.com.br:8282/";
  constructor(private httpClient: HttpClient) {
   }

   public postLoginForm(username:string, password:string):
   Observable<any>{
    return this.httpClient.post(this.apiUrl+"auth/login",{"login":username, "senha": password})
   };
}
