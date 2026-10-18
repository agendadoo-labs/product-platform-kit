---
id: "KG-SDD-001"
type: "contract"
scope: "knowledge_governance"
document_role: "contract"
purpose: "Vincular requisitos a critérios de aceite, implementação, testes e evidências."
read_when: ["Adotar ou manter gestão de conhecimento e especificações"]
status: "active"
authority: "repository_contract"
tier: "warm"
updated: "2026-10-18"
graph_scope: "vigente"
---

# Conhecimento — Contrato — Especificações e evidências

Vincular requisitos a critérios de aceite, implementação, testes e evidências.

Cada requisito tem ID, specification, acceptance e status planned/implemented/verified. Antes de implementar, explicitar resultado observável, condições de erro, restrições e fora de escopo. Ambiguidade material requer decisão do responsável antes do código dependente.

Implemented exige arquivos de implementação e testes existentes. Verified exige evidência aprovada, revisão correspondente da especificação, comando, data, política de validade e artefatos com hash. Executor e verificador devem ser distintos; identidades declaradas não constituem autenticação, devendo ser vinculadas pelo CI ou revisão humana.

O catálogo verifica estrutura e vínculos, não prova qualidade do teste ou correção semântica. A aceitação de negócio requer revisão independente. Um teste gerado pelo mesmo agente pode verificar comportamento, mas não certifica adoção empresarial.

Git indica estado publicado; deploy e operação exigem evidência de ambiente. Alteração da especificação invalida evidência da revisão anterior. ProductState só declara outcomes sustentados; manter o Intent aberto para avaliação e adoção pendentes.
