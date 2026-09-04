# Testes A/B

## Fluxo

1. Registre hipótese, conversão principal e métricas de proteção.
2. Crie o experimento como `draft`.
3. Implemente controle e tratamento com fallback seguro para `control`.
4. Valide atribuição e eventos em homologação.
5. Altere para `running` somente após revisão de produto e privacidade.
6. Analise conversão por usuário, duração, sazonalidade e proteção.
7. Marque como `completed` e remova a variante descartada do código.

## Garantias do kit

- atribuição determinística e persistida por conta;
- mesma variante entre aparelhos e sessões;
- usuário em opt-out recebe `control` e não é atribuído;
- experimento fora do período ativo retorna `control`;
- resultados administrativos contam pessoas convertidas, não cliques repetidos.

O kit não declara vencedor automaticamente. A decisão exige amostra, duração e revisão humana.
