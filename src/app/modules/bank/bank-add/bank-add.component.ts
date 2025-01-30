import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {Textarea} from 'primeng/textarea';
import {InputNumber} from 'primeng/inputnumber';
import {BankService} from '../../../services/supabase/bank/bank.service';
import {generatePDF} from '../../../services/pdf/generatePDF';

@Component({
  standalone: true,
  selector: 'app-bank-add',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    Textarea,
    InputNumber,
    Button,
  ],
  templateUrl: './bank-add.component.html',
  styleUrl: './bank-add.component.scss'
})
export class BankAddComponent implements OnInit {
  @Input() public banca_id!: number | null;
  @Input() public professor_id!: number;
  @Output() public closeDialogEmitter: EventEmitter<any> = new EventEmitter<any>()

  public formGroup: FormGroup = new FormGroup({});
  private formBuilder: FormBuilder = inject(FormBuilder);
  private bankService: BankService = inject(BankService);

  ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      nota1: [0, Validators.required],
      nota2: [0, Validators.required],
      nota3: [0, Validators.required],
      nota4: [0, Validators.required],
      nota5: [0, Validators.required],
      comentario: ['']
    })
  }

  public save(): void {
    console.log(this.formGroup.value);

    if (!this.formGroup.valid) {
      return;
    }

    const notas = this.formGroup.getRawValue();

    if (this.banca_id && this.professor_id && notas) {
      this.bankService.createNotas(
        this.banca_id,
        this.professor_id,
        notas.nota1,
        notas.nota2,
        notas.nota3,
        notas.nota4,
        notas.nota5,
        notas.comentario
      ).then(async (res) => {
        console.log(res);
        this.closeDialog();
        const nome: string = localStorage.getItem('user_nome') || ''
        const pdfBlob: Blob = await generatePDF(nome,
          [notas.nota1, notas.nota2, notas.nota3, notas.nota4, notas.nota5],
          notas.comentario
        );
        const pdfUrl: string = URL.createObjectURL(pdfBlob);
        if(res && res.data){
          this.bankService.updatedNotas(res.data.id, pdfUrl).then((resp) => {
            console.log(resp)
          })
        }
        window.open(pdfUrl, '_blank');
      })
    } else {
      console.warn("Dados insuficientes para salvar notas.");
    }
  }

  public closeDialog(): void {
    this.closeDialogEmitter.emit()
  }
}
