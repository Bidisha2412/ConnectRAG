import {
  MedQuADSourceItem,
  MedMCQASubjectItem,
  CorpusPdfItem,
  TrainingDatasetItem,
  PipelineStageItem,
  CritiqueItem,
  MethodologyPhase,
  ClinicalQuery,
  RetrievedSource
} from '../types/connectrag';

export const MEDQUAD_SOURCES: MedQuADSourceItem[] = [
  {
    source: 'GHR (Genetics Home Reference)',
    originalCount: 16245,
    postCapCount: 6500,
    origPct: 34.2,
    postCapPct: 17.8,
    description: 'Rare genetic disorders and molecular mechanisms. Heavily over-indexed prior to capping.'
  },
  {
    source: 'GARD (Rare Diseases)',
    originalCount: 12480,
    postCapCount: 6500,
    origPct: 26.3,
    postCapPct: 17.8,
    description: 'NIH Genetic and Rare Diseases Information Center condition summaries.'
  },
  {
    source: 'NIDDK (Diabetes & Digestive)',
    originalCount: 4890,
    postCapCount: 4890,
    origPct: 10.3,
    postCapPct: 13.4,
    description: 'National Institute of Diabetes and Digestive and Kidney Diseases primary guides.'
  },
  {
    source: 'CDC Public Health FAQ',
    originalCount: 3920,
    postCapCount: 3920,
    origPct: 8.3,
    postCapPct: 10.7,
    description: 'Epidemiology, infection control, and vector transmission protocols.'
  },
  {
    source: 'NHLBI (Heart, Lung, Blood)',
    originalCount: 3810,
    postCapCount: 3810,
    origPct: 8.0,
    postCapPct: 10.4,
    description: 'Cardiovascular, respiratory, and hematological guidelines.'
  },
  {
    source: 'Cancer.gov (NCI)',
    originalCount: 3450,
    postCapCount: 3450,
    origPct: 7.3,
    postCapPct: 9.4,
    description: 'Oncology protocols, staging classifications, and therapy monographs.'
  },
  {
    source: 'NIAMS (Arthritis & Skin)',
    originalCount: 2662,
    postCapCount: 2662,
    origPct: 5.6,
    postCapPct: 7.3,
    description: 'Musculoskeletal, autoimmune, and dermatological management.'
  },
  {
    source: 'NIH SeniorHealth',
    originalCount: 2040,
    postCapCount: 2040,
    origPct: 4.3,
    postCapPct: 5.6,
    description: 'Geriatric health concerns, polypharmacy, and age-related syndromes.'
  }
];

export const MEDMCQA_SUBJECTS: MedMCQASubjectItem[] = [
  { subject: 'Pharmacology', questionCount: 21340, percentage: 11.4, specialtyGroup: 'Basic Sciences' },
  { subject: 'Internal Medicine', questionCount: 19820, percentage: 10.6, specialtyGroup: 'Clinical Specialities' },
  { subject: 'Pathology', questionCount: 17450, percentage: 9.3, specialtyGroup: 'Basic Sciences' },
  { subject: 'Obstetrics & Gynaecology', questionCount: 16120, percentage: 8.6, specialtyGroup: 'Clinical Specialities' },
  { subject: 'General Surgery', questionCount: 15890, percentage: 8.5, specialtyGroup: 'Surgical & Allied' },
  { subject: 'Microbiology & Immunology', questionCount: 14780, percentage: 7.9, specialtyGroup: 'Basic Sciences' },
  { subject: 'Pediatrics', questionCount: 12430, percentage: 6.6, specialtyGroup: 'Clinical Specialities' },
  { subject: 'Preventive & Social Medicine (PSM)', questionCount: 11950, percentage: 6.4, specialtyGroup: 'Public Health' },
  { subject: 'Human Anatomy & Embryology', questionCount: 11210, percentage: 6.0, specialtyGroup: 'Basic Sciences' },
  { subject: 'Medical Biochemistry', questionCount: 10340, percentage: 5.5, specialtyGroup: 'Basic Sciences' },
  { subject: 'Medical Physiology', questionCount: 9680, percentage: 5.2, specialtyGroup: 'Basic Sciences' },
  { subject: 'Ophthalmology', questionCount: 7890, percentage: 4.2, specialtyGroup: 'Surgical & Allied' },
  { subject: 'Otorhinolaryngology (ENT)', questionCount: 6540, percentage: 3.5, specialtyGroup: 'Surgical & Allied' },
  { subject: 'Forensic Medicine & Toxicology', questionCount: 5720, percentage: 3.1, specialtyGroup: 'Public Health' },
  { subject: 'Dermatology & Venereology', questionCount: 5120, percentage: 2.7, specialtyGroup: 'Clinical Specialities' },
  { subject: 'Orthopedics & Traumatology', questionCount: 4890, percentage: 2.6, specialtyGroup: 'Surgical & Allied' },
  { subject: 'Psychiatry & Behavioral Sciences', questionCount: 4120, percentage: 2.2, specialtyGroup: 'Clinical Specialities' },
  { subject: 'Radiodiagnosis & Imaging', questionCount: 3840, percentage: 2.0, specialtyGroup: 'Clinical Specialities' },
  { subject: 'Anesthesiology & Critical Care', questionCount: 3510, percentage: 1.9, specialtyGroup: 'Surgical & Allied' },
  { subject: 'Emergency Medicine & Triage', questionCount: 2980, percentage: 1.6, specialtyGroup: 'Clinical Specialities' }
];

