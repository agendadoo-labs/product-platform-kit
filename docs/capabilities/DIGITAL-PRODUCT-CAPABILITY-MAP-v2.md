# Digital Product Capability Map — v2

> Segunda versão ampliada de uma ontologia computável para produtos digitais, pensada para exploração, evolução e uso por agentes de software.

## 1. Visão geral

A hipótese central deste mapa é que a maioria dos produtos digitais pode ser descrita como uma combinação de:

1. **Arquétipos de negócio**
2. **Domínios funcionais recorrentes**
3. **Capacidades transversais**
4. **Restrições e overlays regulatórios ou setoriais**
5. **Regras e configurações específicas do negócio**

O produto específico emerge da composição entre essas partes.

Exemplo:

```text
Airbnb
=
Marketplace
+ Catalog
+ Search
+ Booking
+ Payment
+ Reputation
+ Messaging
+ Fraud
+ Geo
+ Pricing
```

```text
Uber
=
Marketplace
+ Geo
+ Matching
+ Dispatch
+ Pricing
+ Payment
+ Reputation
```

```text
Amazon
=
Marketplace
+ Catalog
+ Search
+ Inventory
+ Order
+ Payment
+ Logistics
+ Recommendation
```

```text
OLX
=
Marketplace
+ Catalog
+ Search
+ Messaging
+ Leads
+ Ads
+ Reputation
```

A diferença entre negócios não está necessariamente na existência ou não desses blocos, mas na composição, profundidade, regras, fluxos e integrações entre eles.

---

## 1.1 Camada transversal: Commercial Model

O mapa separa os domínios funcionais da camada que propaga objetivos e incentivos econômicos. O `Commercial Model` funciona como um **Economic Control Plane**: transforma o modelo de negócio em unidades econômicas, eventos faturáveis, direitos, obrigações e guardrails; depois registra como essa decisão influencia os 14 macrodomínios.

Ele não substitui Pricing, Billing, Payments, Entitlements, Search, CRM ou Trust & Safety. Ele conecta esses domínios por um grafo de influência e expande o Change Envelope do APOS quando uma decisão comercial muda. A definição operacional, a matriz de influência e o contrato machine-readable estão em [Commercial Model como Economic Control Plane](COMMERCIAL-MODEL-ECONOMIC-CONTROL-PLANE.md).

```text
Business Model → Commercial Model → incentivos → domínios → comportamento → equilíbrio
```

---

# 2. Arquétipos de produto digital

Uma taxonomia inicial de mecanismos econômicos principais:

| Arquétipo | Unidade central | Exemplos |
|---|---|---|
| E-commerce | produto + pedido | varejo, Amazon 1P |
| Marketplace | oferta + demanda + match/transação | Airbnb, OLX, Uber |
| SaaS | tenant + usuário + workflow | Salesforce, Notion |
| Fintech / Banking | conta + ledger + transação financeira | Nubank, Stripe |
| Data / Analytics | dataset + métrica + consumo | Bloomberg, Amplitude |
| Ads / Marketing | audiência + campanha + impressão/conversão | Google Ads |
| Social / Community | usuário + conteúdo + grafo | Reddit, Instagram |
| Content / Media | conteúdo + audiência + consumo | Netflix, Spotify |
| On-demand / Logistics | pedido + recurso + despacho | iFood, Uber |
| Subscription / Membership | usuário + entitlement + recorrência | streaming, academias |
| Platform / API | consumidor + API + quota | Twilio, OpenAI API |
| Enterprise Workflow | entidade + processo + aprovação | ServiceNow |
| Gaming / Virtual Economy | jogador + estado + economia | Roblox |
| IoT / Physical-digital | dispositivo + telemetria + comando | Tesla, smart home |

Uma mesma empresa pode combinar vários arquétipos.

Exemplo de marketplace imobiliário:

```text
Marketplace + SaaS B2B + Ads + Data Product + Fintech
```

---

# 3. Customer & Identity

## 3.1 Identity & Access

Capacidades quase universais:

- Customer Identity
- Employee Identity
- B2B Organization Identity
- Login / Authentication
- Authorization
- RBAC
- ABAC
- SSO
- MFA
- Session Management
- API Keys
- Service Accounts
- Consent Management
- Delegated Access

Entidades centrais:

```text
Person
User
Organization
Account
Role
Permission
Session
Credential
Consent
```

## 3.2 Customer / Account Domain

Representa o registro canônico do cliente e seu relacionamento com a empresa.

Capacidades:

- perfil
- identidade
- organização
- relacionamento
- lifecycle
- segmentação
- preferências
- consentimento
- histórico
- score
- status comercial

Entidades:

```text
Customer
Organization
Contact
Account
Relationship
Segment
LifecycleStage
Preference
Consent
```

Princípio importante:

> CRM é uma ferramenta. Customer Domain é parte da arquitetura do produto.

---

# 4. Commerce & Offering

## 4.1 Catalog / Offering

Representa tudo que a empresa oferece.

Pode conter:

- produto
- serviço
- anúncio
- plano
- assinatura
- imóvel
- veículo
- SKU
- API
- pacote publicitário

Modelo genérico:

```text
Offering
Product
Service
SKU
Plan
Package
Bundle
Price
Availability
Inventory
Attribute
```

## 4.2 Pricing

Capacidades:

- preço
- tabelas de preço
- descontos
- promoções
- cupons
- precificação dinâmica
- negociação
- price fences
- regionalização
- impostos embutidos
- contratos especiais

Entidades:

```text
Price
PriceList
Discount
Promotion
Coupon
PricingRule
Quote
```

## 4.3 Order / Transaction

Representa uma intenção econômica entre partes.

Entidades possíveis:

```text
Cart
Order
Transaction
Reservation
Booking
Contract
Subscription
Purchase
```

Uber chama de ride. Airbnb chama de booking. Amazon chama de order. Um banco chama de transaction. Estruturalmente, todos modelam uma intenção econômica ou compromisso entre participantes.

---

# 5. Payments & Financial Operations

Capacidades:

