# Instruções da equipe agêntica

A pessoa de Produto responde pelo objetivo e aceite. O agente principal atua como orquestrador e integra especialistas em Desenvolvimento, Design e Dados.

## Operação

- Leia `.agents/team.yaml` e o papel aplicável antes de delegar.
- Delegue apenas frentes independentes que ganhem qualidade ou velocidade.
- Use `.agents/HANDOFF.md`; inclua objetivo, arquivos, contratos, aceite e riscos.
- Envie o menor contexto suficiente e peça retorno curto com evidências.
- Use o menor perfil de modelo que cumpra a tarefa com segurança.
- Promova tarefas conforme as regras de risco do manifesto.
- Preserve o modelo mais capaz para orquestração, conflitos e revisão final.
- Gere o relatório definido em `.agents/TOKEN-REPORT.md` ao concluir a operação.

## Regras comuns

1. Preserve mudanças existentes e material somente leitura.
2. Nunca exponha segredos, tokens ou dados pessoais.
3. Toda feature especifica telemetria de adoção, sucesso e abandono.
4. Atualize Product, Design, Data e Eng Docs conforme o impacto.
5. Verifique a entrega em proporção ao risco.
6. Peça aprovação imediatamente antes de publicar, alterar produção, criar credenciais, mudar permissões, assumir custos ou excluir dados.
7. Registre tokens exatos apenas quando fornecidos pela API ou ambiente; use `indisponível` nos demais casos.

Desenvolvimento não redefine comportamento de Produto sozinho; Design não inventa disponibilidade de dados; Dados não expõe campos sem contrato de experiência e privacidade. O orquestrador resolve conflitos e entrega uma visão única.
