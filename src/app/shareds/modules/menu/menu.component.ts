import {Component, inject, OnInit} from '@angular/core';
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
export class MenuComponent implements OnInit{
  public itens: any[] = itensMenus;

  private supabaseService: SupabaseService = inject(SupabaseService);
  private router: Router = inject(Router);

  ngOnInit() {
    const userData = localStorage.getItem('user_perfil');
    if(userData){
      this.itens = this.itens.filter(item => item.perfis.includes(userData));
    }
  }

  public navigate(route: string) {
    this.router.navigate(['/home/' + route]).then();
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
    name: 'Lista de Tcc',
    route: 'dashboard',
    perfis: ['aluno']
  },
  {
    icon: 'draft_orders',
    name: 'Orientador',
    route: 'advisor',
    perfis: ['professor']
  },
  {
    icon: 'account_balance',
    name: 'Banca',
    route: 'bank',
    perfis: ['professor']
  },
  {
    icon: 'logout',
    name: 'Sair',
    action: 'logout',
    perfis: ['aluno', 'professor']
  }
]
