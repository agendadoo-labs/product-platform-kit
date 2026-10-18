# Convenção de documentação APOS

Por definição, salvar e atualizar a documentação deste trabalho nos dois destinos: Product Platform Kit no GitHub e vault `leo-brain`. Não exigir um pedido separado para a segunda projeção. Manter conteúdo semanticamente equivalente e adaptar links a cada ambiente.

## Estado vigente e histórico

- O documento operacional principal deve representar somente o último estado validado.
- Procedimentos substituídos, casos encerrados, incidentes e checkpoints ficam em documentos históricos separados.
- Agentes começam pelo estado governante Hot e consultam o catálogo de memória.
- Histórico relacionado Warm pode entrar automaticamente; Cold exige gatilho e motivo registrados. Temperatura nunca substitui autoridade, validade ou permissões.
- Uma atualização operacional deve substituir o estado vigente e preservar a versão anterior no histórico, sem concatenar indefinidamente ambos no mesmo arquivo.
- Todo documento deve declarar tipo, status, data de última validação e fonte de autoridade quando isso for material.

## Autoridade e publicação

- Git permanece como fonte canônica versionada e reconstruível.
- `leo-brain` é a projeção humana e de recuperação, não uma segunda autoridade concorrente.
- Em divergência, vale o estado ativo e validado no Git; a projeção do `leo-brain` deve ser reparada.
- Publicar documentação não aprova sugestões nem autoriza ações de produção.
- Fazer merge na `main` somente quando autorizado pelo builder.

Referência normativa: `ACTIVE-STATE-AND-HISTORY.md` no compêndio APOS.
