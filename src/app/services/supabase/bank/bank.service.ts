import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private supabase: SupabaseClient<any, "public", any> = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() {
  }

  public createNotas(banca_id: number, professor_id: number, nota1: number, nota2: number, nota3: number, nota4: number, nota5: number, comentario: number) {
    return this.supabase
      .from('avaliacoes')
      .insert({
        banca_id: banca_id,
        professor_id: professor_id,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        nota4: nota4,
        nota5: nota5,
        comentario: comentario
      }).select().single()
  }

  public updatedNotas(id: number, pdf: string) {
    return this.supabase
      .from('avaliacoes')
      .update({
        pdf: pdf
      }).eq('id', id);
  }

  public getNotas(banca_id: number, professor_id: number) {
    return this.supabase
      .from('avaliacoes')
      .select('*')
      .eq('banca_id', banca_id)
      .eq('professor_id', professor_id).single()
  }

  public async checkIfNotasExist(banca_id: number, professor_id: number): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('avaliacoes')
      .select()
      .eq('banca_id', banca_id)
      .eq('professor_id', professor_id);

    if (error) {
      console.error('Erro ao verificar as notas:', error);
      return false;
    }

    return data && data.length > 0 || false;
  }


}
