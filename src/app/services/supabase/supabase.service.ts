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
    localStorage.clear();
    return this.supabase.auth.signOut();
  }




  // public getListProfessores(id: number) {
  //   return this.supabase.from('users').select().eq('perfil', 'professor').neq('id', id)
  // }



  public async getUser(): Promise<any> {
    const userAuth = await this.getUserAuth();
    if (userAuth.data.user && userAuth.data.user.id) {
      const userAuthId: string = userAuth.data.user.id;
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('user_id', userAuthId);

      if (error) {
        throw new Error('Erro ao buscar usuário na tabela users');
      }

      if (data && data.length > 0) {
        return data[0]; // Retorna as informações do usuário
      } else {
        throw new Error('Usuário não encontrado na tabela users');
      }
    } else {
      throw new Error('Erro ao obter usuário autenticado');
    }
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
