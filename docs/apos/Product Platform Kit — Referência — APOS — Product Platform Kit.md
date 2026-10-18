---
title: "APOS — Manifesto e implementação no Product Platform Kit"
date: "2026-09-05"
tags: ""
status: "v0.1 local validada; publicação pendente"
repository: "https://github.com/agendadoo-labs/product-platform-kit"
id: "DOC-FB68E8445E77E9"
type: "reference"
scope: "Product Platform Kit"
document_role: "reference"
purpose: "Contextualizar APOS — Product Platform Kit."
read_when: ["Consultar contexto complementar: APOS — Product Platform Kit"]
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# APOS — Product Platform Kit

Contextualizar APOS — Product Platform Kit.

## Contexto e intenção de Leo

Leo propôs repensar como builders desenvolvem produtos digitais trabalhando diretamente com agentes. A empresa está automatizando cards no Jira e documentação, mas sua hipótese é que um time agêntico não deveria depender do mesmo modelo de coordenação concebido para pessoas.

O objetivo declarado é viabilizar times escaláveis de **uma pessoa + agentes**, considerando produto, design, arquitetura de software, SRE e dados. Leo aprovou a direção do manifesto e pediu sua evolução para uma especificação executável e implementação inicial no Product Platform Kit.

O nome **Agentic Product Operating System (APOS)** e a organização conceitual abaixo foram propostos pelo assistente e acolhidos como direção de trabalho. São uma tese em desenvolvimento, não resultados empíricos sobre a eficácia de organizações agênticas.

## Tese central

Trocar a gestão de tarefas pela gestão de **intenção, contratos, estado, decisões e evidências**. A decomposição em tarefas pode existir durante a execução; o conhecimento produzido deve persistir.

> Não automatizar indefinidamente a burocracia criada para coordenar execução humana. Investigar quais mecanismos deixam de ser necessários quando agentes participam da organização.

O builder concentra sua atenção em governar limites, julgar trade-offs e explorar problemas. Capacidades são compostas conforme a intenção, sem exigir um organograma fixo de agentes que replique cargos humanos.

## Princípios do manifesto

- Intenção acima de tarefas; outcomes acima de volume de entregas.
- Conhecimento acima de backlog; contratos como limites de autonomia.
- Evidências como critério de progresso.
- Capacidades compostas conforme o problema.
- Autonomia proporcional a impacto, incerteza e reversibilidade.
- Aprendizado contínuo e memória institucional explícita.
- Julgamento humano concentrado nas decisões que o exigem.
- Autonomia segura como objetivo, sem confundi-la com automação máxima.

A condição conceitual de conclusão é:

**Intenção satisfeita ∧ contratos respeitados ∧ evidência suficiente.**

O manifesto deve permanecer como camada filosófica, separado dos detalhes de implementação.

## Contexto do kit existente

