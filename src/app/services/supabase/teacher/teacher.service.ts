import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private supabase: SupabaseClient<any, "public", any> = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() { }

  public getTeachers() {
    return this.supabase.from('users').select().eq('perfil', 'professor')
  }

  public getTeacherById(id: number) {
    return this.supabase.from('users').select().eq('id', id).eq('perfil','professor')
  }
}
