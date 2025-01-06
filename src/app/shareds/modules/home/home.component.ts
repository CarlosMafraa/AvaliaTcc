import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
