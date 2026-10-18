---
id: "DOC-PRODUCT-PLATFORM-KIT-3"
type: "guide"
scope: "Product Platform Kit"
document_role: "procedure"
purpose: "Manter documentação e implementação consistentes, com fontes e retomada explícitas."
read_when: ["Criar ou atualizar documentação", "Encerrar uma entrega"]
status: "active"
authority: "user_authorized_project_convention"
tier: "hot"
updated: "2026-10-17"
---

# Product Platform Kit — Guia — Manutenção documental

Manter documentação e implementação consistentes, com fontes e retomada explícitas.

Leia o [guia APOS de manutenção](https://github.com/agendadoo-labs/product-platform-kit/blob/9c191fc3fccc01eeb288c56bcdcda711a5eeae7b/templates/apos/APOS-MAINTENANCE.md) e o [esquema de nomes e metadados](https://github.com/agendadoo-labs/product-platform-kit/blob/9c191fc3fccc01eeb288c56bcdcda711a5eeae7b/templates/apos/DOCUMENT-METADATA.md), fixados na revisão publicada do kit.

Comece pelo README e AGENTS deste projeto. Use o bootstrap APOS existente quando disponível; a adoção documental não instala runtime ou simula governança ausente. Consulte Contracts, decisões e evidências locais antes de implementar.

Nomes de notas: `Escopo — Tipo — Assunto.md`. README.md e AGENTS.md permanecem convencionais. `purpose` explica a finalidade e aparece também abaixo do título; `read_when` contém gatilhos de leitura. Origem, estado e validade governam elegibilidade, não o nome sozinho.

Edite fontes governantes antes de gerar projeções; preserve documentos gerados, snapshots e versões publicadas. Antes de renomear arquivos usados por scripts, compile um mapa de dependências e atualize os consumidores. Não modificar skills vendorizadas ou locks por manutenção documental.

Valide os pontos de entrada com `python3 scripts/verify_document_metadata.py`. A cobertura explícita está em `docs/documentation-manifest.json`; documentos fora dessa lista não são declarados migrados. Registre próxima ação, limites e rollback ao encerrar. Não confundir publicação no Git com implantação ou resultado funcional.

Adoção: Intent `I-PRODUCT-PLATFORM-KIT-DOCS-001`, finalidade de reduzir ambiguidade na leitura inicial; Decision `D-PRODUCT-PLATFORM-KIT-DOCS-001`, aplicar a convenção com autorização do usuário e preservar caminhos convencionais. Evidence: verificação estrutural dos arquivos declarados, sem testes de runtime nesta alteração documental. Reversão: reverter o commit de adoção; sem migração de banco ou mudança de modelos.
