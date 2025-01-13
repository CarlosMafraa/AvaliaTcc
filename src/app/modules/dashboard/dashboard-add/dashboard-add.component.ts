import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {SupabaseService} from '../../../services/supabase/supabase.service';

@Component({
  standalone: true,
  selector: 'app-dashboard-add',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    Select,
    FileUpload,
    Button,
    InputText
  ],
  templateUrl: './dashboard-add.component.html',
  styleUrl: './dashboard-add.component.scss'
})
export class DashboardAddComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public professores: any[] = [];
  public formGroup: FormGroup = new FormGroup({})
  public selectedFile: File | null = null;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private supabaseService: SupabaseService = inject(SupabaseService);


  ngOnInit(): void {
    this.initForm();
    this.getProfessor();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      orientador: [''],
    })
  }

  public getProfessor(): void {

  }

  public async salve(): Promise<void> {
    if (this.formGroup.valid && this.selectedFile) {
      const tcc = this.formGroup.getRawValue();

      if (!this.selectedFile) {
        throw new Error('Você deve selecionar um arquivo PDF para fazer upload.');
      }

      const file: File = this.selectedFile;
      const fileExt: string | undefined = file.name.split('.').pop();
      const filePath: string = `tccs_files/${Date.now()}_${file.name}`;

      if (fileExt !== 'pdf') {
        console.error("Apenas arquivos PDF são permitidos.");
        return;
      }


      this.supabaseService.uploadTCC(filePath, file).then((res): void => {
        console.log(res)
        if (res.data) {
          const pdf: string = res.data.path;
          this.supabaseService.salvePDF(tcc.titulo, tcc.descricao, pdf, 1).then((res) => {
            console.log(res)
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      console.warn('Preencha todos os campos e selecione um arquivo!');
    }
  }


  public onUpload(event: FileSelectEvent): void {
    this.selectedFile = event.files[0];

  }

  public closeDialog(): void {

  }
}