- payment intent
- authorization
- capture
- refund
- chargeback
- split
- payout
- billing
- invoice
- reconciliation

Entidades:

```text
Payment
PaymentIntent
Charge
Refund
Payout
Invoice
Receivable
Settlement
```

## 5.1 Ledger

Empresas com movimentação financeira mais sofisticada geralmente precisam de ledger explícito.

```text
Account
Entry
Debit
Credit
Balance
```

---

# 6. Subscription & Entitlements

Capacidades:

- planos
- subscriptions
- feature access
- usage limits
- quota
- renewal
- upgrade
- downgrade

Entidades:

```text
Subscription
Plan
Entitlement
Feature
Quota
Usage
BillingCycle
```

Aplicável a SaaS, streaming, publicidade, APIs e outros modelos recorrentes.

---

# 7. Marketplace & Matching

Domínio típico de produtos multi-sided.

Entidades:

```text
Supply
Demand
Listing
Match
Ranking
Lead
Bid
Offer
Transaction
Reputation
```

Subdomínios:

- supply acquisition
- demand acquisition
- search
- recommendation
- ranking
- matching
- liquidity
- lead routing
- reputation
- trust
- marketplace governance

---

# 8. Information Access & Discovery

Este domínio é mais amplo que apenas Search.

```text
INFORMATION ACCESS & DISCOVERY
├── Ingestion
├── Indexing
├── Query Understanding
├── Retrieval
├── Candidate Generation
├── Ranking
├── Re-ranking
├── Filtering & Faceting
├── Semantic Search
├── Geo Search
├── Multimodal Retrieval
├── Recommendation
├── Personalization
├── Knowledge Retrieval / RAG
├── Relevance Evaluation
└── Search Operations
```

## 8.1 Ingestion & Indexing

Entidades:

```text
Source
Document
Field
Attribute
Index
Embedding
Chunk
Metadata
```

Capacidades:

- crawling
- feeds
- CDC
- batch indexing
- real-time indexing
- normalization
- enrichment
- deduplication
- language detection
- entity extraction

## 8.2 Query Understanding

Entidades:

```text
Query
Intent
Entity
Filter
Constraint
Synonym
Correction
```

Capacidades:

- tokenization
- stemming
- spell correction
- synonyms
- entity recognition
- intent classification
- query rewriting
- query expansion
- natural-language parsing

Exemplo:

```text
"apartamento de 3 quartos até 1 milhão perto do metrô em Botafogo"
```

pode ser transformado em:

```text
intent = property_search
type = apartment
bedrooms >= 3
price <= 1_000_000
location = Botafogo
distance_to_subway = small
```

## 8.3 Retrieval

Estratégias principais:

```text
Lexical Retrieval
Semantic Retrieval
Structured Retrieval
Graph Retrieval
Hybrid Retrieval
```

Lexical:

```text
BM25
TF-IDF
Inverted Index
```

Semantic:

```text
Embedding
Vector Search
ANN
```

Structured:

```text
SQL
filters
range queries
geo queries
```

Graph:

```text
neighbors
relationships
knowledge graph
```

Hybrid:

```text
BM25
+
Vector Retrieval
+
Business Rules
```

Em muitos produtos modernos, hybrid retrieval é uma boa abstração padrão.

## 8.4 Candidate Generation & Ranking

Recuperar e ordenar são problemas diferentes.

Entidades:

```text
Candidate
Signal
Score
Rank
Model
Constraint
```

Possíveis sinais:

```text
Text relevance
Semantic similarity
Freshness
Popularity
Quality
Distance
Price
User preference
Seller quality
Commercial signal
Trust signal
```

Pipeline conceitual:

```text
Retrieval
↓
Candidate Generation
↓
Scoring
↓
Re-ranking
↓
Business Constraints
↓
Final Result Set
```

## 8.5 Filtering & Faceting

Entidades:

```text
Filter
Facet
Bucket
Range
Aggregation
```

Exemplos:

- preço
- localização
- categoria
- marca
- tamanho
- atributos
- disponibilidade

## 8.6 Semantic Search

Entidades:

```text
Document
Chunk
Embedding
Vector
Similarity
SemanticQuery
```

Capacidades:

- embedding generation
- vector indexing
- ANN search
- semantic similarity
- reranking
- multimodal retrieval

## 8.7 Multimodal Retrieval

Modalidades:

```text
Text
Image
Audio
Video
Structured Data
```

Exemplo:

```text
"quero uma casa parecida com essa"
```

pode combinar:

```text
image embedding
+
structured attributes
+
geo constraints
```

## 8.8 Recommendation / Related Retrieval

Diferença conceitual:

```text
Search:
usuário expressa explicitamente uma intenção.

Recommendation:
sistema infere uma intenção.
```

Ambos compartilham infraestrutura:

```text
Candidate Generation
Ranking
Embeddings
Features
Evaluation
```

## 8.9 Knowledge Retrieval / RAG

Para produtos internos, copilots e agentes:

```text
Document
Chunk
Source
Citation
Permission
Freshness
Version
```

Capacidades:

- enterprise search
- RAG
- document retrieval
- citation
- ACL-aware retrieval
- freshness
- source ranking

Princípio:

> Retrieval precisa respeitar autorização, não apenas relevância.

## 8.10 Relevance Evaluation

Entidades:

```text
Query
Result
Judgment
Metric
Experiment
```

Métricas:

```text
Precision
Recall
MRR
NDCG
MAP
Success Rate
Zero Results Rate
CTR
Conversion
Reformulation Rate
Abandonment
```

É útil separar:

```text
offline relevance
vs
online business impact
```

## 8.11 Search Operations

Entidades:

```text
Index
Alias
Version
Shard
Replica
Job
Failure
Latency
```

Capacidades:

- reindex
- zero-downtime index migration
- schema evolution
- index health
- query latency
- cache
- degradation
- fallback

## 8.12 Distinções úteis

```text
Database answers:
"What data matches this condition?"

Search answers:
"What information is most relevant to this intent?"

Recommendation answers:
"What should this user see next?"

RAG answers:
"What information should an AI retrieve to answer this question?"
```

