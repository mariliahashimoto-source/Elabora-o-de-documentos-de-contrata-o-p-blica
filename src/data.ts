import { ItemChecklist, CategoriaObjeto } from './types';

export const DOCUMENTOS_CHECKLIST: ItemChecklist[] = [
  {
    id: 'dfd',
    documento: 'Documento de Formalização da Demanda (DFD)',
    apelido: 'DFD',
    obrigatorio: true,
    baseLegal: 'Art. 18, I, Lei nº 14.133/2021 / IN SEGES/MGI nº 98/2022',
    descricao: 'Inicia o processo e detalha a justificativa da necessidade, alinhando-se ao Plano de Contratações Anual (PCA).',
    recomendaParaCategoria: ['bens', 'servicos', 'engenharia', 'ti'],
    elementosChave: [
      'Justificativa da necessidade de contratação',
      'Estimativa prévia de quantidades',
      'Prazo desejado para entrega ou execução',
      'Indicação do responsável pela demanda',
      'Alinhamento com o Plano de Contratações Anual (PCA)'
    ]
  },
  {
    id: 'etp',
    documento: 'Estudo Técnico Preliminar (ETP)',
    apelido: 'ETP',
    obrigatorio: true,
    baseLegal: 'Art. 18, II, § 1º e § 2º, Lei nº 14.133/2021 / IN SEGES/MGI nº 58/2022',
    descricao: 'Analisa a viabilidade e define os caminhos e soluções de mercado adequados para suprir a demanda.',
    recomendaParaCategoria: ['bens', 'servicos', 'engenharia', 'ti'],
    elementosChave: [
      'Descrição resumida da necessidade',
      'Alinhamento com o Planejamento Estratégico e PCA',
      'Requisitos da contratação (requisitos técnicos mínimos)',
      'Levantamento de soluções de mercado e alternativas',
      'Estimativa de preços de mercado (com justificativas)',
      'Descrição da solução como um todo',
      'Justificativa para o parcelamento ou não da contratação',
      'Declaração de viabilidade técnica, econômica e jurídica'
    ]
  },
  {
    id: 'matriz_riscos',
    documento: 'Análise de Riscos / Matriz de Riscos',
    apelido: 'Matriz de Riscos',
    obrigatorio: false, // Obrigatório para grande vulto e integrada, altamente recomendável para as demais
    baseLegal: 'Art. 18, X e Art. 22, Lei nº 14.133/2021',
    descricao: 'Mapeamento e alocação de riscos potenciais relacionados ao planejamento, contratação e execução contratual.',
    recomendaParaCategoria: ['servicos', 'engenharia', 'ti'],
    elementosChave: [
      'Identificação dos riscos na licitação e na execução',
      'Probabilidade e Impacto de cada ameaça',
      'Plano de ação e mitigação pré-estabelecido',
      'Atribuição de responsabilidades (Administração ou Contratado)',
      'Alocação financeira/orçamentária para cobertura de riscos (se aplicável)'
    ]
  },
  {
    id: 'tr',
    documento: 'Termo de Referência (TR)',
    apelido: 'TR',
    obrigatorio: true, // Para bens e serviços
    baseLegal: 'Art. 6º, XXIII e Art. 18, § 3º, Lei nº 14.133/2021 / IN SEGES/MGI nº 81/2022',
    descricao: 'Especifica detalhadamente o objeto, método de avaliação de resultados (SLA/IMR) e critérios de habilitação.',
    recomendaParaCategoria: ['bens', 'servicos', 'ti'],
    elementosChave: [
      'Definição precisa do objeto (bens ou serviços comuns)',
      'Fundamentação e justificativa da contratação',
      'Modelos de execução e prazos de cumprimento',
      'Modelo de Gestão do Contrato com SLA / IMR',
      'Requisitos de recebimento provisório e definitivo',
      'Critérios de habilitação e julgamento das propostas',
      'Sanções administrativas e multas aplicáveis'
    ]
  },
  {
    id: 'projeto_basico',
    documento: 'Projeto Básico',
    apelido: 'Prog. Básico',
    obrigatorio: true, // Para engenharia/obras em vez de TR simples
    baseLegal: 'Art. 6º, XXV e Art. 18, § 3º, Lei nº 14.133/2021',
    descricao: 'Obrigatório para obras e serviços especiais de engenharia. Apresenta desenhos técnicos, cronogramas e orçamentos baseados no SINAPI/SICRO.',
    recomendaParaCategoria: ['engenharia'],
    elementosChave: [
      'Plantas, cortes, desenhos e esquemas gráficos técnicos',
      'Especificações técnicas e memorial descritivo da estrutura',
      'Planilha de custos analíticos e quantidades',
      'Encargos Sociais e detalhamento analítico da BDI',
      'Cronograma físico-financeiro de desembolso vinculado a etapas de medição',
      'Parecer técnico de aprovação do projeto'
    ]
  },
  {
    id: 'pesquisa_precos',
    documento: 'Pesquisa de Preços de Mercado',
    apelido: 'Pesquisa de Preços',
    obrigatorio: true,
    baseLegal: 'Art. 23, Lei nº 14.133/2021 / IN SEGES/ME nº 65/2021',
    descricao: 'Relatório estatístico de estimativa de valor da contratação baseado no Painel de Preços, contratos similares ou cotações.',
    recomendaParaCategoria: ['bens', 'servicos', 'engenharia', 'ti'],
    elementosChave: [
      'Histórico de contratações públicas recentes similares (preços públicos)',
      'Média/mediana baseada nas pesquisas no Painel de Preços Federal',
      'BDI e encargos incidentes sobre a estimativa',
      'Relatório de cálculo detalhado assinado pelo responsável',
      'Limitação de desvios e exclusão de preços manifestamente excessivos ou exíguos'
    ]
  },
  {
    id: 'minuta_edital',
    documento: 'Minuta de Edital de Licitação',
    apelido: 'Minuta do Edital',
    obrigatorio: true,
    baseLegal: 'Art. 25 e Art. 53, Lei nº 14.133/2021',
    descricao: 'Instrumento convocatório contendo o regime de execução, regras de participação, julgamento e recursos do certame.',
    recomendaParaCategoria: ['bens', 'servicos', 'engenharia', 'ti'],
    elementosChave: [
      'Regime de disputa (aberto, fechado, misto)',
      'Datas, horários e link do local de disputa eletrônico',
      'Documentos e declarações de habilitação exigidos',
      'Fórmula de cálculo e critérios de desempate',
      'Modelos de propostas comerciais e declarações de cumprimento legal'
    ]
  },
  {
    id: 'minuta_contrato',
    documento: 'Minuta de Contrato / Ata de Registro de Preços',
    apelido: 'Minuta Contratual',
    obrigatorio: true,
    baseLegal: 'Art. 89, Art. 92 e Art. 95, Lei nº 14.133/2021',
    descricao: 'Regula a prestação material pós-homologação, contendo termos de vigência, reajustes, as garantias e o foro contratual.',
    recomendaParaCategoria: ['bens', 'servicos', 'engenharia', 'ti'],
    elementosChave: [
      'Prazo de vigência contratual (serviços contínuos de até 10 anos)',
      'Cláusulas de reajuste (Índice de reajuste e periodicidade de 12 meses)',
      'Matriz de sanções administrativas com gradação e direito de ampla defesa',
      'Condições de faturamento, liquidação de despesas e nota de empenho',
      'Foro de eleição prioritário do domicílio do ente público'
    ]
  }
];

