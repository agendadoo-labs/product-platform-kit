# Starter Design System

Fundação visual neutra para novos produtos. Ela não replica marca, fontes ou cores do Valora: usa tipografia nativa do sistema, azul cobalto como ação principal e uma escala de ardósia para texto e superfícies.

## Como adotar

1. Copie esta pasta para `src/design-system` no produto consumidor.
2. Importe `index.css` uma vez na entrada do aplicativo.
3. Troque somente os valores semânticos de `tokens.css` para criar a identidade da nova marca.
4. Mantenha nomes de tokens e classes estáveis para receber futuras atualizações do kit.
5. Crie componentes do framework do produto sobre estas classes, sem misturar regras de negócio.

```css
@import "./design-system/index.css";
```

```html
<article class="ppk-card ppk-stack">
  <span class="ppk-badge ppk-badge--success">Ativo</span>
  <div>
    <h2 class="ppk-card__title">Título do módulo</h2>
    <p class="ppk-card__description">Explique o resultado antes de pedir uma ação.</p>
  </div>
  <label class="ppk-field">
    <span class="ppk-label">Nome</span>
    <input class="ppk-input" autocomplete="name" />
    <span class="ppk-hint">Use o mesmo nome dos seus documentos.</span>
  </label>
  <button class="ppk-button ppk-button--mobile-full">Continuar</button>
</article>
```

## Contrato dos tokens

- `color-*` expressa intenção, nunca o nome visual da cor;
- `font-*` define tipografia e escala;
- `space-*` mantém ritmo consistente;
- `radius-*`, `shadow-*` e `motion-*` cobrem forma e interação;
- `[data-theme="dark"]` oferece tema escuro sem duplicar componentes.

## Componentes iniciais

- botão: primary, secondary, ghost, danger e largura responsiva;
- card: padrão e elevado;
- campo: label, ajuda, input, select, textarea e erro;
- badge: neutro, sucesso, atenção e erro;
- alert: informativo e erro;
- utilitários de container, pilha, agrupamento e texto para leitores de tela.

## Regras de acessibilidade

- alvo interativo mínimo de 44 px;
- foco sempre visível;
- estados nunca dependem apenas de cor;
- contraste deve ser revalidado quando a marca trocar os tokens;
- respeitar `prefers-reduced-motion`;
- usar rótulos, textos de ajuda e `aria-invalid` conforme o estado real.

## Limite entre kit e produto

O kit fornece estrutura e contratos. Logo, ícones proprietários, ilustrações, voz, paleta definitiva, fontes licenciadas e componentes ligados ao domínio ficam no repositório do produto.

## Tarefa, resultado e consistência

Antes de compor uma tela, use o [guia de experiência](../../docs/design/Design%20—%20Guia%20—%20Interfaces%20orientadas%20a%20tarefas.md) e o [template de contrato por tela](../apos/product/screen-brief.template.json). Componentes equivalentes compartilham tokens de tamanho, tipografia, espaçamento, estados e foco; grupos de ações preservam alinhamento e se reorganizam em telas estreitas. Os princípios são candidatos reutilizáveis, com adoção explícita no consumidor.
