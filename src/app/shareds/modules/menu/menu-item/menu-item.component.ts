import {Component, inject, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-menu-item',
  imports: [
    RouterLink
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() public icon!: string;
  @Input() public name!: string;
  @Input() public route!: string;

  // private router: Router = inject(Router);
  //
  //
  // openRouter(rota: string) {
  //   console.log(rota)
  //   this.router.navigate([rota]).then();
  // }
}
