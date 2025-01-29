import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Dialog} from 'primeng/dialog';
import {BankAddComponent} from '../bank/bank-add/bank-add.component';
import {TeacherService} from '../../services/supabase/teacher/teacher.service';
import {TccService} from '../../services/supabase/tcc/tcc.service';
import {AdvisorAddComponent} from '../advisor/advisor-add/advisor-add.component';
import {AdvisorService} from '../../services/supabase/advisor/advisor.service';

@Component({
  standalone: true,
  selector: 'app-information',
  imports: [
    Button,
    Dialog,
    AdvisorAddComponent,
    BankAddComponent
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit {
  @Input() public id!: number;
  @Input() public titulo!: string;
  @Input() public descricao!: string;
  @Input() public pdfUrl!: string;
  @Input() public banca_id!: number | null;
  @Input() public orientador_id!: number;
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

  ngOnInit() {
    this.getTeacherById(this.orientador_id);
    console.log(this.id)
    this.getBank(this.id);
  }

  public openDialog(): void {
    this.visible = true;
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
        this.advisorService.getMembroBanca(res.data.id).then((resp) => {
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
}