---

# 9. Content

Entidades:

```text
Content
Asset
Media
Document
Page
Template
Version
Translation
```

Capacidades:

- CMS
- DAM
- localization
- versioning
- moderation
- publishing

---

# 10. Communication / CRM

Entidades:

```text
Campaign
Audience
Message
Template
Channel
Delivery
Event
```

Canais:

- email
- SMS
- push
- WhatsApp
- inbox
- in-app
- webhooks

Capacidades:

```text
segmentation
journeys
campaigns
triggers
frequency caps
personalization
experimentation
```

---

# 11. Leads & Sales

Entidades:

```text
Lead
Opportunity
Account
Contact
Deal
Pipeline
Activity
```

Capacidades:

- lead generation
- lead qualification
- lead routing
- scoring
- CRM
- pipeline
- forecast
- sales automation

---

# 12. Integrations

Entidades:

```text
Connector
Integration
Credential
Webhook
Endpoint
Feed
Sync
Job
Mapping
```

Patterns:

```text
API
Webhook
File
Feed
Streaming
Batch
ETL
CDC
```

Esse domínio frequentemente evolui para uma plataforma interna.

---

# 13. Enterprise Backbone

## 13.1 Admin / Backoffice

Praticamente todo produto precisa assumir a existência de interfaces operacionais internas.

```text
Admin Portal
Operations Console
Support Console
Configuration UI
Moderation UI
Fraud Console
Finance Console
```

## 13.2 ERP / Finance

```text
Accounting
Accounts Payable
Accounts Receivable
Procurement
Budgeting
Treasury
Payroll
Assets
```

## 13.3 Fiscal / Tax

Especialmente relevante no Brasil.

```text
Invoice
NFe
NFSe
Tax
TaxRule
Withholding
FiscalDocument
```

## 13.4 Customer Support / CX

```text
Ticket
Conversation
Agent
SLA
Queue
Case
Resolution
CSAT
NPS
```

Integra-se com CRM, pedidos, pagamentos, identidade e produto.

## 13.5 Legal

Entidades:

```text
Contract
Term
Policy
LegalEntity
Signature
Evidence
Dispute
RetentionPolicy
```

Capacidades:

- contratos
- termos
- assinatura eletrônica
- litígios
- evidências
- legal hold

## 13.6 Compliance & Privacy

Modelo mais universal do qual LGPD, GDPR e CCPA são implementações.

```text
Consent
Purpose
DataCategory
RetentionPolicy
DeletionRequest
AccessRequest
ProcessingActivity
```

Capacidades:

- consent management
- deletion
- portability
- retention
- data subject requests
- auditability

---

# 14. Fulfillment & Logistics

Para qualquer produto com fluxo físico, esse domínio deve ser explícito e separado de Order, Inventory e Payments.

```text
PHYSICAL OPERATIONS
├── Procurement
├── Inventory
├── Warehousing
├── Fulfillment
├── Transportation
├── Delivery
├── Reverse Logistics
└── Supply Chain / Logistics Network
```

## 14.1 Inventory

Entidades:

```text
SKU
Stock
AvailableStock
ReservedStock
SafetyStock
InventoryPosition
InventoryMovement
Lot
SerialNumber
Expiration
```

Capacidades:

- ATP — available to promise
- reserva
- reposição
- transferência entre estoques
- inventário físico
- lotes e validade
- rastreabilidade

## 14.2 Warehousing

Entidades:

```text
Warehouse
Zone
Bin
Dock
PickingWave
PickingTask
PackingTask
Package
```

Capacidades:

- recebimento
- put-away
- picking
- packing
- cross-docking
- inventário
- expedição

Integrações típicas: WMS.

## 14.3 Fulfillment

Fluxo conceitual:

```text
Order
↓
FulfillmentOrder
↓
Shipment
↓
Package
↓
Delivery
```

Capacidades:

- split shipment
- partial fulfillment
- backorder
- substitutions
- fulfillment routing
- SLA
- promise date

## 14.4 Transportation

Entidades:

```text
Carrier
Route
Vehicle
Driver
Shipment
Leg
FreightQuote
Manifest
```

Capacidades:

- carrier selection
- freight quotation
- route optimization
- consolidation
- tracking
- freight audit
- TMS integration

## 14.5 Last Mile / Delivery

Entidades:

```text
Delivery
Stop
Route
Driver
ProofOfDelivery
DeliveryAttempt
DeliveryWindow
```

Capacidades:

- roteirização
- tracking
- ETA
- janela de entrega
- confirmação
- falha de entrega
- reentrega

## 14.6 Reverse Logistics

Entidades:

```text
Return
ReturnRequest
ReturnAuthorization
Pickup
Inspection
Refund
Restock
Disposal
```

Fluxo:

```text
Customer
↓
Return Request
↓
Eligibility
↓
Pickup / Drop-off
↓
Inspection
↓
Refund / Exchange
↓
Restock / Repair / Disposal
```

## 14.7 Logistics Network

Entidades:

```text
Supplier
Factory
DistributionCenter
Warehouse
Store
Hub
DarkStore
PickupPoint
Customer
```

Aplicações:

- network design
- capacity planning
- sourcing
- routing
- omnichannel orchestration

---

# 15. Trust & Safety

Princípio de separação:

```text
Security protege o sistema.
Risk protege o negócio.
Trust & Safety protege os participantes e o ecossistema.
```

Estrutura proposta:

```text
TRUST & SAFETY
├── Identity Trust
├── Account Integrity
├── Content Safety
├── Behavioral Abuse
├── Fraud
├── Transaction Safety
├── Marketplace Integrity
├── Reputation
├── User Protection
├── Policy
├── Enforcement
├── Appeals
├── Moderation Operations
├── Investigations
└── Regulatory Trust
```

## 15.1 Identity Trust

Pergunta central:

> Essa pessoa ou empresa é quem diz ser?

Entidades:

```text
IdentityVerification
BusinessVerification
DeviceIdentity
Credential
TrustLevel
VerificationStatus
```