export const TEMPLATES_PADRAO: Record<CategoriaObjeto, Record<string, string>> = {
  bens: {
    dfd: `MINISTÉRIO DA ADMINISTRAÇÃO / SECRETARIA DE ESTADO / SECRETARIA MUNICIPAL
UNIDADE REQUISITANTE: Diretoria de Patrimônio e Logística
----------------------------------------------------------------------------------------------------
DOCUMENTO DE FORMALIZAÇÃO DA DEMANDA (DFD) - AQUISIÇÃO DE BENS

1. JUSTIFICATIVA DA CONTRATAÇÃO
A presente demanda visa à aquisição estrita de bens essenciais para suprir a carência operacional das repartições públicas desta unidade administrativa. O fornecimento regular previne a obsolescência das atividades e eleva a eficiência do atendimento ao cidadão de forma direta.

2. QUANTITATIVO PREVISTO E ESPECIFICAÇÃO
- Item 01: [Substituir pelo Nome do Bem]. Estimativa: [X] unidades.
A quantidade foi estimada de forma pormenorizada com base no consumo médio consolidado das unidades setoriais ao longo dos últimos 12 meses, computados os desvios de depreciação física.

3. PRAZO DE ENTREGA E LOCAL
Os bens deverão ser entregues em até 30 (trinta) dias úteis a contar do recebimento da Nota de Empenho, diretamente no almoxarifado central do órgão, em dias úteis, em embalagem inviolável.

4. ALINHAMENTO COM PLANO DE CONTRATAÇÕES ANUAL (PCA)
A aquisição encontra-se perfeitamente prevista no item [X] do Plano de Contratações Anual deste Município/Estudo e conta com dotação preliminar para o presente exercício financeiro.

Localidade, [Data Atual]

___________________________________________________
Assinatura do Requisitador da Demanda`,
    etp: `ESTUDO TÉCNICO PRELIMINAR (ETP) - AQUISIÇÃO DE BENS
NÚMERO DO PROCESSO: [Inserir processo administrativo eletrônico]
----------------------------------------------------------------------------------------------------

1. DESCRIÇÃO DA NECESSIDADE
Caracteriza-se a necessidade administrativa de renovação ou aquisição do lote de bens para subsidiar as atividades em andamento. Do ponto de vista técnico e de interesse público, a não aquisição acarreta a paralisação parcial de serviços essenciais aos usuários locais.

2. REQUISITOS TÉCNICOS DA COMPRA
- Garantia de fidedignidade e suporte do fabricante por até 12 meses.
- Fornecimento em embalagens lacradas que obedeçam às normas vigentes da ABNT.
- Homologação de amostras do lote vencedor antes do envio global, garantindo a conformidade regulamentar.

3. ESTIMAÇÃO DE QUANTITATIVOS
Com base no histórico dos últimos três semestres e no aumento estimado de demandas de atendimento, o montante solicitado é dimensionado para durabilidade estimada de [X] meses, de molde a mitigar risco de estoques ociosos ou desabastecimentos severos.

4. ALTERNATIVAS DO MERCADO
Foram cogitados o aluguel dos bens permanentes ou a sua aquisição completa. O cenário de aquisição mostrou-se substancialmente mais vantajoso em face do baixo custo de depreciação e da possibilidade de alienação futura programada.

5. CONCLUSÃO DE VIABILIDADE
O planejamento aponta a viabilidade técnica, econômica e administrativa da presente modelagem sob o prisma do Art. 18 da Lei Federal nº 14.133/2021.`,
    tr: `TERMO DE REFERÊNCIA (TR) - MODELO PADRÃO DE AQUISIÇÃO DE BENS
LEI nº 14.133/2021 E SEUS REGULAMENTOS VIGENTES

1. OBJETO
Constitui objeto da presente licitação a contratação para aquisição definitiva de [Substituir pelo Nome do Objeto], conforme descrições qualitativas do plano ETP.

2. ESPECIFICAÇÕES E AMOSTRAS
A Administração requererá do fornecedor classificado em primeiro lugar a apresentação do protótipo/amostra do item em até 05 (cinco) dias úteis a fim de chancelar as dimensões e parâmetros qualitativos antes da celebração final.

3. FISCALIZAÇÃO DO RECEBIMENTO
- Recebimento Provisório: Efetivado na data da entrega material, para inspeção superficial das conformidades físicas e volumétricas em até 10 dias.
- Recebimento Definitivo: Efetivado após testes técnicos de aferição de funcionamento, não superior a 15 dias do recebimento provisório, emitindo-se o Termo de Aceite Definitivo.

4. CRITÉRIOS DE JULGAMENTO E HABILITAÇÃO
O julgamento obedecerá ao critério de Menor Preço por Item ou por Lote.
Habilitação do Licitante:
- Regularidade perante a CRF (FGTS), CND Federal / Previdenciária e CND Trabalhista (CNDT).
- Atestado de capacidade técnica que demonstre vendas anteriores correspondentes a pelo menos 30% das quantidades estipuladas.`
  },
  servicos: {
    dfd: `DOCUMENTO DE FORMALIZAÇÃO DA DEMANDA (DFD) - SERVIÇOS COMUNS
UNIDADE ADMINISTRATIVA: Setor de Serviços Gerais e Suporte Técnico

1. CARACTERIZAÇÃO DO SERVIÇO DE NATUREZA COMUM
A presente demanda visa à prestação contínua de [Substituir pelo Nome do Serviço], objetivando manter as instalações higienizadas, organizadas e dinâmicas às rotinas operacionais deste órgão estatal.

2. CARACTERIZAÇÃO DA SOLUÇÃO
Serviços comuns que consistem em atividade técnica de acompanhamento operacional, englobando insumos qualificados e emprego de rotinas padronizadas.

3. MÃO DE OBRA E DEDICAÇÃO EXCLUSIVA
Será adotada prestação:
[ ] Com dedicação exclusiva de mão de obra (DEMO)
[X] Sem dedicação exclusiva de mão de obra (Por resultado)

4. ESTIMATIVA DE CUSTOS ANUAIS
A contratação estima-se em um montante anual global compatível com os limites correntes e dotações alocadas no PCA vigente do órgão.`,
    etp: `ESTUDO TÉCNICO PRELIMINAR (ETP) - SERVIÇOS COMUNS (Lei nº 14.133/2021)

1. REQUISITOS DA PRESTAÇÃO E DIRETRIZES
A Administração busca a contratação de serviços técnicos contínuos. A exigência mínima compreende profissionais com proficiência prática de no mínimo 6 (seis) meses e adoção de maquinários com índice tecnológico adequado.

2. MODELO DE MENSURAÇÃO DE TRABALHO
Prioriza-se o pagamento por produtividade sob a lógica de indicadores objetivos. Afasta-se a mensuração exclusiva por hora-homem trabalhada de modo a incentivar a celeridade e presteza operacional da empresa contratada.

3. COMPATIBILIDADE E PARCELAMENTO
Considerando que a unificação dos serviços em lote único resguarda a coordenação técnica e responsabilidade administrativa solidária das rotinas integradas, adota-se o fracionamento do objeto apenas sob a ótica meramente geográfica.

4. DECLARAÇÃO DE VIABILIDADE
Diante dos elementos fáticos, técnicos e mercadológicos compilados, o ETP declara a total viabilidade processual da contratação pública de serviços contínuos.`,
    tr: `TERMO DE REFERÊNCIA (TR) - SERVIÇO COMUM CONTÍNUO
ESTRUTURADO EM CONFORMIDADE COM A LEI nº 14.133/2021

1. OBJETO E CRITÉRIOS OPERACIONAIS
Constitui objeto do Termo de Referência a contratação continuada para prestação dos serviços descritos neste ato.

2. INSTRUMENTO DE MEDIÇÃO DE RESULTADO (IMR / SLA)
O pagamento mensal à empresa contratada estará condicionado estritamente aos percentuais de desempenho avaliados mensalmente pelo Fiscal de Contratos, conforme tabela a seguir:
- Desempenho entre 95% e 100%: Pagamento de 100% do valor mensal faturado.
- Desempenho entre 90% e 94.9%: Glosa cautelar de 5% sobre a fatura de mão de obra correspondente.
- Desempenho abaixo de 85%: Advertência por descumprimento de SLA com abertura de processo punitivo.

3. DA PLANILHA DE CUSTOS E FORMAÇÃO DE PREÇOS
O licitante classificado na disputa final deverá coligir sua Planilha de Custos detalhando salários da categoria, encargos trabalhistas de lei, benefícios convencionados e margem de lucros, sob pena de desclassificação imediata.`
  },
  engenharia: {
    dfd: `DOCUMENTO DE FORMALIZAÇÃO DA DEMANDA (DFD) - ENGENHARIA E CONSTRUÇÃO
UNIDADE DE PROCEDÊNCIA: Diretoria de Infraestrutura e Desenvolvimento de Engenharia

1. DEFINIÇÃO DA INTERVENÇÃO FÍSICA
Formaliza-se a demanda para execução de reformas ou obras de [Substituir pelo Nome da Obra]. Trata-se de uma melhoria estrutural essencial para restaurar as condições normativas de estabilidade e segurança física das instalações públicas.

2. REGIME DE EXECUÇÃO PRETENDIDO
Propõe-se a seguinte modalidade prioritária:
- [X] Empreitada por Preço Unitário
- [ ] Empreitada por Preço Global
- [ ] Contratação Semi-Integrada ou Integrada (para grande complexidade)

3. BENEFÍCIOS ESTIMADOS
Mitigar riscos de sinistros estruturais, adequação às diretrizes de combate a incêndio e pânico de lei, e acessibilidade plena.`,
    etp: `ESTUDO TÉCNICO PRELIMINAR (ETP) - ENGENHARIA E INFRAESTRUTURA
NÚMERO DO PROCESSO: [Inserir Processo] - LEI FEDERAL nº 14.133/2021

1. LEVANTAMENTO DE REQUISITOS E SONDAGENS
Tornam-se imperiosas sondagens estruturais de geotecnia, levantamentos topográficos específicos e ensaios de materiais pretéritos a fim de respaldar a elaboração do Projeto Básico sem deficiências técnicas ocultas.

2. ALOCÇÃO E ANÁLISE DE ALTERNATIVAS
Analisou-se a demolição e construção ex-novo vs. a reforma ampla com consolidação estrutural. O laudo técnico de engenharia concluiu que a restauração ampla conserva o patrimônio histórico e demanda custos de investimento 40% menores.

3. IMPACTO AMBIENTAL E SUSTENTABILIDADE
A obra observará exigências restritas de destinação correta de RCD (Resíduos de Construção Civil), reaproveitamento de águas pluviais internas, eficiência energética na iluminação e preservação das matas nativas lindeiras.

4. MATRIZ DE RISCOS (PRELIMINAR)
Mapeamento preliminar de riscos associados a lençol freático, intempéries prolongadas na fundação e reajustes substanciais com base no INCC.`,
    tr: `PROJETO BÁSICO (MEMORIAL DESCRITIVO E ESPECIFICAÇÃO)
GERADO COM BASE EM PADRÕES DE ENGENHARIA E LEI nº 14.133/2021

1. MEMORIAL DESCRITIVO DAS FASES DA OBRA
O construtor executará as etapas da obra civil de acordo com os detalhamentos gráficos, plantas detalhadas e de fundação constantes no anexo deste processo convocatório.
- Fase 01: Serviços preliminares, canteiro de obras e tapumes.
- Fase 02: Remoções, demolições iniciais e terraplenagem.
- Fase 03: Fundações técnicas e superestrutura.
- Fase 04: Acabamentos, instalações hidráulicas, elétricas e pintura.

2. PLANILHA DE REFERÊNCIAS (SINAPI / SICRO)
Todos os custos unitários apresentados na proposta do licitante devem obedecer rigorosamente aos custos máximos de tabela SINAPI ativa para este Estado, com BDI parametrizada.

3. CRONOGRAMA DE MEDIÇÕES E PAGAMENTO
As medições de avanço ocorrerão a cada 30 (trinta) dias de calendário, acompanhadas de laudo assinado pela empresa supervisora e pelo engenheiro fiscal designado pela Administração.`
  },
  ti: {
    dfd: `DOCUMENTO DE FORMALIZAÇÃO DA DEMANDA (DFD) - TECNOLOGIA DA INFORMAÇÃO (TIC)
UNIDADE: Departamento de Tecnologia da Informação e Segurança Computacional

1. SOLUÇÃO DE TIC DEMANDADA
A contratação visa ao fornecimento de solução integrada de TIC de:
[X] Licenciamento e Implementação de Software de Gestão em Nuvem (SaaS)
[ ] Fornecimento de infraestrutura computacional física/suporte
[ ] Fábrica de Software de TI

2. JUSTIFICATIVA E ALINHAMENTO COM O PDTIC
A contratação alinha-se estritamente à Ação Estratégica do Plano Diretor de TIC (PDTIC) do órgão, que preconiza a unificação das ferramentas administrativas para viabilizar conformidade plena à Lei Geral de Proteção de Dados (LGPD).

3. RESULTADOS ADVINDO DO PROCESSO
Melhorias no tempo de reposta de processamento de solicitações digitais, com redução de custos em suportes obsoletos e segurança da informação ampliada.`,
    etp: `ESTUDO TÉCNICO PRELIMINAR (ETP-TIC) - LEI nº 14.133/2021
EM CONFORMIDADE COM A IN SGD/MGI nº 94/2022 (SISP)

1. REQUISITOS DA SOLUÇÃO DE TIC
A solução computacional deve operar sob modelo de alta disponibilidade (Mínimo de 99.5% de uptime), com interoperabilidade via REST-API e criptografia de ponta a ponta.

2. ANÁLISE DE MERCADO E DEPENDÊNCIA TECNOLÓGICA (LOCK-IN)
De modo a obstar a dependência crônica em um fornecedor proprietário (Vendor Lock-in), o software licitado deverá permitir a exportação integral de bases relacionais em formatações de mercado genéricas (como MySQL, CSV, JSON) sem encargos adicionais.

3. DEFINIÇÃO DA MÉTRICA DE COBRANÇA
A aferição de cobrança dar-se-á por UST (Unidade de Serviço Técnico) ou Mensalidade Fixa, com base em metas tangíveis cumpridas. É vedada a contratação de TI baseada apenas em esforço ou equipe alocada sem mensuração efetiva de resultados.

4. COMPATIBILIDADE LGPD E CRIPTOGRAFIA
O Estudo assegura que o fluxo de dados atende às delimitações nacionais da ANPD e LGPD, dispondo sobre responsabilidade administrativa em incidentes.`,
    tr: `TERMO DE REFERÊNCIA (TR-TIC) - TECNOLOGIA DA INFORMAÇÃO
ESTRUTURAÇÃO CONFORME DIRETRIZES DA LEI nº 14.133/2021

1. OBJETO
Prestação de solução integrada de TIC contemplando suporte contínuo de segundo e terceiro níveis de escalabilidade técnica.

2. ACORDO DE NÍVEL DE SERVIÇO (SLA) COMPUTACIONAL
- Incidentes Críticos: Resolução em até 04 (quatro) horas úteis sob pena de glosa operacional de 2% do faturamento diário.
- Incidentes Médios: Resolução em até 12 (doze) horas úteis.
- Incidentes Baixos/Dúvidas: Resolução em até 24 ou 48 horas de expediente.

3. PROPRIEDADE INTELECTUAL DOS CÓDIGOS-FONTE
Todos os scripts, códigos desenvolvidos de forma customizada e rotinas computacionais originadas sob este contrato pertencerão exclusivamente ao Ente Público contratante, devendo ser entregues em repositório central.`
  }
};

