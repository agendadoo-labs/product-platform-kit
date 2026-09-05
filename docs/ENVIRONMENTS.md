# Configuração de ambientes

## Separação obrigatória

| Ambiente | Banco | Domínio | Segredos |
|---|---|---|---|
| Desenvolvimento | projeto local ou dev | localhost | arquivo local ignorado |
| Homologação | projeto Supabase próprio | subdomínio de teste | cofre do provedor |
| Produção | projeto Supabase próprio | domínio público | cofre do provedor |

Nunca compartilhe o banco de produção com desenvolvimento ou preview. O fluxo completo e o checklist de promoção estão em [Padrão de ambiente de teste](TEST-ENVIRONMENT-STANDARD.md).

## Homologação por branch

Para mudanças desenvolvidas em pull requests, prefira Vercel Preview ligada a uma Supabase Preview Branch. As variáveis da Preview devem apontar apenas para essa branch de banco. Carregue um seed real minimizado e reproduzível, teste, obtenha aceite de Produto e só então faça merge para a branch protegida de produção.

## Frontend

Somente `VITE_SUPABASE_URL`, a chave publicável e a URL pública podem ser expostas. O navegador nunca recebe `service_role`, senha do banco, token administrativo ou chave do provedor de e-mail.

Use `.env.example` como contrato de configuração. Arquivos `.env`, `.env.local` e variantes locais são ignorados pelo Git.

## Servidor e CI

Use `.env.server.example` apenas como catálogo de nomes. Os valores reais devem ficar no cofre do Supabase, Vercel, GitHub Actions ou provedor equivalente.

Defina proteções de ambiente no CI para que produção exija revisão e para que pull requests não recebam segredos de produção.