Capacidades:

- email verification
- phone verification
- document verification
- biometrics
- KYC
- KYB
- device fingerprinting
- account linking

## 15.2 Account Integrity

Entidades:

```text
Account
Device
Session
Network
Behavior
RiskSignal
```

Ameaças:

- account takeover
- bot accounts
- fake accounts
- multi-account abuse
- credential stuffing
- account farming
- identity spoofing

## 15.3 Content Safety

Entidades:

```text
Content
Policy
Violation
Classification
ModerationDecision
Appeal
```

Categorias possíveis:

- pornografia
- violência
- discurso de ódio
- assédio
- spam
- fraude
- produtos proibidos
- misinformation

Distinção importante:

```text
content legality
≠
content policy
≠
content quality
```

## 15.4 Behavioral Abuse

Inclui:

- harassment
- stalking
- spam
- mass messaging
- scraping
- brigading
- coordinated manipulation
- bots
- review manipulation
- incentive gaming

Modelo:

```text
Actor
Action
Target
Context
Signal
Pattern
Risk
```

## 15.5 Transaction Safety

Entidades:

```text
Buyer
Seller
Transaction
Payment
Delivery
Dispute
Evidence
```

Problemas típicos:

- seller fraud
- buyer fraud
- triangulation
- chargeback fraud
- fake goods
- non-delivery
- payment outside platform
- phishing
- social engineering

## 15.6 Fraud

Taxonomia:

```text
Fraud
├── Identity Fraud
├── Payment Fraud
├── Transaction Fraud
├── Promotion Abuse
├── Account Fraud
├── Seller Fraud
├── Buyer Fraud
├── Advertising Fraud
└── Internal Fraud
```

Pipeline comum:

```text
Signal
↓
Feature
↓
Risk Score
↓
Decision
↓
Action
↓
Investigation
```

## 15.7 Marketplace Integrity

Pergunta central:

> O mercado continua funcionando de maneira saudável?

Inclui:

- fake supply
- duplicate listings
- price manipulation
- collusion
- fake demand
- lead spam
- ranking manipulation
- review manipulation
- seller gaming
- artificial scarcity
- bid manipulation

Exemplo imobiliário:

```text
mesmo imóvel
+
10 anúncios
+
preços diferentes
+
corretores diferentes
```

Isso pode não ser fraude criminal, mas degrada a integridade do marketplace.

## 15.8 Reputation

Entidades:

```text
Review
Rating
Reputation
TrustScore
Badge
Verification
History
```

Problemas relevantes:

- reputação global vs contextual
- reputação bilateral
- decay temporal
- cold start
- retaliatory reviews
- fake reviews
- reputation transfer

## 15.9 User Protection

```text
UserProtection
├── Privacy
├── FinancialProtection
├── PhysicalSafety
├── ChildSafety
├── VulnerableUsers
└── ScamProtection
```

Exemplos:

```text
Uber:
driver safety
passenger safety
location sharing
SOS
```

```text
Marketplace:
safe meeting locations
scam warnings
phone masking
safe payments
```

```text
Fintech:
PIX scam detection
transaction limits
cooldown
confirmation
```

## 15.10 Policy Engine

Entidades:

```text
Policy
Rule
Violation
Severity
Enforcement
Exception
Jurisdiction
Version
```

Exemplo:

```yaml
policy: counterfeit_goods
severity: high
actions:
  - remove_listing
  - warn_seller
  - suspend_account
repeat_offense:
  - permanent_ban
```

## 15.11 Enforcement

Entidades / ações:

```text
Warning
Restriction
ContentRemoval
FeatureRestriction
TemporarySuspension
PermanentBan
FinancialHold
```

Fluxo:

```text
Detection
→ Decision
→ Enforcement
→ Appeal
→ Review
```

## 15.12 Appeals

Entidades:

```text
Appeal
Evidence
Decision
Reviewer
Outcome
```

## 15.13 Moderation Operations

Entidades:

```text
Queue
Case
Reviewer
Priority
SLA
Decision
Escalation
```

Modelo operacional:

```text
Machine
+
Rules
+
Human Review
```

## 15.14 Investigation / Case Management

Entidades:

```text
Case
Actor
Evidence
Signal
Timeline
Investigator
Decision
```

Conecta Trust & Safety, Fraud, Legal e CX.

## 15.15 Regulatory Trust

Em setores específicos:

```text
AML
Sanctions
PEP
KYC
KYB
TransactionMonitoring
SuspiciousActivity
```

Pode ser tratado como overlay regulatório sobre Trust & Safety e Compliance.

---

# 16. Data Platform

## 16.1 Telemetry

Entidades:

```text
Event
Metric
Log
Trace
```

É útil separar três mundos:

```text
Product Analytics
Business Analytics
Observability
```

## 16.2 Data Collection

```text
SDK
Event Collector
CDC
ETL
Streaming
Batch
```

## 16.3 Storage

```text
Operational DB
Data Warehouse
Data Lake
Lakehouse
Feature Store
Vector DB
```

## 16.4 Semantic Layer

Entidades:

```text
Metric
Dimension
Entity
Measure
BusinessDefinition
```

É onde vive, por exemplo:

> O que significa cliente ativo?

## 16.5 BI

```text
Dashboard
Report
Exploration
Alert
```

## 16.6 Experimentation

Entidades:

```text
Experiment
Variant
Assignment
Exposure
Metric
Result
```

Capacidades:

- A/B testing
- feature flags
- rollout
- holdout
- causal inference

## 16.7 ML / AI Platform

Entidades:

```text
Dataset
Feature
Model
Prompt
Agent
Evaluation
Inference
Embedding
Vector
```

Capacidades:

```text
training
inference
prompt management
RAG
evaluation
monitoring
agent orchestration
model registry
```

---

# 17. Developer Platform

## 17.1 Software Architecture

```text
Service
Module
API
Event
Domain
Schema
Contract
```

## 17.2 DevEx

```text
Repository
Template
SDK
CLI
Scaffolding
Documentation
```

