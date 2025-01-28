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
  public id!: number;

  private supabaseService: SupabaseService = inject(SupabaseService);
  private tccService: TccService = inject(TccService);

  ngOnInit() {
    this.getUser();
  }

  public listTccUser(id: number) {
    this.tccService.getTCCsById(id).then((res) => {
      if(res.data){
        this.listTcc = res.data
      }
    })
  }

  public getUser() {
    this.supabaseService.getUser().then((res: User) => {
      if (res && res.id) {
        this.id = res.id;
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      this.listTccUser(this.id);
    })
  }

  public openDialog(): void {
    this.dialog = true;
  }

  public closeDialog(): void {
    this.dialog = false;
    this.listTccUser(this.id);
  }
}



