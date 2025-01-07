import { Component } from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {InformationComponent} from '../information/information.component';
import {DashboardAddComponent} from './dashboard-add/dashboard-add.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    Dialog,
    Button,
    InformationComponent,
    DashboardAddComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public listTcc: any[] = trabalhos;
  public dialog: boolean = false;

  public openDialog(): void {
    this.dialog = true;
  }

  public closeDialog(): void {
    this.dialog = false;
  }
}

const trabalhos: any[] = [
  {
    titulo: "Análise de Algoritmos",
    descricao: "Este trabalho aborda a análise de diversos algoritmos computacionais, com foco em eficiência e complexidade. São explorados algoritmos de ordenação, busca, e algoritmos em grafos, além de técnicas para otimização.",
    pdfUrl: "https://firebaseurl.com/meutrabalho.pdf",
    professoresBanca: ["Professor A", "Professor B", "Professor C"],
    orientador: "Professor X",
    dataApresentacao: new Date('2023-07-01')
  },
  {
    titulo: "Inteligência Artificial",
    descricao: "Este TCC investiga os fundamentos da inteligência artificial, cobrindo áreas como aprendizado de máquina, redes neurais e processamento de linguagem natural. Inclui um estudo de caso sobre a aplicação de IA na análise de dados.",
    pdfUrl: "https://firebaseurl.com/iatcc.pdf",
    professoresBanca: ["Professor D", "Professor E", "Professor F"],
    orientador: "Professor Y",
    dataApresentacao: new Date('2023-09-01')
  }
];


