export type Esfera = 'federal' | 'estadual' | 'municipal';

export type CategoriaObjeto = 'bens' | 'servicos' | 'engenharia' | 'ti';

export interface SolicitacaoContratacao {
  esfera: Esfera;
  categoria: CategoriaObjeto;
  orgaoDemandante: string;
  nomeObjeto: string;
  valorEstimado: number;
  descricaoDetalhada: string;
  municipioPop?: string; // para contexto municipal
}

export interface ItemChecklist {
  id: string;
  documento: string;
  apelido: string;
  obrigatorio: boolean;
  baseLegal: string;
  descricao: string;
  recomendaParaCategoria: CategoriaObjeto[];
  elementosChave: string[];
}

export interface HistoricoRascunhos {
  id: string;
  titulo: string;
  tipoDocumento: string;
  dataCriacao: string;
  conteudo: string;
  parametrosUsados: SolicitacaoContratacao;
}
