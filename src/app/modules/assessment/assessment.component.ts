import {Component, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {InformationComponent} from '../information/information.component';

@Component({
  standalone: true,
  selector: 'app-assessment',
  imports: [
    InformationComponent
  ],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent implements OnInit{
  public visible: boolean = false;
  public listTcc: any[] = []
  public userId: number = 0;

  private supabaseService: SupabaseService = inject(SupabaseService);


  ngOnInit(): void {
    this.getUser();
  }

  public openDialog() : void {
    this.visible = true;
  }

  public getUser(): void {
    this.supabaseService.getUser().then((res) => {
      if (res.data && res.data.user) {
        this.supabaseService.getUserById(res.data.user.id).then((res) => {
          if (res.data && res.data[0].nome) {
            this.getTccsBanca(res.data[0].nome);
            this.userId = res.data[0].id
            console.log("Oiii!")
            console.log(res)
          }
        })
      }
    })
  }

  public getTccsBanca(nome: string): void {
    this.supabaseService.getTccsBanca(nome).then((res) => {
      if(res.data){
        console.log(res)
        this.listTcc = res.data
      }
    })
  }




}
