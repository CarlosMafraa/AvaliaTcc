import { Component } from '@angular/core';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [
    MenuItemComponent,
    NgOptimizedImage
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public itens: any = itensMenus;

}

const itensMenus: any[] = [
  {
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    icon: 'cast_for_education',
    name: 'Professores',
    route: '/teacher',

  },
  {
    icon: 'draft_orders',
    name: 'Orientador',
    route: '/guidance',
  },
]