export const CORPUS_PDFS: CorpusPdfItem[] = [
  {
    filename: 'Harrison_Principles_Internal_Medicine_v21.pdf',
    pages: 4120,
    chunks: 2840,
    avgTokensPerChunk: 385,
    corpusSharePct: 33.7,
    category: 'Core Clinical Reference',
    authority: 'McGraw-Hill Medical'
  },
  {
    filename: 'Oxford_Handbook_Clinical_Medicine_v10.pdf',
    pages: 1040,
    chunks: 1420,
    avgTokensPerChunk: 295,
    corpusSharePct: 16.9,
    category: 'Bedside Emergency Clinical',
    authority: 'Oxford University Press'
  },
  {
    filename: 'NHM_National_Health_Mission_Emergency_Protocols_2024.pdf',
    pages: 620,
    chunks: 1180,
    avgTokensPerChunk: 310,
    corpusSharePct: 14.0,
    category: 'Rural Health System Guidelines',
    authority: 'Govt. of India NHM'
  },
  {
    filename: 'WHO_India_Primary_Health_Care_Clinical_Manual.pdf',
    pages: 580,
    chunks: 960,
    avgTokensPerChunk: 340,
    corpusSharePct: 11.4,
    category: 'Global & Rural Health',
    authority: 'World Health Organization'
  },
  {
    filename: 'ICMR_Treatment_Guidelines_Infectious_Diseases.pdf',
    pages: 440,
    chunks: 820,
    avgTokensPerChunk: 320,
    corpusSharePct: 9.7,
    category: 'Antimicrobial Stewardship',
    authority: 'ICMR India'
  },
  {
    filename: 'AIIMS_Standard_Treatment_Guidelines_Critical_Care.pdf',
    pages: 390,
    chunks: 640,
    avgTokensPerChunk: 315,
    corpusSharePct: 7.6,
    category: 'Tertiary Intensive Care',
    authority: 'AIIMS New Delhi'
  },
  {
    filename: 'MoHFW_Vector_Borne_Diseases_Manual.pdf',
    pages: 280,
    chunks: 560,
    avgTokensPerChunk: 280,
    corpusSharePct: 6.7,
    category: 'Endemic Vector Management',
    authority: 'Ministry of Health & Family Welfare'
  }
];

export const TRAINING_DATASETS: TrainingDatasetItem[] = [
  {
    name: 'MedMCQA Multi-Subject QA',
    trainPairs: 182822,
    valPairs: 4183,
    testPairs: 6150,
    totalPairs: 193155,
    sharePct: 75.3,
    description: 'High-difficulty clinical examination queries with fine-grained rationale reasoning.',
    status: 'Ready'
  },
  {
    name: 'MedQuAD Balanced (GHR/GARD Capped)',
    trainPairs: 36772,
    valPairs: 4596,
    testPairs: 4596,
    totalPairs: 45964,
    sharePct: 17.9,
    description: 'NIH consumer health questions balanced against rare disease dominance via 6.5k cap.',
    status: 'Verified'
  },
  {
    name: 'Medical PDF Knowledge Extraction',
    trainPairs: 13472,
    valPairs: 1684,
    testPairs: 1684,
    totalPairs: 16840,
    sharePct: 6.6,
    description: 'Dense textbook chunk-query pairs generated via contextual anchor augmentation.',
    status: 'Preprocessed'
  },
  {
    name: 'PubMedQA Golden Subset',
    trainPairs: 800,
    valPairs: 100,
    testPairs: 100,
    totalPairs: 1000,
    sharePct: 0.4,
    description: 'Expert-annotated biomedical research questions with verified ground-truth context.',
    status: 'Ready'
  }
];

export const PIPELINE_STAGES: PipelineStageItem[] = [
  {
    step: 1,
    name: 'Medical Corpus Ingestion & De-Duplication',
    description: 'Parsing 7 clinical textbook & guideline PDFs into clean semantic sections with header hierarchy.',
    status: 'Completed',
    outputArtifact: 'corpus_chunks_normalized_8420.jsonl',
    runtime: '42m 18s'
  },
  {
    step: 2,
    name: 'GHR/GARD Capping & Query-Doc Pair Mining',
    description: 'Balancing MedQuAD distribution (capping GHR and GARD at 6,500 records each) and contrastive pair mining.',
    status: 'Completed',
    outputArtifact: 'train_pairs_balanced_256959.jsonl',
    runtime: '1h 14m'
  },
  {
    step: 3,
    name: 'Siamese Bi-Encoder Fine-Tuning (Contrastive Learning)',
    description: 'Dual-branch fine-tuning of biomedical transformer weights using Multiple Negatives Ranking Loss (MNRL).',
    status: 'Completed',
    outputArtifact: 'connectrag-biencoder-biolink-v1.onnx',
    runtime: '6h 32m'
  },
  {
    step: 4,
    name: 'Document Embedding Generation (Offline Branch B)',
    description: 'Encoding all 8,420 medical chunks with frozen Document Encoder into 768-dim dense representations.',
    status: 'Completed',
    outputArtifact: 'doc_embeddings_dense_768d.npy',
    runtime: '28m 45s'
  },
  {
    step: 5,
    name: 'FAISS Vector Index Construction & Serialization',
    description: 'Building HNSW32 index for fast cosine similarity search with low memory footprint (~48MB).',
    status: 'Completed',
    outputArtifact: 'faiss_hnsw32_medical.index',
    runtime: '8m 10s'
  },
  {
    step: 6,
    name: 'Dual Artifact Deployment to Cloud & Local Tiers',
    description: 'Serializing quantized ONNX model + local FAISS index for Tier 2; deploying cloud vector store for Tier 1.',
    status: 'In Progress',
    outputArtifact: 'edge_bundle_v1.tar.gz / cloud_endpoint',
    runtime: 'Pending Verification'
  }
];

