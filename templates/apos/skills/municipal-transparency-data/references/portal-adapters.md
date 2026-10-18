# Portal adapter discovery, observed 2026-10-18

- Carmo: https://transparencia.carmo.rj.gov.br/dados/abertos documents GET `/dados/{conjunto}/{formato}` with ano, mes and limite. Confirmed one-row JSON probes for servidores, empenhos and pagamentos in September/2026. materiais_saidas was empty for that month. A limite cap is not pagination. Complete annual/monthly totals and exact interpretation still require reconciliation. Workforce fields include Unidade Gestora, Matricula, Situacao, Divisao and Secao; minimize nominal records before persistence.
- Petrópolis: https://www.petropolis.rj.gov.br/transparencia/ links to https://www.petropolis.rj.gov.br/sad/contracheque/servidores/listagem and https://petropolisportaltransparencia.portalfacil.com.br/despesas . Exports/schema pending verification.
- Paraty: https://transparencia.paraty.rj.gov.br/ redirected to https://contabilidadeparaty.oppcloud.com.br/transparencia/ . Official portal menus include Dados Abertos, Servidores and institutional expense views; form-driven export contract pending.
- Niterói: https://transparencia.niteroi.rj.gov.br/ is a dynamic application. Official SEPLAG guidance https://seplag.niteroi.rj.gov.br/politica-de-transparencia/ describes personnel consultation including organization/lotation. A stable API/export is not established here.

These are discovery observations, not connector certifications. Do not infer that identical menu labels imply identical schemas or that a field named unit denotes a final consumer. No supplier/employee values are included in the package.
