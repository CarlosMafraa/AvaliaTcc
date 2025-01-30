import {Component, inject, OnInit} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {InformationComponent} from '../information/information.component';
import {DashboardAddComponent} from './dashboard-add/dashboard-add.component';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {UserResponse} from '@supabase/supabase-js';
import {User} from '../../shareds/interfaces/User';
import {Tcc} from '../../shareds/interfaces/Tcc';
import {TccService} from '../../services/supabase/tcc/tcc.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    Dialog,
    Button,
    InformationComponent,
    DashboardAddComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public listTcc: Tcc[] = [];
  public dialog: boolean = false;
  public user_id!: number;

  private supabaseService: SupabaseService = inject(SupabaseService);
  private tccService: TccService = inject(TccService);

  ngOnInit() {
    this.getUser();
  }

  public getTccUser(id: number) {
    this.tccService.getTCCsAlunosById(id).then((res) => {
      if(res.data){
        this.listTcc = res.data
      }
    })
  }

  public getUser() {
    const user_id: number = Number(localStorage.getItem('user_id'));
    if(user_id){
      this.user_id = user_id;
      this.getTccUser(user_id);
    }
  }

  public openDialog(): void {
    this.dialog = true;
  }

  public closeDialog(): void {
    this.dialog = false;
    this.getTccUser(this.user_id);
  }
}



