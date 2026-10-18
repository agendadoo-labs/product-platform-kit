# Nomes e metadados de documentos

Convenção: `Escopo — Tipo — Assunto.md`. Preserve `README.md` e `AGENTS.md` nos repositórios; projeções em vaults podem ter nomes descritivos. IDs são estáveis mesmo quando o caminho muda. Migração exige mapa de caminhos, atualização de links, preservação de originais e verificação de reversão.

A finalidade aparece em `purpose` e em uma frase abaixo do título. `read_when` informa quando consultar o documento. Tipo, prioridade de leitura e autoridade são eixos diferentes; a seleção exige origem, estado, versão e validade aplicáveis.

```yaml
---
id: "PRODUCT-EXAMPLE-OVERVIEW"
type: "project"
scope: "Example Product"
document_role: "entrypoint"
purpose: "Orientar a entrada no produto e localizar suas fontes governantes."
read_when: ["Iniciar trabalho neste produto", "Identificar arquitetura e contratos"]
status: "active"
authority: "verified_project_sources"
tier: "hot"
updated: "2026-10-17"
---

# Example Product — Início — Visão do produto

Orientar a entrada no produto e localizar suas fontes governantes.
```

Campos comuns obrigatórios: `id`, `type`, `scope`, `document_role`, `purpose`, `read_when`, `status`, `authority`, `tier`, `updated`. `purpose` é texto não vazio; `read_when` é lista não vazia de textos não vazios; `scope` e `document_role` são textos. Datas usam ISO. O exemplo usa valores JSON em linhas únicas, um subconjunto YAML compatível com o validador local; consumidores que aceitam YAML completo devem declarar seu parser.

Papéis documentais: `entrypoint`, `current_state`, `contract`, `resume`, `architecture`, `dictionary`, `procedure`, `decision`, `evidence`, `plan`, `reference`, `checkpoint`. Nomes humanos correspondentes: Início, Estado, Contrato, Retomada, Arquitetura, Dicionário, Guia, Decisão, Evidência, Plano, Referência, Checkpoint.

Campos condicionais: repositório/caminho/commit para origem versionada; hash para snapshots; observação e validade para evidência; `requires` para dependências. `updated` não substitui data de verificação. Metadados documentais não concedem autoridade nem modificam contratos de execução.

Leitura: entrada curta do produto → estado/retomada e contratos necessários → fontes específicas da tarefa. Histórico e referências entram por necessidade explícita. Não ordenar relevância por nome de arquivo ou `tier` sozinho.

Ao gerar uma projeção, derive estes campos de um mapeamento explícito do consumidor; não preencher finalidade genérica sem revisar significado. Preserve snapshots publicados e atualize o gerador antes de gerar nova versão. A adoção deste esquema em um produto existente é uma mudança explícita, não migração automática de todos os documentos.
