import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private supabase: SupabaseClient<any,"public", any> = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() { }

  public register(email: string, password: string, nome: string, sobrenome: string, perfil: string, instituicao: string) {
    return this.supabase.auth.signUp(
      {
        email,
        password,
      }).then((res) => {
      if (res.data) {
        this.supabase.from('users').insert({
          user_id: res.data.user?.id,
          nome: nome,
          sobrenome: sobrenome,
          perfil: perfil,
          instituicao_id: instituicao
        }).then((res) => {
          console.log(res)
        })
      } else {
        throw new Error('Erro ao criar usuário');
      }
    })
  }

  public getInstituicao() {
    return this.supabase.from('institutions').select()
  }
}
