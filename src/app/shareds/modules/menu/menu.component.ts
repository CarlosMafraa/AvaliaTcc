import {Component, inject} from '@angular/core';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {SupabaseService} from '../../../services/supabase/supabase.service';

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

  private supabaseService: SupabaseService = inject(SupabaseService);
  private router: Router = inject(Router);

  public navigate(route: string) {
    this.router.navigate(['/home/'+route]).then();
  }

  public handleAction(action: string) {
    if (action === 'logout') {
      this.logout();
    }
  }

  public logout() {
    this.supabaseService.signOut().then(() => {
        console.log('Usuário deslogado');
        this.router.navigate(['/login']).then();
      }
    );
  }

}

const itensMenus: any[] = [
  {
    icon: 'dashboard',
    name: 'Dashboard',
    route: 'dashboard',
  },
  {
    icon: 'draft_orders',
    name: 'Dashboard',
    route: 'advisor',
  },
  {
    icon: 'account_balance',
    name: 'Banca',
    route: 'bank',
  },
  {
    icon: 'logout',
    name: 'Sair',
    action: 'logout'
  }
]