## 17.3 CI/CD

```text
Build
Test
Artifact
Deploy
Release
Rollback
```

## 17.4 Infrastructure

```text
Compute
Network
Storage
Database
Queue
Cache
CDN
DNS
```

## 17.5 Observability

```text
Log
Metric
Trace
Alert
Incident
SLO
SLI
```

## 17.6 Reliability / SRE

```text
SLO
ErrorBudget
Incident
Runbook
Postmortem
Capacity
```

## 17.7 Security

```text
Secret
Certificate
Vulnerability
Threat
Policy
Audit
```

Capacidades:

- AppSec
- SecOps
- IAM
- secrets management
- vulnerability management
- threat detection

---

# 18. Business Operations

## 18.1 Workflow

```text
Task
Process
State
Approval
Assignment
```

## 18.2 Rules Engine

```text
Rule
Condition
Action
Decision
```

Uma grande quantidade de software empresarial pode ser resumida como:

> SE X e Y, então faça Z.

## 18.3 Configuration

```text
Config
FeatureFlag
Parameter
Policy
Environment
```

## 18.4 Scheduling

```text
Job
Schedule
Trigger
Execution
```

## 18.5 Notification

```text
Notification
Channel
Recipient
Template
Preference
```

---

# 19. People & Organizations

Dimensão transversal:

```text
Person
Organization
Team
BusinessUnit
LegalEntity
Location
Role
Relationship
```

Especialmente importante em software B2B e enterprise.

---

# 20. Regulatory Overlays

Setores regulados não quebram a taxonomia: eles adicionam constraints e capacidades especializadas.

## Banking

```text
Identity
Customer
Payments
Ledger
Risk
Compliance
+
KYC
AML
Basel
BACEN
Open Finance
PIX regulation
credit regulation
```

## Healthcare

```text
Patient
Consent
MedicalRecord
Prescription
+
HIPAA
ANS
ANVISA
```

## Insurance

```text
Policy
Premium
Claim
Risk
Underwriting
```

## Telecom

```text
Subscriber
Plan
Usage
Network
Billing
```

---

# 21. Domínios adicionais para ampliar a cobertura

Os domínios abaixo ampliam a ontologia para cobrir melhor aquisição, monetização, mundo físico, enterprise software, sistemas de decisão e produtos orientados por IA.

## 21.1 Growth & Acquisition

Responsável pela aquisição, ativação, retenção e expansão da base de usuários.

Capacidades:

- attribution
- campaign tracking
- referral
- affiliate
- SEO
- ASO
- landing pages
- conversion funnels
- activation
- retention
- lifecycle growth
- growth experimentation

Entidades típicas:

```text
Campaign
Channel
Touchpoint
Attribution
Referral
AcquisitionSource
Funnel
Activation
Cohort
```

## 21.2 Monetization

Representa os mecanismos pelos quais o produto captura valor econômico. É mais amplo que Pricing ou Payments.

Capacidades:

- commissions
- take rate
- subscriptions
- usage-based billing
- credits
- wallets
- revenue sharing
- incentives
- freemium
- packaging
- monetization experiments

```text
MonetizationModel
RevenueStream
Commission
TakeRate
Credit
Incentive
RevenueShare
```

## 21.3 AdTech / Advertising

Deve ser separado de marketing quando publicidade é parte do produto ou do modelo econômico.

```text
Advertiser
Campaign
AdGroup
Creative
Audience
Placement
Inventory
Bid
Auction
Impression
Click
Conversion
```

Capacidades:

- targeting
- audience building
- ad inventory
- auctions
- pacing
- frequency caps
- attribution
- conversion measurement
- brand safety
- yield optimization

## 21.4 Geospatial / Location

Domínio transversal para produtos em que localização faz parte do problema de negócio.

```text
Location
Address
Coordinate
Polygon
Geofence
POI
Route
Distance
Region
```

Capacidades:

- geocoding
- reverse geocoding
- geofencing
- spatial indexing
- proximity search
- maps
- routing
- travel-time estimation
- territory management

Aplicações: real estate, mobilidade, logística, delivery, turismo e local commerce.

## 21.5 Scheduling, Booking & Availability

Diferente de scheduling técnico de jobs. Representa disponibilidade de recursos de negócio no tempo.

```text
Resource
Availability
Slot
Reservation
Booking
Appointment
Capacity
Waitlist
```

Capacidades:

- availability calculation
- reservation
- booking
- capacity management
- cancellation
- rescheduling
- waitlists
- no-show handling
- conflict resolution

## 21.6 Workflow / BPM

Eleva Workflow de capacidade operacional para um domínio de primeira classe em produtos enterprise.

```text
Process
Workflow
State
Task
Assignment
Approval
Escalation
SLA
```

Capacidades:

- state machines
- approvals
- task routing
- human-in-the-loop
- orchestration
- escalation
- SLA management
- process versioning

## 21.7 Document Management

```text
Document
Version
Template
Attachment
Metadata
Signature
RetentionPolicy
Archive
```

Capacidades:

- document creation
- versioning
- access control
- document extraction
- electronic signature
- archival
- retention
- search
- classification

## 21.8 Communication & Collaboration

Diferente de CRM outbound; cobre comunicação bidirecional e colaboração entre usuários.

```text
Conversation
Thread
Message
Comment
Mention
Attachment
Presence
Participant
```

Capacidades:

- chat
- inbox
- threads
- comments
- mentions
- attachments
- presence
- collaborative editing
- notification synchronization

## 21.9 Partner & Ecosystem Management

Especialmente importante em modelos B2B2C e negócios baseados em canais.

```text
Partner
Channel
Reseller
Distributor
Affiliate
Integrator
Certification
Commission
PartnerContract
```

Capacidades:

- partner onboarding
- partner portal
- channel management
- certification
- revenue sharing
- commission calculation
- enablement
- partner performance

## 21.10 Vendor / Supplier Management

```text
Supplier
Vendor
SourcingEvent
PurchaseOrder
SupplierContract
SLA
QualityScore
```

Capacidades:

