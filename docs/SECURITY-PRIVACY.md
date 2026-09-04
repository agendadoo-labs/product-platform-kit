# Segurança e privacidade

- RLS é obrigatória em toda tabela acessível pela API.
- Escritas de telemetria passam por RPC `security definer` com `search_path` vazio.
- Papéis administrativos não podem ser alterados pelo frontend.
- Chaves administrativas e senhas de banco ficam em cofres de segredos.
- Opt-out impede a criação de telemetria e atribuições experimentais.
- Eventos têm schema restrito e não recebem payload arbitrário.
- Retenção padrão sugerida é 13 meses, sujeita à validação jurídica do produto.
- O responsável pelo produto deve documentar finalidade, base legal, operador, retenção e direitos dos titulares.

Este material é uma base técnica e não substitui revisão jurídica ou teste de segurança do produto consumidor.
