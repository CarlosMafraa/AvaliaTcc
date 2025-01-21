import {Component, inject, OnInit} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {InformationComponent} from '../information/information.component';
import {DashboardAddComponent} from './dashboard-add/dashboard-add.component';
import {SupabaseService} from '../../services/supabase/supabase.service';

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
  public listTcc: any[] = [];
  public dialog: boolean = false;
  public id!: string;

  private supabaseService: SupabaseService = inject(SupabaseService);

  ngOnInit() {
    this.getUser();
  }

  public listTccUser(id: string) {
    this.supabaseService.getTCCsDoUsuario(id)?.then((res) => {
      if(res.data){
        this.listTcc = res.data
      }
    })
  }

  public getUser() {
    this.supabaseService.getUser().then((res) => {
      if (res.data.user && res.data.user.id) {
        this.id = res.data.user.id
      }
    }).catch(() => {

    }).finally(() => {
      this.listTccUser(this.id);
    })
  }

  public openDialog(): void {
    this.dialog = true;
  }

  public closeDialog(): void {
    this.dialog = false;
  }
}



