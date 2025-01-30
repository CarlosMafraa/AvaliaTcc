import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Dialog} from 'primeng/dialog';
import {BankAddComponent} from '../bank/bank-add/bank-add.component';
import {TeacherService} from '../../services/supabase/teacher/teacher.service';
import {TccService} from '../../services/supabase/tcc/tcc.service';
import {AdvisorAddComponent} from '../advisor/advisor-add/advisor-add.component';
import {AdvisorService} from '../../services/supabase/advisor/advisor.service';
import {User} from '../../shareds/interfaces/User';
import {BankService} from '../../services/supabase/bank/bank.service';
import {Knob} from 'primeng/knob';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-information',
  imports: [
    Button,
    Dialog,
    AdvisorAddComponent,
    BankAddComponent,
    Knob,
    FormsModule
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit {
  @Input() public tcc_id!: number;
  @Input() public user_id!: number;
  @Input() public orientador_id!: number;
  @Input() public titulo!: string;
  @Input() public descricao!: string;
  @Input() public pdfUrl!: string;
  @Input() public banca_id!: number | null;
  @Input() public tcc_media!: number | null;
  @Input() public advisor: boolean = false;
  @Input() public bank: boolean = false;

  @Output() public refreshEmitter: EventEmitter<any> = new EventEmitter<any>()

  public visibleBanca: boolean = false;
  public visibleNotas: boolean = false;
  public orientador!: string;
  public banca: any[] = [];


  private tccService: TccService = inject(TccService);
  private teacherService: TeacherService = inject(TeacherService);
  private advisorService: AdvisorService = inject(AdvisorService);
  private supabaseService: SupabaseService = inject(SupabaseService);
  private bankService: BankService = inject(BankService);

  ngOnInit() {
    this.getTeacherById(this.orientador_id);
    console.log(this.tcc_id)
    this.getBank(this.tcc_id);
    this.calcularMediaESalvarNoTCC(this.tcc_id);

  }


  public getTeacherById(id: number) {
    if (id) {
      this.teacherService.getTeacherById(id).then((res) => {
        if (res && res.data) {
          this.orientador = res.data[0].nome;
        }
      })
    } else {
      console.log('ID null', id)
    }
  }

  public download(path: string): void {
    this.tccService.getPdf(path).then((res) => {
      if (res?.data) {
        const blob: Blob = res.data;
        const url = (window as any).URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arquivo.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        (window as any).URL.revokeObjectURL(url);
      } else {
        console.error('Erro ao baixar o arquivo:', res?.error);
      }
    }).catch((error) => {
      console.log('Erro ao baixar o PDF:', error);
    });
  }


  public view(path: string): void {
    this.tccService.getPdf(path).then((res) => {
      if (res?.data) {
        const blob: Blob = res.data;
        const url = (window as any).URL.createObjectURL(blob);
        const newWindow: Window | null = window.open(url, '_blank');
        if (newWindow) {
          newWindow.onload = () => {
            (window as any).URL.revokeObjectURL(url);
          };
        } else {
          console.error("Não foi possível abrir a nova aba.");
        }
      } else {
        console.error('Erro ao baixar o arquivo:', res?.error);
      }
    }).catch((error) => {
      console.log('Erro ao visualizar o PDF:', error);
    });
  }

  public getBank(tcc_id: number): void {
    this.advisorService.getBanca(tcc_id).then((res) => {
      if (res && res.data) {
        console.log(res)
        this.advisorService.getMembroBanca(res.data.id).then(async (resp) => {
          if (resp.data) {
            this.banca = [];
            resp.data.forEach((membro: any) => {
              this.teacherService.getTeacherById(membro.professor_id).then((teacherRes) => {
                if (teacherRes.data && teacherRes.data.length > 0) {
                  const professor: string = teacherRes.data[0].nome + ' ' + teacherRes.data[0].sobrenome;
                  console.log(professor)
                  this.banca.push(professor);
                  this.advisor = false;
                }
              });
            });
            const notasExist: boolean = await this.bankService.checkIfNotasExist(res.data.id, this.user_id);
            if (notasExist) {
              this.bank = false;
            }
            this.advisor = false;
          }
        });
      }
    });
  }

  public openDialogBanca(): void {
    this.visibleBanca = true;
  }

  public openDialogNotas(): void {
    this.visibleNotas = true;
  }

  public closeDialogBanca(): void {
    this.visibleBanca = false;
    this.refreshEmitter.emit();
  }

  public closeDialogNotas(): void {
    this.visibleNotas = false;
    this.refreshEmitter.emit();
  }

  public async calcularMediaESalvarNoTCC(tcc_id: number): Promise<void> {
    try {
      // Passo 1: Buscar a banca pelo tcc_id
      const bancaResponse = await this.advisorService.getBanca(tcc_id);
      if (!bancaResponse || !bancaResponse.data) {
        throw new Error('Banca não encontrada para o TCC fornecido.');
      }

      const bancaId = bancaResponse.data.id;

      // Passo 2: Buscar os membros da banca
      const membrosResponse = await this.advisorService.getMembroBanca(bancaId);
      if (!membrosResponse || !membrosResponse.data) {
        throw new Error('Membros da banca não encontrados.');
      }

      const membros = membrosResponse.data;

      // Passo 3: Recuperar as notas de cada membro da banca
      let somaNotas = 0;
      let quantidadeNotas = 0;

      for (const membro of membros) {
        const notasResponse = await this.bankService.getNotas(bancaId, membro.professor_id);
        if (notasResponse && notasResponse.data) {
          const notas = notasResponse.data;
          console
          // Soma as 5 notas do professor
          somaNotas += notas.nota1 + notas.nota2 + notas.nota3 + notas.nota4 + notas.nota5;
          quantidadeNotas += 1; // Cada professor tem 5 notas
        }
      }

      // Passo 4: Calcular a média
      if (quantidadeNotas === 0) {
        throw new Error('Nenhuma nota encontrada para cálculo da média.');
      }
      console.log(quantidadeNotas)
      const media: number = (somaNotas / quantidadeNotas) * 10;

      // Passo 5: Salvar a média no TCC
      await this.tccService.updateMedia(tcc_id, media);

      console.log(`Média calculada e salva no TCC: ${media}`);
    } catch (error) {
      console.error('Erro ao calcular a média e salvar no TCC:', error);
    }

  }
}
