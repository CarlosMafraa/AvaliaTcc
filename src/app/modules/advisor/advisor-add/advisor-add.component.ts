import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SupabaseService} from '../../../services/supabase/supabase.service';

@Component({
  standalone: true,
  selector: 'app-advisor-add',
  imports: [],
  templateUrl: './advisor-add.component.html',
  styleUrl: './advisor-add.component.scss'
})
export class AdvisorAddComponent {
  @Input() public user_id: number = 0;
  @Input() public id: number = 0;

  @Output() public closeDialogEmitter: EventEmitter<any> = new EventEmitter<any>()

  public formGroup: FormGroup = new FormGroup({});
  public professores: any[] = [];

  private formBuilder: FormBuilder = inject(FormBuilder);
  private supabaseService: SupabaseService = inject(SupabaseService);

  ngOnInit() {
    this.initForm();
    this.getProfessores(this.user_id);
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      banca: this.formBuilder.control([], Validators.required)
    })
  }

  public salve(): void {
    if (this.formGroup.valid) {
      const {banca} = this.formGroup.value;
      this.supabaseService.updateBanca(this.id, banca).then((res) => {
        console.log(res);
      })
    }
  }


  private getProfessores(id: number) {
    // this.supabaseService.getListProfessores(id).then((res) => {
    //   if (res.data) {
    //     this.professores = res.data
    //   }
    // })
  }

  public closeDialog(): void {
    this.closeDialogEmitter.emit();
  }
}
