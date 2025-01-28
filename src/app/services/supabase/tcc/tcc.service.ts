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


}
