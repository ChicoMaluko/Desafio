import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjetoService {
  public apiUrl = 'http://desafio.viaapia.com.br:8282/';

  constructor(private httpclient: HttpClient) {}
  public getProjetos(size: number, page: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.httpclient.get(this.apiUrl + 'projetos', {
      headers,
      params: { size, page },
    });
  }
  public postProjetos(projeto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    projeto.cliente = { id: projeto.id };
    projeto.id = null;
    projeto.tecnico = { id: 1 };
    return this.httpclient.post(this.apiUrl + 'projetos', projeto, {
      headers,
    });
  }
  public putCadastroForm(projetoForm: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.httpclient.put(
      this.apiUrl + `projetos/${projetoForm.id}`, projetoForm,
      { headers }
    );
  }

  public deleteProjeto(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.httpclient.delete(this.apiUrl + 'projetos/' + id, {
      headers,
    });
  }
  //get clientes
}