export const CLINICAL_QUERIES: ClinicalQuery[] = [
  {
    id: 'q-meningitis',
    query: 'What are the first-line antibiotics for acute bacterial meningitis?',
    domain: 'clinical',
    complexity: 0.65,
    keywords: ['first-line', 'antibiotics', 'acute bacterial meningitis', 'empiric'],
    description: 'High-urgency emergency medicine inquiry requiring rapid antimicrobial regimen and corticosteroid timing.'
  },
  {
    id: 'q-ckd-metformin',
    query: 'Dosage adjustments for Metformin in stage 3 CKD',
    domain: 'clinical',
    complexity: 0.72,
    keywords: ['dosage', 'adjustments', 'Metformin', 'stage 3 CKD', 'eGFR'],
    description: 'Pharmacotherapy inquiry evaluating lactic acidosis risk vs glycemic control across eGFR thresholds.'
  },
  {
    id: 'q-anaphylaxis-rural',
    query: 'Management of severe anaphylaxis in a rural clinic without IV access',
    domain: 'rural',
    complexity: 0.58,
    keywords: ['management', 'severe anaphylaxis', 'rural clinic', 'without IV access', 'epinephrine'],
    description: 'Field protocol inquiry for intramuscular epinephrine dosing and airway management in air-gapped posts.'
  },
  {
    id: 'q-snakebite-asv',
    query: 'Initial stabilization and ASV titration for neurotoxic snakebite in primary health center',
    domain: 'rural',
    complexity: 0.81,
    keywords: ['stabilization', 'ASV titration', 'neurotoxic snakebite', 'primary health center', 'neostigmine'],
    description: 'Life-saving rural health inquiry on anti-snake venom (ASV) initial dose, repeat dosing, and atropine-neostigmine test.'
  },
  {
    id: 'q-stemi-rural',
    query: 'Thrombolysis window and contraindications for acute STEMI in remote facility',
    domain: 'rural',
    complexity: 0.78,
    keywords: ['thrombolysis window', 'contraindications', 'acute STEMI', 'remote facility', 'streptokinase'],
    description: 'Time-critical cardiovascular protocol when PCI transfer time exceeds 120 minutes.'
  },
  {
    id: 'q-pediatric-dehydration',
    query: 'WHO Plan C intravenous rehydration guidelines for severe pediatric cholera dehydration',
    domain: 'rural',
    complexity: 0.62,
    keywords: ['WHO Plan C', 'intravenous rehydration', 'pediatric', 'severe dehydration', 'Ringer lactate'],
    description: 'Pediatric emergency guideline for Ringer lactate infusion rates based on age <12m vs ≥12m.'
  }
];

