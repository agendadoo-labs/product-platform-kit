---
id: "DOC-0A28D1EE3BC6B0"
type: "guide"
scope: "Product Platform Kit"
document_role: "procedure"
purpose: "Orientar APOS — recuperação progressiva Hot / Warm / Cold."
read_when: ["Executar ou verificar o procedimento: APOS — recuperação progressiva Hot / Warm / Cold"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
graph_scope: "vigente"
---

# Product Platform Kit — Guia — Recuperação progressiva de memória

Orientar APOS — recuperação progressiva Hot / Warm / Cold.

Status: active. Versão: layered-memory-1. Validado em: 2026-10-01.
Escopo: recuperação local em repositório; catálogo inicial parcial.

## Contrato operacional

1. Hot contém o contexto governante do Intent: kernel, modelo ativo, contratos, estado e decisão. O compilador preserva a seleção obrigatória existente.
2. Warm contém metadados de conhecimento relacionado, inclusive aprendizados e histórico resumido. Correspondência lexical ou ID explícito recupera a fonte integral.
3. Cold contém fontes históricas detalhadas. A recuperação exige relevância ou ID, mais trigger e reason registrados no Intent. Triggers aceitos: audit, incident, regression, historical_question, insufficient_evidence.
4. Temperatura não concede permissão nem autoridade. Uma fonte histórica continua histórica. Catálogo do piloto aceita apenas material interno sanitizado; não fornece ACL multiusuário.
5. O agente avalia a suficiência. Sem correspondência lexical, com hash defasado ou dependência obrigatória ausente, o compilador sinaliza retrieval_incomplete.
6. Orçamento excedido interrompe a compilação sem truncar as fontes. A estimativa bytes/4 é heurística; contabilização exata depende do tokenizer/modelo.
7. Sem chamadas externas para indexar, buscar ou compilar. Fontes continuam no lugar original. Nenhuma política de retenção é alterada.
8. Repetir consulta com mesmos inputs produz mesmo fingerprint de recuperação. Isso não garante resposta idêntica da LLM nem idempotência de efeitos externos.

## Uso

No Intent:

```json
{
  "context_request": {
    "query": "confirmação token",
    "trigger": "incident",
    "reason": "Investigar recorrência da falha de confirmação",
    "required_source_ids": []
  }
}
```

Rodar o compilador com --intent e --decision. --query permite substituir a consulta. Warm não exige trigger. Cold pode ser solicitado pelo próprio agente dentro do escopo de leitura autorizado. include_historical=true é compatibilidade legada, sem preferência para tarefas novas.

O catálogo em .apos/context/memory-catalog.json usa id, path, tier, title, summary, domains, authority e sensitivity; source_sha256 permite detectar metadados desatualizados. Datas valid_from/valid_until são verificadas na data UTC da avaliação; fontes current vencidas, futuras ou com intervalo inválido são adiadas com retrieval_incomplete. Fontes historical permanecem históricas e podem ser consultadas para auditoria. Hash divergente adia a fonte e exige reindexação. Revisar supersessões ao editar uma decisão. O catálogo vazio do starter é deliberado: o consumidor cadastra suas fontes.

## Limites e evolução

Não há embeddings, BM25, grafo inferido, resumo gerado, confiança calibrada nem indexação completa. A busca é lexical em metadados revisados. Nenhum ganho de tokens ou de acurácia foi comprovado por comparação real ainda. O ContextManifest lista fontes e metadados; não injeta automaticamente conteúdo na conversa do agente.

Para crescer: criar corpus de questões reais com fontes esperadas; comparar baseline lexical, BM25, híbrida e reranking; só então admitir custos/serviços. Testar recuperação de decisões substituídas, atualização, conflitos, ausência de resposta e isolamento entre projetos. Fontes obrigatórias nunca podem desaparecer para melhorar números de economia.

## Estado e histórico

O runbook continua contendo a operação vigente. O histórico fica separado e pesquisável. Esta extensão substitui a regra binária de histórico sempre excluído: Warm relacionado pode ser recuperado automaticamente; Cold recebe justificativa. Resumos indicam os originais e não apagam contexto histórico.

