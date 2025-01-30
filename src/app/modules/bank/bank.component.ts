import {Component, inject, OnInit} from '@angular/core';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {InformationComponent} from '../information/information.component';
import {Tcc} from '../../shareds/interfaces/Tcc';
import {User} from '../../shareds/interfaces/User';
import {TccService} from '../../services/supabase/tcc/tcc.service';
import {TeacherService} from '../../services/supabase/teacher/teacher.service';
import {AdvisorService} from '../../services/supabase/advisor/advisor.service';

@Component({
  standalone: true,
  selector: 'app-bank',
  imports: [
    InformationComponent,
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.scss'
})
export class BankComponent implements OnInit {
  public listTcc: Tcc[] = [];
  public user_id!: number;

  private supabaseService: SupabaseService = inject(SupabaseService);
  private tccService: TccService = inject(TccService);
  private teacherService: TeacherService = inject(TeacherService);
  private advisorService: AdvisorService = inject(AdvisorService);


  ngOnInit(): void {
    this.getUser();
  }

  public getUser() {
    const user_id: number = Number(localStorage.getItem('user_id'));
    if(user_id){
      this.user_id = user_id;
      this.getBancaMembro(user_id);
    }
  }

  public getBancaMembro(professor_id: number){
    this.advisorService.getBancaMembro(professor_id).then((res) => {
      if(res && res.data){
        console.log(res)
        res.data.forEach((rep) =>{
          console.log(rep)
          console.log(rep.banca_id)
          this.advisorService.getBancas(rep.banca_id).then((resp)=> {
            if(resp && resp.data){
              console.log(resp)
              this.tccService.getTCCsById(resp.data.tcc_id).then((resposta)=>{
                if(resposta && resposta.data){
                  this.listTcc = resposta.data
                }
              })
            }
          })
        })
      }
    })

  }






}
