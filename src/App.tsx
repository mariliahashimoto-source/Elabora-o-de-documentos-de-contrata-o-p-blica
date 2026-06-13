import React, { useState } from 'react';
import { SolicitacaoContratacao, Esfera, CategoriaObjeto } from './types';
import ChecklistSection from './components/ChecklistSection';
import DocumentGenerator from './components/DocumentGenerator';
import LegalAssistant from './components/LegalAssistant';
import { 
  Building2, 
  Layers, 
  FileText, 
  ShieldCheck, 
  BrainCircuit, 
  Briefcase, 
  Globe, 
  CircleDollarSign, 
  HelpCircle,
  HelpCircleIcon
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'generator' | 'assistant'>('checklist');
  
  // Initial parameters for the bidding/planning process
  const [formData, setFormData] = useState<SolicitacaoContratacao>({
    esfera: 'federal',
    categoria: 'bens',
    orgaoDemandante: 'Ministério do Planejamento e Orçamento',
    nomeObjeto: 'Aquisição de computadores portáteis corporativos',
    valorEstimado: 250000,
    descricaoDetalhada: 'Aquisição de computadores portáteis de alto rendimento para desenvolvimento computacional das secretarias finalísticas, com suporte do fabricante e garantias robustas.',
    municipioPop: 'baixo'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'valorEstimado' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSphereChange = (esfera: Esfera) => {
    let orgao = '';
    if (esfera === 'federal') orgao = 'Ministério do Planejamento e Orçamento';
    if (esfera === 'estadual') orgao = 'Secretaria de Estado da Infraestrutura';
    if (esfera === 'municipal') orgao = 'Secretaria Municipal de Saúde';
    
    setFormData(prev => ({
      ...prev,
      esfera,
      orgaoDemandante: orgao
    }));
  };

  const handleCategoryChange = (categoria: CategoriaObjeto) => {
    let nomeObj = '';
    let desc = '';
    let valor = 150000;

    if (categoria === 'bens') {
      nomeObj = 'Aquisição de computadores portáteis corporativos';
      desc = 'Aquisição de computadores portáteis de alto rendimento para desenvolvimento computacional das secretarias finalísticas, com suporte do fabricante e garantias.';
      valor = 250000;
    } else if (categoria === 'servicos') {
      nomeObj = 'Serviço continuado de vigilância patrimonial armada';
      desc = 'Prestação de serviços contínuos de vigilância ostensiva e ronda patrimonial diurna e noturna para as dependências administrativas externas e internas.';
      valor = 650000;
    } else if (categoria === 'engenharia') {
      nomeObj = 'Reforma civil da ala leste do hospital público';
      desc = 'Obras e serviços especiais de engenharia civil para restauro das fundações, substituição de telhado e substituição técnica de toda a fiação elétrica.';
      valor = 1200000;
    } else if (categoria === 'ti') {
      nomeObj = 'Licenciamento de software ERP em nuvem';
      desc = 'Contratação integrada de licenças de software como serviço (SaaS) para gestão escolar corporativa, incluindo suporte 24h, portabilidade de dados e proteção da LGPD.';
      valor = 480000;
    }

    setFormData(prev => ({
      ...prev,
      categoria,
      nomeObjeto: nomeObj,
      descricaoDetalhada: desc,
      valorEstimado: valor
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans select-none antialiased">
      {/* Top Professional Header Banner */}
      <header className="bg-neutral-900/60 backdrop-blur border-b border-neutral-800/85 sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shadow-inner">
              <BrainCircuit className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-md sm:text-md font-bold tracking-tight text-neutral-100 flex items-center">
                Ateliê de Contratações Públicas 
                <span className="ml-2 font-mono text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded font-black tracking-widest">
                  LEI 14.133
                </span>
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">
                Plataforma de Simulação, Diagnóstico e Rascunho para a Nova Lei de Licitações
              </p>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="flex items-center space-x-6 text-right sm:text-left self-start sm:self-auto font-mono text-xs text-neutral-400 bg-neutral-950 border border-neutral-800 rounded-lg p-2 px-3.5 divide-x divide-neutral-800">
            <div className="pr-3">
              <span className="text-[10px] text-neutral-500 block uppercase font-sans">Esfera</span>
              <span className="font-semibold text-emerald-400 uppercase">{formData.esfera}</span>
            </div>
            <div className="pl-3 pr-3">
              <span className="text-[10px] text-neutral-500 block uppercase font-sans">Modalidade Objeto</span>
              <span className="font-semibold text-blue-400 uppercase">{formData.categoria === 'ti' ? 'T.I.' : formData.categoria}</span>
            </div>
            <div className="pl-3">
              <span className="text-[10px] text-neutral-500 block uppercase font-sans">Preço Estimado</span>
              <span className="font-semibold text-amber-400">R$ {formData.valorEstimado.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Lado Esquerdo: Configuração da Contratação / Fatos do Objeto */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm text-left">
            <div className="pb-3 border-b border-neutral-800 mb-5">
              <h2 className="text-md font-semibold text-neutral-200 flex items-center">
                <Briefcase className="w-5 h-5 mr-1.5 text-emerald-500" />
                Configurar Parâmetros Processuais
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5 leading-normal">
                Determine as premissas básicas para gerar rascunhos em conformidade.
              </p>
            </div>

            <div className="space-y-4">
              {/* Esfera Federativa */}
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block uppercase tracking-wider mb-2">
                  Esfera Federativa do Ente
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'federal', label: 'Federal', icon: Globe },
                    { id: 'estadual', label: 'Estadual', icon: Building2 },
                    { id: 'municipal', label: 'Municipal', icon: Building2 }
                  ].map((item) => {
                    const isSel = formData.esfera === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSphereChange(item.id as Esfera)}
                        className={`py-2 px-1 rounded-lg text-xs font-semibold flex flex-col items-center justify-center border transition-all ${
                          isSel 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-950/20' 
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Se municipal, mostrar seletor de faixa populacional (importante para Lei 14.133) */}
              {formData.esfera === 'municipal' && (
                <div className="bg-neutral-950 border border-neutral-850 p-2.5 rounded-lg">
                  <label className="text-[10px] font-bold text-neutral-400 block uppercase mb-1">
                    Porte do Município (Habitantes)
                  </label>
                  <select
                    name="municipioPop"
                    value={formData.municipioPop}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-800/80 rounded p-1.5 text-xs text-neutral-200 outline-none"
                  >
                    <option value="baixo">Até 20.000 habitantes (Possui transição)</option>
                    <option value="alto">Superior a 20.000 habitantes</option>
                  </select>
                </div>
              )}

              {/* Categoria do Objeto */}
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block uppercase tracking-wider mb-2">
                  Categoria do Objeto da Licitação
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'bens', label: 'Bens / Aquisições' },
                    { id: 'servicos', label: 'Serviços Comuns' },
                    { id: 'engenharia', label: 'Obras/Engenharia' },
                    { id: 'ti', label: 'Tecnologia da Informação' }
                  ].map((item) => {
                    const isSel = formData.categoria === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryChange(item.id as CategoriaObjeto)}
                        className={`p-2.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSel 
                            ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-md shadow-blue-950/25' 
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Órgão Demandante */}
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block uppercase tracking-wider mb-1.5">
                  Órgão Requisitante / Comprador
                </label>
                <input
                  type="text"
                  name="orgaoDemandante"
                  value={formData.orgaoDemandante}
                  onChange={handleInputChange}
                  placeholder="Ex: Secretaria de Logística e Serviços"
                  className="w-full bg-neutral-950 border border-neutral-800/80 rounded-lg p-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Título Resumido do Objeto */}
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block uppercase tracking-wider mb-1.5">
                  Título Resumido da Contratação
                </label>
                <input
                  type="text"
                  name="nomeObjeto"
                  value={formData.nomeObjeto}
                  onChange={handleInputChange}
                  placeholder="Ex: Aquisição de Computadores"
                  className="w-full bg-neutral-950 border border-neutral-800/80 rounded-lg p-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Valor Estimado da Contratação */}
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Valor Estimado Máximo</span>
                  <span className="text-[10px] text-neutral-500 font-normal font-sans">R$ (Moeda Local)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none select-none">
                    <span className="text-neutral-550 text-xs font-semibold">R$</span>
                  </div>
                  <input
                    type="number"
                    name="valorEstimado"
                    value={formData.valorEstimado || ''}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full bg-neutral-950 border border-neutral-800/80 rounded-lg p-2.5 pl-8 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Descrição Detalhada */}
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block uppercase tracking-wider mb-1.5">
                  Justificativa / Descrição do Interesse Público
                </label>
                <textarea
                  name="descricaoDetalhada"
                  value={formData.descricaoDetalhada}
                  onChange={handleInputChange}
                  placeholder="Descreva a finalidade técnica operacional do objeto de forma completa..."
                  className="w-full bg-neutral-950 border border-neutral-800/80 rounded-lg p-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 min-h-[105px] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Tabs Interativas para Checklist, Rascunho & Dúvidas */}
        <div className="xl:col-span-8 flex flex-col space-y-6">
          
          {/* Navegador de Tabs */}
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded-xl flex items-center space-x-1 shrink-0">
            {[
              { id: 'checklist', label: 'Painel de Auditoria & Checklists', icon: ShieldCheck },
              { id: 'generator', label: 'Minutador e Redator de Contratos', icon: FileText },
              { id: 'assistant', label: 'Consultoria e FAQ Jurídico (IA)', icon: HelpCircle }
            ].map((tab) => {
              const isAct = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all outline-none ${
                    isAct 
                      ? 'bg-neutral-950 text-emerald-400 shadow border border-neutral-800' 
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isAct ? 'text-emerald-400' : 'text-neutral-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Renderização de Conteúdo Dinâmico por Tab */}
          <div className="flex-1">
            {activeTab === 'checklist' && <ChecklistSection config={formData} />}
            {activeTab === 'generator' && <DocumentGenerator config={formData} />}
            {activeTab === 'assistant' && <LegalAssistant />}
          </div>

        </div>

      </main>

      {/* Footer Fino */}
      <footer className="bg-neutral-950 border-t border-neutral-850 py-4 px-6 text-center shrink-0">
        <p className="text-[10px] text-neutral-600">
          Ateliê de Contratações Públicas • Desenvolvido em plena aderência e conformidade com os dispositivos da Lei nº 14.133/2021 de 01 de abril de 2021.
        </p>
      </footer>
    </div>
  );
}
