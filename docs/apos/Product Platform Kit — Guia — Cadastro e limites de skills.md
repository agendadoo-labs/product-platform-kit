---
id: "DOC-04CA26F87CE0D3"
type: "guide"
scope: "Product Platform Kit"
document_role: "procedure"
purpose: "Orientar Como cadastrar skills no APOS."
read_when: ["Executar ou verificar o procedimento: Como cadastrar skills no APOS"]
status: "documented"
authority: "documented_source_not_runtime_verification"
tier: "warm"
updated: "2026-10-18"
graph_scope: "vigente"
---

# Product Platform Kit — Guia — Cadastro e limites de skills

Orientar Como cadastrar skills no APOS.

Guia único para Product Platform Kit e produtos consumidores, incluindo o Valora. Base: modelos ativos APOS v0.2 consultados em 15/09/2026. A versão vigente sempre vem de `.apos/active-model.json`, não do nome citado neste documento.

## O que está sendo cadastrado

Uma **skill** é um procedimento reutilizável (`SKILL.md`, referências e scripts). Uma **capability operacional** é uma ação que o modelo APOS consegue compor, como verificar um artefato. Uma **capability de produto** descreve o que um produto pode oferecer. Um **domínio epistêmico** organiza fontes e métodos de conhecimento. Essas quatro coisas se relacionam, mas têm registros diferentes.

Salvar um SKILL.md não concede autorização, não instala dependências e não conecta um provedor. O APOS atual não contém um comando universal `register-skill` nem transforma qualquer arquivo Markdown em execução automática. O runtime experimental de `packages/apos` ainda limita sua execução à capability `build-domain-catalog`; não o use como prova de suporte a uma nova skill.

O catálogo `.apos/skills/registry.json` introduzido no Valora nesta entrega é um índice de adapters para uso assistido pelo agente. É uma convenção local verificável, não uma nova especificação universal do protocolo ou uma alteração das capabilities imutáveis do modelo.

## Onde salvar

| Artefato | Product Platform Kit | Valora / price-wizard |
|---|---|---|
| Procedimento específico do repositório | `skills/<nome>/SKILL.md` quando necessário | `skills/<nome>/SKILL.md` |
| Procedimento realmente neutro para consumidores | `templates/apos/skills/<nome>/SKILL.md` após avaliação de reutilização | Adotar em `skills/<nome>` com origem e versão |
| Índice assistido de skills | Criar apenas quando houver skill concreta e leitor/verificador | `.apos/skills/registry.json` |
| Capabilities operacionais | `<active.path>/capabilities.json` | `<active.path>/capabilities.json` |
| Ontologia/cobertura do produto | `capabilities/catalog.json` | Mapear ao catálogo do kit quando útil, sem copiar claims |
| Memória canônica | `.apos/intents`, `decisions`, `runs`, `evidence`, `state` | Mesmos tipos de registro |
| Fontes e recuperação de contexto | `.apos/context/context-profile.json` e `.apos/epistemic/registry.json` | Mesmos perfis |

As cores, vozes, campanhas e condições comerciais do Valora ficam no Valora. O kit recebe o método neutro. Não coloque dados de clientes, fontes proprietárias, credenciais, caminhos pessoais ou condições de uma promoção em templates genéricos.

## Passo a passo

### 1. Recuperar a base e vincular um Intent

No kit execute `npm run apos:bootstrap`; no Valora, `pnpm apos:bootstrap`. Se o gerenciador tentar instalar dependências desnecessárias, o script equivalente é `node scripts/bootstrap-apos-session.mjs`.

Leia modelo ativo, Constitution, ProductState, decisões e contratos aplicáveis. Relacione o pedido a um Intent existente ou crie um. Declare problema, população, outcome, restrições, proveniência e evidência necessária. Para uma mudança material, registre o Change Envelope: delta, superfícies/domínios afetados, invariantes, exclusões, compatibilidade, regressão e rollback. A cerimônia segue a pior dimensão de risco.

### 2. Escrever a skill

Use uma pasta com nome curto em minúsculas e hífens. O arquivo principal começa com:

```yaml
---
name: nome-da-skill
description: Resultado produzido e situações em que o procedimento deve ser utilizado.
---
```

No corpo, registre entradas, comportamento essencial, saídas, verificações e limites. Referências extensas ficam em `references/`; scripts repetitivos em `scripts/`; apenas recursos necessários à saída ficam em `assets/`. Não copie documentação genérica ou amarre os scripts ao computador do autor.

### 3. Mapear para capabilities existentes

