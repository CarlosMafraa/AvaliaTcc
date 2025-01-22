import {Component, inject, Input, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Dialog} from 'primeng/dialog';
import {BankAddComponent} from '../bank/bank-add/bank-add.component';

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
export class InformationComponent {
  @Input() public id!: number;
  @Input() public titulo!: string;
  @Input() public descricao!: string;
  @Input() public pdfUrl!: string;
  @Input() public professoresBanca!: string[] | undefined;
  @Input() public orientador!: any;
  @Input() public dataApresentacao!: Date | string;
  @Input() public guidance: boolean = false;
  @Input() public user_id: number = 0;

  public visible: boolean = false;

  public openDialog(): void {
    this.visible = true;
  }

  public closeDialog(): void {
    this.visible = false;
  }


}
