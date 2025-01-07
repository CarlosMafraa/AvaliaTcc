import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

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
export class DashboardAddComponent implements OnInit{
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public professores: any[] = [];
  public formGroup: FormGroup = new FormGroup({})
  public selectedFile: File | null = null;

  private formBuilder: FormBuilder = inject(FormBuilder);


  ngOnInit(): void {
    this.initForm();
    this.getProfessor();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      orientador: ['', Validators.required],
    })
  }

  public getProfessor(): void {

  }

  public salve(): void {

  }

  public onUpload($event: FileSelectEvent): void {

  }

  public closeDialog(): void {

  }
}
