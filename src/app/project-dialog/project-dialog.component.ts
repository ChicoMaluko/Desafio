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
} from '@angular/forms';
import { MatDialogActions } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-project-dialog',
  template: `
    <h1 mat-dialog-title>
      {{ data.tipo === 'projeto' ? 'Adicionar Projeto' : 'Editar Projeto' }}
    </h1>
    <mat-dialog-content>
      <form [formGroup]="projectForm">
        <!-- Campo Nome do Projeto -->
        <mat-form-field appearance="fill">
          <mat-label>Nome do Projeto</mat-label>
          <input matInput formControlName="nome" required />
        </mat-form-field>

        <!-- Campo Cliente Associado -->
        <mat-form-field appearance="fill">
          <mat-label>Cliente</mat-label>
          <mat-select formControlName="clienteId" required>
            <mat-option
              *ngFor="let cliente of data.clientes"
              [value]="cliente.id"
            >
              {{ cliente.nome }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button (click)="onSave()" [disabled]="projectForm.invalid">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogActions,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogContent,
  ],
})
export class ProjectDialogComponent {
  // Formulário reativo para capturar os dados do projeto
  projectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Inicialização do formulário
    this.projectForm = this.fb.group({
      nome: [data.projeto ? data.projeto.nome : '', [Validators.required]],
      clienteId: [
        data.projeto ? data.projeto.cliente.id : '',
        [Validators.required],
      ],
    });
  }

  // Método para fechar o diálogo sem salvar
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Método para salvar o projeto
  onSave(): void {
    if (this.projectForm.valid) {
      const result = this.projectForm.value;
      this.dialogRef.close(result);
    }
  }
}
