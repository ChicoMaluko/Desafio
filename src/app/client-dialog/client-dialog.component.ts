import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  ],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.scss',
})
export class ClientDialogComponent {
  public cliente = new FormGroup({
    nome: new FormControl(''),
    cep: new FormControl(''),
    cidade: new FormControl(''),
    uf: new FormControl(''),
    cnpj: new FormControl(''),
    razaoSocial: new FormControl(''),
    endereco: new FormControl(''),
    qunatidadeProjeto: new FormControl(''),
    quantidadePessoa: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.data.clienteService.postCadastroForm(this.cliente.value).subscribe(
      () => {
        console.log('foi');
        this.dialogRef.close(this.cliente);
      },
      () => {
        console.log('erro');
      }
    );
  }
}
