import {inject, Injectable} from '@angular/core';
import {AuthResponse, createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../../environments/environment';
import {SupabaseService} from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private supabase: SupabaseClient<any,"public", any> = createClient(environment.supabaseUrl, environment.supabaseKey);
  private supabaseService: SupabaseService = inject(SupabaseService);

  constructor() { }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const authResponse = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authResponse.data.user) {
      const userInfo = await this.supabaseService.getUser();
      if (userInfo) {
        localStorage.setItem('user_id', userInfo.id)
        localStorage.setItem('user_nome', userInfo.nome + ' ' + userInfo.sobrenome)
        localStorage.setItem('user_perfil', userInfo.perfil)
      }
    }

    return authResponse;
  }

}
