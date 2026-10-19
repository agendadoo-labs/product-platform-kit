import json
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def load(p):return json.loads((R/p).read_text())
def head(id,title,purpose):
 meta={'id':id,'type':'reference','scope':'Product Platform Kit','document_role':'procedure','purpose':purpose,'read_when':['Projetar ou revisar jornadas e interfaces'],'status':'candidate','authority':'derived_from_operational_sources','tier':'warm','updated':'2026-10-19','graph_scope':'candidate'}
 return '---\n'+''.join(k+': '+json.dumps(v,ensure_ascii=False)+'\n' for k,v in meta.items())+'---\n# '+title+'\n\n'+purpose+'\n\n'
p=load('.apos/design/experience-principles.json');d=load('.apos/product/discovery-principles.json')
s=head('DOC-PPK-DESIGN-001','Design — Guia — Interfaces orientadas a tarefas',p['purpose'])
s+='Fonte governante: `.apos/design/experience-principles.json` (UX-PPK-001). Projeção gerada por `scripts/project-experience.py`. Candidato; adoção explícita pelo consumidor.\n\nO starter existente já define tokens, componentes, foco, alvos de 44 px e redução de movimento. Este complemento define o trabalho que a interface deve permitir. Não substitui uma avaliação com pessoas.\n\n## Princípios\n\n'+'\n'.join('- '+x['id']+': '+x['rule'] for x in p['principles'])
s+='\n\n## Contrato por tela\n\nPreencher `templates/apos/product/screen-brief.template.json`: '+', '.join(p['required_screen_fields'])+'. Usar estados distintos: '+', '.join(p['states'])+'. A descrição de erro deve indicar recuperação; um dado ausente nunca vira zero.\n\n## Verificação\n\n'+'\n'.join('- '+x for x in p['verification'])
s+='\n\n## Fontes e limites\n\n'+'\n'.join('- ['+x['id']+']('+x['url']+'): '+x['use'] for x in p['sources'])+'\n\n'+'\n'.join('- '+x for x in p['authority_limits'])+'\n'
(R/'docs/design/Design — Guia — Interfaces orientadas a tarefas.md').write_text(s)
s=head('DOC-PPK-DISCOVERY-001','Produto — Guia — Descoberta e resultados verificáveis',d['purpose'])
s+='Fonte governante: `.apos/product/discovery-principles.json` (PD-PPK-001). Projeção gerada; candidato.\n\n## Ciclo proporcional ao risco\n\n'+'\n'.join('- **'+x['stage']+'**: '+x['output'] for x in d['cycle'])
s+='\n\n## Medidas de resultado\n\n'+'\n'.join('- '+x for x in d['measures'])+'\n\n## Pesquisa e aceitação\n\n'+'\n'.join('- '+x for x in d['research_contract'])
s+='\n\nIntent → Contracts → Decisions → implementação → Evidence → ProductState → documentação derivada. Tokens, componentes e telas são meios; a evidência deve avaliar a tarefa. Fontes: [GOV.UK: necessidades](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs), [serviço simples](https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use) e [Design Council](https://www.designcouncil.org.uk/resources/the-double-diamond/).\n'
(R/'docs/product/Produto — Guia — Descoberta e resultados verificáveis.md').write_text(s)
