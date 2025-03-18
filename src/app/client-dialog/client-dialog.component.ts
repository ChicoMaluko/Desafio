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
    MatButtonModule
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
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.data.clienteService.postCadastroForm(this.cliente.value).subscribe(
      (ok:any) => {
        console.log(ok);
        
        this.dialogRef.close(this.cliente);
      },
      () => {
        console.log('erro');
      }
    );
  }
}
