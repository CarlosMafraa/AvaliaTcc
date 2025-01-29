import {Component, inject, OnInit} from '@angular/core';
import {Tcc} from '../../shareds/interfaces/Tcc';
import {InformationComponent} from '../information/information.component';
import {User} from '../../shareds/interfaces/User';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {TccService} from '../../services/supabase/tcc/tcc.service';
import {Dialog} from "primeng/dialog";
import {AdvisorAddComponent} from './advisor-add/advisor-add.component';

@Component({
  standalone: true,
  selector: 'app-advisor',
  imports: [
    InformationComponent,
  ],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss'
})
export class AdvisorComponent implements OnInit {
  public listTcc: Tcc[] = [];
  public id!: number;

  private supabaseService: SupabaseService = inject(SupabaseService);
  private tccService: TccService = inject(TccService);

  public dialog: boolean = false;

  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    this.supabaseService.getUser().then((res: User) => {
      if (res && res.id) {
        this.id = res.id;
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      this.listTccAdvisor(this.id);
    })
  }

  public listTccAdvisor(id: number) {
    this.tccService.getTCCsByIdAdvisor(id).then((res) => {
      if(res.data){
        this.listTcc = res.data
      }
    })
  }

  public closeDialog() : void {
    this.dialog = false
  }
}