Primeiro procure IDs em `<active.path>/capabilities.json`. Uma skill pode compor várias capabilities já existentes. No Valora, produção de mídia assistida pode usar `model-interaction`, `change-software`, `verify-artifact` e `publish-authorized-change`; esta última só se aplica à publicação expressamente solicitada. No kit, criação de orientação reutilizável pode usar `design-reusable-contract`, `change-package` e `verify-package`.

Se uma nova capability **operacional** for necessária, siga a governança de versões: crie nova versão do modelo, Decision com vínculo `supersedes`, atualize o ponteiro e validadores, preserve a versão anterior. Não edite retrospectivamente `.apos/versions/` publicado para acomodar uma skill.

Se a mudança for na **ontologia de produto**, examine `capabilities/catalog.json` do kit. Um `coverage_claim` precisa de evidência e nível real (`guidance_only`, `template_or_contract`, `reference_implementation` ou `validated_module`). Documentar uma skill não comprova cobertura de todo um domínio, como publicidade, aquisição ou liquidez.

### 4. Registrar e tornar recuperável

Um registro assistido deve conter: ID, versão da skill, caminho do SKILL.md, hash ou revisão verificável, owner, modo de execução, capabilities compostas, contratos aplicáveis, Intent/Decision, evidências, dependências e limitações. Use IDs reais existentes no repositório.

No Valora, consulte `.apos/skills/registry.json` e `scripts/check-skills.mjs`. O AGENTS.md aponta para esse índice; o Context Profile e o Epistemic Registry incluem as fontes da skill. Isso torna o procedimento recuperável em uma nova sessão. O verificador valida referências e hashes; não executa a skill automaticamente.

Em outro consumidor, adote a convenção só com um leitor e verificador proporcionais. Se criar domínio de contexto, mantenha Context Profile e Epistemic Registry coerentes. Não invente um domínio para cada profissão nem imponha subagentes.

### 5. Validar em um caso real

Valide metadados, caminhos e scripts. Execute uma tarefa representativa em saída isolada; observe o resultado separadamente da afirmação do executor. Verifique também invariantes relevantes: uma revisão pequena preserva o que não mudou; cache não reutiliza entrada errada; falha de provedor não vira sucesso; novas saídas não apagam versões anteriores.

Registre Evidence com verificador, resultado, data, artefato/revisão/hash e limites. Áudio decodificável não comprova pronúncia aprovada. Documento válido não comprova adoção. Quando faltar observação, mantenha a incerteza explícita. Consumo não observado é `unavailable`, nunca zero por conveniência.

### 6. Atualizar memória, revisar e publicar

Associe Evidence e AgentRun ao Intent e à Decision. ProductState projeta somente o estado sustentado: documentado, executado tecnicamente, aceito pelo usuário ou publicado são marcos distintos. Workstreams coordenam ownership e próximo checkpoint; não concedem autoridade.

No kit execute `npm run apos:checkpoint`, `npm run check` e verificações proporcionais da skill. No Valora execute `pnpm apos:checkpoint`, `pnpm apos:skills:check` e as verificações da skill. Os scripts Node equivalentes constam do package.json de cada repositório.

Compile contexto com `node scripts/compile-apos-context.mjs --intent .apos/intents/ID.json`; inclua `--output` para preservar o manifesto. Consulte as opções da versão do compilador local. Se o orçamento for excedido, revise o escopo com evidência ou registre a exceção; nunca remova silenciosamente regras necessárias.

Publique na branch autorizada e confira a referência remota. Merge, deploy, liberação de cobrança e publicação de anúncios são ações distintas. Rollback da skill: restaurar a revisão anterior do procedimento e do índice, preservar evidências históricas e invalidar apenas observações que deixaram de se aplicar.

## Exemplo aplicado e manutenção

A skill `valora-video` preserva as vozes escolhidas, a pronúncia solicitada, o padrão visual e os tempos de legendas. Ela está em `skills/valora-video/SKILL.md` no price-wizard. Seu registro local documenta dependências e execução assistida; não cria um gerador de vídeo dentro do aplicativo e não aprova campanhas futuras.

Ao mudar script, voz, template, regra comercial ou provedor: incremente a versão quando material, atualize hashes, registre Decision quando houver mudança de decisão, refaça a verificação afetada e mantenha histórico. Não replique mídia pesada ou específica de consumidor no kit; mantenha manifests e referências recuperáveis no destino apropriado.

## Reconciliação de 18/10/2026

A skill e o registro do Valora citados acima permanecem na branch candidata feat/valora-video-skill-20260915 até integração verificada. Este guia não declara sua disponibilidade na main nem execução automática.

