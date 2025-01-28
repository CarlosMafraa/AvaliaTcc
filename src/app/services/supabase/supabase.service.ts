import {Injectable, signal} from '@angular/core';
import {AuthResponse, createClient, SupabaseClient, User, UserResponse} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient<any, "public", any> = createClient(environment.supabaseUrl, environment.supabaseKey);

  private currentUser = signal<{ email: string, username: string } | null>(null)


  // public getToken(): void {
  //   this.supabase.auth.onAuthStateChange((event, session) => {
  //     if (event === 'SIGNED_IN') {
  //       this.currentUser.set({
  //         email: session?.user.email!,
  //         username: session?.user.identities && session.user.identities.length > 0 ? session.user.identities[0].identity_data?.['username'] : null
  //       });
  //       console.log(this.currentUser);
  //     } else if (event === 'SIGNED_OUT') {
  //       this.currentUser.set(null);
  //     }
  //     console.log('!!!', event, session);
  //   });
  //   console.log(this.currentUser);
  // }


  public signOut() {
    return this.supabase.auth.signOut()
  }




  // public getListProfessores(id: number) {
  //   return this.supabase.from('users').select().eq('perfil', 'professor').neq('id', id)
  // }

  public getTCCsById(id: number) {
    return this.supabase.from('tccs').select().eq('aluno_id', id);
  }

  public getUser() {
    return this.getUserAuth().then((res: UserResponse) => {
      if (res.data.user && res.data.user.id) {
        const userAuthId: string = res.data.user.id;
        return this.supabase.from('users').select().eq('user_id', userAuthId).then((res) => {
          {
            if (res.data && res.data.length > 0) {
              console.log('User_tabela', res)
              return res.data[0];
            } else {
              throw new Error('Usuário não encontrado na tabela users');
            }
          }
        })
      } else {
        throw new Error('Erro ao obter usuário autenticado');
      }
    }).catch((error) => {
      console.log('Erro ao obter usuário:', error)
    }).finally(() => {})
  }

  public getUserAuth() {
    return this.supabase.auth.getUser()
  }

  public getUserById(id: string) {
    return this.supabase.from('users').select().eq('user_id', id)

  }


  public getStudents() {
    return this.supabase.from('users').select().eq('perfil', 'aluno')
  }

  public getTccsOrientador(nome: string) {
    return this.supabase.from('tcc').select().eq('orientador', nome)

  }

  public getTccsBanca(nome: string) {
    return this.supabase.from('tcc').select().contains('banca', [nome]);

  }

  public updateBanca(id: number, professores: any[]) {
    return this.supabase.from('tcc').update({
      banca: professores
    }).eq('id', id);
  }


}
