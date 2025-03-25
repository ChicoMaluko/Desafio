import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatDialogActions } from '@angular/material/dialog';
import { MatOption, MatOptionModule } from '@angular/material/core';
import {
  MatFormField,
  MatLabel,
  MatSelect,
  MatSelectModule,
} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.scss',
  imports: [
    MatDialogActions,
    MatOptionModule,
    MatSelectModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
  ],
})
export class ProjectDialogComponent {
  // Formulário reativo para capturar os dados do projeto

  public projeto = new FormGroup({
    tecnico: new FormControl(''),
    id: new FormControl('', Validators.required),
    nomeProjeto: new FormControl('', Validators.required),
    status: new FormControl('EM_ANDAMENTO', Validators.required),
    dataAbertura: new FormControl('', Validators.required),
    dataFechamento: new FormControl('', Validators.required),
    dataPrevista: new FormControl('', Validators.required),
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
      tecnico: this.data.projeto.tecnico,
      nomeProjeto: this.data.projeto.nomeProjeto,
      id: this.data.projeto.id,
      status: this.data.projeto.status,
      dataAbertura: this.data.projeto.dataAbertura,
      dataFechamento: this.data.projeto.dataFechamento,
      dataPrevista: this.data.projeto.dataPrevista,
    });
  }

  // Método para fechar o diálogo sem salvar
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Método para salvar o projeto
  onSave(): void {
    if(this.data.novoProjeto){
      this.data.projetoService.postProjetos(this.projeto.value).subscribe(
      (ok: any) => {
        console.log(ok);

        this.dialogRef.close(this.projeto);
      },
      () => {
        console.log('erro');
      }
   );
    } 
  else{
    this.data.projetoService.putCadastroForm(this.projeto.value).subscribe(
      (ok: any) => {
        console.log(ok);

        this.dialogRef.close(this.projeto);
      },
      () => {
        console.log('erro');
      }
   );
  }}
}
