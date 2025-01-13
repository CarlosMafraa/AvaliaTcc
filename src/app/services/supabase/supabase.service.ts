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

  public register(email: string, password: string, nome: string, sobrenome: string, perfil: string, instituicao: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            nome,
            sobrenome,
            perfil,
            instituicao
          }
        }
      });
    return from(promise)
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password
    })

    return from(promise);
  }


  public getUser(): void {
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.currentUser.set({
          email: session?.user.email!,
          username: session?.user.identities?.at(0)?.identity_data?.['username']
        })
        console.log(this.currentUser)
      } else if (event === 'SIGNED_OUT') {
        this.currentUser.set(null)
      }
      console.log('!!!', event, session)
    })
    console.log(this.currentUser)
  }

  public signOut() {
    return this.supabase.auth.signOut()
  }

  public uploadTCC(filePath: string, file: File) {
    return this.supabase.storage.from('tccs_files').upload(filePath, file, {upsert: true, contentType: "application/pdf"})
  }

  public salvePDF(titulo: string, descricao: string, pdf: string, orientador: number) {
     return  this.supabase.from('tccs').insert([
      {
        titulo:titulo,
        descricao:descricao,
        pdf:pdf,
        orientador_id:orientador,
      }
    ])
  }


  public getInstituicao() {
    return this.supabase.from('instituicao').select()
  }

  public getUsers(){
    return this.supabase.from('users').select()
  }





}
