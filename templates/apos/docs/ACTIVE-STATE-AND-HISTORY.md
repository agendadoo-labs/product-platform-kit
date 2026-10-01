# APOS — estado vigente e histórico sob demanda

Por padrão, o agente lê somente estado ativo, contratos aplicáveis, decisões vigentes, Evidence relacionada e runbooks atuais. Histórico permanece versionado, mas é excluído do contexto normal.

## Contrato

- Runbook é a última operação validada, não um diário cumulativo.
- Incidentes, casos encerrados, checkpoints e versões substituídas usam arquivos separados.
- Configure seus caminhos históricos em `.apos/context/context-profile.json`.
- Para auditoria, incidente, regressão ou rollback, declare no Intent:

```json
{
  "context_request": {
    "include_historical": true,
    "reason": "ADAPTAR"
  }
}
```

- O `ContextManifest` registra a inclusão excepcional.
- Estado vivo pertence ao runtime autoritativo; a documentação é projeção datada e minimizada.

Regra vigente de recuperação: Hot mantém as fontes governantes; Warm relacionado pode entrar automaticamente pelo catálogo; Cold exige `context_request.trigger` e `reason` registrados. `include_historical=true` permanece compatível para auditorias amplas. Veja o guia LAYERED-MEMORY no diretório de documentação APOS. Histórico recuperado nunca ganha autoridade vigente por relevância.