- sourcing
- supplier onboarding
- procurement
- purchase orders
- quality management
- vendor scorecards
- contract management

## 21.11 Asset Management

Para produtos conectados a ativos físicos ou digitais de longa duração.

```text
Asset
Equipment
Ownership
Location
MaintenancePlan
WorkOrder
Lifecycle
Depreciation
```

Capacidades:

- asset registry
- lifecycle management
- ownership
- maintenance
- inspections
- depreciation
- telemetry linkage

## 21.12 IoT / Device Management

```text
Device
DeviceIdentity
Firmware
Telemetry
Command
Connection
DigitalTwin
```

Capacidades:

- provisioning
- authentication
- firmware management
- telemetry ingestion
- remote commands
- connectivity management
- fleet management
- digital twins

## 21.13 Content Rights & Licensing

Importante para media, publishing, educação, software e marketplaces de conteúdo.

```text
Work
Right
License
Territory
RightsWindow
Royalty
Usage
Owner
```

Capacidades:

- copyright management
- licensing
- territory restrictions
- availability windows
- royalties
- rights enforcement

## 21.14 Localization & Internationalization

```text
Locale
Language
Currency
Timezone
Jurisdiction
Translation
RegionalConfig
```

Capacidades:

- translation
- locale formatting
- timezone handling
- multi-currency
- regional configuration
- jurisdiction-aware behavior

## 21.15 Accessibility

Capacidade transversal de qualidade e inclusão de produto.

Capacidades:

- WCAG compliance
- keyboard navigation
- screen-reader semantics
- captions
- alternative text
- focus management
- contrast validation
- accessible forms

## 21.16 Product Configuration / CPQ

Particularmente relevante para enterprise sales e produtos configuráveis.

```text
Configuration
Option
CompatibilityRule
Bundle
Quote
Proposal
PriceRule
```

Capacidades:

- configure
- price
- quote
- bundle composition
- compatibility validation
- proposal generation

## 21.17 Contract Lifecycle Management

Expande Legal para o ciclo operacional dos contratos.

```text
Contract
Clause
Obligation
Approval
Signature
Renewal
Termination
```

Capacidades:

- drafting
- negotiation
- approvals
- signature
- obligation tracking
- renewal
- termination

## 21.18 Credit & Lending

Overlay financeiro necessário para representar produtos de crédito.

```text
Application
Applicant
CreditScore
UnderwritingDecision
Limit
Loan
Installment
Collateral
```

Capacidades:

- application
- underwriting
- eligibility
- limit management
- loan origination
- servicing
- repayment
- collateral management

## 21.19 Collections & Debt Management

Pode existir em bancos, fintechs, utilities, SaaS, marketplaces e telecom.

```text
Receivable
Delinquency
CollectionCase
PromiseToPay
Renegotiation
Recovery
```

Capacidades:

- delinquency detection
- dunning
- collections
- renegotiation
- recovery
- write-off

## 21.20 Treasury

```text
BankAccount
CashPosition
Liquidity
FXPosition
Transfer
Forecast
```

Capacidades:

- cash management
- liquidity management
- reconciliation
- cash forecasting
- foreign exchange
- treasury controls

## 21.21 Decision Systems / Decisioning

Generaliza mecanismos hoje espalhados entre Fraud, Pricing, Eligibility e Rules Engines.

```text
Decision
Policy
Rule
Score
Feature
Model
Eligibility
ReasonCode
```

Pipeline conceitual:

```text
Context
→ Signals
→ Features
→ Rules / Models
→ Decision
→ Reason
→ Action
```

Aplicações:

- crédito
- fraude
- aprovação
- elegibilidade
- pricing
- trust & safety
- underwriting
- lead routing

## 21.22 Optimization

Representa problemas em que não basta decidir: é necessário encontrar a melhor configuração sob restrições.

```text
Objective
Constraint
DecisionVariable
Scenario
Solution
```

Aplicações:

- route optimization
- inventory allocation
- pricing optimization
- matching optimization
- workforce optimization
- scheduling optimization
- portfolio optimization

## 21.23 Simulation & Digital Twins

Domínio útil para experimentar sistemas antes de alterar o mundo real.

```text
Scenario
Environment
Agent
SimulationRun
State
Counterfactual
Outcome
```

Capacidades:

- scenario simulation
- synthetic agents
- event replay
- counterfactual analysis
- stress testing
- Monte Carlo simulation
- digital twins

## 21.24 Knowledge Management

Diferente de Information Retrieval. Retrieval encontra informação; Knowledge Management organiza conhecimento e seus significados.

```text
Concept
Taxonomy
Ontology
Entity
Relationship
GlossaryTerm
KnowledgeGraph
Source
Provenance
```

Capacidades:

- taxonomy management
- ontology management
- knowledge graphs
- business glossary
- provenance
- expertise discovery
- knowledge curation

## 21.25 Master Data Management

Responsável pelos registros mestres compartilhados entre domínios e sistemas.

```text
MasterEntity
GoldenRecord
SourceRecord
Match
Merge
CanonicalIdentifier
```

Principais masters:

- customer master
- product master
- supplier master
- organization master
- location master

Capacidades:

- entity resolution
- deduplication
- survivorship rules
- golden-record management
- synchronization

## 21.26 Data Governance

Mais amplo que Privacy ou LGPD.

```text
Dataset
DataOwner
DataSteward
Classification
Lineage
QualityRule
AccessPolicy
```

Capacidades:

- data catalog
- lineage
- ownership
- stewardship
- quality management
- classification
- retention
- access governance

## 21.27 Business Continuity & Disaster Recovery

Complementa SRE e Infrastructure.

```text
CriticalService
Backup
RecoveryPlan
Failover
Incident
RTO
RPO
```

Capacidades:

- backup
- restore
- disaster recovery
- failover
- crisis management
- continuity testing

## 21.28 FinOps

Domínio de gestão econômica da infraestrutura e serviços tecnológicos.

```text
Cost
Resource
Allocation
Budget
UnitCost
Forecast
```

Capacidades:

