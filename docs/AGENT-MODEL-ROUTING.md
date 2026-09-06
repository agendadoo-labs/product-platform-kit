# Roteamento de modelos por capacidade e risco

Modelos são recursos de execução, não papéis organizacionais. O roteamento acontece depois de interpretar o Intent e classificar a ação.

## Critério

Escolha o modelo de menor custo que consiga executar a capability com qualidade suficiente. Promova quando aumentarem ambiguidade, impacto, dificuldade de verificação ou risco. Modelo mais capaz não concede autoridade, e modelo econômico não reduz contratos.

| Classe da capability | Características | Roteamento esperado |
|---|---|---|
| Mecânica | entrada fechada, transformação previsível, check determinístico | modelo econômico |
| Analítica | julgamento moderado, alternativas delimitadas, evidência disponível | modelo intermediário |
| Crítica | arquitetura, conflito, alta incerteza, segurança ou efeito sensível | modelo mais capaz e revisão independente |

## Eficiência de contexto

1. Recupere somente Intents, Contracts, Decisions, Evidence e arquivos relevantes.
2. Envie à execução a menor revisão suficiente, com critérios verificáveis.
3. Prefira verificadores determinísticos quando provarem o mesmo contrato.
4. Não replique a conversa completa nem crie um AgentRun para cada chamada interna.
5. Registre consumo exato somente quando fornecido pelo ambiente; indisponível não significa zero.

Otimize custo por Intent validado, não por quantidade de chamadas ou documentos produzidos.
