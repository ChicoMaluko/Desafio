import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public apiUrl = 'http://desafio.viaapia.com.br:8282/clientes';

  constructor(private httpClient: HttpClient) {}

  public postCadastroForm(clienteForm: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.post(
      this.apiUrl,
      {
        nome: clienteForm.nome,
        cnpj: clienteForm.cnpj,
        razaoSocial: clienteForm.razaoSocial,
        endereco: clienteForm.endereco,
        quantidadeProjetos: clienteForm.quantidadeProjetos,
        quantidadePessoas: clienteForm.quantidadePessoas,
        cep: clienteForm.cep,
        cidade: clienteForm.cidade,
        uf: clienteForm.uf,
      },
      { headers }
    );
  }
  public putCadastroForm(clienteForm: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.put(
      this.apiUrl + `/${clienteForm.id}`,
      {
        nome: clienteForm.nome,
        cnpj: clienteForm.cnpj,
        razaoSocial: clienteForm.razaoSocial,
        endereco: clienteForm.endereco,
        quantidadeProjetos: clienteForm.quantidadeProjetos,
        quantidadePessoas: clienteForm.quantidadePessoas,
        cep: clienteForm.cep,
        cidade: clienteForm.cidade,
        uf: clienteForm.uf,
      },
      { headers }
    );
  }
  public getClientes(size: number, page: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.get(this.apiUrl, {
      headers,
      params: { size, page },
    });
  }
  public deleteCliente(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.delete(this.apiUrl + '/' + id, {
      headers,
    });
  }
}