export const RECOMENDACOES_TECNICAS: Record<CategoriaObjeto, string[]> = {
  bens: [
    "Evite a especificação de uma única marca no TR. Caso precise indicar referências, adicione 'ou equivalente' conforme preceitua o Art. 41.",
    "Para contratações acima de R$ 80.000, reserve cotas de 25% para Micro e Pequenas Empresas (MPE) locais caso o lote seja divisível.",
    "Exija assistência técnica de forma devidamente fundamentada no ETP; exigências injustificadas de cobertura nacional severa podem ser entendidas como barreira de entrada e restrição à competitividade pelo TCU."
  ],
  servicos: [
    "Implemente obrigatoriamente um Instrumento de Medição de Resultado (IMR/SLA) para desvincular o faturamento mensal da mera presença física de operadores.",
    "Em contratações de Dedicação Exclusiva de Mão de Obra (DEMO), faça o provisionamento mensal das obrigações (férias, 13º, encargos) para resguardar a Administração de heranças trabalhistas solidárias.",
    "Avalie se o serviço é comum ou especial. Serviços de natureza intelectual não padronizáveis requerem licitação do tipo técnica e preço ou inexigibilidade de licitação bem fundamentada."
  ],
  engenharia: [
    "A planilha orçamentária é a alma do projeto. Deve estar 100% amparada no SINAPI (construção civil) ou SICRO (infraestrutura) sob pena de desclassificação legal ou acusação de sobrepreço.",
    "Verifique a obrigatoriedade da Matriz de Alocação de Riscos (Obrigatória para grandes obras de grande vulto > R$ 200 mi ou em regimes integrados).",
    "Garantias exigidas pelo contratante em obras de engenharia podem ser estipuladas entre 5% e 10% do valor estimado no edital para assegurar a conclusão da edificação."
  ],
  ti: [
    "Não pague por homem-hora puro e simples. Adote métricas baseadas em resultados, tais como Unidade de Serviço Técnico (UST) ou Unidades de Medida de Desenvolvimento de Software (Pontos de Função).",
    "Não admita cláusula de lock-in proprietário no ETP-TIC. A empresa contratada deve ofertar plena portabilidade bidirecional dos dados exportados a qualquer momento.",
    "Observe o alinhamento com a Instrução Normativa SGD/MGI nº 94/2022 do Ministério da Gestão para órgãos federais e estaduais conveniados."
  ]
};

