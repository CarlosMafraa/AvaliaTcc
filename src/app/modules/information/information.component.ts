import {Component, inject, Input, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {SupabaseService} from '../../services/supabase/supabase.service';

@Component({
  standalone: true,
  selector: 'app-information',
  imports: [
    Button
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent{
  @Input() titulo!: string;
  @Input() descricao!: string;
  @Input() pdfUrl!: string;
  @Input() professoresBanca!: string[] | undefined;
  @Input() orientador!: any;
  @Input() dataApresentacao!: Date | string;
  @Input() guidance: boolean = false;


  public openDialog(): void {

  }


}
