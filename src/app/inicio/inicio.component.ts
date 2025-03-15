import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-inicio',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  clientes = [
    { id: 1, nome: 'Cliente A' },
    { id: 2, nome: 'Cliente B' },
    { id: 3, nome: 'Cliente C' },
  ];

  projetos = [
    { id: 1, nome: 'Projeto A', cliente: { id: 1, nome: 'Cliente A' } },
    { id: 2, nome: 'Projeto B', cliente: { id: 2, nome: 'Cliente B' } },
  ];

  // Definindo as colunas a serem exibidas nas tabelas
  displayedColumns: string[] = ['id', 'nome', 'acao'];
  displayedProjectColumns: string[] = ['id', 'nome', 'cliente', 'acao'];

  // DataSource para os projetos e clientes (material table)
  dataSourceClientes = new MatTableDataSource(this.clientes);
  dataSourceProjetos = new MatTableDataSource(this.projetos);

  constructor(public dialog: MatDialog) {}

  // Método para abrir o dialog de Adicionar Cliente
  openClientDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '400px',
      data: { tipo: 'cliente' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Adiciona o cliente ao array
        const newClient = { id: this.clientes.length + 1, nome: result.nome };
        this.clientes.push(newClient);
        this.dataSourceClientes.data = [...this.clientes]; // Atualiza a tabela
      }
    });
  }

  // Método para abrir o dialog de Adicionar Projeto
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
      data: { tipo: 'projeto', clientes: this.clientes },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  // Método para editar um cliente
  editClient(cliente: any): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '400px',
      data: { tipo: 'cliente', cliente },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Atualiza o cliente no array
        const index = this.clientes.findIndex((c) => c.id === cliente.id);
        if (index !== -1) {
          this.clientes[index].nome = result.nome;
          this.dataSourceClientes.data = [...this.clientes]; // Atualiza a tabela
        }
      }
    });
  }

  // Método para excluir um cliente
  deleteClient(id: number): void {
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      this.dataSourceClientes.data = [...this.clientes]; // Atualiza a tabela
    }
  }

  // Método para editar um projeto
  editProject(projeto: any): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
      data: { tipo: 'projeto', projeto, clientes: this.clientes },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  // Método para excluir um projeto
  deleteProject(id: number): void {
    const index = this.projetos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.projetos.splice(index, 1);
      this.dataSourceProjetos.data = [...this.projetos]; // Atualiza a tabela
    }
  }
}
