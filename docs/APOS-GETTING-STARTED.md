# APOS em 30 minutos

Este guia é a porta de entrada para quem acabou de conhecer o Product Platform Kit. Ao final, você saberá ler o estado de um produto, escolher o nível de processo e registrar uma mudança sem confundir código produzido com resultado comprovado.

## 1. O que é APOS?

APOS é um modelo operacional para pessoas trabalharem com agentes de software. Sua unidade persistente não é uma tarefa: é um **Intent**, que declara problema, população, resultado esperado, restrições e evidência necessária.

```text
Conversa
  → Intent
  → contexto e contratos aplicáveis
  → Decision autorizada
  → AgentRun
  → verificação independente
  → Evidence
  → ProductState
```

Uma mudança só está concluída quando:

```text
Intent satisfeito ∧ Contracts atendidos ∧ Evidence suficiente e vigente
```

Commit, deploy e mensagem de sucesso são resultados intermediários.

## 2. Os cinco componentes da v0.2

| Componente | Pergunta respondida | Local no starter |
| --- | --- | --- |
| Kernel | Quais limites nunca podem desaparecer? | `.apos/kernel/` |
| Context Compiler | Qual é o menor contexto suficiente para este Intent? | `.apos/context/` e `scripts/compile-apos-context.mjs` |
| Epistemic Registry | Quais fontes e métodos têm autoridade em cada domínio? | `.apos/epistemic/` |
| Adaptive Ceremony | Quanto processo o risco desta mudança exige? | `.apos/ceremony/` |
| Learning and Cost Loop | Quanto contexto, custo e retrabalho geraram um resultado validado? | `.apos/learning/` e `.apos/runs/` |

O limite de contexto é uma proteção calibrável, não uma meta arbitrária. Se fontes necessárias ultrapassarem o teto, interrompa ou escale. Nunca retire silenciosamente contratos, riscos ou incertezas para economizar tokens.

## 3. Glossário mínimo

- **Intent:** mudança desejada e critério de sucesso.
- **Contract:** comportamento, limite ou proteção verificável.
- **Capability:** capacidade necessária para executar ou verificar o Intent; não é um cargo.
- **Decision:** decisão vinculada a autoridade, alternativas, escopo e razão.
- **AgentRun:** registro proporcional de uma execução material.
- **Evidence:** observação independente ligada ao Intent, Run, contratos e artefato.
- **ProductState:** projeção do que as evidências atuais sustentam.
- **ChangeEnvelope:** delta autorizado, superfícies afetadas, invariantes, exclusões, regressão e rollback.
- **ContextManifest:** fontes realmente selecionadas, com hashes, tamanho e orçamento.
- **Waiver:** exceção explícita, compensada e com validade; nunca uma omissão silenciosa.

## 4. Qual cerimônia usar

Use sempre o nível mais leve que cubra a pior dimensão de risco.

| Nível | Exemplos | Mínimo esperado |
| --- | --- | --- |
| Lite | texto local, correção pequena e reversível | Intent compacto, ChangeEnvelope e teste focado |
| Standard | feature, API, schema ou dependência | Intent completo, manifesto de contexto, contratos, rollback e Evidence |
| Strict | produção, segurança, dados pessoais, pagamento, irreversibilidade ou alto impacto | tudo do Standard, autorização vinculada, evidência fresca, recuperação, monitoramento, custo e exposição |

O executor pode elevar a cerimônia ao descobrir risco novo, mas não pode reduzi-la sozinho.

## 5. Estrutura que você encontrará

```text
AGENTS.md                         protocolo carregado pelo agente
.apos/
  active-model.json              ponteiro para a versão vigente
  versions/                      Constitution, Policy, Capabilities e Memory imutáveis
  kernel/                        núcleo pequeno e não relaxável
  intents/                       mudanças persistentes desejadas
  contracts/                     limites e verificadores
  decisions/                     escolhas e autoridade
  runs/                          execuções materiais
  evidence/                      observações de verificação
  state/                         conhecimento atual sustentado
  context/                       seleção de fontes e manifestos
  epistemic/                     autoridade por domínio
  ceremony/                      níveis de processo
  learning/                      campos de aprendizado e custo
  quality/ environments/         requisitos não funcionais e promoção
  exposure/                      risco progressivo em RTO/RPO
  architecture/ ai/              evolução arquitetural e rotas de modelos
```

