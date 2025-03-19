import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';
import { ClienteService } from '../cliente.service';
import { ok } from 'assert';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-dialog',
  imports: [
    MatDialogActions,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogContent,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.scss',
})
export class ClientDialogComponent {
  public cliente = new FormGroup({
    nome: new FormControl('', Validators.required),
    cep: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    uf: new FormControl('', Validators.required),
    cnpj: new FormControl('', Validators.required),
    razaoSocial: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    quantidadeProjetos: new FormControl('', Validators.required),
    quantidadePessoas: new FormControl('', Validators.required),
 });
  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.cliente) {
      this.initClientDialog();
    }
  }

  public initClientDialog() {
    this.cliente.patchValue({
      nome: this.data.cliente.nome,
      cep: this.data.cliente.cep,
      cidade: this.data.cliente.cidade,
      uf: this.data.cliente.uf,
      cnpj: this.data.cliente.cnpj,
      razaoSocial: this.data.cliente.razaoSocial,
      endereco: this.data.cliente.endereco,
      quantidadeProjetos: this.data.cliente.quantidadeProjetos,
      quantidadePessoas: this.data.cliente.quantidadePessoas,
    });
 }
}
///aqui2
export class ProjectDialogComponent {
    public projeto = new FormGroup({
      id: new FormControl('', Validators.required),
     nomeProjeto: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      dataAbertura: new FormControl('', Validators.required),
      
    });
  
    constructor(
      public dialogRef: MatDialogRef<ProjectDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if (data.projeto) {
        this.initProjectDialog();
      }
    }
  
    public initProjectDialog() {
      this.projeto.patchValue({
        nomeProjeto: this.data.projeto.nomeProjeto,
        id: this.data.projeto.id,
        status: this.data.projeto.status,
        dataAbertura: this.data.projeto.dataAbertura,
        
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.data.clienteService.postCadastroForm(this.projeto.value).subscribe(
      (ok: any) => {
        console.log(ok);

        this.dialogRef.close(this.projeto);
      },
      () => {
        console.log('erro');
      }
    );
  }
}