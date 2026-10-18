---
id: "DOC-E38B692EB76603"
type: "reference"
scope: "Product Platform Kit"
document_role: "reference"
purpose: "Contextualizar Migração operacional do Product Platform Kit para APOS."
read_when: ["Consultar contexto complementar: Migração operacional do Product Platform Kit para APOS"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# Migração operacional do Product Platform Kit para APOS

Contextualizar Migração operacional do Product Platform Kit para APOS.

## Outcome

O toolkit passa a governar seu próprio trabalho e novos repositórios consumidores por Intent, Contracts, Capabilities, Decision, AgentRun, Evidence e ProductState, preservando integralmente o starter anterior.

## Entregue nesta revisão

- modelo ativo versionado em `.apos/versions/product-platform-kit-apos-2.0.0/`;
- contratos genéricos, sem regras do Valora;
- Intent e Decision próprios da migração;
- starter reutilizável em `templates/apos/`;
- starter de papéis marcado como legado;
- roteamento econômico por capability e risco, não por cargo;
- tag `operating-model-v1-agent-starter` e hashes do estado anterior;
- checks estruturais, de escopo, segredos e restauração.

## Limite

O runtime em `packages/apos` continua sendo a referência executável v0.1 e mantém seu escopo bootstrap. A configuração operacional não amplia automaticamente o runtime nem prova contratos de consumidores.

## Próximos Intents possíveis

1. Generalizar verificadores de vínculo entre Intent, Contract, Run, Evidence e ProductState.
2. Adicionar aprovação autenticada e vinculada a revisão, sem bypass genérico.
3. Criar projeções documentais a partir do ledger comum.
4. Medir adoção do starter APOS antes de remover fisicamente `templates/agents/`.

## Rollback

O estado anterior está na tag `operating-model-v1-agent-starter`. Um retorno cria nova versão e Decision; não apaga a migração. A integridade dos arquivos arquivados é conferida pelo verificador operacional.
