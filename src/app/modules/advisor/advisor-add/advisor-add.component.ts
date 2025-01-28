import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupabaseService} from '../../../services/supabase/supabase.service';
import {FloatLabel} from 'primeng/floatlabel';
import {MultiSelect} from 'primeng/multiselect';
import {Button} from 'primeng/button';
import {TeacherService} from '../../../services/supabase/teacher/teacher.service';

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
export class AdvisorAddComponent implements OnInit{
  @Input() public id: number = 0;
  @Output() public closeDialogEmitter: EventEmitter<any> = new EventEmitter<any>()

  public formGroup: FormGroup = new FormGroup({});
  public professores: any[] = [];

  private formBuilder: FormBuilder = inject(FormBuilder);
  private teacherService: TeacherService = inject(TeacherService);
  private supabaseService: SupabaseService = inject(SupabaseService);

  ngOnInit() {
    this.initForm();
    this.getTeachers();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      banca: this.formBuilder.control([], Validators.required)
    })
  }

  public salve(): void {
    if (this.formGroup.valid) {
      const {banca} = this.formGroup.value;
      console.log(banca)
      console.log(this.id)
      // this.supabaseService.updateBanca(this.id, banca).then((res) => {
      //   console.log(res);
      // })
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