- cloud cost attribution
- cost allocation
- budgets
- forecasting
- unit economics
- optimization
- chargeback / showback

## 21.29 Internal Developer Platform

Vai além de DevEx e fornece capacidades internas de plataforma como produto.

```text
Service
Owner
Template
GoldenPath
Environment
Resource
Dependency
```

Capacidades:

- service catalog
- golden paths
- environment provisioning
- self-service infrastructure
- templates
- platform APIs
- ownership catalog

## 21.30 AI Governance

Torna explícita a governança de modelos, agentes e sistemas generativos.

```text
Model
Prompt
Agent
Dataset
Evaluation
Risk
Policy
Approval
Deployment
```

Capacidades:

- model registry
- evaluation
- model risk
- dataset provenance
- prompt governance
- safety evaluation
- explainability
- human oversight
- approval gates
- auditability

---

## 21.31 Classificação dos domínios por natureza

Uma distinção útil para tornar a ontologia computável:

### Universais ou quase universais

```text
Identity
Telemetry
Security
Admin
Configuration
Observability
Customer
```

### Ativados pelo modelo de negócio

```text
Marketplace         → matching, liquidity, marketplace integrity
Physical Commerce   → inventory, logistics, returns
Advertising         → AdTech
Subscription        → entitlements, recurring billing
B2B2C               → partner ecosystem
IoT                  → device management
Credit              → underwriting, collections
```

### Ativados por propriedades do produto

```text
has_physical_goods      → logistics
has_user_generated_content → moderation
uses_location           → geospatial
has_bookable_capacity   → booking
has_configurable_offer  → CPQ
uses_ai_models          → AI governance
```

### Ativados por contexto ou restrição

```text
regulated_sector = banking → KYC + AML + regulatory reporting
serves_children = true      → child safety
operates_globally = true    → localization
processes_personal_data     → privacy governance
high_availability_required  → DR + continuity controls
```

---

# 22. Macro Capability Map Consolidado — v2

```text
DIGITAL PRODUCT CAPABILITY MAP
│
├── 1. BUSINESS & GROWTH
│   ├── Business Model
│   ├── Growth & Acquisition
│   ├── Monetization
│   ├── Advertising / AdTech
│   ├── Partner Ecosystem
│   └── Revenue Operations
│
├── 2. CUSTOMER & IDENTITY
│   ├── Identity & Access
│   ├── Customer / Account
│   ├── Organization
│   ├── CRM
│   ├── Communication
│   └── Collaboration
│
├── 3. COMMERCE & OFFERING
│   ├── Catalog
│   ├── Pricing
│   ├── Product Configuration / CPQ
│   ├── Inventory
│   ├── Cart
│   ├── Order
│   ├── Subscription
│   └── Entitlements
│
├── 4. FINANCIAL
│   ├── Payments
│   ├── Billing
│   ├── Ledger
│   ├── Settlement
│   ├── Fiscal
│   ├── Credit & Lending
│   ├── Collections
│   └── Treasury
│
├── 5. MARKETPLACE
│   ├── Supply
│   ├── Demand
│   ├── Matching
│   ├── Leads
│   ├── Liquidity
│   ├── Reputation
│   └── Marketplace Governance
│
├── 6. INFORMATION ACCESS & DISCOVERY
│   ├── Ingestion
│   ├── Indexing
│   ├── Query Understanding
│   ├── Retrieval
│   │   ├── Lexical
│   │   ├── Semantic
│   │   ├── Structured
│   │   ├── Graph
│   │   └── Hybrid
│   ├── Candidate Generation
│   ├── Ranking / Re-ranking
│   ├── Filtering & Faceting
│   ├── Geo Search
│   ├── Multimodal Retrieval
│   ├── Recommendation
│   ├── Personalization
│   ├── Knowledge Retrieval / RAG
│   └── Relevance Evaluation
│
├── 7. CONTENT & KNOWLEDGE
│   ├── Content Management
│   ├── Document Management
│   ├── Content Rights & Licensing
│   ├── Knowledge Management
│   ├── Taxonomy / Ontology
│   └── Master Data Management
│
├── 8. PHYSICAL WORLD & OPERATIONS
│   ├── Procurement
│   ├── Supplier Management
│   ├── Inventory
│   ├── Warehousing
│   ├── Fulfillment
│   ├── Transportation
│   ├── Last Mile
│   ├── Reverse Logistics
│   ├── Supply Chain
│   ├── Geospatial
│   ├── Asset Management
│   └── IoT / Device Management
│
├── 9. SCHEDULING & RESOURCE ALLOCATION
│   ├── Availability
│   ├── Booking
│   ├── Reservations
│   ├── Capacity
│   ├── Scheduling
│   └── Optimization
│
├── 10. TRUST, RISK & SAFETY
│   ├── Identity Trust
│   ├── Account Integrity
│   ├── Content Safety
│   ├── Behavioral Abuse
│   ├── Fraud
│   ├── Transaction Safety
│   ├── Marketplace Integrity
│   ├── User Protection
│   ├── Policy
│   ├── Enforcement
│   ├── Appeals
│   ├── Moderation Operations
│   └── Investigation
│
├── 11. ENTERPRISE OPERATIONS
│   ├── Admin / Backoffice
│   ├── ERP
│   ├── Workflow / BPM
│   ├── Rules Engine
│   ├── Decision Systems
│   ├── Legal
│   ├── Contract Lifecycle
│   ├── Support / CX
│   └── Vendor Management
│
├── 12. DATA & INTELLIGENCE
│   ├── Telemetry
│   ├── Data Collection
│   ├── Lake / Warehouse / Lakehouse
│   ├── Semantic Layer
│   ├── BI
│   ├── Experimentation
│   ├── Data Governance
│   ├── ML / AI
│   ├── Optimization
│   └── Simulation / Digital Twins
│
├── 13. PLATFORM ENGINEERING
│   ├── Architecture
│   ├── APIs
│   ├── Integration
│   ├── DevEx
│   ├── Internal Developer Platform
│   ├── CI/CD
│   ├── Infrastructure
│   ├── Observability
│   ├── SRE
│   ├── Security
│   ├── FinOps
│   └── Business Continuity / DR
│
└── 14. GOVERNANCE & CROSS-CUTTING CONCERNS
    ├── Privacy
    ├── Compliance
    ├── Audit
    ├── Data Governance
    ├── AI Governance
    ├── Accessibility
    ├── Localization / Internationalization
    └── Regulatory Overlays
```

