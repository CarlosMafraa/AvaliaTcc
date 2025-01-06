import {Injectable, signal} from '@angular/core';
import {AuthResponse, createClient, SupabaseClient, User, UserResponse} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';
import {catchError, from, Observable, throwError} from 'rxjs';

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


  public getUser() {
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

  public logout(): void {
    this.supabase.auth.signOut().then()
    console.log("Eu saiii!")
  }

}
