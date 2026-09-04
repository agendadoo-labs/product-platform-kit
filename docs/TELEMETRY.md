# Telemetria de produto

Telemetria faz parte da definição de pronto de toda feature.

Antes de desenvolver, registre:

1. problema e hipótese;
2. evento de descoberta (`shown`, `opened`);
3. interação essencial (`clicked`, `submitted`);
4. evento de sucesso;
5. métrica de proteção;
6. responsável e local de leitura;
7. finalidade, retenção e impacto de privacidade.

## Convenções

- `feature_key` e `event_name` usam `snake_case`;
- eventos não aceitam texto livre ou JSON arbitrário;
- `numeric_value` serve apenas para uma medida definida no catálogo;
- nunca registre senha, token, assinatura, conteúdo de relatório ou dados de pagamento;
- o opt-out é verificado no cliente e novamente no RPC;
- painéis usam usuários únicos e eventos totais separadamente.

## Exemplo de catálogo

| Feature | Evento | Valor numérico | Objetivo |
|---|---|---:|---|
| `mobile_continue` | `shown` | itens selecionados | medir descoberta |
| `mobile_continue` | `clicked` | itens selecionados | medir uso |

Documente eventos novos no repositório do produto. O kit fornece o transporte e a governança, não decide o que deve ser coletado.
