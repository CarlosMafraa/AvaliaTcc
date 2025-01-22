import {Component, inject, Input, OnInit} from '@angular/core';
import {MultiSelect} from 'primeng/multiselect';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {SupabaseService} from '../../../services/supabase/supabase.service';
import {Button} from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-bank-add',
  imports: [
    MultiSelect,
    ReactiveFormsModule,
    FloatLabel,
    Button
  ],
  templateUrl: './bank-add.component.html',
  styleUrl: './bank-add.component.scss'
})
export class BankAddComponent implements OnInit {
  @Input() public user_id: number = 0;
  @Input() public id: number = 0;
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
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      const { banca } = this.formGroup.value;
      this.supabaseService.updateBanca(this.id, banca).then((res) => {
        console.log(res);
      })
    }
  }


  private getProfessores(id: number) {
    this.supabaseService.getListProfessores(id).then((res)=> {
      if(res.data){
        this.professores = res.data
      }
    })
  }

  public closeDialog(): void {

  }
}
