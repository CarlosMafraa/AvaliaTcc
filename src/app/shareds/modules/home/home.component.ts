import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MenuComponent} from '../menu/menu.component';
import {SupabaseService} from '../../../services/supabase/supabase.service';

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
export class HomeComponent implements OnInit {
  public router: Router = inject(Router)

  ngOnInit() {
    const userProfile: string | null = localStorage.getItem('user_perfil')
    if (userProfile && userProfile === 'aluno') {
      this.router.navigate(['/home/dashboard']).then();
    } else if (userProfile === 'professor') {
      this.router.navigate(['/home/advisor']).then();
    }
  }

}
