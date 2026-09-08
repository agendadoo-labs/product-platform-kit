# Runtime transacional experimental do APOS

Esta é a referência local executável do fluxo `Intent → execução → verificação → Evidence → ProductState`.

O modelo operacional vigente no kit é o [APOS v0.2](../../docs/APOS-v0.2.md), mas este runtime Python implementa somente o núcleo transacional originalmente validado no perfil v0.1. Kernel, Context Compiler, Epistemic Registry, Adaptive Ceremony e Learning and Cost Loop são hoje configurações e verificações de repositório; ainda não são todos automatizados por este pacote.

Para começar pelo produto e não pelo runtime, use o [guia de 30 minutos](../../docs/APOS-GETTING-STARTED.md). Para o histórico do protocolo, consulte a [especificação v0.1](../../docs/APOS-v0.1.md) e o [manifesto](../../docs/AGENTIC-PRODUCT-MANIFESTO.md).

## Executar

From this directory, with Python 3.9 or newer:

```sh
python3 -m unittest discover -s tests -v
python3 -m apos --export evidence/local
```

O demo cria um catálogo, verifica cinco contratos obrigatórios e grava atomicamente a revisão 1 em `.apos.sqlite`. Repetir o comando reproduz a mesma execução sem novos efeitos. Consulte `evidence/local/run.json` para entradas, decisão, execução, verificações e estado; `catalog.md` contém o artefato publicado e `evidence/bootstrap` preserva a execução original.

Use `--db /tmp/apos-experiment.sqlite --key my-experiment` para um experimento independente. `--intent` e `--contracts` selecionam entradas. Capabilities desconhecidas ou de maior risco retornam bloqueio (`exit 2`); falha de verificação também retorna `2`; sucesso retorna `0`. Não existe bypass de aprovação nem adapter de produção.

A API Python expõe `Engine.run(..., expected_revision=N)` para concorrência otimista. O executor fornecido é determinístico e local. Ele demonstra o protocolo transacional; não é uma integração com agentes de LLM.
