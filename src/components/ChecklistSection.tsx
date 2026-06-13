import React, { useState, useEffect } from 'react';
import { SolicitacaoContratacao, ItemChecklist } from '../types';
import { DOCUMENTOS_CHECKLIST, RECOMENDACOES_TECNICAS } from '../data';
import { CheckCircle, AlertTriangle, Info, BookOpen, ShieldCheck, Check, Sparkles, Filter } from 'lucide-react';

interface ChecklistSectionProps {
  config: SolicitacaoContratacao;
}

export default function ChecklistSection({ config }: ChecklistSectionProps) {
  const [documentos, setDocumentos] = useState<ItemChecklist[]>([]);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [checkedKeyElements, setCheckedKeyElements] = useState<Record<string, Record<string, boolean>>>({});
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  // Filter and populate checklists based on selected category (Bens, Serviços, Engenharia, TI)
  useEffect(() => {
    let filtered = DOCUMENTOS_CHECKLIST.filter(doc => {
      // Engineering replaces TR with Project Básico. Others use TR.
      if (config.categoria === 'engenharia' && doc.id === 'tr') {
        return false;
      }
      if (config.categoria !== 'engenharia' && doc.id === 'projeto_basico') {
        return false;
      }
      return true;
    });

    setDocumentos(filtered);
    
    // Automatically select the first visible document to showcase key elements
    if (filtered.length > 0 && (!activeDocId || !filtered.find(f => f.id === activeDocId))) {
      setActiveDocId(filtered[0].id);
    }
  }, [config.categoria]);

  // Handle doc check/uncheck
  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => {
      const nextVal = !prev[id];
      const next = { ...prev, [id]: nextVal };
      
      // Auto-toggle all of its key elements to match
      const doc = documentos.find(d => d.id === id);
      if (doc) {
        setCheckedKeyElements(keyPrev => {
          const docElements: Record<string, boolean> = {};
          doc.elementosChave.forEach(el => {
            docElements[el] = nextVal;
          });
          return {
            ...keyPrev,
            [id]: docElements
          };
        });
      }
      return next;
    });
  };

  // Handle key element checkboxes
  const toggleKeyElement = (docId: string, element: string) => {
    setCheckedKeyElements(prev => {
      const currentDocChecked = prev[docId] || {};
      const nextDocChecked = { ...currentDocChecked, [element]: !currentDocChecked[element] };
      const next = { ...prev, [docId]: nextDocChecked };
      
      // If all key elements are checked, check the parent document too
      const doc = documentos.find(d => d.id === docId);
      if (doc) {
        const allChecked = doc.elementosChave.every(el => nextDocChecked[el]);
        if (allChecked) {
          setCheckedDocs(docPrev => ({ ...docPrev, [docId]: true }));
        } else {
          // If any is unchecked, do we uncheck? (Optional, let's keep them separate, or only auto-uncheck)
        }
      }
      return next;
    });
  };

  // Calculando progresso geral
  const totalRequiredDocs = documentos.filter(d => d.obrigatorio).length;
  const checkedRequiredDocs = documentos.filter(d => d.obrigatorio && checkedDocs[d.id]).length;
  const compliancePercentage = totalRequiredDocs > 0 
    ? Math.round((checkedRequiredDocs / totalRequiredDocs) * 100) 
    : 100;

  // Gerando auditoria interativa de riscos e diretrizes de lei
  const getSimulatedAudit = () => {
    const alerts: { type: 'success' | 'warning' | 'info'; text: string; details: string }[] = [];

    // 1. Matriz de riscos
    if (config.categoria === 'engenharia' && config.valorEstimado > 200000000) {
      alerts.push({
        type: 'warning',
        text: 'MATRIZ DE RISCO OBRIGATÓRIA (Grande Vulto)',
        details: `Como o valor estimado (R$ ${config.valorEstimado.toLocaleString()}) supera R$ 200 milhões, este contrato é de Grande Vulto (Art. 6º, XXII), sendo a alocação de riscos em Matriz de Riscos obrigatória por força do Art. 22 da Lei 14.133.`
      });
    } else if (config.categoria === 'engenharia') {
      alerts.push({
        type: 'info',
        text: 'Matriz de Risco altamente recomendável para Engenharia',
        details: 'Embora abaixo do limite de vulto, projetos de engenharia têm alta taxa de aditivos e intempéries. Integrar uma Matriz de Riscos resguarda o equilíbrio econômico-financeiro.'
      });
    }

    // 2. Transição municipal
    if (config.esfera === 'municipal' && config.municipioPop === 'baixo') {
      alerts.push({
        type: 'info',
        text: 'Regra de Transição: Municípios < 20 mil habitantes',
        details: 'Até abril de 2027, o seu município goza das prerrogativas do Art. 176 da Lei 14.133/2021: dispensa de licitação presencial mantida provisoriamente, publicação posterior no PNCP e aplicação mitigada da segregação estrita de funções.'
      });
    }

    // 3. TI, Serviços e SLA
    if (config.categoria === 'ti') {
      alerts.push({
        type: 'warning',
        text: 'Vedações de Pagamento em contratações de TI',
        details: 'Conforme as melhores práticas e a IN SGD/MGI nº 94/2022, é expressamente proibido o pagamento de serviços de TIC exclusivamente por homem-hora, sem a especificação prévia de métricas vinculadas a resultados (UST, SLAs).'
      });
    } else if (config.categoria === 'servicos') {
      alerts.push({
        type: 'info',
        text: 'Instrumento de Medição de Resultados (IMR) Necessário',
        details: 'Adote o IMR no Termo de Referência para aferir objetivamente a qualidade e rendimento das atividades continuadas de serviço comum conforme a IN 81/2022.'
      });
    }

    // 4. Parâmetros de Pesquisa de Preço
    if (config.valorEstimado > 0) {
      alerts.push({
        type: 'success',
        text: 'Instrução Normativa SEGES nº 65/2021 ativa',
        details: `Para o valor de R$ ${config.valorEstimado.toLocaleString()}, priorize a pesquisa no Painel de Preços Federal e contratações homólogas celebradas por outros entes em até 1 ano antes do edital.`
      });
    }

    return alerts;
  };

  const auditAlerts = getSimulatedAudit();
  const selectedDoc = documentos.find(d => d.id === activeDocId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="checklist_container">
      {/* Esquerda: Menu de Documentos Obrigatórios */}
      <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-emerald-500" />
              Documentos Obrigatórios da Fase Preparatória
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Esfera: <span className="uppercase font-medium text-emerald-400 mr-2">{config.esfera}</span> | 
              Categoria: <span className="uppercase font-medium text-blue-400">{config.categoria}</span>
            </p>
          </div>
          
          {/* Indicador de complacência legal */}
          <div className="text-right">
            <span className="text-xs text-neutral-400 block font-medium">Conformidade Preliminar</span>
            <div className="flex items-center mt-1">
              <div className="w-24 bg-neutral-800 h-2 rounded-full mr-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    compliancePercentage === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} 
                  style={{ width: `${compliancePercentage}%` }}
                />
              </div>
              <span className={`text-sm font-bold ${
                compliancePercentage === 100 ? 'text-emerald-400' : 'text-amber-400'
              }`}>{compliancePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Lista de Documentos */}
        <div className="space-y-3">
          {documentos.map((doc) => {
            const isChecked = checkedDocs[doc.id] || false;
            const isActive = doc.id === activeDocId;
            const totalElements = doc.elementosChave.length;
            const checkedElements = Object.values(checkedKeyElements[doc.id] || {}).filter(Boolean).length;
            const progressPct = totalElements > 0 ? Math.round((checkedElements / totalElements) * 100) : 0;

            return (
              <div 
                key={doc.id}
                id={`doc_card_${doc.id}`}
                onClick={() => setActiveDocId(doc.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer flex items-start justify-between ${
                  isActive 
                    ? 'bg-neutral-800/80 border-emerald-500/50 shadow-emerald-950/20 shadow-md' 
                    : 'bg-neutral-950 border-neutral-800/80 hover:bg-neutral-800/30'
                }`}
              >
                <div className="flex items-start space-x-3 flex-1 min-w-0 mr-3">
                  {/* Checkbox para o documento */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDoc(doc.id);
                    }}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all ${
                      isChecked 
                        ? 'bg-emerald-500 border-emerald-600 text-neutral-950' 
                        : 'border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-neutral-100 truncate">
                        {doc.apelido}
                      </span>
                      {doc.obrigatorio ? (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
                          OBRIGATÓRIO
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-neutral-800 text-neutral-400 border border-neutral-700 rounded">
                          RECOMENDADO
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {doc.descricao}
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5 italic">
                      Base Legal: {doc.baseLegal}
                    </p>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex flex-col items-end justify-center self-center text-right pl-2 shrink-0">
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {checkedElements}/{totalElements} itens
                  </span>
                  <div className="w-12 bg-neutral-800 h-1 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="bg-blue-400 h-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recomendações Técnicas da Lei específicas para o Objeto */}
        <div className="mt-6 bg-neutral-950 border border-neutral-800/80 rounded-xl p-4">
          <h4 className="text-xs font-bold text-emerald-400 flex items-center uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Recomendações Práticas do Especialista para {config.categoria === 'ti' ? 'TI' : config.categoria}
          </h4>
          <ul className="space-y-2 text-xs text-neutral-300 text-left">
            {RECOMENDACOES_TECNICAS[config.categoria].map((rec, i) => (
              <li key={i} className="flex items-start">
                <span className="text-emerald-500 mr-2 shrink-0">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Direita: Elementos Essenciais do Documento Selecionado */}
      <div className="lg:col-span-5 space-y-6">
        {selectedDoc && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-md">
            <div className="pb-3 border-b border-neutral-800 mb-4">
              <span className="text-[10px] font-bold text-emerald-500 tracking-wider uppercase block">
                Detalhes de Instrução Processual
              </span>
              <h3 className="text-md font-bold text-neutral-100 mt-0.5">
                {selectedDoc.documento}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {selectedDoc.descricao}
              </p>
            </div>

            <div className="mb-4 bg-neutral-950 rounded-lg p-3 border border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-400 block uppercase mb-1">
                Fundamentação Legislativa
              </span>
              <p className="text-xs text-neutral-300">
                {selectedDoc.baseLegal}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-neutral-400 block uppercase mb-3">
                Elementos Essenciais Obrigatórios (Checklist Interno)
              </span>
              <div className="space-y-2.5">
                {selectedDoc.elementosChave.map((element, i) => {
                  const isElChecked = (checkedKeyElements[selectedDoc.id] && checkedKeyElements[selectedDoc.id][element]) || false;
                  return (
                    <div 
                      key={i}
                      onClick={() => toggleKeyElement(selectedDoc.id, element)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        isElChecked 
                          ? 'bg-neutral-800/40 border-neutral-700/80' 
                          : 'bg-neutral-950 border-neutral-800/60 hover:bg-neutral-800/20'
                      }`}
                    >
                      <span className="text-xs text-neutral-200 mr-3 text-left leading-relaxed">
                        {element}
                      </span>
                      <div className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                        isElChecked 
                          ? 'bg-emerald-500 border-emerald-600 text-neutral-950' 
                          : 'border-neutral-700'
                      }`}>
                        {isElChecked && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Auditoria / Validador Automático */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-md">
          <h3 className="text-sm font-semibold text-neutral-200 flex items-center mb-4 pb-2 border-b border-neutral-800">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400" />
            Auditor Digital de Conformidade (Art. 18)
          </h3>
          <div className="space-y-3">
            {auditAlerts.map((alert, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border flex items-start text-left ${
                  alert.type === 'warning' 
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' 
                    : alert.type === 'success'
                    ? 'bg-emerald-950/25 border-emerald-500/30 text-emerald-300' 
                    : 'bg-blue-950/25 border-blue-500/30 text-blue-300'
                }`}
              >
                <div className="mr-2.5 mt-0.5 shrink-0">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  ) : alert.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-semibold">{alert.text}</h4>
                  <p className="text-[11px] mt-0.5 opacity-90 leading-normal">
                    {alert.details}
                  </p>
                </div>
              </div>
            ))}
            
            {auditAlerts.length === 0 && (
              <p className="text-xs text-neutral-400 text-center py-4 bg-neutral-950 rounded border border-neutral-800">
                Selecione os parâmetros contratuais acima para ver alertas de auditoria.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
