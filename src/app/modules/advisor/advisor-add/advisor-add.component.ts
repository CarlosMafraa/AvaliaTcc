import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupabaseService} from '../../../services/supabase/supabase.service';
import {FloatLabel} from 'primeng/floatlabel';
import {MultiSelect} from 'primeng/multiselect';
import {Button} from 'primeng/button';
import {TeacherService} from '../../../services/supabase/teacher/teacher.service';
import {AdvisorService} from '../../../services/supabase/advisor/advisor.service';
import {TccService} from '../../../services/supabase/tcc/tcc.service';

@Component({
  standalone: true,
  selector: 'app-advisor-add',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    MultiSelect,
    Button
  ],
  templateUrl: './advisor-add.component.html',
  styleUrl: './advisor-add.component.scss'
})
export class AdvisorAddComponent implements OnInit {
  @Input() public tcc_id!: number;
  @Output() public closeDialogEmitter: EventEmitter<any> = new EventEmitter<any>()

  public formGroup: FormGroup = new FormGroup({});
  public professores: any[] = [];

  private formBuilder: FormBuilder = inject(FormBuilder);
  private teacherService: TeacherService = inject(TeacherService);
  private advisorService: AdvisorService = inject(AdvisorService);
  private tccService: TccService = inject(TccService);

  ngOnInit() {
    this.initForm();
    this.getTeachers();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      banca: this.formBuilder.control([], [Validators.required])
    })
  }

  public salve(): void {
    if (this.formGroup.valid) {
      const {banca} = this.formGroup.value;

      this.advisorService.createBanca(this.tcc_id).then((res) => {
        if (res.data) {
          const bancaId = res.data.id;

          banca.forEach((professor_id: number) => {
            this.advisorService.createMembroBanca(bancaId, professor_id).then((membro) => {
              console.log('Membro da banca associado:', membro);
            })
          })
          this.tccService.updateTcc(this.tcc_id, bancaId).then((res) => {
            console.log(res)
          })
        }
      })
      this.closeDialog();
      this.formGroup.reset();
    }
  }


  public getTeachers(): void {
    this.teacherService.getTeachers().then((res) => {
      if (res.data) {
        this.professores = res.data
      }
    });
  }

  public closeDialog(): void {
    this.closeDialogEmitter.emit();
  }
}
