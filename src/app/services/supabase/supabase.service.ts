import {Injectable} from '@angular/core';
import {AuthResponse, createClient, SupabaseClient, User, UserResponse} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase!: SupabaseClient;


  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

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

  public login(email: string, password: string) : Observable<AuthResponse>{
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password
    })

    return from(promise)
  }

  getUser(): Promise<UserResponse> {
    return this.supabase.auth.getUser();
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

}
