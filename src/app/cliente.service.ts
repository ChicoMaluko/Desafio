import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public apiUrl = 'http://desafio.viaapia.com.br:8282/';

  constructor(private httpClient: HttpClient) {}
  public postCadastroForm(clienteForm: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.post(
      this.apiUrl + 'clientes',
      {
        nome: clienteForm.username,
        numero: clienteForm.cnpj,
        razaoSocial: clienteForm.razaoSocial,
        local: clienteForm.endereco,
        quantosProjetos: clienteForm.quantidadeProjeto,
        quantasPessoas: clienteForm.quantidadePessoas,
        cep: clienteForm.cep,
        cidade: clienteForm.cidade,
        uf: clienteForm.uf,
      },
      { headers }
    );
  }
}
