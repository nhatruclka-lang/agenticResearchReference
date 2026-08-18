import { PicoTemplate, ReviewProject } from '../types';

export const PICO_TEMPLATES: PicoTemplate[] = [
  {
    id: 'ai-nlp-transformers',
    name: 'Transformer Architectures vs RNNs in NLP',
    category: 'Computer Science & AI',
    tagline: 'Deep Learning & NLP',
    description: 'Systematic evaluation of Transformer-based attention models versus recurrent architectures in low-resource natural language processing tasks.',
    defaultPico: {
      researchQuestion: 'How do self-attention Transformer architectures compare to recurrent neural networks (LSTM/GRU) in accuracy, inference latency, and computational efficiency for low-resource NLP tasks?',
      population: 'Benchmark natural language datasets for low-resource languages and cross-lingual transfer learning.',
      intervention: 'Pretrained Transformer models (BERT, RoBERTa, T5, LLaMA variants) with parameter-efficient fine-tuning (LoRA, adapters).',
      comparison: 'Traditional Recurrent Neural Networks (LSTM, BiLSTM, GRU) or convolutional sequence architectures.',
      outcome: 'BLEU/ROUGE score, F1 accuracy, inference latency (ms), parameter count, GPU FLOPs memory footprint.',
      inclusionCriteria: [
        'Peer-reviewed computer science conferences (ACL, EMNLP, NeurIPS, ICLR, ICML) or journals',
        'Empirical benchmarking on low-resource language tasks',
        'Direct comparison between Transformer and recurrent baselines',
        'Published from 2018 to present'
      ],
      exclusionCriteria: [
        'Non-empirical position papers or conceptual opinion pieces',
        'Studies without reproducible evaluation metrics or baseline code',
        'Solely theoretical proofs without experimental evaluation'
      ],
      searchQuery: '("transformer"[tiab] OR "attention mechanism"[tiab] OR "BERT"[tiab] OR "LLM"[tiab]) AND ("recurrent neural network"[tiab] OR "LSTM"[tiab] OR "GRU"[tiab]) AND ("low-resource"[tiab] OR "natural language processing"[tiab])'
    }
  },
  {
    id: 'renewable-perovskite-solar',
    name: 'Perovskite vs Silicon Solar Cells Efficiency',
    category: 'Energy & Materials Engineering',
    tagline: 'Photovoltaics & CleanTech',
    description: 'Assessing power conversion efficiency (PCE), stability, and commercial viability of tandem perovskite solar cells.',
    defaultPico: {
      researchQuestion: 'What are the power conversion efficiency gains, long-term degradation mechanisms, and thermal stability metrics of tandem perovskite-silicon solar cells compared to single-junction silicon cells?',
      population: 'Laboratory fabricated and pilot-scale photovoltaic solar cell modules.',
      intervention: 'Perovskite-silicon tandem solar cell architectures with passivated contact interfaces.',
      comparison: 'Conventional single-junction crystalline silicon (c-Si) or GaAs photovoltaic cells.',
      outcome: 'Power Conversion Efficiency (PCE %), open-circuit voltage (Voc), fill factor (FF), ISOS stability retention hours (>1000h), levelized cost of energy ($/W).',
      inclusionCriteria: [
        'Experimental materials science and renewable energy studies',
        'Standardized AM1.5G 100 mW/cm² solar illumination testing protocols',
        'Reporting certified or calibrated Power Conversion Efficiency',
        'Articles in indexed energy/physics journals >= 2020'
      ],
      exclusionCriteria: [
        'Studies lacking degradation or stability time-series data',
        'Purely computational DFT simulations without experimental device validation',
        'Incomplete electrical characterization'
      ],
      searchQuery: '("perovskite solar cells"[tiab] OR "tandem photovoltaic"[tiab]) AND ("power conversion efficiency"[tiab] OR "stability"[tiab]) AND ("silicon"[tiab] OR "heterojunction"[tiab])'
    }
  },
  {
    id: 'economics-carbon-tax',
    name: 'Carbon Pricing & Corporate Clean Investment',
    category: 'Economics & Environmental Policy',
    tagline: 'Econometrics & Finance',
    description: 'Empirical review of carbon tax and Emissions Trading Systems (ETS) impacts on enterprise green R&D expenditures.',
    defaultPico: {
      researchQuestion: 'How does the implementation of carbon pricing mechanisms (carbon tax and cap-and-trade) affect corporate green innovation investments and carbon emission reduction in heavy industries?',
      population: 'Publicly listed industrial and energy enterprise corporations across OECD economies.',
      intervention: 'Mandatory carbon tax policies or Emissions Trading Systems (e.g., EU ETS, regional carbon markets).',
      comparison: 'Firms in non-regulated sectors or jurisdictions without mandatory carbon pricing.',
      outcome: 'Green R&D expenditure (% of revenue), patent counts in clean technologies, Scope 1 & 2 carbon intensity reduction, Return on Assets (ROA).',
      inclusionCriteria: [
        'Empirical econometric studies utilizing difference-in-differences, regression discontinuity, or panel data',
        'Corporate-level financial or ESG emission dataset analysis',
        'Peer-reviewed economics, finance, or environmental management journals'
      ],
      exclusionCriteria: [
        'Qualitative non-empirical case studies',
        'Macroeconomic simulation models without firm-level empirical validation',
        'Policy advocacy whitepapers lacking econometric methodology'
      ],
      searchQuery: '("carbon tax"[tiab] OR "emissions trading"[tiab] OR "carbon pricing"[tiab]) AND ("green innovation"[tiab] OR "R&D investment"[tiab] OR "corporate sustainability"[tiab])'
    }
  },
  {
    id: 'stem-active-learning',
    name: 'Active Learning vs Traditional Lecturing in Higher STEM',
    category: 'Education & Cognitive Psychology',
    tagline: 'Pedagogy & Learning Science',
    description: 'Meta-analysis framework evaluating student conceptual retention and achievement gaps across undergraduate STEM disciplines.',
    defaultPico: {
      researchQuestion: 'Does the implementation of active learning pedagogical strategies improve student course performance and reduce course failure rates compared to traditional lecturing in university-level STEM courses?',
      population: 'Undergraduate university students enrolled in STEM courses (Science, Technology, Engineering, Mathematics).',
      intervention: 'Active learning methodologies (e.g., peer instruction, flipped classroom, problem-based learning, interactive workshop formats).',
      comparison: 'Traditional continuous expository lecture instruction.',
      outcome: 'Standardized exam score improvement (effect size Cohen d / Hedges g), DFW (drop/fail/withdrawal) percentage reduction, student self-efficacy.',
      inclusionCriteria: [
        'Higher education undergraduate student cohorts',
        'Comparative study design with identifiable active vs traditional instruction sections',
        'Standardized performance metrics or course grade distributions reported',
        'Published from 2014 to present'
      ],
      exclusionCriteria: [
        'K-12 primary/secondary education cohorts',
        'Qualitative satisfaction surveys with no objective learning performance measures',
        'Single-group non-comparative case descriptions'
      ],
      searchQuery: '("active learning"[tiab] OR "flipped classroom"[tiab] OR "peer instruction"[tiab]) AND ("lecture"[tiab] OR "traditional instruction"[tiab]) AND ("STEM"[tiab] OR "undergraduate education"[tiab])'
    }
  },
  {
    id: 'glp1-diabetes',
    name: 'GLP-1 RA in Type 2 Diabetes & Cardiometabolic Health',
    category: 'Biomedicine & Clinical Health',
    tagline: 'Clinical Trial Evidence',
    description: 'Evaluation of GLP-1 receptor agonists versus standard glycemic control or active comparators in adults with cardiometabolic disorders.',
    defaultPico: {
      researchQuestion: 'What are the clinical efficacy, cardiovascular outcomes, and adverse event profiles of GLP-1 receptor agonists compared to standard therapy in adults with Type 2 Diabetes?',
      population: 'Adults (>= 18 years) with diagnosed Type 2 Diabetes Mellitus with or without established atherosclerotic cardiovascular disease.',
      intervention: 'GLP-1 receptor agonists (e.g., Semaglutide, Dulaglutide, Tirzepatide, Liraglutide, Exenatide).',
      comparison: 'Placebo, standard of care (metformin, sulfonylureas), SGLT2 inhibitors, or insulin therapy.',
      outcome: 'Primary: HbA1c reduction (%), weight change (kg). Secondary: Major Adverse Cardiovascular Events (MACE), eGFR decline, gastrointestinal adverse events.',
      inclusionCriteria: [
        'Adults aged >= 18 years',
        'Diagnosed Type 2 Diabetes',
        'Randomized controlled trials (RCTs) or prospective cohorts',
        'Intervention involves GLP-1 RA therapy',
        'Reporting HbA1c or cardiovascular outcomes',
        'Published in English >= 2015'
      ],
      exclusionCriteria: [
        'Type 1 Diabetes or gestational diabetes',
        'Animal or in vitro laboratory models',
        'Case reports, letters, editorials, conference abstracts',
        'Sample size < 20 participants'
      ],
      searchQuery: '("Diabetes Mellitus, Type 2"[Mesh] OR "type 2 diabetes"[tiab]) AND ("Glucagon-Like Peptide-1 Receptor Agonists"[Mesh] OR "GLP-1"[tiab] OR "semaglutide"[tiab] OR "dulaglutide"[tiab] OR "tirzepatide"[tiab]) AND ("Randomized Controlled Trial"[pt] OR "clinical trial"[tiab])'
    }
  },
  {
    id: 'urban-green-space',
    name: 'Urban Green Spaces & Mental Wellbeing',
    category: 'Social Science & Environmental Health',
    tagline: 'Urban Planning & Public Health',
    description: 'Assessing the causal link between urban tree canopy, park proximity, and psychiatric health indices in modern metropolitan areas.',
    defaultPico: {
      researchQuestion: 'What is the association between residential exposure to urban green spaces and self-reported mental wellbeing and clinical depression incidence in metropolitan populations?',
      population: 'Urban residents and community populations living in metropolitan areas.',
      intervention: 'High proximity or exposure to urban green spaces (parks, green corridors, tree canopy index, NDVI geospatial metrics).',
      comparison: 'Low green space exposure or built-environment neighborhoods without vegetative infrastructure.',
      outcome: 'Standardized mental wellbeing scores (WHO-5, GHQ-12), depression/anxiety diagnoses, physiological cortisol levels, cognitive restoration.',
      inclusionCriteria: [
        'Geospatially quantified green space exposure (GIS, NDVI, buffer distances)',
        'Validated mental health or psychological wellbeing outcome instruments',
        'Observational, longitudinal, or quasi-experimental studies',
        'Published in peer-reviewed environmental or public health journals'
      ],
      exclusionCriteria: [
        'Rural-only populations',
        'Purely descriptive landscape architecture essays without mental health data',
        'Qualitative focus groups lacking quantitative outcome metrics'
      ],
      searchQuery: '("urban green space"[tiab] OR "greenness"[tiab] OR "urban parks"[tiab] OR "NDVI"[tiab]) AND ("mental health"[tiab] OR "wellbeing"[tiab] OR "depression"[tiab] OR "stress"[tiab])'
    }
  }
];

export const INITIAL_RECENT_REVIEWS: ReviewProject[] = [
  {
    id: 'rev-001',
    topic: 'Transformer Architectures vs RNNs in Low-Resource NLP',
    createdAt: '2026-08-10',
    updatedAt: '2026-08-16',
    status: 'screening_in_progress',
    pico: PICO_TEMPLATES[0].defaultPico as any,
    rawRecords: [],
    screenedRecords: []
  },
  {
    id: 'rev-002',
    topic: 'Perovskite vs Silicon Solar Cells Efficiency & Stability',
    createdAt: '2026-08-05',
    updatedAt: '2026-08-15',
    status: 'completed',
    pico: PICO_TEMPLATES[1].defaultPico as any,
    rawRecords: [],
    screenedRecords: []
  },
  {
    id: 'rev-003',
    topic: 'Impact of Carbon Pricing on Corporate Clean Investment',
    createdAt: '2026-08-01',
    updatedAt: '2026-08-12',
    status: 'records_fetched',
    pico: PICO_TEMPLATES[2].defaultPico as any,
    rawRecords: [],
    screenedRecords: []
  }
];