export const PERGUNTAS_LEGAIS = [
  {
    pergunta: "Qual o prazo de vigência máximo do contrato na Lei 14.133/2021?",
    resposta: "Para contratos de serviços e fornecimentos contínuos, o prazo inicial é de até 5 anos, prorrogável sucessivamente até o limite de 10 anos (Art. 107). Para contratos de receita, até 10 anos prorrogáveis até 35 anos. Contratos de eficiência, até 15 anos prorrogáveis até 35 anos."
  },
  {
    pergunta: "A Matriz de Riscos é sempre obrigatória?",
    resposta: "Não. Ela é obrigatória apenas em contratações de grande vulto (Art. 6º, XXII - valor acima de R$ 200 milhões) e nos regimes de contratação integrada e semi-integrada. No entanto, ela é altamente recomendável nos contratos comuns de serviços continuados de engenharia."
  },
  {
    pergunta: "Quais são os limites para dispensa de licitação por valor?",
    resposta: "Na Lei nº 14.133/2021, os limites vigentes atualizados anualmente por decreto para dispensa por valor são de até R$ 119.812,18 para obras e serviços de engenharia ou manutenção de veículos automotores; e de até R$ 59.906,09 para outros serviços e compras comuns."
  },
  {
    pergunta: "O que substitui o projeto básico na Lei 14.133/2021?",
    resposta: "O Projeto Básico continua obrigatório para obras de engenharia e serviços especiais de engenharia. E para serviços comuns e bens, utiliza-se o Termo de Referência (TR). Em casos específicos de contratação integrada (onde a própria contratada desenvolve os projetos), a licitação é feita com base em um Anteprojeto de Engenharia, de modo que o vencedor elabora os projetos básico e executivo posteriores."
  },
  {
    pergunta: "O que é o Princípio da Segregação de Funções?",
    resposta: "É o princípio que veda a designação de um mesmo agente público para atuação simultânea em funções suscetíveis a conflito de interesses ao longo do processo licitatório. Por exemplo, quem planeja e elabora o Termo de Referência não deve ser o mesmo a exercer a função de fiscal do contrato ou emitir o julgamento final sem validação técnica secundária."
  }
];
