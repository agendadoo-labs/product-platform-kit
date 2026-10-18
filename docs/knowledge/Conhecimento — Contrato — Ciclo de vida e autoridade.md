---
id: "KG-LIFECYCLE-001"
type: "contract"
scope: "knowledge_governance"
document_role: "contract"
purpose: "Separar navegação, aprovação, origem e evidência operacional."
read_when: ["Adotar ou manter gestão de conhecimento e especificações"]
status: "active"
authority: "repository_contract"
tier: "warm"
updated: "2026-10-18"
graph_scope: "vigente"
---

# Conhecimento — Contrato — Ciclo de vida e autoridade

Separar navegação, aprovação, origem e evidência operacional.

Cada documento cadastrado tem ID estável, revisão, path, hash, owner, purpose, read_when, classification, lifecycle e graph_scope. O catálogo é autoridade da classificação dentro de seu escopo; frontmatter, quando declara graph_scope, deve concordar.

Lifecycle: draft → approved → superseded ou retired. Aprovação requer responsável designado pelo consumidor; superseded exige sucessor identificado. Vigente requer approved e ausência de substituição. Histórico preserva conteúdo; o filtro visual não concede acesso nem autoridade.

Relações depends_on fixam ID e revisão. Alterar revisão invalida dependentes até revisão explícita. Ciclos são rejeitados. Alteração do conteúdo exige novo hash, análise de impacto e revisão; atualizar hash sozinho não constitui aprovação.

Fontes externas registram commit, observed_commit, observed_on e max_age_days definidos por risco. A checagem offline não consulta o remoto. Consulta remota falha deve manter a última observação e indicar indisponibilidade; não renovar datas. Identidade do observador e prova da consulta devem ser retidas pelo integrador.

Classificação public/internal/restricted é declaração. Controle de acesso deve ser aplicado pelo repositório, conector e recuperação; este validador não implementa ACL. Mudança de permissão não se resolve com tags.

Exceções exigem Decision com escopo, responsável, motivo, vencimento e compensação; o validador inicial não possui bypass. Revisões antigas e relatórios de teste não são reescritos.
