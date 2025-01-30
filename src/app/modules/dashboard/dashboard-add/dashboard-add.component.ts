import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {SupabaseService} from '../../../services/supabase/supabase.service';
import {User} from '../../../shareds/interfaces/User';
import {TccService} from '../../../services/supabase/tcc/tcc.service';
import {MultiSelect} from 'primeng/multiselect';
import {TeacherService} from '../../../services/supabase/teacher/teacher.service';

@Component({
  standalone: true,
  selector: 'app-dashboard-add',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    Select,
    FileUpload,
    Button,
    InputText,
  ],
  templateUrl: './dashboard-add.component.html',
  styleUrl: './dashboard-add.component.scss'
})
export class DashboardAddComponent implements OnInit {
  @Output() closeDialogEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public professores: any[] = [];
  public formGroup: FormGroup = new FormGroup({})
  public selectedFile: File | null = null;
  public id!: number;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private tccService: TccService = inject(TccService);
  private teacherService: TeacherService = inject(TeacherService);


  ngOnInit(): void {
    this.initForm();
    this.getTeachers();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      orientador: ['', Validators.required],
      aluno_id: ['']
    })
  }

  public getTeachers(): void {
    this.teacherService.getTeachers().then((res) => {
      if (res.data) {
        this.professores = res.data
      }
    });
  }

  public async save(): Promise<void> {
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

      tcc.aluno_id = this.id;

      this.tccService.createPDF(filePath, file).then((res): void => {
        if (res.data) {
          const pdf: string = res.data.path;
          this.tccService.createTcc(tcc.titulo, tcc.descricao, pdf, tcc.orientador,  tcc.aluno_id).then((res) => {
          })
        }
      }).catch((error) => {
        console.log(error)
      }).finally(()=> {
        this.closeDialog();
      })
    } else {
      console.warn('Preencha todos os campos e selecione um arquivo!');
    }
  }


  public onUpload(event: FileSelectEvent): void {
    this.selectedFile = event.files[0];

  }

  public closeDialog(): void {
    this.closeDialogEmitter.emit();
  }

}
