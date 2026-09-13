# Adoção em outro projeto

O objetivo é iniciar com o menor conjunto suficiente, não copiar toda a plataforma.

## Projeto novo: caminho simples

1. Descreva o público, o problema e o primeiro resultado verificável.
2. Copie `templates/apos/`, execute o bootstrap e registre o primeiro Intent.
3. Declare as propriedades do negócio: move dinheiro, possui organizações, coleta dados pessoais, usa conteúdo, localização ou bens físicos.
4. Consulte o [mapa de capacidades](capabilities/DIGITAL-PRODUCT-CAPABILITY-MAP-v2.md) e ative somente o necessário.
5. Escolha módulos pela [auditoria de cobertura](capabilities/CAPABILITY-COVERAGE-AUDIT.md): `validated_module` pode ser adotado; os demais exigem validação adicional.
6. Prototipe e valide a experiência antes da implementação completa.
7. Configure local, teste, preview e produção com credenciais e dados separados.
8. Adote identidade, privacidade, telemetria, observabilidade e admin mínimo de acordo com o risco.
9. Execute verificações e registre Evidence antes de promover qualquer ambiente.
10. Publique, acompanhe valor/custo/falhas e devolva ao kit somente padrões realmente reutilizáveis.

## Stack de referência opcional

As receitas atuais com Supabase, Resend, Vercel e GoDaddy aceleram um primeiro caso, mas não são requisitos do kit. Se essa stack for escolhida:

1. siga `SETUP-PLAYBOOK.md`;
2. aplique as migrations na ordem numérica após revisão;
3. valide RLS com duas contas comuns e uma administrativa;
4. mantenha segredos somente no ambiente server-side;
5. adapte o documento de finalidade, base legal e retenção ao produto.

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
- [ ] modelo operacional APOS aponta para uma versão explícita e preserva eventual configuração anterior.
- [ ] contratos sem verificador estão marcados como `specified`, nunca como aprovados.
- [ ] capacidades anunciadas como prontas possuem claim e evidência no catálogo.
