# Adoção em outro projeto

## Projeto novo

1. Crie um projeto Supabase e defina sua região e política de backups.
2. Copie a pasta `supabase/` e altere apenas o `project_id` local.
3. Aplique as migrações na ordem numérica.
4. Cadastre o primeiro administrador por uma operação privilegiada no servidor.
5. Copie `templates/web/` e adapte o import do cliente Supabase.
6. Configure os ambientes conforme `ENVIRONMENTS.md`.
7. Valide RLS com duas contas comuns e uma administrativa.

## Projeto existente

Não aplique as migrações sem revisão. Compare previamente:

- existência de `profiles`, `user_roles` e do tipo `app_role`;
- políticas RLS e grants existentes;
- nomes e assinaturas de RPCs;
- regras atuais de exclusão e retenção;
- eventos que já são coletados.

Prefira criar uma migração de compatibilidade no repositório consumidor. Não altere silenciosamente dados ou papéis já existentes.

## Versionamento

- use tags semânticas, por exemplo `v0.1.0`;
- cada projeto registra a versão adotada em sua documentação;
- correções são feitas primeiro neste kit e depois portadas por migração explícita;
- regras específicas permanecem no consumidor.

## Checklist de aceite

- [ ] nenhum segredo está em arquivo versionado;
- [ ] conta comum não lê dados de outra conta;
- [ ] conta comum não lê telemetria agregada;
- [ ] opt-out impede eventos no banco;
- [ ] experimento em `draft` retorna `control` e não cria atribuição;
- [ ] variante permanece estável entre sessões;
- [ ] expurgo foi testado em ambiente não produtivo;
- [ ] painel administrativo lê somente RPCs agregadas;
- [ ] documento de finalidade e base legal foi adaptado ao produto.