export const MOCK_RESPONSES_BY_TIER: Record<string, Record<string, {
  text: string;
  latencyMs: number;
  sources: RetrievedSource[];
  confidenceScore: number;
}>> = {
  'q-meningitis': {
    'tier-1-cloud': {
      text: 'In adults with suspected acute bacterial meningitis, empirical antimicrobial therapy consists of Ceftriaxone (2g IV q12h) or Cefotaxime (2g IV q4-6h), combined with Vancomycin (15–20 mg/kg IV q8–12h) to cover penicillin-resistant Streptococcus pneumoniae. In patients >50 years or immunocompromised, add Ampicillin (2g IV q4h) for Listeria monocytogenes coverage. Crucially, administer adjunctive Dexamethasone (10mg IV prior to or with the first antibiotic dose, repeated q6h for 4 days) to significantly reduce sensorineural hearing loss and mortality in pneumococcal presentations.',
      latencyMs: 348,
      confidenceScore: 0.98,
      sources: [
        {
          id: 'src-harrison-meningitis',
          title: 'Harrison\'s Principles of Internal Medicine, 21st Ed.',
          section: 'Ch. 134, Acute Bacterial Meningitis (p. 1142–1148)',
          similarity: 0.942,
          excerpt: 'Empirical antimicrobial therapy must be initiated immediately upon suspicion of acute bacterial meningitis after blood cultures are drawn. Regimens must achieve bactericidal CSF concentrations...',
          chunkHash: '4f8b91a0',
          tokenCount: 342,
          model: 'Siamese-BioLink-v1',
          sourcePdf: 'Harrison_Principles_Internal_Medicine_v21.pdf'
        },
        {
          id: 'src-oxford-meningitis',
          title: 'Oxford Handbook of Clinical Medicine, 10th Ed.',
          section: 'Emergency Protocol #44: CNS Infections (p. 830)',
          similarity: 0.891,
          excerpt: 'Give Dexamethasone 10mg IV with or just before the first dose of cephalosporin if pneumococcal or meningococcal infection is suspected. Do not delay antibiotics for LP if imaging delayed.',
          chunkHash: 'c72e411b',
          tokenCount: 288,
          model: 'Siamese-BioLink-v1',
          sourcePdf: 'Oxford_Handbook_Clinical_Medicine_v10.pdf'
        }
      ]
    },
    'tier-2-local': {
      text: 'Local Edge SLM Fallback Synthesis (Phi-3 Mini / Gemma-2B quantized): For suspected acute bacterial meningitis, administer Ceftriaxone 2g IV q12h plus Vancomycin 15–20 mg/kg IV q12h immediately. If age >50 or pregnancy, add Ampicillin 2g IV q4h. Dexamethasone 10mg IV should be administered prior to or concurrently with the initial antibiotic dose. Local consistency check verified (token overlap 92%).',
      latencyMs: 178,
      confidenceScore: 0.91,
      sources: [
        {
          id: 'src-nhm-meningitis-local',
          title: 'NHM Emergency Clinical Protocols (Local Edge Index)',
          section: 'Section 4.2: Severe Meningeal Presentations',
          similarity: 0.915,
          excerpt: 'At Community Health Centre / Sub-District level: Ceftriaxone 2g IV stat + Dexamethasone 10mg IV prior to transfer if referral delay >2 hours...',
          chunkHash: '8b3c10fa',
          tokenCount: 240,
          model: 'Quantized-ONNX-BiEncoder',
          sourcePdf: 'NHM_National_Health_Mission_Emergency_Protocols_2024.pdf'
        }
      ]
    },
    'tier-3-cache': {
      text: 'Cached Verified Protocol (#EMERG-CNS-01 | Cosine Sim 0.96 | Validated by ICMR): Acute Bacterial Meningitis First-Line: Ceftriaxone 2g IV q12h + Vancomycin 1g IV q12h + Dexamethasone 10mg IV STAT before antibiotic. If patient >50 years, add Ampicillin 2g IV q4h. Zero network dependency lookup.',
      latencyMs: 14,
      confidenceScore: 1.0,
      sources: [
        {
          id: 'src-cache-meningitis',
          title: 'Offline Pre-Warmed Q&A LRU Store (TTL: 30d)',
          section: 'Deterministic Cache Record: sha256:d8a9...71',
          similarity: 0.962,
          excerpt: 'Pre-compiled emergency medical protocol verified by ICMR/WHO-India clinical review board for air-gapped disaster operations.',
          chunkHash: 'cache-d8a9f211',
          tokenCount: 110,
          model: 'Direct-Cache-Hit',
          sourcePdf: 'WHO_India_Primary_Health_Care_Clinical_Manual.pdf'
        }
      ]
    }
  },
  'q-ckd-metformin': {
    'tier-1-cloud': {
      text: 'For patients with Stage 3 Chronic Kidney Disease (CKD), Metformin dosing must be adjusted strictly based on estimated Glomerular Filtration Rate (eGFR): In Stage 3a (eGFR 45–59 mL/min/1.73m²), Metformin may be continued safely at a reduced maximum dose of 1,000 mg/day (or 500 mg BID) with renal monitoring every 3–6 months. In Stage 3b (eGFR 30–44 mL/min/1.73m²), initiating Metformin is not recommended; if already established, reduce to a maximum of 500 mg/day with frequent renal function checks. Metformin is strictly contraindicated if eGFR falls below 30 mL/min/1.73m² due to elevated risk of Metformin-Associated Lactic Acidosis (MALA).',
      latencyMs: 362,
      confidenceScore: 0.97,
      sources: [
        {
          id: 'src-harrison-metformin',
          title: 'Harrison\'s Principles of Internal Medicine, 21st Ed.',
          section: 'Ch. 396: Diabetes Mellitus: Management & Complications (p. 2910)',
          similarity: 0.938,
          excerpt: 'Metformin clearance correlates directly with GFR. eGFR 45-59: max 1000mg/d. eGFR 30-44: max 500mg/d. Withhold immediately prior to iodinated contrast procedures or during intercurrent dehydrating illness...',
          chunkHash: '91e0a241',
          tokenCount: 312,
          model: 'Siamese-BioLink-v1',
          sourcePdf: 'Harrison_Principles_Internal_Medicine_v21.pdf'
        }
      ]
    },
    'tier-2-local': {
      text: 'Local Edge SLM Fallback Synthesis: In Stage 3 CKD, adjust Metformin: If eGFR 45–59 mL/min (Stage 3a), maximum dose is 1000 mg daily. If eGFR 30–44 mL/min (Stage 3b), maximum dose is 500 mg daily; avoid new initiations. Discontinue if eGFR < 30 mL/min or in acute dehydration to prevent lactic acidosis.',
      latencyMs: 184,
      confidenceScore: 0.89,
      sources: [
        {
          id: 'src-niddk-metformin-local',
          title: 'NIDDK Clinical Compendium (Local Edge Index)',
          section: 'Section 7: Pharmacotherapy in Renal Impairment',
          similarity: 0.902,
          excerpt: 'Metformin guidelines: Monitor serum creatinine and eGFR bi-annually in stage 3. Instruct patient on "sick day rules" to stop metformin during diarrhea/vomiting.',
          chunkHash: 'a12bc900',
          tokenCount: 220,
          model: 'Quantized-ONNX-BiEncoder',
          sourcePdf: 'NIDDK_Diabetes_Complications_Management_Compendium.pdf'
        }
      ]
    },
    'tier-3-cache': {
      text: 'Cached Verified Protocol (#CLIN-METFORMIN-CKD): Stage 3a (eGFR 45-59): Max 1000mg/day. Stage 3b (eGFR 30-44): Max 500mg/day. eGFR <30: ABSOLUTE CONTRAINDICATION. Withhold during septic shock, dehydration, or contrast radiologic imaging.',
      latencyMs: 12,
      confidenceScore: 1.0,
      sources: [
        {
          id: 'src-cache-metformin',
          title: 'Offline Pre-Warmed Q&A LRU Store (TTL: 30d)',
          section: 'Deterministic Cache Record: sha256:77bc...14',
          similarity: 0.951,
          excerpt: 'Standard dosage protocol verified against KDIGO and ICMR guidelines for chronic disease clinics.',
          chunkHash: 'cache-77bc9812',
          tokenCount: 95,
          model: 'Direct-Cache-Hit',
          sourcePdf: 'ICMR_Treatment_Guidelines_Infectious_Diseases.pdf'
        }
      ]
    }
  },
  'q-anaphylaxis-rural': {
    'tier-1-cloud': {
      text: 'In a rural primary health center without intravenous access, immediate management of severe anaphylaxis relies entirely on INTRAMUSCULAR (IM) Epinephrine (Adrenaline 1:1000 / 1 mg/mL). Inject 0.5 mg IM (0.01 mg/kg in children, max 0.3 mg) into the anterolateral mid-thigh immediately. The thigh achieves peak plasma concentration within 8 minutes, far superior to subcutaneous or deltoid injection. Place patient supine with legs elevated (never stand or sit upright, which risks fatal empty-ventricle syndrome). Administer high-flow oxygen via non-rebreather mask if available. Repeat IM epinephrine every 5–15 minutes if symptoms persist or deteriorate. Secondary oral/IM antihistamines or corticosteroids do not prevent respiratory arrest and must never delay epinephrine.',
      latencyMs: 352,
      confidenceScore: 0.99,
      sources: [
        {
          id: 'src-nhm-anaphylaxis',
          title: 'NHM Emergency Clinical Protocols 2024',
          section: 'Protocol #12: Acute Anaphylaxis in Primary Facilities (p. 88)',
          similarity: 0.958,
          excerpt: 'Adrenaline 1:1000 IM into anterolateral mid-thigh is life-saving and mandatory before any other measure. Do not attempt peripheral venous cut-down before first 2 doses of IM adrenaline...',
          chunkHash: '2b77c8e9',
          tokenCount: 298,
          model: 'Siamese-BioLink-v1',
          sourcePdf: 'NHM_National_Health_Mission_Emergency_Protocols_2024.pdf'
        }
      ]
    },
    'tier-2-local': {
      text: 'Local Edge SLM Fallback Synthesis: Give Adrenaline 1:1000 (1mg/mL) 0.5mg IM into mid-anterolateral thigh immediately (0.01mg/kg in children). Lie patient flat and raise legs. Repeat IM dose after 5-10 minutes if no improvement. Do not wait for IV access; IM route into thigh provides rapid absorption. Arrange emergency ambulance transport.',
      latencyMs: 172,
      confidenceScore: 0.93,
      sources: [
        {
          id: 'src-who-anaphylaxis-local',
          title: 'WHO India Primary Health Care Clinical Manual',
          section: 'Emergency Care: Severe Allergic Reactions',
          similarity: 0.924,
          excerpt: 'Anterolateral thigh injection of epinephrine 1:1000 is the undisputed first-line treatment for anaphylaxis without IV access.',
          chunkHash: 'cc811e55',
          tokenCount: 190,
          model: 'Quantized-ONNX-BiEncoder',
          sourcePdf: 'WHO_India_Primary_Health_Care_Clinical_Manual.pdf'
        }
      ]
    },
    'tier-3-cache': {
      text: 'Cached Verified Protocol (#EMERG-ANAPHYLAXIS-01 | ICMR / NHM Standard): 1. Adrenaline 1:1000 (1 mg/mL) 0.5 mL IM into mid-thigh IMMEDIATELY. 2. Lay patient flat with legs elevated. 3. Repeat IM adrenaline every 5 minutes x 3 doses if needed. 4. High-flow oxygen if available. Zero network required.',
      latencyMs: 11,
      confidenceScore: 1.0,
      sources: [
        {
          id: 'src-cache-anaphylaxis',
          title: 'Offline Pre-Warmed Q&A LRU Store (TTL: 30d)',
          section: 'Deterministic Cache Record: sha256:1198...ee',
          similarity: 0.984,
          excerpt: 'Essential emergency safety lookup stored locally on edge device SQLite cache.',
          chunkHash: 'cache-1198ee01',
          tokenCount: 88,
          model: 'Direct-Cache-Hit',
          sourcePdf: 'NHM_National_Health_Mission_Emergency_Protocols_2024.pdf'
        }
      ]
    }
  },
  'q-snakebite-asv': {
    'tier-1-cloud': {
      text: 'For neurotoxic snakebite (Cobra/Krait envenomation with ptosis, dysphagia, or respiratory weakness) at a primary health facility: 1. Initial ASV Dose: Administer 10 vials of polyvalent Anti-Snake Venom (ASV) reconstituted in 500 mL normal saline (or 5–10 mL/kg in children) infused over 1 hour. Do not perform intradermal skin tests (proven ineffective and delays treatment). 2. Atropine-Neostigmine Trial: For neuroparalytic signs, give Atropine (0.6 mg IV) followed by Neostigmine (1.5 mg IM/IV). Assess response at 30 minutes; if ptosis improves, maintain neostigmine 0.5 mg IV q30m. 3. Airway: If respiration is compromised (paradoxical abdominal breathing), initiate bag-valve-mask ventilation and prepare for immediate transfer.',
      latencyMs: 360,
      confidenceScore: 0.97,
      sources: [
        {
          id: 'src-nhm-snakebite',
          title: 'NHM National Snakebite Management Protocol 2024',
          section: 'Ch. 3: Anti-Snake Venom Titration & Neuroparalysis (p. 42)',
          similarity: 0.961,
          excerpt: 'Standard initial dose is 10 vials of lyophilised polyvalent ASV for all patients regardless of weight or age. Repeat dose of 10 vials after 1-2 hours if neurotoxic symptoms worsen...',
          chunkHash: '7a19c4d2',
          tokenCount: 310,
          model: 'Siamese-BioLink-v1',
          sourcePdf: 'NHM_National_Health_Mission_Emergency_Protocols_2024.pdf'
        }
      ]
    },
    'tier-2-local': {
      text: 'Local Edge SLM Fallback Synthesis: Neurotoxic Snakebite: 1. Infuse 10 vials polyvalent ASV in 500mL normal saline over 1 hour. 2. Give Atropine 0.6mg IV followed by Neostigmine 1.5mg IV. 3. Monitor for reversal of ptosis. 4. Maintain airway with BVM if respiratory depression occurs. Repeat 10 vials ASV after 1 hour if neurological signs progress.',
      latencyMs: 182,
      confidenceScore: 0.90,
      sources: [
        {
          id: 'src-who-snakebite-local',
          title: 'WHO India Guidelines for Management of Snakebites',
          section: 'Section 5: Neurological Envenoming',
          similarity: 0.912,
          excerpt: 'Polyvalent enzyme-refined equine immunoglobulin against Big Four Indian snakes. Initial dose 10 vials IV over 60 minutes.',
          chunkHash: 'f45ab091',
          tokenCount: 215,
          model: 'Quantized-ONNX-BiEncoder',
          sourcePdf: 'WHO_India_Primary_Health_Care_Clinical_Manual.pdf'
        }
      ]
    },
    'tier-3-cache': {
      text: 'Cached Verified Protocol (#EMERG-SNAKEBITE-NEURO): 10 vials ASV IV in 500mL NS over 60 min. Give Atropine 0.6mg IV + Neostigmine 1.5mg IV. Re-evaluate at 30 min. If respiratory failure: Bag-valve mask assisted ventilation + urgent transfer.',
      latencyMs: 13,
      confidenceScore: 1.0,
      sources: [
        {
          id: 'src-cache-snakebite',
          title: 'Offline Pre-Warmed Q&A LRU Store (TTL: 30d)',
          section: 'Deterministic Cache Record: sha256:44fa...90',
          similarity: 0.970,
          excerpt: 'Air-gapped clinical emergency protocol approved by National Health Mission.',
          chunkHash: 'cache-44fa9012',
          tokenCount: 75,
          model: 'Direct-Cache-Hit',
          sourcePdf: 'NHM_National_Health_Mission_Emergency_Protocols_2024.pdf'
        }
      ]
    }
  },
  'q-stemi-rural': {
    'tier-1-cloud': {
      text: 'When acute ST-Elevation Myocardial Infarction (STEMI) presents at a remote rural facility where primary PCI transfer cannot be accomplished within 120 minutes of first medical contact, immediate fibrinolytic therapy (thrombolysis) is indicated within a 30-minute door-to-needle window. Regimen: Streptokinase 1.5 million units in 100 mL 5% Dextrose infused over 60 minutes (or Tenecteplase weight-adjusted bolus if available). Concurrently administer Aspirin 300 mg chewable + Clopidogrel 300 mg (or 75 mg if >75 years). Absolute contraindications: prior intracranial hemorrhage, known cerebral vascular lesion, ischemic stroke within 3 months, active internal bleeding, or suspected aortic dissection.',
      latencyMs: 355,
      confidenceScore: 0.98,
      sources: [
        {
          id: 'src-oxford-stemi',
          title: 'Oxford Handbook of Clinical Medicine, 10th Ed.',
          section: 'Cardiology Protocol #18: Acute Coronary Syndromes (p. 112)',
          similarity: 0.949,
          excerpt: 'Thrombolysis should be initiated if PCI delay >120 min. Absolute contraindications must be checked methodically prior to infusion...',
          chunkHash: '1a90c42e',
          tokenCount: 305,
          model: 'Siamese-BioLink-v1',
          sourcePdf: 'Oxford_Handbook_Clinical_Medicine_v10.pdf'
        }
      ]
    },
    'tier-2-local': {
      text: 'Local Edge SLM Fallback Synthesis: Remote STEMI with transfer >120 mins: 1. Give Aspirin 300mg chewable + Clopidogrel 300mg stat. 2. Thrombolyze with Streptokinase 1.5 million units IV in 100mL D5W over 60 min within 30 min of arrival. 3. Screen for intracranial hemorrhage or active bleeding contraindications.',
      latencyMs: 176,
      confidenceScore: 0.88,
      sources: [
        {
          id: 'src-nhm-stemi-local',
          title: 'NHM Emergency Clinical Protocols (Local Index)',
          section: 'Protocol #5: Rural Acute Coronary Care',
          similarity: 0.908,
          excerpt: 'Door-to-needle time < 30 min for streptokinase at CHC level when distance to catheterization laboratory exceeds 2 hours.',
          chunkHash: 'b901fa32',
          tokenCount: 210,
          model: 'Quantized-ONNX-BiEncoder',
          sourcePdf: 'NHM_National_Health_Mission_Emergency_Protocols_2024.pdf'
        }
      ]
    },
    'tier-3-cache': {
      text: 'Cached Verified Protocol (#EMERG-STEMI-RURAL): Door-to-needle <30m. Aspirin 300mg + Clopidogrel 300mg. Streptokinase 1.5 MU in 100mL D5W over 1 hr. Contraindication: Prior ICH, stroke within 3m, active bleed.',
      latencyMs: 12,
      confidenceScore: 1.0,
      sources: [
        {
          id: 'src-cache-stemi',
          title: 'Offline Pre-Warmed Q&A LRU Store (TTL: 30d)',
          section: 'Deterministic Cache Record: sha256:88bc...03',
          similarity: 0.955,
          excerpt: 'ICMR Rural Cardiology Emergency Reference standard.',
          chunkHash: 'cache-88bc0319',
          tokenCount: 82,
          model: 'Direct-Cache-Hit',
          sourcePdf: 'NHM_National_Health_Mission_Emergency_Protocols_2024.pdf'
        }
      ]
    }
  },
  'q-pediatric-dehydration': {
    'tier-1-cloud': {
      text: 'Under WHO Plan C for severe dehydration in acute diarrheal illness/cholera: Start IV fluids immediately with Ringer\'s Lactate (or Normal Saline if unavailable). Infuse a total of 100 mL/kg: In infants under 12 months: give 30 mL/kg over 1 hour, followed by 70 mL/kg over 5 hours (total 6 hours). In children 1 year and older: give 30 mL/kg over 30 minutes, followed by 70 mL/kg over 2.5 hours (total 3 hours). Reassess radial pulse and skin turgor every 15–30 minutes until strong pulse returns. Introduce ORS solution (5 mL/kg/hour) as soon as the child can drink.',
      latencyMs: 345,
      confidenceScore: 0.99,
      sources: [
        {
          id: 'src-who-pediatric',
          title: 'WHO India Primary Health Care Clinical Manual',
          section: 'Diarrhoeal Diseases: Plan C Rehydration Protocol (p. 215)',
          similarity: 0.971,
          excerpt: 'Severe dehydration is a medical emergency requiring rapid IV Ringer lactate. Total volume 100 mL/kg split into initial bolus and maintenance...',
          chunkHash: '5e81d092',
          tokenCount: 290,
          model: 'Siamese-BioLink-v1',
          sourcePdf: 'WHO_India_Primary_Health_Care_Clinical_Manual.pdf'
        }
      ]
    },
    'tier-2-local': {
      text: 'Local Edge SLM Fallback Synthesis: WHO Plan C Severe Dehydration: Give IV Ringer\'s Lactate 100 mL/kg total. Age < 12 months: 30 mL/kg in 1 hour, then 70 mL/kg in 5 hours. Age ≥ 12 months: 30 mL/kg in 30 minutes, then 70 mL/kg in 2.5 hours. Reassess hydration every 30 minutes.',
      latencyMs: 170,
      confidenceScore: 0.92,
      sources: [
        {
          id: 'src-who-pediatric-local',
          title: 'WHO India Primary Health Care (Local Index)',
          section: 'Pediatric Acute Diarrhea Guidelines',
          similarity: 0.932,
          excerpt: 'Guideline for emergency IV rehydration at Sub-Centre and Primary Health Centre.',
          chunkHash: '2288ab10',
          tokenCount: 195,
          model: 'Quantized-ONNX-BiEncoder',
          sourcePdf: 'WHO_India_Primary_Health_Care_Clinical_Manual.pdf'
        }
      ]
    },
    'tier-3-cache': {
      text: 'Cached Verified Protocol (#EMERG-WHO-PLAN-C): 100 mL/kg Ringer Lactate IV. If <1 yr: 30 mL/kg in 1h, then 70 mL/kg in 5h. If ≥1 yr: 30 mL/kg in 30m, then 70 mL/kg in 2.5h. Start ORS (5 mL/kg/h) once child can swallow.',
      latencyMs: 11,
      confidenceScore: 1.0,
      sources: [
        {
          id: 'src-cache-pediatric',
          title: 'Offline Pre-Warmed Q&A LRU Store (TTL: 30d)',
          section: 'Deterministic Cache Record: sha256:33fe...11',
          similarity: 0.980,
          excerpt: 'Pediatric acute emergency rehydration standard table.',
          chunkHash: 'cache-33fe1102',
          tokenCount: 78,
          model: 'Direct-Cache-Hit',
          sourcePdf: 'WHO_India_Primary_Health_Care_Clinical_Manual.pdf'
        }
      ]
    }
  }
};

