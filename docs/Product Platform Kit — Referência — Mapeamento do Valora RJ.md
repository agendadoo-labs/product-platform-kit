---
id: "DOC-0A204D2F150D89"
type: "reference"
scope: "Product Platform Kit"
document_role: "reference"
purpose: "Contextualizar Mapeamento do Valora RJ."
read_when: ["Consultar contexto complementar: Mapeamento do Valora RJ"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
---
# Mapeamento do Valora RJ

Contextualizar Mapeamento do Valora RJ.

O Valora RJ nasceu antes da extração deste kit. Suas migrações de produção continuam imutáveis no repositório `agendadoo01/price-wizard`; não devemos reaplicar as migrações genéricas sobre esse banco.

| Capacidade do kit | Implementação atual no Valora RJ | Estratégia de evolução |
|---|---|---|
| `profiles` e `user_roles` | mesmas tabelas, com campos profissionais adicionais | preservar campos do produto |
| `platform_private.is_admin` | `private.is_admin` | manter compatibilidade no produto existente |
| `product_events` | `product_feature_events` e eventos específicos | convergir somente por migração revisada |
| `experiments` e atribuições | estrutura equivalente | portar correções futuras, sem recriar tabelas |
| retenção genérica | `private.purge_expired_product_data` | preservar retenções específicas de relatórios e solicitações |
| clientes TypeScript | módulos em `src/modules/telemetry` | adotar interfaces novas gradualmente |

## Regra de atualização

1. Marque uma versão estável do kit.
2. Compare a versão adotada com a versão nova.
3. Crie uma migração específica no Valora RJ para cada alteração de banco.
4. Teste em ambiente não produtivo e valide RLS, opt-out e painel administrativo.
5. Registre no Valora RJ a versão ou commit de referência do kit.

Esse modelo evita submódulos e cópia automática de SQL em produção, mantendo auditoria e rollback claros.