Este mapa não implica que todos os produtos precisem de todos os domínios. A ontologia deve permitir que capacidades sejam ativadas a partir das propriedades do negócio e das restrições operacionais, legais e arquiteturais.

---

# 23. Capability Activation por propriedades do negócio

Nem todos os domínios são universais. Parte do valor dessa ontologia é permitir inferência arquitetural.

```text
has_physical_goods = true
→ activate logistics

is_multisided_market = true
→ activate marketplace_integrity

has_user_generated_content = true
→ activate moderation

moves_money = true
→ activate payment_risk

regulated_sector = banking
→ activate KYC + AML + BACEN

serves_children = true
→ activate child_safety
```

Exemplo de configuração de negócio:

```yaml
business:
  model: marketplace
  sides:
    - consumer
    - business

physical_goods: true
payments: true
user_generated_content: true
regulated: false
geography:
  - brazil
```

A partir disso, um agente poderia inferir:

```text
Catalog required
Orders required
Payments required
Inventory required
Fulfillment required
Returns required
Fraud required
Moderation required
Marketplace Integrity required
LGPD required
Fiscal required
Admin required
Telemetry required
```

---

# 24. Domínios como artefatos legíveis por agentes

Cada domínio pode ser descrito de forma declarativa.

Exemplo de Payments:

```yaml
domain: payments

entities:
  - payment
  - refund
  - payout
  - settlement

capabilities:
  - authorize
  - capture
  - refund
  - reconcile

dependencies:
  - identity
  - customer
  - order
  - ledger

events:
  - payment.created
  - payment.authorized
  - payment.failed
  - payment.refunded

interfaces:
  - api
  - webhook
  - admin

non_functional:
  auditability: high
  availability: high
  consistency: strong

compliance:
  - pci_dss
```

Exemplo de Information Retrieval:

```yaml
domain: information_retrieval

entities:
  - document
  - index
  - query
  - candidate
  - result
  - ranking_signal
  - embedding
  - filter
  - facet
  - relevance_judgment

capabilities:
  - ingest
  - index
  - parse_query
  - retrieve
  - rank
  - rerank
  - filter
  - facet
  - personalize
  - evaluate

dependencies:
  - catalog
  - identity
  - telemetry
  - experimentation
  - ml_platform

interfaces:
  - search_api
  - autocomplete_api
  - recommendation_api
  - admin_console
```

---

# 25. Software Architecture Compiler

Fluxo tradicional:

```text
Problem
↓
PRD
↓
Architecture
↓
Backlog
↓
Code
```

Fluxo possível em uma organização agentic:

```text
Business Model
+
Capability Map
+
Business Rules
+
Constraints
+
Design System
+
Engineering Standards
+
Architecture Standards
        ↓
      Agent
        ↓
Software System
```

O produto específico poderia ser entendido como:

> Reusable domains + configuration + business rules + custom UX.

Isso sugere uma evolução de coding assistant para algo mais próximo de um **software architecture compiler**.

---

# 26. Estrutura proposta de repositório

```text
digital-product-ontology/

00-principles/

01-business-archetypes/
    ecommerce/
    marketplace/
    saas/
    fintech/
    ads/
    data-product/
    platform/

02-core-domains/
    identity/
    customer/
    organization/
    catalog/
    pricing/
    orders/
    payments/
    subscriptions/

03-information-access/
    ingestion/
    indexing/
    query-understanding/
    retrieval/
    ranking/
    faceting/
    recommendation/
    personalization/
    knowledge-retrieval/

04-growth/
    crm/
    communications/
    experimentation/

05-enterprise/
    admin/
    erp/
    fiscal/
    legal/
    support/

06-trust-safety/
    identity-trust/
    account-integrity/
    content-safety/
    behavioral-abuse/
    fraud/
    transaction-safety/
    marketplace-integrity/
    reputation/
    user-protection/
    policy/
    enforcement/
    appeals/
    investigations/

07-physical-operations/
    procurement/
    inventory/
    warehousing/
    fulfillment/
    transportation/
    delivery/
    returns/
    supply-chain/

08-data/
    telemetry/
    semantic-layer/
    warehouse/
    experimentation/
    ml-platform/

09-platform/
    architecture/
    integration/
    devex/
    cicd/
    sre/
    observability/
    security/

10-industry-overlays/
    banking/
    insurance/
    healthcare/
    real-estate/
    automotive/
    logistics/

11-reference-architectures/
    marketplace-b2c/
    marketplace-b2b2c/
    saas-b2b/
    ecommerce/
    fintech/
```

Estrutura padrão por domínio:

```text
README.md
domain.yaml

entities.yaml
capabilities.yaml
events.yaml
apis.yaml
workflows.yaml
rules.yaml

security.yaml
privacy.yaml
observability.yaml
slo.yaml

tests/
examples/
```

---

# 27. Hipótese maior: uma gramática formal de produtos digitais

A pergunta central passa a ser:

> Qual é o menor conjunto de primitivas capaz de representar, por composição, 80–90% dos produtos digitais existentes?

Se esse conjunto puder ser formalizado de maneira suficientemente rigorosa, ele pode servir como:

- taxonomia de software empresarial
- capability map
- ontologia computável
- linguagem intermediária para agentes
- base para arquiteturas de referência
- gerador de domínios e contratos
- ferramenta de governança arquitetural
- base para testing e compliance automatizados
- mecanismo de comparação entre produtos e empresas

Nesse limite, o objetivo deixa de ser apenas construir um framework de desenvolvimento.

Passa a ser construir uma espécie de **tabela periódica de produtos digitais** e, acima dela, uma **gramática formal para construção de software por agentes**.
