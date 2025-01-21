import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
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
export class HomeComponent implements OnInit{
  public supabaseService:SupabaseService = inject(SupabaseService)

  ngOnInit() {
    this.supabaseService.getToken();
  }

}