Pastas de registro podem ser criadas durante a primeira adoção. Documentos humanos são projeções; os objetos em `.apos/` são a fonte operacional.

## 6. Primeiro Intent completo

Imagine que o produto precisa adicionar uma exportação CSV a um painel existente. O restante do painel deve permanecer igual.

### 6.1 Intent

Crie `.apos/intents/I-EXEMPLO-001.json`:

```json
{
  "id": "I-EXEMPLO-001",
  "problem": "Usuários precisam reutilizar os dados do painel fora do produto.",
  "population": "Usuários autenticados com acesso ao painel",
  "outcome": "O usuário baixa um CSV correspondente aos filtros visíveis.",
  "constraints": ["não expor dados sem autorização", "preservar o painel atual"],
  "change_envelope": {
    "delta": ["adicionar exportação CSV"],
    "affected_surfaces": ["painel", "endpoint de exportação", "telemetria"],
    "affected_domains": ["product_experience", "security", "telemetry"],
    "invariants": ["filtros existentes", "RLS", "navegação", "eventos atuais"],
    "out_of_scope": ["redesenho do painel", "novos papéis", "mudança de banco"],
    "compatibility": ["contrato atual de filtros"],
    "regression_surface": ["permissões", "filtros", "download", "telemetria"],
    "rollback": "remover a rota e o botão mantendo os contratos anteriores",
    "component_reuse_assessment": {
      "components_reviewed": ["Button"],
      "decision": "reuse",
      "rationale": "O botão existente atende ao comportamento.",
      "reuse_surfaces": ["painel"]
    }
  },
  "required_contract_ids": ["C-AUTH-001", "C-DATA-001", "C-TELEMETRY-001"],
  "capabilities": ["recover-context", "compile-context", "change-artifact", "verify-artifact"],
  "classification": {"impact": "medium", "uncertainty": "low", "reversibility": "reversible", "environment": "test"},
  "ceremony_selection": {"level": "standard", "triggers": ["feature", "api_change"], "downgrade_allowed": false},
  "status": "candidate"
}
```

IDs e domínios são exemplos: substitua-os pelos contratos e pelo registro epistemológico do produto.

### 6.2 Decision

Crie `.apos/decisions/D-EXEMPLO-001.json` antes da execução:

```json
{
  "id": "D-EXEMPLO-001",
  "intent_id": "I-EXEMPLO-001",
  "run_id": "AR-EXEMPLO-001",
  "decision": "Produzir candidato no ambiente de teste usando o endpoint existente.",
  "rationale": "Reutiliza autorização e filtros já verificados.",
  "alternatives": ["exportar no navegador", "criar serviço separado"],
  "actor": "builder",
  "authority_source": "autorização vinculada ao Intent",
  "scope": "teste; sem produção"
}
```

### 6.3 Compile o contexto

Primeiro adapte `.apos/context/context-profile.json` e `.apos/epistemic/registry.json`. Os conjuntos de domínios precisam coincidir e todas as fontes declaradas devem existir.

```sh
node scripts/compile-apos-context.mjs \
  --intent .apos/intents/I-EXEMPLO-001.json \
  --decision .apos/decisions/D-EXEMPLO-001.json \
  --output .apos/context/manifests/CM-I-EXEMPLO-001.json
```

Leia o manifesto antes de executar:

- os domínios selecionados correspondem ao delta?
- todos os contratos aplicáveis estão presentes?
- alguma incerteza ou fonte de autoridade ficou fora?
- o contexto está dentro do teto sem perda de cobertura?