export const METHODOLOGY_PHASES: MethodologyPhase[] = [
  {
    phase: 'Phase 1',
    title: 'Foundation & Corpus Curation',
    timeframe: 'Weeks 1–2',
    focus: 'Finalize domain corpus of rural health and clinical advisory texts from NHM, ICMR, and WHO-India.',
    deliverables: [
      'Assemble 50–100 core guideline documents and textbook chapters',
      'Normalize text chunks with metadata boundaries (256–512 tokens)',
      'Construct Siamese Bi-Encoder training split pairs from MedQuAD and MedMCQA'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Tier 1 Baseline Cloud RAG',
    timeframe: 'Weeks 3–4',
    focus: 'Build hosted cloud retrieval and generation pipeline using Claude-3.5/GPT-4o.',
    deliverables: [
      'Dense vector search on cloud Pinecone/pgvector endpoint',
      'Validate retrieval against held-out rural health evaluation questions',
      'Establish baseline RAGAS scores (Context Precision, Faithfulness, Answer Relevance)'
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Connectivity Layer & NQS Probing',
    timeframe: 'Weeks 5–6',
    focus: 'Implement Connectivity Monitor with concrete NQS formula and hysteresis logic.',
    deliverables: [
      'Periodic HTTP HEAD prober running every 3–5 seconds with EWMA smoothing',
      'Implement explicit NQS formula (Bandwidth: 0.35, RTT: 0.30, Loss: 0.20, Jitter: 0.15)',
      'Validate hysteresis stability under simulated Linux traffic control (`tc`) conditions'
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Tier 2 Local RAG & Tier Orchestrator',
    timeframe: 'Weeks 7–8',
    focus: 'Deploy quantized edge model (Gemma-2B/Phi-3) + local FAISS index with decision-table router.',
    deliverables: [
      'Quantized ONNX Bi-Encoder running on CPU/Edge with FAISS HNSW32 index',
      'Tier Orchestrator mapping route = f(NQS, Complexity)',
      'Confidence Estimator via dual-sample self-consistency token overlap'
    ]
  },
  {
    phase: 'Phase 5',
    title: 'Tier 3 Cached Q&A & Evaluation Harness',
    timeframe: 'Weeks 9–10',
    focus: 'Cached emergency protocol layer with defined cosine threshold (≥0.85) and TTL (30 days).',
    deliverables: [
      'Pre-warmed SQLite LRU cache storing verified query embeddings + responses',
      'Benchmarking across all 3 tiers using RAGAS and latency metrics',
      'Measure cache hit rate and token efficiency across simulated network regimes'
    ]
  },
  {
    phase: 'Phase 6',
    title: 'Predictive Synchronizer (Stretch)',
    timeframe: 'Weeks 11–12',
    focus: 'Heuristic v1 predictive prefetch based on query frequency, recency, and diurnal patterns.',
    deliverables: [
      'Opportunistic cache refresh triggers when NQS ≥ 80',
      'Benchmark heuristic prefetch against static and non-cached baselines',
      'Design sequence model transition path for future work'
    ]
  },
  {
    phase: 'Phase 7',
    title: 'Controlled Degradation Experiment & Viva Report',
    timeframe: 'Weeks 13–16',
    focus: 'Full Good → Moderate → Poor → Offline live degradation trials, final paper, and demo.',
    deliverables: [
      'Live dynamic demonstration replicating network drops with zero UI stall',
      'Comprehensive final report with empirical latency vs quality trade-offs',
      'Academic presentation slides and viva question defense rehearsal'
    ]
  }
];

export const CRITIQUE_DIFFERENTIATIONS: CritiqueItem[] = [
  {
    suggestion: 'Name every mechanism concretely (NQS formula, probing method, cache contents)',
    decision: 'Adopted fully',
    justification: 'Closes key viva vulnerabilities. Probing method specified as 3–5s HTTP HEAD with EWMA smoothing; explicit NQS weighted formula; cache content defined as final Q&A embeddings with cosine ≥ 0.85.',
    statusCategory: 'adopted'
  },
  {
    suggestion: 'Add Query Complexity Estimator to routing policy',
    decision: 'Adopted (Heuristic)',
    justification: 'Adopted as an explainable heuristic (token length + multi-step keyword scoring) extending Adaptive-RAG literature without requiring unvalidated classifier training data.',
    statusCategory: 'adopted'
  },
  {
    suggestion: 'Add Confidence Estimator for Tier 2 Local Edge answers',
    decision: 'Adopted (Self-Consistency)',
    justification: 'Quantized edge SLMs lack calibrated log-probabilities. Self-consistency check via dual-sample agreement provides an implementable and defensible quality gate.',
    statusCategory: 'adopted'
  },
  {
    suggestion: 'Replace decision-table routing with trained XGBoost or ML policy',
    decision: 'Rejected for Core',
    justification: 'Requires thousands of labeled ground-truth interactions ("which tier was optimal") that do not exist pre-deployment. Transparent decision table is robust and defensible.',
    statusCategory: 'rejected'
  },
  {
    suggestion: 'Add Learning Router with online RLHF-style updates',
    decision: 'Rejected',
    justification: 'Requires live user cohorts generating active reward feedback over long horizons; entirely out of scope for a single-semester research timeline.',
    statusCategory: 'rejected'
  },
  {
    suggestion: 'Add Cost Optimizer (₹/query across cloud vs edge)',
    decision: 'Rejected for Core',
    justification: 'Introduces a third optimization constraint on top of network quality and query complexity before the core degradation hypothesis is validated. Logged as natural future work.',
    statusCategory: 'rejected'
  },
  {
    suggestion: 'Add Edge-to-Edge distributed hospital collaboration',
    decision: 'Rejected',
    justification: 'Transforms the project into a distributed systems consensus and synchronization problem (CRDTs/Raft), tripling engineering scope without adding to the RAG hypothesis.',
    statusCategory: 'rejected'
  },
  {
    suggestion: 'Add LLM-based predictive pre-fetching before network drop',
    decision: 'Deferred to Stretch',
    justification: 'Heuristic v1 (frequency + recency) is built first. Deep predictive sequence models are evaluated as a Phase 6 stretch goal only if milestones are completed ahead of schedule.',
    statusCategory: 'deferred'
  },
  {
    suggestion: 'Reframe as "Adaptive AI Infrastructure" rather than "Network-Aware RAG"',
    decision: 'Adopted fully',
    justification: 'Adopted as strategic conceptual framing in literature review, presentation pitch, and architectural documentation without incurring software complexity.',
    statusCategory: 'adopted'
  }
];
