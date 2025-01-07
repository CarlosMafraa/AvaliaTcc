import {Component, Input} from '@angular/core';
import {Button} from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-information',
  imports: [
    Button
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  @Input() titulo!: string;
  @Input() descricao!: string;
  @Input() pdfUrl!: string;
  @Input() professoresBanca!: string[] | undefined;
  @Input() orientador!: string;
  @Input() dataApresentacao!: Date | string;
  @Input() guidance: boolean = false;

  public openDialog(): void {

  }
}
