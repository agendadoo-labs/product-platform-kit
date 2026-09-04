# Configuração de ambientes

## Separação obrigatória

| Ambiente | Banco | Domínio | Segredos |
|---|---|---|---|
| Desenvolvimento | projeto local ou dev | localhost | arquivo local ignorado |
| Homologação | projeto Supabase próprio | subdomínio de teste | cofre do provedor |
| Produção | projeto Supabase próprio | domínio público | cofre do provedor |

Nunca compartilhe o banco de produção com desenvolvimento ou preview.

## Frontend

Somente `VITE_SUPABASE_URL`, a chave publicável e a URL pública podem ser expostas. O navegador nunca recebe `service_role`, senha do banco, token administrativo ou chave do provedor de e-mail.

Use `.env.example` como contrato de configuração. Arquivos `.env`, `.env.local` e variantes locais são ignorados pelo Git.

## Servidor e CI

Use `.env.server.example` apenas como catálogo de nomes. Os valores reais devem ficar no cofre do Supabase, Vercel, GitHub Actions ou provedor equivalente.

Defina proteções de ambiente no CI para que produção exija revisão e para que pull requests não recebam segredos de produção.
