import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TccService {
  private supabase: SupabaseClient<any,"public", any> = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() { }

  public createTcc(titulo: string, descricao: string, pdf: string, orientador: number, aluno_id: string) {
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


  public createPDF(filePath: string, file: File) {
    return this.supabase.storage.from('tccs_files').upload(filePath, file, {
      upsert: true,
      contentType: "application/pdf"
    })
  }

  public getPdf(path: string) {
    return this.supabase.storage.from('tccs_files').download(path);
  }

  public getTCCsAlunosById(id: number) {
    return this.supabase.from('tccs').select().eq('aluno_id', id);
  }

  public getTCCsByIdAdvisor(id: number) {
    return this.supabase.from('tccs').select().eq('orientador_id', id);
  }

  public updateTcc(tcc_id: number, banca_id: number){
    return this.supabase.from('tccs').update({'banca_id': banca_id}).eq('id',tcc_id)
  }

  public getTCCsById(tcc_id: number) {
    return this.supabase.from('tccs').select().eq('id', tcc_id);
  }




}
