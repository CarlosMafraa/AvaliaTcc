import { Injectable } from '@angular/core';
import {AuthResponse, createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private supabase: SupabaseClient<any,"public", any> = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() { }

  public login(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signInWithPassword({
      email,
      password
    })
  }

}
