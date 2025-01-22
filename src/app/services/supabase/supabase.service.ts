import {Injectable, signal} from '@angular/core';
import {AuthResponse, createClient, SupabaseClient, User, UserResponse} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  private currentUser = signal<{ email: string, username: string } | null>(null)

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
          instituicao: instituicao
        }).then((res) => {
          console.log(res)
        })
      } else {
        throw new Error('Erro ao criar usuário');
      }
    })
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password
    })

    return from(promise);
  }


  public getToken(): void {
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.currentUser.set({
          email: session?.user.email!,
          username: session?.user.identities && session.user.identities.length > 0 ? session.user.identities[0].identity_data?.['username'] : null
        });
        console.log(this.currentUser);
      } else if (event === 'SIGNED_OUT') {
        this.currentUser.set(null);
      }
      console.log('!!!', event, session);
    });
    console.log(this.currentUser);
  }


  public signOut() {
    return this.supabase.auth.signOut()
  }

  public uploadTCC(filePath: string, file: File) {
    return this.supabase.storage.from('tccs_files').upload(filePath, file, {
      upsert: true,
      contentType: "application/pdf"
    })
  }

  public salvePDF(titulo: string, descricao: string, pdf: string, orientador: number, aluno_id: string) {
    return this.supabase.from('tccs').insert([
      {
        titulo: titulo,
        descricao: descricao,
        pdf: pdf,
        orientador_id: orientador,
        aluno_id: aluno_id,
      }
    ])
  }


  public getInstituicao() {
    return this.supabase.from('instituicao').select()
  }

  public getTeachers() {
    return this.supabase.from('users').select().eq('perfil','professor')
  }

  public getTeacherById(id: number) {
    return this.supabase.from('users').select().eq('id',id)
  }

  public getListProfessores(id: number){
      return this.supabase.from('users').select().eq('perfil', 'professor').neq('id',id)
    }

  public getTCCsDoUsuario(id: string) {
    return this.supabase.from('tccs').select().eq('aluno_id', id);
  }

  public getUser() {
    return this.supabase.auth.getUser()
  }

  public getUserById(id: string){
    return this.supabase.from('users').select().eq('user_id',id)

  }


  public getStudents() {
    return this.supabase.from('users').select().eq('perfil', 'aluno')
  }

  public getTccsOrientador(nome: string){
    return this.supabase.from('tccs').select().eq('orientador', nome)

  }

  public updateBanca(id: number, professores: any[]) {
    return this.supabase.from('tccs').update({
      banca: professores
    }).eq('id', id);
  }




}
