import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-client-dialog',
  imports: [
    MatDialogActions,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogContent,
    FormsModule,
  ],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.scss',
})
export class ClientDialogComponent {
  public cliente;

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cliente = this.data.cliente || { nome: '' };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.cliente);
  }
}
