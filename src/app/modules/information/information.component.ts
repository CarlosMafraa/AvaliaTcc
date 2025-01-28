import {Component, inject, Input, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Dialog} from 'primeng/dialog';
import {BankAddComponent} from '../bank/bank-add/bank-add.component';
import {TeacherService} from '../../services/supabase/teacher/teacher.service';
import {TccService} from '../../services/supabase/tcc/tcc.service';

@Component({
  standalone: true,
  selector: 'app-information',
  imports: [
    Button,
    Dialog,
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
  @Input() public guidance: boolean = false;

  public visible: boolean = false;
  public orientador!: string;
  public banca: string[] = [];

  private tccService: TccService = inject(TccService);
  private teacherService: TeacherService = inject(TeacherService);

  ngOnInit() {
    this.getTeacherById(this.orientador_id)
  }

  public openDialog(): void {
    this.visible = true;
  }

  public closeDialog(): void {
    this.visible = false;
  }

  public getTeacherById(id: number) {
    if(id){
      this.teacherService.getTeacherById(id).then((res) => {
        if(res && res.data){
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
}
