import { Opportunity } from '../types/opportunity';

export const SEED_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-prr-pme-ai',
    name: 'PRR Vouchers: Transição Digital & Automação com IA para PMEs',
    country: 'Portugal',
    reach: 'Portugal',
    organization: {
      name: 'IAPMEI / Estrutura de Missão Recuperar Portugal (PRR)',
      type: 'Public Body / Gov',
      website: 'https://recuperarportugal.gov.pt',
      verifiedDomain: true,
    },
    category: 'AI Implementation Services',
    description:
      'Vouchers e linhas a fundo perdido do Plano de Recuperação e Resiliência (PRR) e Portugal 2030 para modernização digital de PMEs portuguesas (comércio, serviços e indústria ligeira), financiando a 75%-100% a contratação de fornecedores de inteligência artificial aplicada, agentes de atendimento, automação de processos e integração de CRM.',
    evidence: {
      sources: [
        {
          title: 'IAPMEI - Transição Digital das Empresas (PRR C16-i02)',
          url: 'https://www.iapmei.pt/PRODUTOS-E-SERVICOS/Incentivos-Financiamento/Sistemas-de-Incentivos/PRR-Catalogo-de-Servicos-de-Transicao-Digital.aspx',
          snippet: 'Catálogo de fornecedores de serviços de transição digital e vouchers para capacitação e implementação de tecnologias emergentes em micro e PMEs.',
          publishedDate: '2024-Q4'
        },
        {
          title: 'Aceleradoras de Comércio Digital DGAE/IAPMEI',
          url: 'https://www.comerciodigital.pt',
          snippet: 'Medida financiada pelo PRR que abrange mais de 30.000 PMEs para diagnóstico e adoção de soluções digitais e automação inteligente.',
          publishedDate: '2024-Q4'
        }
      ],
      verificationStatus: 'PUBLIC_CALL_DOCUMENTED',
      investigationNotes: 'PMEs têm orçamento já atribuído por vouchers a fundo perdido; a barreira de venda é mínima pois o cliente não gasta capital próprio. Exige inscrição ou parceria como prestador no catálogo IAPMEI.'
    },
    commercialPotential: {
      estimatedValue: '€7,500 – €30,000 por PME implementada',
      revenueModel: 'Fixed Contract',
      scalability: 'High',
      annualRunRatePotential: '€90,000 – €240,000 (10 a 20 clientes/ano)'
    },
    timeToFirstRevenue: {
      estimate: '3 a 5 semanas',
      daysToFirstCash: 28,
      initialMilestone: 'Assinatura do contrato de prestação de serviços com PME aprovada no voucher PRR.'
    },
    requiredSkillsAndResources: [
      'Implementação de fluxos de automação n8n / Make / LangChain',
      'Configuração de modelos de IA para atendimento omnicanal (WhatsApp/Email/Web)',
      'Apresentação de proposta comercial simplificada em português'
    ],
    initialInvestment: {
      amount: '€0 (Zero investimento em capital fixo)',
      capitalIntensity: 'Zero / Sweat Equity',
      breakdown: 'Apenas tempo de prospecção das PMEs com candidaturas PRR abertas ou aprovadas e infraestrutura cloud básica coberta pelo adiantamento do cliente.'
    },
    mainRisks: [
      {
        risk: 'Prazos burocráticos de validação e reembolso do IAPMEI',
        severity: 'Medium',
        mitigation: 'Exigir 30% a 50% de entrada direta à empresa contratante ou estruturar contratos de serviço contínuo.'
      },
      {
        risk: 'Escopo excessivo solicitado por clientes pouco digitalizados',
        severity: 'Low',
        mitigation: 'Empacotar soluções fechadas de catálogo (ex: Agente de Triagem de Leads + FAQ Inteligente).'
      }
    ],
    score: {
      total: 92,
      breakdown: {
        revenuePotential: 23, // 23/25 - High reliable revenue via government guaranteed funds
        timeToFirstRevenue: 19, // 19/20 - Fast conversion of approved beneficiaries
        marketDemand: 19, // 19/20 - Strong urge by SMEs to execute voucher budgets before expiry
        implementationFeasibility: 14, // 14/15 - Standard agentic stack easily deployed
        competitionAndDifferentiation: 8, // 8/10 - Traditional IT consultancies are slow and expensive; agile agents win
        initialInvestmentRequired: 9 // 9/10 - Effectively €0 required
      },
      rationales: {
        revenuePotential: 'PMEs portuguesas dispõem de verbas alocadas pelo PRR prontas a faturar.',
        timeToRevenue: 'Aprovação direta sem longos ciclos de procurement corporativo.',
        marketDemand: 'Obrigatoriedade de execução das metas do Plano de Recuperação até 2026.',
        feasibility: 'Tecnologia madura com APIs de LLMs e conectores padrão de ERP/CRM.',
        competition: 'Maioria das agências locais vende sites WordPress; agentes de IA são forte diferencial.',
        investment: 'Custo inicial marginal; modelos pay-as-you-go cobertos pela margem do contrato.'
      }
    },
    recommendedNextAction: {
      action: 'Mapear a lista pública de PMEs aderentes às Aceleradoras de Comércio Digital no Porto/Lisboa e enviar proposta de auditoria gratuita de automação de 15 minutos.',
      actionType: 'Direct Commercial Pitch',
      targetContactRole: 'CEO / Diretor Comercial de PME Beneficiária PRR',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Auditoria Rápida: Ativação do Voucher PRR com Agente de Atendimento IA',
      draftOutreachBody: 'Estimado(a) Diretor(a),\n\nIdentificámos que a vossa empresa está elegível para as medidas de modernização digital apoiadas pelo PRR. Desenvolvemos soluções turnkey de Agentes de IA que automatizam o suporte ao cliente e triagem de pedidos comerciais sem exigir investimento de capital próprio.\n\nGostaria de agendar uma breve chamada de 10 minutos esta semana para demonstrar como desbloquear 100% da verba com uma solução operacional em 14 dias?\n\nCom os melhores cumprimentos,\n[Assinatura]'
    },
    priorityTier: 'IMMEDIATE_PRIORITY',
    createdAt: '2026-11-01T09:00:00Z',
    lastUpdated: '2026-11-06T08:30:00Z'
  },
  {
    id: 'opp-turismo-fit-ai',
    name: 'FIT 2.0 & Hub Turismo de Portugal: Agentes Multilíngues de Concierge & Reservas',
    country: 'Portugal',
    reach: 'Portugal',
    organization: {
      name: 'Turismo de Portugal / Fundo de Apoio ao Turismo',
      type: 'Public Body / Gov',
      website: 'https://business.turismodeportugal.pt',
      verifiedDomain: true,
    },
    category: 'Tourism & Hospitality Tech',
    description:
      'Oportunidade de fornecimento de Agentes de IA conversacionais (WhatsApp/Voice/Web) integrados aos motores de reservas de grupos hoteleiros boutique e alojamentos locais no Algarve, Lisboa, Porto e Madeira. Alinhado com as linhas de apoio à inovação e descarbonização do Turismo de Portugal e FIT (Fundo de Inovação Turística).',
    evidence: {
      sources: [
        {
          title: 'Turismo de Portugal - Linha de Apoio à Sustentabilidade e Digitalização',
          url: 'https://business.turismodeportugal.pt/pt/Investir/Apoios-Incentivos/Paginas/default.aspx',
          snippet: 'Programas de co-financiamento para ferramentas que melhorem a experiência do turista e a eficiência operacional dos empreendimentos turísticos.',
          publishedDate: '2024-Q3'
        },
        {
          title: 'Associação da Hotelaria de Portugal (AHP) - Relatório de Escassez de Mão de Obra',
          url: 'https://www.hoteis-portugal.pt',
          snippet: 'Mais de 68% dos hotéis relatam défice crítico de recepcionistas fluentes em francês, alemão e espanhol durante as épocas altas.',
          publishedDate: '2024-Q4'
        }
      ],
      verificationStatus: 'VERIFIED_REAL_ENTITY',
      investigationNotes: 'O setor hoteleiro português tem margens sólidas mas sofre com falta crónica de pessoal bilíngue em turnos noturnos. Um agente de IA 24/7 que fale 12 idiomas e converta reservas diretas poupa comissões da Booking.com (18%).'
    },
    commercialPotential: {
      estimatedValue: 'Setup de €2,500 + Retainer mensal de €450 a €850 por hotel',
      revenueModel: 'Monthly Retainer',
      scalability: 'Exceptional',
      annualRunRatePotential: '€60,000 – €180,000 (15 a 25 hotéis boutique/alojamentos)'
    },
    timeToFirstRevenue: {
      estimate: '2 a 4 semanas',
      daysToFirstCash: 21,
      initialMilestone: 'Fecho do primeiro piloto pago em hotel boutique com garantia de aumento de reservas diretas.'
    },
    requiredSkillsAndResources: [
      'Integração de Webhooks com PMS hoteleiro (Cloudbeds, Hostaway, Guestcentric ou Guesty)',
      'Fluxo de WhatsApp Business API via Twilio ou Z-API',
      'Knowledge Base curada sobre comodidades locais e transfers'
    ],
    initialInvestment: {
      amount: '€150 (contas de teste Twilio + servidor VPS)',
      capitalIntensity: 'Ultra Low (<€500)',
      breakdown: 'Subscrições mínimas de infraestrutura de teste e WhatsApp Business API.'
    },
    mainRisks: [
      {
        risk: 'Receio dos diretores hoteleiros com alucinações de preços/disponibilidade',
        severity: 'Medium',
        mitigation: 'Arquitetura com verificação determinística de APIs: o LLM redige o tom, mas a disponibilidade vem estritamente do PMS.'
      }
    ],
    score: {
      total: 90,
      breakdown: {
        revenuePotential: 22,
        timeToFirstRevenue: 19,
        marketDemand: 20,
        implementationFeasibility: 13,
        competitionAndDifferentiation: 7,
        initialInvestmentRequired: 9
      },
      rationales: {
        revenuePotential: 'Retainers recorrentes com baixíssimo churn se o bot salvar 2 reservas diretas/mês.',
        timeToRevenue: 'Decisores locais acessíveis diretamente via LinkedIn ou abordagem direta ao Diretor Geral.',
        marketDemand: 'Problema urgente de escassez de recepcionistas bilíngues no turismo nacional.',
        feasibility: 'Conexão via webhook com os principais PMS do mercado hoteleiro.',
        competition: 'Concorrentes existentes usam chatbots rígidos de árvores de decisão obsoletos.',
        investment: 'Mínimo custo de tooling; o cliente banca a taxa de mensagens da Meta.'
      }
    },
    recommendedNextAction: {
      action: 'Preparar demonstração interativa de 2 minutos no WhatsApp simulando um hóspede alemão a reservar quarto e pedir recomendações no Douro; enviar aos 20 principais diretores de hotéis boutique.',
      actionType: 'Direct Commercial Pitch',
      targetContactRole: 'General Manager / Diretor Comercial Hoteleiro',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Demonstração: Agente Concierge IA 24/7 para reservas diretas no seu Hotel',
      draftOutreachBody: 'Exmo(a) Diretor(a),\n\nCriámos um protótipo específico para a vossa unidade que atende hóspedes em 12 idiomas no WhatsApp, consulta tarifas em tempo real e fecha reservas diretas sem comissões da OTA.\n\nPreparámos um link de teste de 60 segundos com o vosso catálogo. Posso partilhar convosco para recolher o vosso feedback profissional?\n\nCumprimentos,\n[Assinatura]'
    },
    priorityTier: 'IMMEDIATE_PRIORITY',
    createdAt: '2026-11-02T10:15:00Z',
    lastUpdated: '2026-11-06T08:00:00Z'
  },
  {
    id: 'opp-eic-accelerator-eu',
    name: 'Horizon Europe & EIC Accelerator: Subvenção Não-Reembolsável para Agentes Autónomos',
    country: 'European Union',
    reach: 'European Union',
    organization: {
      name: 'European Innovation Council (EIC) / Comissão Europeia',
      type: 'Public Body / Gov',
      website: 'https://eic.ec.europa.eu',
      verifiedDomain: true,
    },
    category: 'Tenders & Public Funding',
    description:
      'Linhas de financiamento deep-tech EIC Accelerator e Horizon Europe (calls específicas para "Trustworthy Generative AI and Autonomous Agent Orchestration") que disponibilizam subvenções a fundo perdido até €2.5M mais componente de equity opcional até €15M para consórcios ou startups com base na UE desenvolvendo arquiteturas inovadoras de agentes de automação corporativa.',
    evidence: {
      sources: [
        {
          title: 'EIC Work Programme 2025/2026 - Funding & Tenders Portal EU',
          url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/programmes/horizon',
          snippet: 'Chamadas competitivas de fluxo contínuo para soluções de IA soberana europeia e automação de fluxos críticos de negócio.',
          publishedDate: '2024-Q4'
        },
        {
          title: 'ANI (Agência Nacional de Inovação) - Ponto de Contacto Nacional Horizon Europe',
          url: 'https://www.ani.pt',
          snippet: 'Apoio técnico gratuito e avaliação prévia a candidaturas portuguesas ao EIC Accelerator.',
          publishedDate: '2024-Q3'
        }
      ],
      verificationStatus: 'PUBLIC_CALL_DOCUMENTED',
      investigationNotes: 'Montante muito expressivo e capital não-dilutivo. No entanto, o tempo de submissão, avaliação (Step 1 -> Step 2) e concessão ronda 4 a 6 meses. Deve ser trabalhado em paralelo com receitas imediatas.'
    },
    commercialPotential: {
      estimatedValue: '€500,000 até €2,500,000 a fundo perdido (100% financiamento)',
      revenueModel: 'Non-Repayable Grant',
      scalability: 'Exceptional',
      annualRunRatePotential: '€500k – €2.5M de injeção direta de liquidez'
    },
    timeToFirstRevenue: {
      estimate: '16 a 24 semanas',
      daysToFirstCash: 120,
      initialMilestone: 'Aprovação do Step 1 (Short Proposal) e convocatória para pitch presencial em Bruxelas.'
    },
    requiredSkillsAndResources: [
      'Elaboração de proposta técnica de TRL 5 a TRL 8 conforme guidelines da UE',
      'Definição de propriedade intelectual e conformidade rigorosa com o EU AI Act',
      'Parceria ou validação com pelo menos 2 clientes industriais europeus'
    ],
    initialInvestment: {
      amount: '€0 – €1,500 (despesas de dossier ou assessoria success fee)',
      capitalIntensity: 'Low (<€2,000)',
      breakdown: 'Apoio gratuito dos pontos de contacto nacionais (ANI em Portugal); consultoras especializadas trabalham maioritariamente a success fee.'
    },
    mainRisks: [
      {
        risk: 'Taxa de aprovação concorrencial na UE (cerca de 8-12%)',
        severity: 'High',
        mitigation: 'Validar tração prévia de mercado com projetos de receita imediata para blindar a candidatura no Step 1.'
      }
    ],
    score: {
      total: 81,
      breakdown: {
        revenuePotential: 25, // 25/25 - Transformative non-dilutive capital
        timeToFirstRevenue: 9,  // 9/20 - Slow timeline (4-6 months)
        marketDemand: 18, // 18/20 - Massive EU institutional commitment to AI sovereignty
        implementationFeasibility: 11, // 11/15 - Demands extensive regulatory compliance documentation
        competitionAndDifferentiation: 9, // 9/10 - High differentiation if targeting industrial multi-agent systems
        initialInvestmentRequired: 9 // 9/10 - No capital expenditure needed to submit Step 1
      },
      rationales: {
        revenuePotential: 'Captação de capital não-dilutivo incomparável com contratos normais de serviços.',
        timeToRevenue: 'Processo em etapas estritamente burocráticas da Comissão Europeia.',
        marketDemand: 'Prioridade estratégica máxima na agenda digital da União Europeia.',
        feasibility: 'Exige equipa qualificada e protótipo funcional comprovado em ambiente relevante.',
        competition: 'Excelente posicionamento para projetos que garantam soberania de dados e privacidade europeia.',
        investment: 'Candidatura de Step 1 pode ser redigida internamente sem custos de capitais.'
      }
    },
    recommendedNextAction: {
      action: 'Agendar sessão com o Ponto de Contacto Nacional da ANI para submeter a manifestação de interesse (Short Application de 3 minutos de vídeo + 10 páginas) no próximo corte mensal do EIC Accelerator.',
      actionType: 'Grant Application Prep',
      targetContactRole: 'NCP EIC Accelerator na ANI (Agência Nacional de Inovação)',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Manifestação de Interesse: Candidatura EIC Accelerator para Plataforma de Agentes Autónomos',
      draftOutreachBody: 'Exmo(a) Ponto de Contacto Nacional EIC,\n\nEstamos a estruturar uma proposta focada em orquestração de agentes autónomos de IA e conformidade com o EU AI Act para PMEs europeias. Pretendemos submeter ao próximo cut-off do EIC Accelerator e gostaríamos de submeter o draft preliminar para revisão e feedback dos peritos da ANI.\n\nDisponíveis para partilhar o executive summary de 3 páginas.\n\nCom os melhores cumprimentos,\n[Assinatura]'
    },
    priorityTier: 'TOP_10',
    createdAt: '2026-11-03T11:00:00Z',
    lastUpdated: '2026-11-06T07:15:00Z'
  },
  {
    id: 'opp-us-enterprise-agent-contracting',
    name: 'US Enterprise Agentic Automation & Workflow Contracting',
    country: 'United States',
    reach: 'United States',
    organization: {
      name: 'Mid-Market US B2B Enterprises & YC Alumni Network',
      type: 'Enterprise',
      website: 'https://ycombinator.com/companies',
      verifiedDomain: true,
    },
    category: 'Remote Projects & Collaborations',
    description:
      'Contratos remotos corporativos de implementação de fluxos de trabalho com agentes de IA (RAG corporativo, agentes de triagem financeira, automação de reconciliação de faturas e processamento de sinistros) para empresas norte-americanas de médio porte que operam com carência de engenheiros de IA dedicados.',
    evidence: {
      sources: [
        {
          title: 'Remote AI Engineering & Solutions Architect Benchmark',
          url: 'https://www.upwork.com/freelance-jobs/ai-agents/',
          snippet: 'Procura média por contratos de arquitetura de agentes entre $90/h e $150/h com duração de 3 a 6 meses para clientes nos EUA.',
          publishedDate: '2024-Q4'
        },
        {
          title: 'YC Work at a Startup & Contractor Requests for AI Systems',
          url: 'https://www.workatastartup.com',
          snippet: 'Mais de 120 empresas financiadas procuram prestadores especializados em agent frameworks (LangGraph, CrewAI, AutoGen) para automação de backoffice.',
          publishedDate: '2024-Q4'
        }
      ],
      verificationStatus: 'VERIFIED_REAL_ENTITY',
      investigationNotes: 'Clientes dos EUA pagam em USD em prazos quinzenais pontuais (Stripe/Wise/Deel) e valorizam rapidez e competência técnica em fuso horário compatível (WET/Lisboa partilha 4 a 5 horas com a Costa Leste dos EUA).'
    },
    commercialPotential: {
      estimatedValue: '$8,000 – $18,000 / mês por contrato de 20 a 30 horas semanais',
      revenueModel: 'Monthly Retainer',
      scalability: 'Medium',
      annualRunRatePotential: '$96,000 – $216,000 por contrato corporativo ativo'
    },
    timeToFirstRevenue: {
      estimate: '10 a 18 dias',
      daysToFirstCash: 14,
      initialMilestone: 'Entrevista técnica concluída e assinatura de Master Services Agreement (MSA) com primeiro faturamento quinzenal.'
    },
    requiredSkillsAndResources: [
      'Domínio avançado de LangGraph / CrewAI / FastAPI / Python / TypeScript',
      'Inglês fluente para reuniões com CTOs e Heads of Operations',
      'Portfólio com demonstração funcional de 1 caso de uso concreto (ex: reconciliação de extratos)'
    ],
    initialInvestment: {
      amount: '$0 (Zero capital financeiro)',
      capitalIntensity: 'Zero / Sweat Equity',
      breakdown: 'Computador de trabalho e conexões API padrão.'
    },
    mainRisks: [
      {
        risk: 'Dependência de horas de trabalho e fuso horário estendido',
        severity: 'Low',
        mitigation: 'Faturar por valor entregue (milestone/retainer fechado) e não por hora avulsa, permitindo subcontratação ou automação interna.'
      }
    ],
    score: {
      total: 91,
      breakdown: {
        revenuePotential: 24, // 24/25 - High dollar-denominated cashflow
        timeToFirstRevenue: 20, // 20/20 - Ultra rapid closing cycle (1 to 2 weeks)
        marketDemand: 19, // 19/20 - Enormous US enterprise budget for AI agents
        implementationFeasibility: 13, // 13/15 - Requires top-tier technical delivery
        competitionAndDifferentiation: 6, // 6/10 - Global talent pool competes, but European time zone and quality win
        initialInvestmentRequired: 9 // 9/10 - Zero upfront capital required
      },
      rationales: {
        revenuePotential: 'Poder de compra americano permite margens líquidas superiores a 80%.',
        timeToRevenue: 'Decisões ágeis: se a solução resolve um gargalo imediato, o contrato inicia na semana seguinte.',
        marketDemand: 'O termo "AI Agent workflow automation" é a principal prioridade de OPEX dos CFOs americanos.',
        feasibility: 'Frameworks open-source robustos aceleram entregas em dias em vez de meses.',
        competition: 'Necessário demonstrar casos reais para vencer concorrentes generalistas.',
        investment: 'Custo zero; apenas tempo de prospecção e demonstração técnica.'
      }
    },
    recommendedNextAction: {
      action: 'Publicar um repositório GitHub público e vídeo de 90 segundos demonstrando um agente autónomo de reconciliação financeira em ação; abordar 10 Heads of Operations no LinkedIn/Twitter.',
      actionType: 'Direct Commercial Pitch',
      targetContactRole: 'Head of Operations / VP of Engineering em empresas SaaS US',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Agentic Workflow Demo: Cut 80% manual ops in financial reconciliations',
      draftOutreachBody: 'Hi [Name],\n\nSaw your team scaling operations rapidly. We built an autonomous multi-agent pipeline that handles document intake, anomaly detection, and ERP reconciliation automatically with 99.4% accuracy.\n\nRecorded a quick 90-second Loom showing the live architecture: [Link]\n\nWould love to deploy a 7-day risk-free pilot on your staging data if this addresses your current backlog.\n\nBest,\n[Signature]'
    },
    priorityTier: 'IMMEDIATE_PRIORITY',
    createdAt: '2026-11-02T14:30:00Z',
    lastUpdated: '2026-11-06T08:10:00Z'
  },
  {
    id: 'opp-galp-edp-open-innovation',
    name: 'EDP Free Electrons & Galp Upcoming: Concursos de Inovação Aberta em Energia',
    country: 'Portugal',
    reach: 'European Union',
    organization: {
      name: 'EDP Inovação & Galp Upcoming Energies',
      type: 'Enterprise',
      website: 'https://freeelectrons.org',
      verifiedDomain: true,
    },
    category: 'Commercial Partnerships',
    description:
      'Programas de inovação aberta e pilotos pagos com as maiores utilities e petrolíferas da Península Ibérica. Busca ativa de soluções de agentes de IA para manutenção preditiva de ativos renováveis (eólico e solar), otimização de trading de energia e agentes de atendimento em larga escala.',
    evidence: {
      sources: [
        {
          title: 'EDP Free Electrons Global Accelerator Program',
          url: 'https://www.edp.com/pt-pt/inovacao/free-electrons',
          snippet: 'Programa global que financia pilotos remunerados entre startups e consórcios com EDP, American Electric Power, Origin Energy e CLP.',
          publishedDate: '2024-Q3'
        },
        {
          title: 'Galp Upcoming Energies Innovation Calls',
          url: 'https://upcoming.galp.com',
          snippet: 'Desafios de inovação para digitalização e transição energética com financiamento direto de Provas de Conceito (PoC).',
          publishedDate: '2024-Q4'
        }
      ],
      verificationStatus: 'VERIFIED_REAL_ENTITY',
      investigationNotes: 'Pilotos corporativos são remunerados (típicos €25k a €50k por PoC de 3 meses). Se o piloto for validado, abre a porta para contratos anuais de 6 dígitos em produção.'
    },
    commercialPotential: {
      estimatedValue: '€25,000 – €50,000 por PoC piloto + €150,000/ano em rollout',
      revenueModel: 'Milestone Payment',
      scalability: 'Exceptional',
      annualRunRatePotential: '€175,000 – €400,000'
    },
    timeToFirstRevenue: {
      estimate: '8 a 12 semanas',
      daysToFirstCash: 60,
      initialMilestone: 'Seleção para o pitch day de inovação aberta e assinatura do Term Sheet de Piloto PoC.'
    },
    requiredSkillsAndResources: [
      'Conhecimento de dados de telemetria IoT / SCADA e séries temporais',
      'Arquitetura de agentes com tolerância a falhas e compliance de cibersegurança ISO 27001',
      'Capacidade de integração com sistemas SAP / Microsoft Azure'
    ],
    initialInvestment: {
      amount: '€0 (Desenvolvimento em cloud nos tiers de avaliação)',
      capitalIntensity: 'Zero / Sweat Equity',
      breakdown: 'Apresentação de arquitetura e protótipo sobre dados sintéticos abertos.'
    },
    mainRisks: [
      {
        risk: 'Ciclos corporativos lentos de aprovação de segurança da informação',
        severity: 'Medium',
        mitigation: 'Implementar a solução em tenant seguro dentro da própria cloud do cliente (Azure / AWS private VPC).'
      }
    ],
    score: {
      total: 84,
      breakdown: {
        revenuePotential: 23,
        timeToFirstRevenue: 13,
        marketDemand: 17,
        implementationFeasibility: 12,
        competitionAndDifferentiation: 9,
        initialInvestmentRequired: 10
      },
      rationales: {
        revenuePotential: 'Contratos corporativos com gigantes do PSI20 com capacidade de pagamento irrepreensível.',
        timeToRevenue: 'Processo seletivo estruturado com datas fixas de deliberação.',
        marketDemand: 'Pressão regulatória e de custos na transição energética acelera investimentos em IA.',
        feasibility: 'Exige padrões de segurança e governança mais exigentes do que PMEs.',
        competition: 'Poucos concorrentes oferecem agentes autónomos especializados em engenharia de ativos.',
        investment: 'Piloto integralmente financiado pelo orçamento de inovação da empresa.'
      }
    },
    recommendedNextAction: {
      action: 'Submeter candidatura na call aberta do Free Electrons e enviar dossier técnico de 4 páginas ao Diretor de Inovação Aberta da Galp Upcoming com proposta de PoC de 60 dias.',
      actionType: 'Strategic Partnership Inquiry',
      targetContactRole: 'Head of Open Innovation & Venturing (EDP / Galp)',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Proposta de Piloto PoC: Agente Autónomo de Diagnóstico Preditivo para Ativos Solares',
      draftOutreachBody: 'Estimada Equipa de Inovação Aberta,\n\nDesenvolvemos uma arquitetura de agentes de IA capaz de correlacionar anomalias de inversores solares e telemetria meteorológica, antecipando falhas em 72 horas e reduzindo perdas de geração em até 4.2%.\n\nGostaríamos de submeter a nossa proposta para um piloto de 60 dias sem fricção na vossa infraestrutura de teste.\n\nPoderemos enviar o one-pager técnico para validação?\n\nCom os melhores cumprimentos,\n[Assinatura]'
    },
    priorityTier: 'TOP_10',
    createdAt: '2026-11-03T16:00:00Z',
    lastUpdated: '2026-11-06T07:45:00Z'
  },
  {
    id: 'opp-centrifuge-ondo-rwa',
    name: 'Tokenização RWA (Real-World Assets) & Finanças Estruturadas sob o Regime MiCA da UE',
    country: 'European Union',
    reach: 'European Union',
    organization: {
      name: 'Centrifuge Network, Ondo Finance & Sociedades Gestoras Portuguesas',
      type: 'Ecosystem / DAO',
      website: 'https://centrifuge.io',
      verifiedDomain: true,
    },
    category: 'Web3 & RWA Tokenization',
    description:
      'Prestação de serviços de originação, auditoria de dados e automação de oráculos para protocolos de tokenização de ativos do mundo real (RWA: dívida privada, faturas de exportação portuguesas e fundos imobiliários). A entrada em vigor plena do regulamento MiCA na União Europeia cria uma procura massiva por pontes entre ativos tradicionais e DeFi institucional.',
    evidence: {
      sources: [
        {
          title: 'Regulamento MiCA (Markets in Crypto-Assets) - Esma EU',
          url: 'https://www.esma.europa.eu/esmas-activities/digital-finance-and-crypto-assets',
          snippet: 'Quadro regulamentar pioneiro europeu que clarifica a emissão de tokens referenciados a ativos e e-money tokens.',
          publishedDate: '2024-Q3'
        },
        {
          title: 'Centrifuge Governance Grants & Integrator Incentives',
          url: 'https://gov.centrifuge.io',
          snippet: 'Bolsas de integração e fee sharing para originadores de ativos que estruturem pools de crédito privado tokenizado.',
          publishedDate: '2024-Q4'
        }
      ],
      verificationStatus: 'CROSS_REFERENCED_RFP',
      investigationNotes: 'Portugal é um dos principais hubs europeus de Web3 com ecossistema qualificado e tributação favorável a investidores qualificados. A oportunidade reside em atuar como originador/integrador de ativos reais locais em protocolos globais.'
    },
    commercialPotential: {
      estimatedValue: '0.75% a 1.5% de taxa de originação sobre volume emitido + Grant de $20,000 – $50,000',
      revenueModel: 'Revenue Share',
      scalability: 'Exceptional',
      annualRunRatePotential: '€100,000 – €500,000 (dependente do volume originado)'
    },
    timeToFirstRevenue: {
      estimate: '8 a 14 semanas',
      daysToFirstCash: 75,
      initialMilestone: 'Aprovação da proposta de originação no Fórum de Governança e tokenização da primeira pool de teste (€500k).'
    },
    requiredSkillsAndResources: [
      'Estruturação jurídica de SPV (Sociedade de Propósito Específico) e smart contracts Solidity',
      'Conexão com gestores de património / family offices em Lisboa e Porto',
      'Auditoria de risco de crédito e oráculos Chainlink / Pyth'
    ],
    initialInvestment: {
      amount: '€500 (despesas de assessoria jurídica preliminar)',
      capitalIntensity: 'Low (<€2,000)',
      breakdown: 'Template padrão de estruturação de dívida e submissão na rede.'
    },
    mainRisks: [
      {
        risk: 'Complexidade de compliance e licenciamento CMVM / Banco de Portugal',
        severity: 'High',
        mitigation: 'Operar exclusivamente em ativos B2B institucionais com investidores qualificados sob regime de private placement.'
      }
    ],
    score: {
      total: 82,
      breakdown: {
        revenuePotential: 25, // 25/25 - Extreme upside on tokenized volume fees
        timeToFirstRevenue: 11, // 11/20 - Regulatory and structuring timeline
        marketDemand: 17, // 17/20 - RWA is the fastest growing vertical in digital finance
        implementationFeasibility: 10, // 10/15 - Requires legal and cryptographic mastery
        competitionAndDifferentiation: 9, // 9/10 - Very few entities can bridge traditional Portuguese finance to DeFi
        initialInvestmentRequired: 10 // 10/10 - Ecosystem grants cover onboarding costs
      },
      rationales: {
        revenuePotential: 'O modelo de percentagem sobre ativos sob gestão gera receita recorrente sem teto.',
        timeToRevenue: 'Exige diligência jurídica preliminar antes do primeiro drawdown financeiro.',
        marketDemand: 'Bancos e fundos de pensões institucionais estão ativamente a migrar para RWA.',
        feasibility: 'Contratos inteligentes auditados já existem nos protocolos; o trabalho é de originação.',
        competition: 'Forte barreira de entrada protege contra novos entrantes sem credibilidade.',
        investment: 'Protocolos distribuem grants para atrair novo volume de ativos reais.'
      }
    },
    recommendedNextAction: {
      action: 'Elaborar um estudo de caso de tokenização de faturas de fornecedores vinícolas ou hoteleiros em Portugal e submeter proposta de Grant no Fórum da Centrifuge / Ondo.',
      actionType: 'Proposal Draft',
      targetContactRole: 'Head of Partnerships / Ecosystem Lead na Centrifuge',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Proposal: Iberian SME Real-World Asset (RWA) Origination Pool on Centrifuge',
      draftOutreachBody: 'Hello Ecosystem Team,\n\nWe are preparing an institutional origination pipeline representing prime credit export receivables from Portuguese wine and hospitality producers (€3M initial tranche).\n\nWe would like to present our structure to the Risk Council for an onboarding grant and technical integration path.\n\nCould we schedule an alignment call with the RWA Partnerships Lead?\n\nBest regards,\n[Signature]'
    },
    priorityTier: 'TOP_10',
    createdAt: '2026-11-04T08:00:00Z',
    lastUpdated: '2026-11-06T07:30:00Z'
  },
  {
    id: 'opp-saas-whitelabel-realestate',
    name: 'SaaS White-Label: Agente de Qualificação Imediata de Leads Imobiliárias',
    country: 'Portugal & Espanha',
    reach: 'European Union',
    organization: {
      name: 'Redes de Mediação Imobiliária (Remax, Era, Century 21, Boutiques Cascais/Comporta)',
      type: 'SME',
      website: 'https://apemip.pt',
      verifiedDomain: true,
    },
    category: 'SaaS & White-Label',
    description:
      'Solução white-label de Agente de IA para agências imobiliárias que responde instantaneamente (em menos de 60 segundos) a leads geradas no Idealista, Imovirtual e campanhas Meta. O agente qualifica o orçamento, prazos de compra, necessidade de crédito habitação e agenda visita no calendário do consultor sem intervenção humana.',
    evidence: {
      sources: [
        {
          title: 'Estudo APEMIP - Tempo de Resposta a Leads Imobiliárias em Portugal',
          url: 'https://apemip.pt',
          snippet: 'Mais de 54% dos pedidos de informação de compradores estrangeiros em Portugal demoram mais de 48 horas a ser respondidos, perdendo a conversão para agências ágeis.',
          publishedDate: '2024-Q4'
        },
        {
          title: 'Benchmark de Conversão por Lead Response Time (MIT / Harvard Business Review)',
          url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
          snippet: 'Contactar um lead nos primeiros 5 minutos aumenta as probabilidades de qualificação em 21 vezes.',
          publishedDate: '2024-Q1'
        }
      ],
      verificationStatus: 'VERIFIED_REAL_ENTITY',
      investigationNotes: 'O mercado imobiliário português tem tickets de comissão altos (€15k a €40k por transação em zonas premium). Cada lead qualificada que fecha compensa anos de assinatura do software.'
    },
    commercialPotential: {
      estimatedValue: '€390 a €790 / mês por agência imobiliária licenciada',
      revenueModel: 'SaaS Subscription',
      scalability: 'Exceptional',
      annualRunRatePotential: '€93,600 – €284,400 (com 20 a 30 agências clientes)'
    },
    timeToFirstRevenue: {
      estimate: '14 a 21 dias',
      daysToFirstCash: 16,
      initialMilestone: 'Primeira agência piloto ativa convertendo leads reais do Idealista via email parser.'
    },
    requiredSkillsAndResources: [
      'Email parser para capturar leads do Idealista / Imovirtual',
      'Integração com WhatsApp Business Cloud API e Google Calendar / Cal.com',
      'Dashboard simples em React/Next.js para o consultor ver o score do lead'
    ],
    initialInvestment: {
      amount: '€80 (servidor VPS Hetzner + domínio)',
      capitalIntensity: 'Ultra Low (<€500)',
      breakdown: 'Custo de infraestrutura mínima totalmente absorvido na primeira mensalidade do cliente.'
    },
    mainRisks: [
      {
        risk: 'Agentes imobiliários relutantes em confiar no tom das respostas',
        severity: 'Low',
        mitigation: 'Modo "Copiloto": nos primeiros 10 dias, o agente sugere a mensagem e o consultor clica em enviar com 1 toque.'
      }
    ],
    score: {
      total: 94,
      breakdown: {
        revenuePotential: 24, // 24/25 - High recurring SaaS MRR
        timeToFirstRevenue: 20, // 20/20 - Under 3 weeks to first paying agency
        marketDemand: 20, // 20/20 - Immediate pain: losing international high-ticket buyers
        implementationFeasibility: 14, // 14/15 - Straightforward email-to-WhatsApp pipeline
        competitionAndDifferentiation: 7, // 7/10 - Standard CRMs exist but lack conversational autonomous qualification
        initialInvestmentRequired: 9 // 9/10 - Under €100 setup cost
      },
      rationales: {
        revenuePotential: 'Receita mensal recorrente previsível com churn mínimo se converter 1 negócio por trimestre.',
        timeToRevenue: 'Agências fecham na hora se for demonstrada uma resposta real em tempo real ao vivo.',
        marketDemand: 'O mercado imobiliário em Cascais, Lisboa, Comporta e Algarve depende criticamente de rapidez.',
        feasibility: 'Tecnologia 100% dominada com webhooks e modelos Gemini.',
        competition: 'Os CRMs imobiliários tradicionais portugueses são arcaicos e não têm agentes autónomos de WhatsApp.',
        investment: 'Custo residual; retorno de investimento garantido desde o cliente inaugural.'
      }
    },
    recommendedNextAction: {
      action: 'Criar um vídeo de 60 segundos demonstrando uma lead a entrar no Idealista às 22h e a receber resposta humana contextualizada no WhatsApp em 18 segundos agendando visita; enviar por WhatsApp a 15 diretores de agências em Lisboa.',
      actionType: 'Direct Commercial Pitch',
      targetContactRole: 'Broker / Diretor de Agência Imobiliária',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Demonstração: Como responder a leads do Idealista em 30 segundos no WhatsApp',
      draftOutreachBody: 'Olá [Nome],\n\nSabia que 7 em cada 10 leads de compradores estrangeiros em Cascais/Lisboa não recebem resposta na primeira hora e acabam por fechar com outra agência?\n\nDesenvolvemos um agente de IA que atende em 30 segundos no WhatsApp, qualifica se tem fundos próprios e marca a visita no calendário da sua equipa.\n\nFiz uma simulação rápida de 40 segundos com um imóvel da vossa carteira. Posso partilhar o link convosco?\n\nCumprimentos,\n[Assinatura]'
    },
    priorityTier: 'IMMEDIATE_PRIORITY',
    createdAt: '2026-11-04T12:00:00Z',
    lastUpdated: '2026-11-06T08:25:00Z'
  },
  {
    id: 'opp-tenders-base-gov-pt',
    name: 'Contratos Públicos em Base.gov.pt: Aquisição de Serviços de IA & Modernização Administrativa',
    country: 'Portugal',
    reach: 'Portugal',
    organization: {
      name: 'Municípios Portugueses (Porto, Lisboa, Cascais, Braga) & Secretarias de Estado',
      type: 'Public Body / Gov',
      website: 'https://www.base.gov.pt',
      verifiedDomain: true,
    },
    category: 'Tenders & Public Funding',
    description:
      'Concursos públicos e ajustes diretos registados no portal Base.gov.pt para implementação de assistentes virtuais de atendimento ao cidadão, sistemas de transcrição e resumo de assembleias municipais e automação de tramitação processual nos serviços municipais e juntas de freguesia.',
    evidence: {
      sources: [
        {
          title: 'Portal dos Contratos Públicos de Portugal (Base.gov.pt)',
          url: 'https://www.base.gov.pt/Base4/pt/pesquisa/?type=contratos',
          snippet: 'Registo obrigatório de todos os contratos públicos em Portugal. Pesquisa ativa de CPV 72000000 (Serviços de TI) com menção a inteligência artificial.',
          publishedDate: '2024-Q4'
        },
        {
          title: 'DGAEP & Modernização Administrativa Simplex',
          url: 'https://www.simplex.gov.pt',
          snippet: 'Medidas de inteligência artificial nos serviços públicos com verbas alocadas para modernização dos portais camarários.',
          publishedDate: '2024-Q3'
        }
      ],
      verificationStatus: 'PUBLIC_CALL_DOCUMENTED',
      investigationNotes: 'Ajustes diretos até €20,000 (ou €75,000 para consultas prévias) podem ser contratados com rapidez pelas Câmaras Municipais sem necessidade de concurso internacional moroso.'
    },
    commercialPotential: {
      estimatedValue: '€18,500 – €74,000 por contrato de ajuste direto municipal',
      revenueModel: 'Fixed Contract',
      scalability: 'Medium',
      annualRunRatePotential: '€75,000 – €220,000 (3 a 5 municípios contratados)'
    },
    timeToFirstRevenue: {
      estimate: '6 a 10 semanas',
      daysToFirstCash: 45,
      initialMilestone: 'Adjudicação e publicação do contrato no portal Base.gov.pt com emissão da primeira fatura.'
    },
    requiredSkillsAndResources: [
      'Conformidade estrita com RGPD e alojamento de dados na UE (datacenter europeu)',
      'Certidão de não-dívida às Finanças e Segurança Social',
      'Capacidade de elaboração de cadernos de encargos técnicos'
    ],
    initialInvestment: {
      amount: '€0 (Zero investimento financeiro)',
      capitalIntensity: 'Zero / Sweat Equity',
      breakdown: 'Apenas emissão das certidões e formalização da resposta à consulta municipal.'
    },
    mainRisks: [
      {
        risk: 'Prazos de pagamento do Estado (60 a 90 dias)',
        severity: 'Medium',
        mitigation: 'Fatoring bancário ou cláusula de 50% de entrada no auto de início dos trabalhos.'
      }
    ],
    score: {
      total: 83,
      breakdown: {
        revenuePotential: 21,
        timeToFirstRevenue: 15,
        marketDemand: 17,
        implementationFeasibility: 13,
        competitionAndDifferentiation: 8,
        initialInvestmentRequired: 9
      },
      rationales: {
        revenuePotential: 'Contratos públicos têm garantia integral de pagamento pelo erário público.',
        timeToRevenue: 'Ajuste direto fecha muito mais rápido do que concursos abertos.',
        marketDemand: 'Municípios têm verbas orçamentais específicas para modernização digital dos cidadãos.',
        feasibility: 'Tecnologia de pesquisa semântica sobre regulamentos municipais e atas é standard.',
        competition: 'Grandes consultoras (Deloitte/Accenture) não competem em contratos municipais inferiores a €100k.',
        investment: 'Zero investimento de capital.'
      }
    },
    recommendedNextAction: {
      action: 'Configurar alerta automatizado no portal Base.gov.pt para termos "inteligência artificial", "chatbot" e "transcrição"; contactar os gabinetes de modernização de 5 municípios médios com proposta de ajuste direto.',
      actionType: 'RFP Tender Bid',
      targetContactRole: 'Chefe de Gabinete de Modernização Administrativa / Vereador de TI',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Solução Chave-na-Mão: Atendimento ao Cidadão 24/7 com IA Soberana e RGPD',
      draftOutreachBody: 'Exmo(a) Senhor(a) Vereador(a),\n\nCom o objetivo de apoiar a modernização dos serviços aos munícipes e reduzir em 60% as chamadas na central de atendimento, desenvolvemos uma solução de assistente de inteligência artificial soberana, alojada em servidores europeus e em total conformidade com o RGPD.\n\nA solução pode ser implementada sob consulta simplificada em menos de 30 dias.\n\nGostaríamos de solicitar uma reunião institucional de 15 minutos para apresentar os resultados obtidos.\n\nCom os melhores cumprimentos,\n[Assinatura]'
    },
    priorityTier: 'TOP_10',
    createdAt: '2026-11-05T09:30:00Z',
    lastUpdated: '2026-11-06T07:10:00Z'
  },
  {
    id: 'opp-innovate-uk-bridge-ai',
    name: 'Innovate UK: BridgeAI Commercial Solutions Deployment Vouchers',
    country: 'United Kingdom',
    reach: 'United Kingdom',
    organization: {
      name: 'UK Research and Innovation (UKRI) & Innovate UK',
      type: 'Public Body / Gov',
      website: 'https://www.ukri.org/councils/innovate-uk/',
      verifiedDomain: true,
    },
    category: 'Commercial Partnerships',
    description:
      'Programa BridgeAI do governo britânico com orçamento superior a £100M focado em acelerar a adoção de IA comercial nos setores de construção, agricultura, transportes e indústrias criativas. Financiamento com vouchers de até £50k a £150k para projetos colaborativos de integração de soluções de IA.',
    evidence: {
      sources: [
        {
          title: 'Innovate UK BridgeAI Initiative Overview',
          url: 'https://www.ukri.org/what-we-do/our-main-funds-and-areas-of-support/browse-our-areas-of-support/bridgeai/',
          snippet: 'Incentivos diretos a parcerias entre fornecedores de soluções de IA e empresas britânicas tradicionais.',
          publishedDate: '2024-Q3'
        },
        {
          title: 'Digital Catapult UK - AI Adoption Acceleration Cohort',
          url: 'https://www.digicatapult.org.uk',
          snippet: 'Apoio técnico e financiamento de provas de conceito para PMEs britânicas que integrem agentes autónomos.',
          publishedDate: '2024-Q4'
        }
      ],
      verificationStatus: 'PUBLIC_CALL_DOCUMENTED',
      investigationNotes: 'Empresas do Reino Unido têm alta propensão a contratar serviços internacionais especializados via contratos B2B em GBP, beneficiando da diferença cambial e proximidade geográfica.'
    },
    commercialPotential: {
      estimatedValue: '£40,000 – £120,000 por parceria de integração',
      revenueModel: 'Milestone Payment',
      scalability: 'High',
      annualRunRatePotential: '£120,000 – £300,000'
    },
    timeToFirstRevenue: {
      estimate: '6 a 9 semanas',
      daysToFirstCash: 45,
      initialMilestone: 'Formalização de consórcio ou subcontratação com entidade lead britânica para submissão do voucher.'
    },
    requiredSkillsAndResources: [
      'Arquitetura de soluções em nuvem (AWS / GCP / Azure)',
      'Experiência em verticais prioritárias (logística, agritech ou creative ops)',
      'Empresa registada ou parceiro registado no Reino Unido / UE'
    ],
    initialInvestment: {
      amount: '£0 (Custos de candidatura e alinhamento)',
      capitalIntensity: 'Zero / Sweat Equity',
      breakdown: 'Apenas esforço de prospecção comercial e desenho da proposta.'
    },
    mainRisks: [
      {
        risk: 'Exigência de entidade britânica para liderança formal da candidatura',
        severity: 'Medium',
        mitigation: 'Atuar como subcontratado técnico ou fornecedor de tecnologia nomeado na proposta da empresa britânica.'
      }
    ],
    score: {
      total: 86,
      breakdown: {
        revenuePotential: 23,
        timeToFirstRevenue: 16,
        marketDemand: 18,
        implementationFeasibility: 13,
        competitionAndDifferentiation: 7,
        initialInvestmentRequired: 9
      },
      rationales: {
        revenuePotential: 'Contratos em libras esterlinas (GBP) oferecem margem e conversão cambial muito favorável.',
        timeToRevenue: 'Vouchers BridgeAI têm janelas de decisão rápidas de 30 dias.',
        marketDemand: 'O governo britânico colocou a IA no centro do crescimento da produtividade nacional.',
        feasibility: 'Acesso fácil a ferramentas e ambientes de teste cloud standard.',
        competition: 'Consultoras locais em Londres cobram honorários exorbitantes, tornando a nossa proposta altamente competitiva.',
        investment: 'Zero investimento em equipamento.'
      }
    },
    recommendedNextAction: {
      action: 'Identificar 5 fornecedores de logística e construção em Londres aderentes ao BridgeAI e apresentar proposta de integração de um agente de triagem documental pré-fabricado.',
      actionType: 'Strategic Partnership Inquiry',
      targetContactRole: 'Innovation Lead / Head of Supply Chain UK',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'UK BridgeAI Deployment: Fast-track Automated Document Processing',
      draftOutreachBody: 'Dear [Name],\n\nWe understand your organisation is actively pursuing the Innovate UK BridgeAI vouchers to upgrade supply chain operations.\n\nWe provide an enterprise-ready autonomous document intake agent that extracts compliance data and flags logistics anomalies with zero human overhead. We can serve as your designated delivery partner for the upcoming voucher deadline.\n\nCould we arrange a 15-minute briefing this week to review our technical capability deck?\n\nKind regards,\n[Signature]'
    },
    priorityTier: 'TOP_10',
    createdAt: '2026-11-05T14:00:00Z',
    lastUpdated: '2026-11-06T07:20:00Z'
  },
  {
    id: 'opp-canada-scale-ai',
    name: 'Scale AI Supercluster & CanExport: Financiamento de IA Industrial',
    country: 'Canada',
    reach: 'Canada',
    organization: {
      name: 'Scale AI Canada & Innovation, Science and Economic Development (ISED)',
      type: 'Consortium',
      website: 'https://www.scaleai.ca',
      verifiedDomain: true,
    },
    category: 'AI Implementation Services',
    description:
      'O supercluster canadiano Scale AI comparticipa até 50% dos custos totais de projetos de adoção de inteligência artificial em cadeias de abastecimento industriais e retalho. Oportunidade para fornecer módulos de previsão de stocks orientados por agentes e orquestração de entregas para médias empresas canadianas.',
    evidence: {
      sources: [
        {
          title: 'Scale AI Project Funding Guide',
          url: 'https://www.scaleai.ca/projects/apply/',
          snippet: 'Comparticipação não-reembolsável de até 50% para despesas elegíveis de consultoria técnica e implementação de IA em solo canadiano.',
          publishedDate: '2024-Q3'
        },
        {
          title: 'ISED Canada Artificial Intelligence Sector Strategy',
          url: 'https://ised-isde.canada.ca',
          snippet: 'Investimentos governamentais de mais de $2.4B CAD no orçamento federal para soberania e capacidade de computação em IA.',
          publishedDate: '2024-Q4'
        }
      ],
      verificationStatus: 'PUBLIC_CALL_DOCUMENTED',
      investigationNotes: 'O subsídio do governo canadiano reduz a resistência ao preço em 50%, tornando a proposta irresistível para diretores de operações industriais.'
    },
    commercialPotential: {
      estimatedValue: '$60,000 – $150,000 CAD por projeto de implementação',
      revenueModel: 'Fixed Contract',
      scalability: 'Medium',
      annualRunRatePotential: '$120,000 – $300,000 CAD'
    },
    timeToFirstRevenue: {
      estimate: '7 a 11 semanas',
      daysToFirstCash: 50,
      initialMilestone: 'Validação da elegibilidade do projeto com o investment director da Scale AI.'
    },
    requiredSkillsAndResources: [
      'Modelagem preditiva e agentes integrados com ERPs industriais (NetSuite / Dynamics 365)',
      'Inglês corporativo para interlocução com equipas de Montreal, Toronto e Vancouver',
      'Elaboração de KPIs mensuráveis de eficiência logística'
    ],
    initialInvestment: {
      amount: '$0 (Zero)',
      capitalIntensity: 'Zero / Sweat Equity',
      breakdown: 'Apenas preparação dos blueprints de arquitetura e reuniões com potenciais clientes.'
    },
    mainRisks: [
      {
        risk: 'Fuso horário canadiano do Pacífico (Vancouver) com 8 horas de diferença',
        severity: 'Low',
        mitigation: 'Focar clientes no fuso da Costa Leste (Toronto e Montreal) que mantêm 4 a 5 horas de sobreposição com Lisboa.'
      }
    ],
    score: {
      total: 85,
      breakdown: {
        revenuePotential: 22,
        timeToFirstRevenue: 15,
        marketDemand: 18,
        implementationFeasibility: 13,
        competitionAndDifferentiation: 8,
        initialInvestmentRequired: 9
      },
      rationales: {
        revenuePotential: 'Tickets médios saudáveis apoiados por subsídio público garantido de 50%.',
        timeToRevenue: 'Aprovação contínua sem longos períodos de blackout.',
        marketDemand: 'O Canadá tem carência de integradores de IA de ponta para o setor industrial de retalho.',
        feasibility: 'Arquiteturas padrão com conectores de base de dados já testados.',
        competition: 'Menos concorrência do que no mercado ultrassaturado de Silicon Valley.',
        investment: 'Zero investimento em ativos físicos.'
      }
    },
    recommendedNextAction: {
      action: 'Apresentar proposta de otimização de inventário a 3 distribuidores atacadistas da província do Ontário/Quebec elegíveis para o Scale AI com garantia de 50% de financiamento.',
      actionType: 'Direct Commercial Pitch',
      targetContactRole: 'VP of Supply Chain / Operations Director (Canada)',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Scale AI Funded: Cut supply chain stockouts with autonomous inventory agents',
      draftOutreachBody: 'Dear [Name],\n\nCanadian wholesale operators are currently leveraging Scale AI funding to reimburse 50% of autonomous inventory AI implementations.\n\nWe provide an intelligent forecasting agent that syncs with your ERP to eliminate stockouts while reducing holding costs by an average of 14%.\n\nCould we share a 5-minute case study highlighting how a similar deployment qualifies for this non-dilutive co-investment?\n\nBest regards,\n[Signature]'
    },
    priorityTier: 'TOP_10',
    createdAt: '2026-11-05T16:45:00Z',
    lastUpdated: '2026-11-06T07:05:00Z'
  },
  {
    id: 'opp-fintech-aml-dora-portugal',
    name: 'Compliance Automatizado AML/KYC & Auditoria DORA para Sociedades Gestoras e Fundos',
    country: 'Portugal',
    reach: 'Portugal',
    organization: {
      name: 'Sociedades Gestoras de Fundos (SCR), Consultoras Financeiras & Fintechs sob Banco de Portugal e CMVM',
      type: 'Enterprise',
      website: 'https://www.bportugal.pt',
      verifiedDomain: true,
    },
    category: 'Commercial Partnerships',
    description:
      'Soluções de agentes de IA para triagem contínua de Prevenção de Branqueamento de Capitais (AML/CFT), listas de sanções e auditoria de resiliência operacional digital (DORA - Digital Operational Resilience Act). A regulação do Banco de Portugal e CMVM exige verificações exaustivas que atualmente consomem centenas de horas de analistas jurídicos seniores.',
    evidence: {
      sources: [
        {
          title: 'Regulamento DORA (UE 2022/2554) - Banco de Portugal & ASF',
          url: 'https://www.bportugal.pt/comunicado/entrada-em-vigor-do-regulamento-dora',
          snippet: 'Obrigatoriedade de resiliência e gestão de riscos em TI para todas as entidades financeiras na Europa.',
          publishedDate: '2024-Q4'
        },
        {
          title: 'Orientações CMVM sobre Branqueamento de Capitais em Investimentos Imobiliários e Fundos',
          url: 'https://www.cmvm.pt',
          snippet: 'Reforço de diligências de compliance para investidores internacionais em fundos de capital de risco portugueses.',
          publishedDate: '2024-Q3'
        }
      ],
      verificationStatus: 'VERIFIED_REAL_ENTITY',
      investigationNotes: 'Multas por falhas de compliance AML são pesadas. Os administradores têm responsabilidade pessoal, pelo que pagam prontamente por sistemas determinísticos de triagem automatizada com trilha de auditoria completa.'
    },
    commercialPotential: {
      estimatedValue: 'Retainer de €1,500 – €3,500 / mês por entidade financeira',
      revenueModel: 'Monthly Retainer',
      scalability: 'High',
      annualRunRatePotential: '€90,000 – €252,000 (com 5 a 6 sociedades de investimento clientes)'
    },
    timeToFirstRevenue: {
      estimate: '3 a 6 semanas',
      daysToFirstCash: 28,
      initialMilestone: 'Assinatura do primeiro contrato de compliance screening com uma sociedade de capital de risco ou family office em Lisboa.'
    },
    requiredSkillsAndResources: [
      'Conexão a bases de dados públicas de Sanctions Lists (OFAC, UE, PEP - Pessoas Politicamente Expostas)',
      'Geração de relatórios de auditoria em PDF com carimbo temporal e hash de validação',
      'Compreensão dos requisitos de due diligence do Banco de Portugal'
    ],
    initialInvestment: {
      amount: '€200 (subscrição de APIs de screening e infraestrutura encriptada)',
      capitalIntensity: 'Ultra Low (<€500)',
      breakdown: 'Custo de API de dados de sanções recuperado no primeiro setup fee do cliente.'
    },
    mainRisks: [
      {
        risk: 'Responsabilidade civil em caso de falso negativo não detetado',
        severity: 'Medium',
        mitigation: 'O agente atua como "Copiloto de Triagem", destacando anomalias com referências documentais; a aprovação final é sempre assinada pelo Compliance Officer humano.'
      }
    ],
    score: {
      total: 89,
      breakdown: {
        revenuePotential: 23,
        timeToFirstRevenue: 18,
        marketDemand: 19,
        implementationFeasibility: 13,
        competitionAndDifferentiation: 8,
        initialInvestmentRequired: 8
      },
      rationales: {
        revenuePotential: 'Contratos mensais de alto valor com churn próximo de zero.',
        timeToRevenue: 'Decisores de compliance querem resolver a pressão regulatória imediatamente.',
        marketDemand: 'Obrigatoriedade legal severa; não é uma compra discricionária.',
        feasibility: 'APIs existentes e agentes de extração documental cobrem o caso de uso.',
        competition: 'Poucas soluções ágeis no mercado português adaptadas à lei nacional.',
        investment: 'Custos de infraestrutura mínimos.'
      }
    },
    recommendedNextAction: {
      action: 'Preparar um relatório de demonstração de auditoria AML com dados fictícios de sanções e apresentar diretamente ao Chief Compliance Officer de 8 Sociedades de Capital de Risco na Avenida da Liberdade (Lisboa).',
      actionType: 'Direct Commercial Pitch',
      targetContactRole: 'Chief Compliance Officer / Head of Legal (SCR / Fundos)',
      humanApprovalNeeded: true,
      draftOutreachSubject: 'Automação de Triagem AML/KYC & Trilha DORA para o vosso Fundo',
      draftOutreachBody: 'Exmo(a) Dr(a) Compliance Officer,\n\nCom as novas exigências do regulamento DORA e diretivas do Banco de Portugal, a verificação manual de investidores internacionais e beneficiários efetivos tornou-se num gargalo crítico.\n\nDesenvolvemos um agente de triagem automatizada que consulta em segundos mais de 100 bases de dados de sanções e PEP, gerando o dossier de conformidade em PDF com zero risco de esquecimento.\n\nPreparámos um exemplo de relatório para vossa análise técnica. Posso remeter por esta via?\n\nCom os melhores cumprimentos,\n[Assinatura]'
    },
    priorityTier: 'TOP_10',
    createdAt: '2026-11-05T18:00:00Z',
    lastUpdated: '2026-11-06T07:55:00Z'
  }
];
