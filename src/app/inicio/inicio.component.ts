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
import { ClienteService } from '../cliente.service';
import { ProjetoService } from '../projeto.service';

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
  public clientes = [];

  public projetos = [];
  // Definindo as colunas a serem exibidas nas tabelas
  displayedColumns: string[] = ['nome', 'cidade', 'endereco', 'acao'];
  displayedProjectColumns: string[] = [
    'id',
    'nome',
    'cliente',
    'dataInicio',
    'acao',
  ];

  // DataSource para os projetos e clientes (material table)
  dataSourceClientes = new MatTableDataSource(this.clientes);
  dataSourceProjetos = new MatTableDataSource(this.projetos);

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private projetoService: ProjetoService,
    
  ) {
    this.projetoService.getProjetos().subscribe((ok) => {
      this.projetos = ok.content;
    });
    this.clienteService.getClientes().subscribe((ok) => {
      this.clientes = ok.content;
    });
  }


  // Método para abrir o dialog de Adicionar Cliente
  openClientDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '1000px',
      data: { tipo: 'cliente', clienteService: this.clienteService },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
      }
    });
  }

  // Método para abrir o dialog de Adicionar Projeto
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
      data: {
        tipo: 'projeto',
        clientes: this.clientes,
        projetoService: this.projetoService,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  // Método para editar um cliente
  editClient(cliente: any): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '400px',
      data: { tipo: 'cliente', cliente, clienteService: this.clienteService },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      
       
      }
    });
  }

  // Método para excluir um cliente
  deleteClient(id: number): void {}

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
    this.projetoService.deleteProjeto(id).subscribe((ok) => {
      this.projetoService
        .getProjetos()
        .subscribe((ok) => (this.projetos = ok.content));
    });
  }
}
