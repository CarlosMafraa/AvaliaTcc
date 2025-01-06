import {Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() public icon!: string;
  @Input() public name!: string;
}
