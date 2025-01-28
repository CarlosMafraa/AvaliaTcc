export interface Tcc {
  id: number;
  titulo: string;
  descricao: string;
  pdf: string;
  orientador_id: number;
  aluno_id: number;
  banca_id: number | null;
  resultado_id: number | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}
