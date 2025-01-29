import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {MultiSelect} from 'primeng/multiselect';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {SupabaseService} from '../../../services/supabase/supabase.service';
import {Button} from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-bank-add',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './bank-add.component.html',
  styleUrl: './bank-add.component.scss'
})
export class BankAddComponent {

}
