import { Component } from '@angular/core';
import {Tcc} from '../../shareds/interfaces/Tcc';
import {InformationComponent} from '../information/information.component';

@Component({
  standalone: true,
  selector: 'app-advisor',
  imports: [
    InformationComponent
  ],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss'
})
export class AdvisorComponent {
  public listTcc: Tcc[] = [];

}
