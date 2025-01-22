import {Component, inject, OnInit} from '@angular/core';
import {SupabaseService} from '../../services/supabase/supabase.service';
import * as stream from 'stream';
import {InformationComponent} from '../information/information.component';
import {DashboardAddComponent} from '../dashboard/dashboard-add/dashboard-add.component';
import {Dialog} from 'primeng/dialog';

@Component({
  standalone: true,
  selector: 'app-bank',
  imports: [
    InformationComponent,
    DashboardAddComponent,
    Dialog
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.scss'
})
export class BankComponent implements OnInit {
  private supabaseService: SupabaseService = inject(SupabaseService);

  public listTcc: any[] = []
  public userId: number = 0;
  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.supabaseService.getUser().then((res) => {
      if (res.data && res.data.user) {
        this.supabaseService.getUserById(res.data.user.id).then((res) => {
          if (res.data && res.data[0].nome) {
            this.getTccsUser(res.data[0].nome);
            this.userId = res.data[0].id
          }
        })
      }
    })
  }

  public getTccsUser(nome: string): void {
    this.supabaseService.getTccsOrientador(nome).then((res) => {
      if(res.data){
        this.listTcc = res.data
      }
    })
  }

}