O repositório correto é [agendadoo-labs/product-platform-kit](https://github.com/agendadoo-labs/product-platform-kit), identificado a partir do workspace da conversa **Criar consultor de preço imobiliário**.

No momento desta implementação, o kit estava na versão **0.2.0**, com infraestrutura reutilizável baseada em Supabase: perfis e RLS, telemetria, experimentos A/B, retenção, design system, starter de agentes e `map-core`.

APOS **v0.1** é a versão da nova camada experimental, independente da versão do kit. Regras e dados específicos de produtos consumidores continuam em seus próprios repositórios.

A leitura da conversa citada retornou turnos sem suas mensagens. Foi possível consultar os arquivos do workspace, mas não recuperar todo o histórico; esta nota não pretende representar decisões que só existam naquela conversa.

## Modelo de domínio implementado

| Entidade | Responsabilidade |
| --- | --- |
| Intent | Problema, público, resultado esperado, contratos, capacidade solicitada e classificação de risco. |
| Contract | Restrição explícita de produto, design, engenharia, dados ou operação, ligada a um verificador permitido. |
| Decision | Decisão de permitir ou escalar, com justificativa, alternativas e vínculo às entradas da execução. |
| AgentRun | Registro de uma tentativa, com capacidade, estado terminal e revisão inicial do produto. |
| Evidence | Observação do verificador ligada à intenção, execução, contrato e digest do artefato. Inclui resultados negativos. |
| ProductState | Revisão do produto, intenções satisfeitas, evidências de suporte e digest do artefato publicado. |

Os seis schemas JSON estão em `packages/apos/schemas`. A implementação usa Python e SQLite locais, sem dependências externas de execução.

## Governança e reversibilidade

A implementação permite execução automática somente para a capacidade local conhecida, com **baixo impacto, baixa incerteza e ação reversível**.

Ações compensáveis, irreversíveis, de alto impacto, de alta incerteza ou capacidades desconhecidas são escaladas sem chamar o executor. Contratos incompletos ou entradas inválidas são rejeitados.

Não há um campo de aprovação que contorne a política. Aprovação humana autenticada e retomada de execução ainda não estão implementadas.

A reversibilidade deste corte vem de construir um candidato ainda não publicado: se a verificação falha, o estado anterior permanece. Snapshots anteriores são preservados, mas ainda não existe um comando de restauração histórica como nova revisão.

## Primeiro experimento: o kit verifica seu próprio catálogo

**Intenção:** permitir que builders inspecionem os seis domínios APOS em um catálogo legível e verificado.

Fluxo executado:

1. Validar intenção e resolver os cinco contratos obrigatórios.
2. Registrar a decisão de governança para as entradas exatas.
3. Produzir um candidato de catálogo com executor determinístico.
4. Verificar cobertura dos domínios, estrutura legível, estrutura básica dos schemas, unicidade e limite de tamanho.
5. Registrar as evidências de cada contrato.
6. Publicar o artefato e atualizar ProductState na mesma transação SQLite.

**Resultado observado:** os cinco contratos passaram; a revisão avançou de **0 para 1**. A exportação da execução está em `packages/apos/evidence/bootstrap`.

**Validação realizada:** 12 testes passaram, incluindo sucesso com rastreabilidade, falha de verificação, bloqueios de governança, entradas inválidas, idempotência, revisão desatualizada, persistência após reabertura, imutabilidade de registros e falha transacional sem publicação parcial. A verificação existente do kit também passou: 72 arquivos e quatro migrações verificados no momento da execução.

Isso demonstra um resultado técnico local. Não demonstra impacto comercial, adoção, acessibilidade completa ou confiabilidade em produção.

## Decisões de implementação

- **Experimento local primeiro:** validar governança e integridade antes de conectar modelos ou serviços externos.
- **Camada adicional ao kit:** preservar a infraestrutura já existente e permitir adoção independente.
- **Executor e verificador separados em funções:** sucesso não depende da autodeclaração do executor. Isolamento em processos e identidades independentes é evolução futura.
- **Estado e evidências transacionais:** SQLite é a fonte autoritativa; arquivos exportados são projeções para inspeção.
- **Dogfooding:** o kit mantém sua própria intenção, contratos, decisão e evidências de execução.

## Limites atuais

- Executor determinístico; ainda não há integração com agentes de IA.
- Nenhuma execução em produção, publicação ou integração externa pelo runtime.
- Validador cobre o perfil restrito de schemas usado pelo pacote, não todo JSON Schema.
- Texto livre de outcome não se transforma automaticamente em verificação: novas intenções exigem capacidades e verificadores apropriados.
- Não há sandbox para código Python arbitrário, aprovação autenticada, execução distribuída, limites de custo/tempo ou observação de métricas de produção.
- Imutabilidade é uma garantia da aplicação, não proteção contra o proprietário do banco.

## Estado da entrega

Alterações locais na branch **`feat/apos-v0.1`**, em cópia isolada do repositório. **Ainda não publicadas no GitHub** ao registrar a nota original. Este arquivo preserva esse contexto histórico; sua inclusão na branch publica a documentação e a base APOS juntas. O trabalho ativo da outra conversa foi preservado.

Arquivos principais:

- `docs/AGENTIC-PRODUCT-MANIFESTO.md` — manifesto original preservado.
- `docs/APOS-v0.1.md` — especificação executável e limites.
- `packages/apos/README.md` — como executar.
- `packages/apos/apos/core.py` — runtime.
- `packages/apos/product/` — constituição, intenção e contratos.
- `packages/apos/evidence/bootstrap/` — evidência da primeira execução.

Para reproduzir, dentro de `packages/apos`:

```sh
python3 -m unittest discover -s tests -v
python3 -m apos --export evidence/local
```

## Próximas evoluções propostas

1. Revisar e publicar a implementação inicial no repositório.
2. Versionar políticas e implementar aprovação humana vinculada ao plano e às entradas exatas.
3. Isolar adaptadores de agentes e impor limites de tempo, custo e permissões.
4. Conectar verificadores à telemetria e aos experimentos existentes no kit.
5. Evoluir da evidência técnica para resultados de produto medidos ao longo de uma janela de observação.

Essas evoluções são propostas, não entregas concluídas.

## Fontes e conexões

- Conversa [Proposta de Framework Agêntico](chatgpt-conversation://6a9cb783-d784-83e9-9468-e523ff43c9cf): origem da tese e manifesto.
- Tarefa **Implement APOS v0.1 vertical slice**: implementação, decisões e validação desta nota.
- Tarefa **Criar consultor de preço imobiliário**: localização do kit e contexto documental existente; histórico completo não recuperado.
- Conceitos relacionados: [especificação APOS](../APOS-v0.1.md), [APOS aplicado ao Valora](VALORA-OPERATING-MODE.md).
