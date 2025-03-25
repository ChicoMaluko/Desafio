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
    MatPaginatorModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  public clientes = [];

  public projetos = [];
  public clientePageSize = 5;
  public clientePage = 0;
  public clienteLength = 0;
  public clientePageSizeOptions = [5, 10, 15, 100];
  public projetoPageSize = 5;
  public projetoPage = 0;
  public projetoLength = 0;
  public projetoPageSizeOptions = [5, 10, 15, 100];

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
    private projetoService: ProjetoService
  ) {
    this.projetoService
      .getProjetos(this.projetoPageSize, this.projetoPage)
      .subscribe((ok) => {
        this.projetoLength = ok.totalElements;
        this.projetos = ok.content;
      });
    this.clienteService
      .getClientes(this.clientePageSize, this.clientePage)
      .subscribe((ok) => {
        this.clienteLength = ok.totalElements;
        this.clientes = ok.content;
      });
  }

  public clienteTableChangeEvent(event: any) {
    this.clientePage = event.pageIndex;
    this.clientePageSize = event.pageSize;
    this.clienteService
      .getClientes(this.clientePageSize, this.clientePage)
      .subscribe((ok) => {
        this.clientes = ok.content;
      });
  }
  public projetoTableChangeEvent(event: any) {
    this.projetoPage = event.pageIndex;
    this.projetoPageSize = event.pageSize;
    this.projetoService
      .getProjetos(this.projetoPageSize, this.projetoPage)
      .subscribe((ok) => {
        this.projetos = ok.content;
      });
  }

  // Método para abrir o dialog de Adicionar Cliente
  openClientDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '1000px',
      data: {
        tipo: 'cliente',
        novoCliente: true,
        clienteService: this.clienteService,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  // Método para abrir o dialog de Adicionar Projeto
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '1000px',
      data: {
        novoProjeto: true,
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
      width: '1000px',
      data: {
        tipo: 'cliente',

        cliente,
        clienteService: this.clienteService,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clienteService
          .getClientes(this.clientePageSize, this.clientePage)
          .subscribe((ok) => {
            this.clientes = ok.content;
          });
      }
    });
  }

  // Método para excluir um cliente
  deleteClient(id: number): void {
    this.clienteService.deleteCliente(id).subscribe((ok) => {
      this.clienteService
        .getClientes(this.clientePageSize, this.clientePage)
        .subscribe((ok) => (this.clientes = ok.content));
    });
  }

  // Método para editar um projeto
  editProject(projeto: any): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '1000px',
      data: {
        tipo: 'projeto',
        projeto,
        clientes: this.clientes,
        projetoService: this.projetoService,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.projetoService
        .getProjetos(this.projetoPageSize, this.projetoPage)
        .subscribe((ok) => (this.projetos = ok.content));
    });
  }

  // Método para excluir um projeto
  deleteProject(id: number): void {
    this.projetoService.deleteProjeto(id).subscribe((ok) => {
      this.projetoService
        .getProjetos(this.projetoPageSize, this.projetoPage)
        .subscribe((ok) => (this.projetos = ok.content));
    });
  }
}
