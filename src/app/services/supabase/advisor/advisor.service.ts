import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {
  private supabase: SupabaseClient<any, "public", any> = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() {
  }

  public createBanca(tcc_id: number) {
    return this.supabase.from('banks').insert([{
      tcc_id: tcc_id
    }]).select().single()
  }

  public createMembroBanca(banca_id: number, professor_id: number) {
    return this.supabase.from('bank_members').insert([{
      banca_id: banca_id,
      professor_id: professor_id
    }])
  }

  public getBanca(tcc_id: number) {
    return this.supabase.from('banks').select().eq('tcc_id', tcc_id).single();
  }

  public getMembroBanca(banca_id: number) {
    return this.supabase.from('bank_members').select().eq('banca_id', banca_id)
  }

  public getBancaMembro(professor_id: number) {
    return this.supabase.from('bank_members').select().eq('professor_id', professor_id)
  }

  public getBancas(banca_id: number) {
    return this.supabase.from('banks').select().eq('id', banca_id).single();
  }


}
