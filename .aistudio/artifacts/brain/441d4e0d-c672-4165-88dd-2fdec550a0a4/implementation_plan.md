# ConnectRAG — Resilient Retrieval Intelligence Across Dynamic Networks

ConnectRAG is a research-grade, connectivity-aware Retrieval-Augmented Generation (RAG) platform that maintains uninterrupted access to critical medical and public-health knowledge during network degradation, instability, or total blackout. The application pairs a high-precision Data Lab visualizing real corpus curation statistics with an interactive Live Demo simulating autonomous multi-tier routing (Cloud RAG, Local Edge SLM, Cached Knowledge) governed by a concrete Network Quality Score (NQS), Hysteresis, and a dual-branch Siamese Bi-Encoder semantic retrieval engine.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> The implementation plan incorporates all concrete specifications from your methodology and critique differentiation brief, visual design system tokens (Midnight Slate `#080D18`, Electric Cyan `#42D9F5`, Teal `#2DD4BF`), and the Siamese Bi-Encoder dual-branch retrieval topology.

- **Confirmed Default Landing Screen**: **Command Center** with high-level KPI cards, interactive 3-tier architecture preview, and quick-action links to Live Demo and Data Lab.
- **Confirmed Medical Domain Strategy**: **Dual-Switchable Mode** highlighting both rural/emergency healthcare advisory (NHM, ICMR, WHO-India protocols) and general clinical medicine reference (MedQuAD, MedMCQA, Harrison's Internal Medicine, Oxford Clinical Handbook).
- **Core Concrete Mechanisms Built**:
  1. *Connectivity Monitor & Explicit NQS Formula*: $NQS = 0.35 \cdot \text{BW}_{\text{norm}} + 0.30 \cdot (1 - \text{RTT}_{\text{norm}}) + 0.20 \cdot (1 - \text{Loss}_{\text{norm}}) + 0.15 \cdot (1 - \text{Jitter}_{\text{norm}})$.
  2. *Hysteresis Layer*: 3 consecutive degradation samples required to downgrade tier; single-sample recovery allowed for upgrade to restore quality immediately.
  3. *Query Complexity Estimator*: Heuristic score based on token length and analytical keywords (`explain`, `compare`, `contraindicated`, `differential`).
  4. *Tier Orchestration Decision Table*: $Tier = f(NQS, \text{Complexity})$ routing to Tier 1 Cloud ($\ge 70$), Tier 2 Local Edge ($30\text{–}69$), or Tier 3 Cache ($< 30$).
  5. *Tier 2 Self-Consistency Confidence Estimator*: Agreement check across dual local generations with cloud escalation trigger.
  6. *Tier 3 Cosine Cache*: Indexed Q&A embeddings with cosine similarity threshold $\ge 0.85$ and 30-day TTL.
  7. *Siamese Bi-Encoder Retrieval Engine*: Query Encoder + Document Encoder with shared weights feeding FAISS similarity search across Tier 1 and Tier 2.

***

## 1. Overview & Core Concept

- **What It Does**: ConnectRAG addresses the fatal vulnerability of conventional cloud-dependent RAG systems in critical domains such as rural clinics, disaster zones, and bandwidth-constrained hospitals: when the network drops, knowledge retrieval collapses. ConnectRAG monitors link telemetry in real time, computes an actionable Network Quality Score (NQS), and autonomously routes inquiries across three distinct execution tiers while maintaining semantic retrieval precision via fine-tuned Siamese Bi-Encoders.
- **Target Audience & Persona**: AI researchers, clinical informaticians, healthcare infrastructure architects, viva examination panels, and health ministry technical advisors evaluating resilient edge-AI deployment.
- **Key Value Proposition**: *"Knowledge That Survives Disconnection."* Zero downtime and zero disruption: full cloud reasoning when connectivity permits, seamless degradation to quantized on-device SLMs when bandwidth plummets, and instant air-gapped retrieval from pre-warmed cached protocols during complete outages.

***

## 2. User Experience & Visual Design

### Key User Flows

1. **Orientation & Global Monitoring (Command Center)**:
   - High-level KPI strip: Total Corpus Chunks (8,420), Training Pairs (24,150), Datasets Processed (4 major corpora), Retrieval Modes (3 autonomous tiers).
   - Interactive 3-Tier Topology Diagram showing live routing conditions and tier readiness.
   - Recent pipeline activity feed and quick action paths to Data Lab and Live Demo.

2. **Interactive Simulation & Diagnostic Console (Live Demo)**:
   - Prominent NQS Gauge (0–100) with dynamic stability wave and telemetry readouts (RTT, bandwidth, packet loss, jitter).
   - Network Condition Simulator with interactive slider, quick scenario presets (*Excellent [90]*, *Unstable [54]*, *Weak [32]*, *Intermittent [18]*, *Fully Offline [0]*), and a dedicated *"Simulate 5s Network Blackout & Fallback"* trigger.
   - Execution Topology cards for Tier 1 (Cloud RAG), Tier 2 (Local Edge SLM), and Tier 3 (Cached Knowledge) highlighting active status and latency.
   - Knowledge Query Console with clinical questions (Meningitis, Metformin in CKD, Anaphylaxis, Snakebite protocol), simulated multi-tier synthesis, latency readouts, and expandable retrieved source context nodes grounded in Harrison's and Oxford handbooks.
   - Ring buffer telemetry timeline and 4-step architectural recovery lifecycle stepper (*Drop Detect → Local Route → Health Probe → Cloud Sync*).

3. **Research-Grade Corpus Analytics (Data Lab)**:
   - MedQuAD Source Mix: Before-vs-after comparison of GHR/GARD capping (NIH, NIDDK, CDC, GARD, GHR) with toggle between absolute counts and percentage shares.
   - MedMCQA Subject Distribution: Ranked horizontal bar chart spanning top medical subjects (Pharmacology, Pathology, Medicine, Surgery, Microbiology, etc.) with search filter and count/percentage toggle.
   - Corpus Ingestion Map: Document-level chunking breakdown across medical PDFs with rank, chunk count, and total corpus contribution percentage.
   - Training Data Composition: Grouped bar chart comparing Train, Validation, and Test pair counts across MedQuAD, MedMCQA, and PubMedQA.
   - Research Data Quality Summary: Capping audit, split verification, and corpus health checklist.

4. **Corpus & Sample Inspection (Dataset Explorer)**:
   - Searchable, filterable data grid of medical corpora with stage indicators, record counts, and provenance metadata.
   - Slide-over detail drawer displaying category breakdowns, token distributions, and chunking parameters.

5. **Offline Training & Preparation Pipeline (Training Analytics)**:
   - 6-Stage sequential pipeline tracker: *Dataset Preparation → Pair Generation → Siamese Bi-Encoder Fine-Tuning (Contrastive Learning) → Embedding Generation → FAISS Index Construction → Artifacts Saved & Deployed*.
   - Siamese contrastive loss training progression and pending evaluation benchmark placeholder.

6. **System Architecture & Viva Defense (Architecture & Methodology)**:
   - High-fidelity system architecture diagram featuring the Siamese Bi-Encoder dual branches (Query Encoder + Document Encoder), shared weights, FAISS vector search, and Predictive Synchronizer.
   - Formal mathematical formulation of NQS, Hysteresis, and Query Complexity.
   - Phased 7-stage project implementation methodology (Weeks 1–16).
   - Comprehensive Critique Differentiation matrix (Adopted vs. Rejected with explicit academic justifications).
   - Core vs. Stretch scope breakdown.

### Visual Identity & Theme Tokens

- **Canvas Base**: Midnight Slate `#080D18`
- **Surface Layer 1**: Deep Navy `#0D1422`
- **Surface Layer 2 (Cards)**: Slate Blue `#111B2C`
- **Surface Layer 3 (Hover/Elevated)**: Muted Indigo `#162236`
- **Structural Borders**: Hairline `#24334A` (Active `#384F73`)
- **Primary Accent**: Electric Cyan `#42D9F5`
- **Secondary Accent**: Engine Teal `#2DD4BF`
- **Status Semantic**: Healthy (`#34D399`), Degraded (`#FBBF24`), Critical/Offline (`#FB7185`)
- **Typography**: Clean contemporary sans (`Plus Jakarta Sans` / `Geist`) paired with `JetBrains Mono` for tabular metrics, telemetry, and equations.

***

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Academic & Practical Rationale | Alternative Rejected |
|---|---|---|---|
| **Routing Algorithm** | Transparent Decision Table $f(NQS, \text{Complexity})$ + Hysteresis | Explainable, provable, and defensible in viva examinations without requiring synthetic unvalidated training labels. | Complex ML router (XGBoost/RL) rejected due to lack of ground-truth tier logs. |
| **Local Model Reliability** | Self-Consistency Check (dual sampling token overlap) | Works directly with quantized edge engines (Ollama/Gemma/Phi) without requiring uncalibrated log-probs. | Calibrated log-probability confidence (brittle across quantized models). |
| **Tier 3 Cache Granularity** | Final Q&A Embeddings + Source Citations (Cosine $\ge 0.85$, 30d TTL) | Immediately returns complete, validated safety protocols with zero compute or embedding generation overhead during total blackouts. | Raw vector chunk cache (requires local LLM synthesis, defeating low-power edge goals). |
| **Semantic Retrieval Engine** | Siamese Bi-Encoder with shared weights | Symmetric dual-tower architecture enables offline document indexing into FAISS while running fast real-time query encoding across both Cloud and Local tiers. | Asymmetric Cross-Encoder (computationally prohibitive for edge devices). |
| **Architecture Presentation** | Interactive SVG/Canvas diagram with toggleable runtime & offline dataflows | Provides clean, inspectable diagrams with solid runtime arrows and dashed synchronization paths matching viva requirements. | Static non-interactive PNG image. |

***

## 4. Technical Architecture & Data Strategy

```
                          ┌──────────────────────────────────────────────┐
                          │         User Query (Medical Inquiry)          │
                          └──────────────────────┬───────────────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
     ┌────────────────────────────┐                              ┌───────────────────────────┐
     │  Query Complexity Engine   │                              │   Connectivity Monitor    │
     │  (Tokens + Keyword Heur)   │                              │   (RTT, BW, Loss, Jitter) │
     └─────────────┬──────────────┘                              └─────────────┬─────────────┘
                   │                                                           │
                   │                                                           ▼
                   │                                             ┌───────────────────────────┐
                   │                                             │   Network Quality Score   │
                   │                                             │   (NQS) + Hysteresis (N=3)│
                   │                                             └─────────────┬─────────────┘
                   │                                                           │
                   └─────────────────────────────┬─────────────────────────────┘
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │      Tier Orchestrator      │
                                  │      (Decision Table)       │
                                  └──────────────┬──────────────┘
                                                 │
         ┌───────────────────────────────────────┼──────────────────────────────────────┐
         │ (NQS >= 70)                           │ (30 <= NQS < 70)                     │ (NQS < 30)
         ▼                                       ▼                                      ▼
┌──────────────────┐                   ┌──────────────────┐                   ┌──────────────────┐
│  Tier 1: Cloud   │                   │  Tier 2: Local   │                   │  Tier 3: Cache   │
│  Hosted Vector   │                   │  On-Device SLM   │                   │  Pre-warmed Q&A  │
└────────┬─────────┘                   └────────┬─────────┘                   └────────┬─────────┘
         │                                       │                                      │
         └───────────────────┬───────────────────┘                                      │
                             ▼                                                          │
              ┌─────────────────────────────┐                                           │
              │  Siamese Bi-Encoder Engine  │                                           │
              │  Branch A: Query Encoder    │                                           │
              │  Branch B: Doc Index (FAISS)│                                           │
              └──────────────┬──────────────┘                                           │
                             │                                                          │
                             ▼                                                          │
              ┌─────────────────────────────┐                                           │
              │   Top-K Context Grounding   │                                           │
              └──────────────┬──────────────┘                                           │
                             │                                                          │
                             ▼                                                          │
              ┌─────────────────────────────┐                                           │
              │    Response Synthesis       │                                           │
              │ (Confidence Check in Tier 2)│                                           │
              └──────────────┬──────────────┘                                           │
                             │                                                          │
                             └───────────────────┬──────────────────────────────────────┘
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │   Verified Medical Answer   │
                                  └──────────────┬──────────────┘
                                                 │ (Opportunistic Sync when NQS High)
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │   Predictive Synchronizer   │
                                  │ (Refreshes Local FAISS/Cache│
                                  └─────────────────────────────┘
```

### Component & Screen Mapping

1. `src/types/connectrag.ts`: Core interfaces for NQS telemetry, routing decisions, dataset statistics, training pipeline stages, query results, and source documents.
2. `src/data/mockCorpusData.ts`: Complete data models for:
   - MedQuAD pre- and post-capping statistics (GHR, GARD, NIH, NIDDK, CDC).
   - MedMCQA 21-subject distribution with question counts.
   - Medical PDF corpus chunking statistics (Harrison's, Oxford Clinical, WHO-India protocols, ICMR emergency manuals).
   - Training pair counts per dataset with Train/Val/Test splits.
   - Comprehensive query database with clinical responses, latency, and grounded source citations.
3. `src/components/Sidebar.tsx`: Persistent navigation with custom geometric ConnectRAG brand logo, status indicators, and screen router.
4. `src/components/TopBar.tsx`: Contextual breadcrumb, domain switch, quick search modal, and system status indicator.
5. `src/views/CommandCenterView.tsx`: Hero overview, KPI cards, interactive 3-tier architecture preview, and quick-action cards.
6. `src/views/LiveDemoView.tsx`: Full telemetry console, interactive NQS slider, scenario presets, 5s blackout simulator, active tier cards, query console, retrieved context cards, ring buffer log, and architectural recovery stepper.
7. `src/views/DataLabView.tsx`: High-precision analytics charts for MedQuAD capping impact, MedMCQA distribution, PDF chunking map, and training pair splits.
8. `src/views/DatasetExplorerView.tsx`: Searchable data catalog with slide-over drawer and token distribution inspectors.
9. `src/views/TrainingAnalyticsView.tsx`: 6-stage training pipeline visualization, Siamese Bi-Encoder contrastive learning dynamics, and evaluation placeholders.
10. `src/views/ArchitectureView.tsx`: Interactive Siamese Bi-Encoder retrieval flow diagram, formal mathematical definitions, 16-week phased methodology, critique differentiation matrix, and core vs. stretch scope.

***

## 5. Verification Plan

1. **Compilation & Type Safety**: Run `compile_applet` and `lint_applet` to ensure zero TypeScript errors or missing imports.
2. **Interactive Simulation Verification**:
   - Verify slider adjustments (0–100) update NQS gauge, telemetry metrics, and trigger autonomic tier transitions.
   - Verify preset buttons immediately apply calibrated network conditions.
   - Test 5-second network blackout trigger: drops NQS to 0, shifts to Tier 3 Cache, recovers to Tier 2 (Local), and restores to Tier 1 (Cloud).
   - Test query execution across varied sample questions and verify tier-specific responses and source context grounding.
3. **Data Lab Verification**:
   - Verify MedQuAD source mix comparison toggle (Counts vs. Percentage Share).
   - Verify MedMCQA subject search filter and sorting.
   - Verify PDF chunk ranking and contribution calculations.
4. **Responsive Layout Check**: Verify seamless presentation on both wide desktop (1440px) and compact tablet/mobile viewports.