### 6.4 Execute e verifique

Implemente somente o ChangeEnvelope. Depois, um verificador observa os contratos aplicáveis: autorização, correspondência entre CSV e filtros, preservação do painel e telemetria.

O AgentRun registra a rota, cerimônia, manifesto, resultado, consumo disponível, retrabalho e regressões. Uso indisponível é escrito como `unavailable`, nunca `0`.

### 6.5 Evidence e ProductState

Crie Evidence somente após observar os testes. Ela deve apontar para Intent, Run, contratos, ambiente e digest do artefato. Se algum contrato falhar, preserve a evidência negativa e mantenha o Intent candidato.

Somente com Evidence suficiente:

1. marque o Intent como `satisfied`;
2. adicione o Intent e a Evidence ao ProductState;
3. aumente a revisão do ProductState;
4. preserve a revisão anterior para reconstrução e rollback.

Publicar em produção continua sendo outra ação e exige autorização vinculada à revisão que foi verificada.

## 7. Adotar o starter em outro repositório

```sh
cp templates/apos/AGENTS.md /caminho/do-produto/AGENTS.md
cp -R templates/apos/.apos /caminho/do-produto/.apos
mkdir -p /caminho/do-produto/scripts
cp templates/apos/scripts/compile-apos-context.mjs /caminho/do-produto/scripts/
```

Depois:

1. substitua todos os `ADAPTAR`;
2. crie `intents`, `decisions`, `runs`, `evidence` e `state` conforme o primeiro Intent;
3. registre domínios e fontes reais;
4. defina contratos verificáveis do produto;
5. configure ambientes, qualidade e exposição com valores aprovados;
6. compile o primeiro contexto;
7. adapte o verificador do toolkit ao consumidor;
8. só então marque o primeiro resultado como satisfeito.

Não copie dados, contratos de negócio ou evidências de outro consumidor.

## 8. Comandos do Product Platform Kit

Na raiz deste repositório:

```sh
npm run check
npm run check:operating-model
npm run test:apos
node scripts/compile-apos-context.mjs
```

O runtime Python pode ser exercitado separadamente:

```sh
cd packages/apos
python3 -m unittest discover -s tests -v
python3 -m apos --export evidence/local
```

## 9. Problemas comuns

### O compilador diz que o domínio não existe

O Intent usa um `affected_domain` ausente do ContextProfile ou do Epistemic Registry. Normalize os dois catálogos; não remova o domínio do Intent apenas para o comando passar.

### O contexto excedeu o orçamento

Procure fontes duplicadas, históricas ou fora do subgrafo. Se tudo for necessário, registre a exceção ou recalibre o teto com evidência. Não corte contratos ou fatos materiais.

### Não existe Evidence suficiente

Mantenha o Intent como candidato. Execução bem-sucedida, ausência de erro ou relato do agente não substituem observação independente.

### Não sei se a mudança é Lite ou Standard

Use Standard quando houver feature, contrato, API, schema ou dependência. Se surgir produção, segurança, dados pessoais, pagamento, irreversibilidade ou alto impacto, eleve para Strict.

### O runtime diz v0.1 e os documentos dizem v0.2

Isso é esperado no estágio atual. O runtime Python demonstra atomicidade e separação entre execução e verificação; a v0.2 adiciona componentes governados e verificadores de repositório. Não presuma automação que o pacote ainda não implementa.

## 10. Onde aprofundar

- [Manifesto](AGENTIC-PRODUCT-MANIFESTO.md): por que o modelo existe.
- [Especificação v0.2](APOS-v0.2.md): regras e arquitetura completas.
- [Memorial v0.2](apos/APOS-v0.2-MEMORIAL.md): o que mudou e por quê.
- [Starter](../templates/apos/README.md): checklist de adoção.
- [Runtime experimental](../packages/apos/README.md): execução transacional local.
- [Modelo operacional do toolkit](../.apos/README.md): como este repositório governa a si mesmo.
