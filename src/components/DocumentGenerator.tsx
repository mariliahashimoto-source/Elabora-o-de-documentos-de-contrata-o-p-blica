import React, { useState, useEffect } from 'react';
import { SolicitacaoContratacao } from '../types';
import { TEMPLATES_PADRAO } from '../data';
import { FileText, Copy, Download, RefreshCw, Sparkles, Send, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

interface DocumentGeneratorProps {
  config: SolicitacaoContratacao;
}

export default function DocumentGenerator({ config }: DocumentGeneratorProps) {
  const [selectedDocId, setSelectedDocId] = useState<string>('tr');
  const [documentContent, setDocumentContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiInstruction, setAiInstruction] = useState<string>('');
  const [loadStep, setLoadStep] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set default Document ID based on category (engineering uses project_basico instead of TR)
  useEffect(() => {
    if (config.categoria === 'engenharia') {
      setSelectedDocId('projeto_basico');
    } else {
      setSelectedDocId('tr');
    }
  }, [config.categoria]);

  // Compute a live fallback template based on active state parameters
  const generateLiveFallback = (docId: string): string => {
    const templates = TEMPLATES_PADRAO[config.categoria] || {};
    let raw = templates[docId] || templates['tr'] || '';
    
    // Replace placeholders with real values from the user configurator
    raw = raw.replace(/\[Substituir pelo Nome do Objeto\]/g, config.nomeObjeto || 'Solução Escolhida');
    raw = raw.replace(/\[Substituir pelo Nome do Bem\]/g, config.nomeObjeto || 'Material Solicitado');
    raw = raw.replace(/\[Substituir pelo Nome do Serviço\]/g, config.nomeObjeto || 'Serviço Especificado');
    raw = raw.replace(/\[Substituir pelo Nome da Obra\]/g, config.nomeObjeto || 'Obra Desejada');
    raw = raw.replace(/\[X\]/g, '01');
    raw = raw.replace(/\[Inserir processo administrativo eletrônico\]/g, 'Nº ' + Math.floor(Math.random() * 10000) + '/' + new Date().getFullYear());
    raw = raw.replace(/\[Inserir Processo\]/g, 'Nº ' + Math.floor(Math.random() * 1000) + '/' + new Date().getFullYear());
    raw = raw.replace(/MINISTÉRIO DA ADMINISTRAÇÃO \/ SECRETARIA DE ESTADO \/ SECRETARIA MUNICIPAL/g, config.orgaoDemandante || 'ADMINISTRAÇÃO PÚBLICA CONTRATANTE');
    raw = raw.replace(/\[Data Atual\]/g, new Date().toLocaleDateString('pt-BR'));
    
    return raw;
  };

  // Update draft window whenever state/doc selection changes
  useEffect(() => {
    setDocumentContent(generateLiveFallback(selectedDocId));
    setErrorMessage(null);
  }, [selectedDocId, config.categoria, config.nomeObjeto, config.orgaoDemandante]);

  // Loading animation sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating) {
      timer = setInterval(() => {
        setLoadStep(prev => (prev + 1) % 4);
      }, 1500);
    } else {
      setLoadStep(0);
    }
    return () => clearInterval(timer);
  }, [isGenerating]);

  // Call the server-side Gemini generation
  const handleGenerateAI = async (isRefinement = false) => {
    setIsGenerating(true);
    setErrorMessage(null);
    try {
      const docTypeFullNames: Record<string, string> = {
        dfd: 'Documento de Formalização da Demanda (DFD)',
        etp: 'Estudo Técnico Preliminar (ETP)',
        tr: 'Termo de Referência (TR)',
        projeto_basico: 'Projeto Básico (Memorial Descritivo e Especificações)',
        pesquisa_precos: 'Relatório de Pesquisa de Preços de Mercado',
        minuta_edital: 'Minuta de Edital de Licitação',
        minuta_contrato: 'Minuta de Contrato / Ata de Registro de Preços',
        matriz_riscos: 'Análise de Riscos / Matriz de Riscos'
      };

      const docFullName = docTypeFullNames[selectedDocId] || selectedDocId;

      let prompt = '';
      let systemInstruction = `Você é um assessor jurídico e administrador público sênior, com profundo conhecimento em licitações públicas municipais, estaduais e federais conforme a Lei Federal nº 14.133/2021.
A sua tarefa é gerar rascunhos de documentos formais, estruturados, gramaticalmente perfeitos, com termos oficiais adequados, sem resumos preguiçosos ou colchetes vazios. Use preferencialmente o formato de redação clássica administrativa pública brasileira.`;

      if (!isRefinement) {
        prompt = `Gere uma minuta oficial de alta qualidade para o seguinte documento da fase preparatória sob a Lei nº 14.133/2021:

TIPO DE DOCUMENTO: ${docFullName}
ESFERA GOVERNAMENTAL: ${config.esfera} ${config.esfera === 'municipal' && config.municipioPop === 'baixo' ? '(Município de pequeno porte < 20 mil hab. - aplicar prerrogativas do Art. 176 da Lei 14.133 se relevante)' : ''}
ÓRGÃO DEMANDANTE: ${config.orgaoDemandante || 'Administração Geral'}
NOME DO OBJETO: ${config.nomeObjeto || 'Aquisição/Contratação Desconhecida'}
VALOR ESTIMADO: R$ ${config.valorEstimado ? config.valorEstimado.toLocaleString('pt-BR') : 'Não especificado'}
CATEGORIA DO OBJETO: ${config.categoria === 'ti' ? 'Tecnologia da Informação (TIC)' : config.categoria === 'engenharia' ? 'Obras e Engenharia Civil' : config.categoria === 'servicos' ? 'Serviços Comuns' : 'Aquisição de Bens'}
DESCRIÇÃO/DETALHES FORNECIDOS: ${config.descricaoDetalhada || 'Prestação normal do objeto conforme necessidades operacionais vigentes.'}

INSTRUÇÕES DO DOCUMENTO:
- O tom deve ser estritamente formal, normativo e técnico.
- Se for ETP: Lembre-se de cobrir todos os aspectos do Art. 18 da Lei 14.133/2021, incluindo o Alinhamento ao PCA/PDTIC, Requisitos Técnicos, Levantamento de Soluções e Declaração de Viabilidade.
- Se for TR de TI ou Serviços: Defina um Acordo de Nível de Serviço (SLA) ou Instrumento de Medição de Resultado (IMR) severo e robusto. Vede cobrança por homem-hora puro se for TI.
- Se for Engenharia: Faça referências expressas a tabelas do SINAPI/SICRO para a elaboração de custos detalhados e preveja cronograma.
- Se for Matriz de Riscos: Crie uma tabela detalhando Ameaça, Mitigação e Responsabilidade (Administrativa ou Contratada).
- Adicione cabeçalhos, datas, e campos formais para assinatura. Retorne em formato Markdown limpo e bonito.`;
      } else {
        prompt = `Você recebeu um rascunho de documento existente:

TIPO DE DOCUMENTO: ${docFullName}
RASCUNHO ATUAL:
"""
${documentContent}
"""

Ajuste e aprimore o rascunho acima seguindo a seguinte solicitação do usuário:
"${aiInstruction}"

Mantenha o rito normativo da Lei nº 14.133/2021, a formatação técnica oficial, e retorne o documento completo integrado, revisado e finalizado em Markdown.`;
      }

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction })
      });

      if (!response.ok) {
        throw new Error(`Servidor respondeu com código de erro ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.text) {
        setDocumentContent(data.text);
        if (isRefinement) {
          setAiInstruction('');
        }
      } else {
        throw new Error('Nenhuma resposta de texto retornada pelo assistente.');
      }

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Erro inesperante ao conectar ao assistente de IA.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContent);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([documentContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `minuta_${selectedDocId}_14133.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadingMessages = [
    "Consultando legislação (Lei 14.133/2021)...",
    "Verificando Instruções Normativas federais (SEGES/MGI)...",
    "Modelando cláusulas de garantia técnico-operacional...",
    "Estruturando governança orçamentária e assinaturas..."
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="generator_container">
      {/* Esquerda: Seletor de Minuta e Variáveis de Controle */}
      <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-md flex flex-col justify-between">
        <div className="space-y-5">
          <div>
            <h3 className="text-md font-semibold text-neutral-100 flex items-center">
              <FileText className="w-5 h-5 mr-1.5 text-emerald-500" />
              Minuta Governamental
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              Selecione o documento que você deseja modelar, revisar e exportar.
            </p>
          </div>

          <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
            {[
              { id: 'dfd', name: '01. DFD (Demanda)' },
              { id: 'etp', name: '02. ETP (Estudo Preliminar)' },
              { id: 'tr', name: '03. TR (Termo de Referência)', hide: config.categoria === 'engenharia' },
              { id: 'projeto_basico', name: '03. Projeto Básico', hide: config.categoria !== 'engenharia' },
              { id: 'matriz_riscos', name: '04. Matriz de Riscos' },
              { id: 'pesquisa_precos', name: '05. Pesquisa de Preços' },
              { id: 'minuta_edital', name: '06. Minuta do Edital' },
              { id: 'minuta_contrato', name: '07. Minuta do Contrato' }
            ].map((doc) => {
              if (doc.hide) return null;
              const isSel = doc.id === selectedDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all ${
                    isSel 
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-850'
                  }`}
                >
                  <span>{doc.name}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-all ${isSel ? 'text-emerald-400 translate-x-1' : 'text-neutral-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Generative triggers with AI */}
          <div className="pt-4 border-t border-neutral-800">
            <button
              onClick={() => handleGenerateAI(false)}
              disabled={isGenerating}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-800 text-neutral-950 font-bold px-4 py-3 rounded-lg text-xs flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 mr-1 text-neutral-950 animate-pulse" />
              {isGenerating ? "Processando Legislação..." : "Gerar Rascunho com IA (Gemini)"}
            </button>
          </div>
        </div>

        {/* Refinement box */}
        <div className="mt-5 pt-4 border-t border-neutral-800 space-y-3">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
              Refinar Minuta Corrente
            </span>
            <p className="text-[11px] text-neutral-400 mt-0.5 leading-normal">
              Peça à IA para reescrever, adicionar prazos, multas ou adequações regionais.
            </p>
          </div>
          <div className="relative">
            <textarea
              value={aiInstruction}
              onChange={(e) => setAiInstruction(e.target.value)}
              placeholder="Ex: 'Adicione uma cláusula de penalidade de 10% por atraso na entrega' ou 'Insira termos da LGPD'..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/60 min-h-[70px] resize-none"
            />
            <button
              onClick={() => handleGenerateAI(true)}
              disabled={isGenerating || !aiInstruction.trim()}
              className="absolute right-2 bottom-2.5 bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-400 p-1.5 rounded-md disabled:bg-transparent disabled:text-neutral-700 transition"
              title="Executar refinação"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Direita: Editor Visual e Exportação (Simula Folha de Papel Administrativa) */}
      <div className="lg:col-span-8 flex flex-col h-[600px] bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-md">
        {/* Barra de título do editor */}
        <div className="bg-neutral-950 px-5 py-3.5 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-200 font-mono uppercase">
              Visualização de Peça Oficial
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-1 px-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-md text-xs text-neutral-300 flex items-center transition"
              title="Copiar Conteúdo"
            >
              {copySuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  <span>Copiar</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="p-1 px-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-md text-xs text-neutral-300 flex items-center transition"
              title="Baixar em Markdown"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              <span>Baixar MD</span>
            </button>
          </div>
        </div>

        {/* Notificação de Erros */}
        {errorMessage && (
          <div className="m-4 bg-red-950/20 border border-red-500/20 rounded-lg p-3 flex items-start text-left">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mr-2 mt-0.5" />
            <div className="text-xs text-red-300">
              <span className="font-semibold block">Falha de Comunicação</span>
              {errorMessage}
            </div>
          </div>
        )}

        {/* Loading Spinner Overlaid on Content */}
        {isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-neutral-950/90 text-neutral-300 space-y-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-t-2 border-emerald-500 animate-spin" />
              <Sparkles className="w-5 h-5 text-emerald-500 absolute top-3.5 left-3.5 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-emerald-400">Montando Minuta Própria</p>
              <p className="text-xs text-neutral-500 mt-1 font-mono transition-opacity duration-500">
                {loadingMessages[loadStep]}
              </p>
            </div>
          </div>
        ) : (
          /* Folha de Documento Oficial Editável */
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-neutral-950 flex justify-center">
            <div className="w-full max-w-2xl bg-[#faf9f6]/95 text-neutral-800 p-6 md:p-10 rounded shadow-xl border border-neutral-200/50 min-h-[500px] flex flex-col">
              {/* Cabeçalho do Documento Administrativo */}
              <div className="text-center pb-6 border-b border-neutral-300 mb-6 shrink-0 md:px-4">
                <p className="text-[11px] font-bold text-neutral-500 tracking-wider uppercase font-serif">
                  REPÚBLICA FEDERATIVA DO BRASIL
                </p>
                <h4 className="text-xs font-bold text-neutral-900 mt-0.5 tracking-wide uppercase font-serif">
                  {config.orgaoDemandante || 'ADMINISTRAÇÃO PÚBLICA VINCULADA'}
                </h4>
                <p className="text-[10px] text-neutral-550 italic font-serif">
                  Sede Setorial • Controle de Contratações sob a Lei nº 14.133/2021
                </p>
              </div>

              {/* Área de texto editável com o rascunho de verdade */}
              <textarea
                value={documentContent}
                onChange={(e) => setDocumentContent(e.target.value)}
                className="flex-1 bg-transparent text-neutral-900 border-none font-serif text-sm leading-relaxed focus:outline-none resize-none overflow-y-visible placeholder-neutral-400 text-left"
                style={{ minHeight: '380px' }}
                placeholder="Rascunho oficial vazio..."
              />

              {/* Linha final de carimbo/assinatura */}
              <div className="text-center mt-12 pt-6 border-t border-dotted border-neutral-300 shrink-0">
                <span className="text-[10px] text-neutral-500 font-serif lowercase italic">
                  Chave administrativa integrada. Autenticado conforme Art. 18, II, § 1º da Lei 14.133.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
