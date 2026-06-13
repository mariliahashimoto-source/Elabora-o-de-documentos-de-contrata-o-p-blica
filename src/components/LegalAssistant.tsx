import React, { useState } from 'react';
import { PERGUNTAS_LEGAIS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp, Bot, Send, Sparkles, AlertCircle } from 'lucide-react';

export default function LegalAssistant() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: 'Olá! Sou seu assessor virtual especializado na Lei 14.133/2021. Você pode me perguntar sobre ritos de dispensa eletrônica, inexigibilidade, composição de BDI, modelagem de SLAs, jurisprudência do TCU ou regras de habilitação.'
    }
  ]);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const currentQuestion = userQuestion;
    setUserQuestion('');
    setChatError(null);
    setChatMessages(prev => [...prev, { sender: 'user', text: currentQuestion }]);
    setIsAnswering(true);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentQuestion,
          systemInstruction: `Você é o maior doutrinador jurídico brasileiro especialista em licitações e contratações públicas federais, estaduais e municipais sob a égide da Lei nº 14.133/2021 (Nova Lei de Licitações), possuindo profundo conhecimento dos acórdãos recentes e informativos do Tribunal de Contas da União (TCU). 
Responda de forma extremamente segura, fundamentada em artigos de lei, dividida em tópicos se necessário, e de maneira objetiva e esclarecedora.`
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na conexão HTTP: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.text) {
        setChatMessages(prev => [...prev, { sender: 'assistant', text: data.text }]);
      } else {
        throw new Error('Nenhum texto de resposta retornado.');
      }

    } catch (err: any) {
      console.error(err);
      setChatError(err.message || 'Houve uma falha ao enviar a mensagem. Por favor, tente novamente.');
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="assistant_panel">
      {/* Esquerda: Base de Conhecimento Rápida */}
      <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-md flex flex-col justify-between">
        <div>
          <div className="mb-5">
            <h3 className="text-md font-semibold text-neutral-100 flex items-center">
              <HelpCircle className="w-5 h-5 mr-1.5 text-emerald-500" />
              Guia Prático da Lei 14.133/2021
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              Consulte de forma expressa as discussões e mandamentos consolidados sobre a Nova Lei de Licitações.
            </p>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {PERGUNTAS_LEGAIS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-neutral-950 border border-neutral-800/80 rounded-lg overflow-hidden transition-all text-left"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-3 flex items-center justify-between text-left hover:bg-neutral-850 transition"
                  >
                    <span className="text-xs font-semibold text-neutral-200 pr-4">
                      {faq.pergunta}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3 pt-1 border-t border-neutral-850">
                      <p className="text-[11px] leading-relaxed text-neutral-300">
                        {faq.resposta}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg text-left">
          <h4 className="text-xs font-bold text-amber-500 flex items-center uppercase tracking-wide">
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            Entradas Importantes
          </h4>
          <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
            Lembre-se: O Parecer Jurídico (Art. 53) é indispensável para aprovar as minutas processuais antes da publicação, blindando a responsabilidade do pregoeiro e autoridades competentes.
          </p>
        </div>
      </div>

      {/* Direita: Chat Inteligente com Doutrinador Legal */}
      <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col h-[600px] shadow-md overflow-hidden">
        {/* Topo do Chat */}
        <div className="bg-neutral-950 px-5 py-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-200 uppercase tracking-widest font-mono">
              Orientador Técnico AI-Especialista
            </span>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">
            Online
          </span>
        </div>

        {/* Notificação de Erro */}
        {chatError && (
          <div className="bg-red-950/25 border-b border-red-500/20 text-red-300 text-xs px-4 py-2.5 flex items-start text-left shrink-0">
            <AlertCircle className="w-4 h-4 text-red-400 mr-2 shrink-0 mt-0.5" />
            <div>{chatError}</div>
          </div>
        )}

        {/* Conteúdo do Chat */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950 text-left">
          {chatMessages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={idx} 
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-lg px-4 py-3 text-xs leading-relaxed ${
                  isUser 
                    ? 'bg-emerald-500 text-neutral-950 font-medium rounded-tr-none' 
                    : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none whitespace-pre-wrap'
                }`}>
                  {/* Se for do assistente, podemos colocar cabeçalhos ou destaques */}
                  {!isUser && msg.text.startsWith('Olá!') && (
                    <div className="flex items-center space-x-1 mb-1.5 pb-1 border-b border-neutral-800 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>Sua Assessoria Jurídica de Contratações</span>
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isAnswering && (
            <div className="flex justify-start">
              <div className="bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-lg rounded-tl-none px-4 py-3 text-xs flex items-center space-x-2">
                <span className="animate-pulse">Especialista IA está fundamentando a resposta</span>
                <span className="flex space-x-0.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleAskQuestion} className="bg-neutral-950 p-3 border-t border-neutral-800 shrink-0">
          <div className="flex items-center space-x-2 bg-neutral-900 rounded-lg border border-neutral-800 px-3 py-1">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              disabled={isAnswering}
              placeholder="Ex: Como posso justificar a aquisição de um lote único no ETP?"
              className="flex-1 bg-transparent text-xs text-neutral-200 focus:outline-none placeholder-neutral-550 focus:ring-0 focus:ring-offset-0 ring-0 py-2.5"
            />
            <button
              type="submit"
              disabled={isAnswering || !userQuestion.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 p-2 rounded-md transition disabled:bg-neutral-850 disabled:text-neutral-600 active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
