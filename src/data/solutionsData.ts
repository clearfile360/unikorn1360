export interface SolutionModule {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  problem: string;
  capabilities: string[];
  workflows: string[];
  aiFeatures: string[];
  targetCustomers: string[];
  outcomes: string[];
  iconName: string;
}

export interface AiExecutive {
  id: string;
  title: string;
  role: string;
  focusArea: string;
  capabilities: string[];
  sampleQuery: string;
}

export const SOLUTIONS_DATA: SolutionModule[] = [
  {
    id: "finance360",
    name: "Finance360",
    shortCode: "FIN",
    tagline: "Automated Accounting, Tax Intelligence & Cash Flow Forecasting",
    problem: "Fragmented accounting, delayed GST/TDS filings, manual invoice reconciliation, and unpredictable cash flow strain business growth.",
    capabilities: [
      "Real-time Double Entry Ledger & Automated Bank Reconciliation",
      "Automated GST (GSTR-1, GSTR-3B) & TDS Direct Filings",
      "Predictive Cash Flow Forecasting & Working Capital Analytics",
      "Vendor Invoice Scanning with OCR & Audit Trails",
      "Multi-currency & Multi-entity Financial Consolidation"
    ],
    workflows: [
      "PO -> Invoice -> Vendor Payment Approval Pipeline",
      "Automated Payment Reminder Escalations",
      "Monthly Financial Closing Automation",
      "Expense Anomaly & Fraud Detection Engine"
    ],
    aiFeatures: [
      "AI CFO Advisory bot for margin optimization",
      "Automated tax optimization recommendation",
      "Real-time cash burnout alerts"
    ],
    targetCustomers: ["MSMEs", "Manufacturing Plants", "Exporters", "CFOs", "Accounting Firms"],
    outcomes: ["85% Reduction in Closing Time", "Zero GST Late Penalties", "Predictive Cash Flow Accuracy"],
    iconName: "DollarSign"
  },
  {
    id: "legal360",
    name: "Legal360",
    shortCode: "LEG",
    tagline: "Autonomous Compliance, Contract Lifecycle & Legal Risk Mitigation",
    problem: "Outdated license renewals, risky vendor contracts, and unmonitored regulatory changes create massive litigation risks.",
    capabilities: [
      "AI Contract Drafting & Multi-clause Risk Scoring",
      "Automated Statutory License & Permit Expiry Tracker",
      "Court Case & Litigation Milestone Monitor",
      "Regulatory & Labor Law Compliance Engine",
      "Digital Signature & Immutable Document Vault"
    ],
    workflows: [
      "NDA & Vendor Agreement Auto-generation",
      "License Renewal Escalation to Legal Counsel",
      "Compliance Audit Trail Generation"
    ],
    aiFeatures: [
      "AI Legal Advisor for instant contract clause analysis",
      "Regulatory risk alert engine",
      "IP & Trademark monitoring"
    ],
    targetCustomers: ["Corporate Legal Teams", "Exporters", "Hospitality", "Factory Owners"],
    outcomes: ["100% On-time License Renewals", "Instant Contract Audit", "Minimised Litigation Risk"],
    iconName: "ShieldCheck"
  },
  {
    id: "hr360",
    name: "HR360",
    shortCode: "HR",
    tagline: "End-to-End People Intelligence, Recruitment & Automated Payroll",
    problem: "High employee turnover, messy attendance tracking, manual payroll calculations, and unaligned performance reviews.",
    capabilities: [
      "AI Resume Screening & Automated Candidate Matching",
      "Biometric / Mobile Geo-fenced Attendance & Shift Rosters",
      "Automated One-click Payroll with PF, ESI, PT Calculation",
      "Continuous OKR / KPI Performance Tracking",
      "Employee Self-Service Portal & Expense Reimbursements"
    ],
    workflows: [
      "Onboarding Checklist & Document Verification Workflow",
      "Leave Request & Overtime Approval Automation",
      "Exit Interview & Separation Analytics"
    ],
    aiFeatures: [
      "AI HR Director for attrition risk prediction",
      "Automated employee sentiment analysis",
      "Personalized skill gap learning plans"
    ],
    targetCustomers: ["Growing Enterprises", "IT Services", "Retail Chains", "Manufacturing Units"],
    outcomes: ["60% Faster Hiring Cycle", "Zero Payroll Errors", "Higher Employee Retention"],
    iconName: "Users"
  },
  {
    id: "sales360",
    name: "Sales360",
    shortCode: "SLS",
    tagline: "Precision CRM, Quotation Engine & Revenue Forecasting",
    problem: "Leads slipping through cracks, long quotation cycles, poor salesperson accountability, and inaccurate sales forecasts.",
    capabilities: [
      "Omnichannel Lead Capture (Web, WhatsApp, Email, Phone)",
      "Instant Professional PDF Quotation & CPQ Generator",
      "Visual Pipeline Management & Stage Automation",
      "Sales Rep Activity Tracking & Visit Geotagging",
      "Customer Lifetime Value (LTV) & Churn Analytics"
    ],
    workflows: [
      "Lead Assignment based on Region & Deal Size",
      "Automated Follow-up WhatsApp / Email Drips",
      "Won Deal -> Sales Order -> Invoice Trigger"
    ],
    aiFeatures: [
      "AI Sales Director for win probability scoring",
      "Smart follow-up timing recommendation",
      "Automated competitor objection handler"
    ],
    targetCustomers: ["B2B Companies", "Wholesalers", "Real Estate", "Consulting Firms"],
    outcomes: ["3x Faster Quote Generation", "35% Increase in Deal Win Rate", "Full Pipeline Transparency"],
    iconName: "TrendingUp"
  },
  {
    id: "factory360",
    name: "Factory360",
    shortCode: "MFG",
    tagline: "Smart Manufacturing Execution, Production & Supply Chain Intelligence",
    problem: "Unplanned machine downtime, raw material stockouts, production bottlenecks, and inconsistent quality inspection.",
    capabilities: [
      "Production Scheduling & Bill of Materials (BOM) Control",
      "Machine Utilization & Downtime Analytics",
      "Quality Control (QC) Inspection Checklists & Defect Logging",
      "Predictive Equipment Maintenance Scheduler",
      "Raw Material Reorder Level & Supply Chain Control"
    ],
    workflows: [
      "Work Order -> Batch Release -> QC Pass -> Warehouse Staging",
      "Auto-trigger Purchase Order on Low Safety Stock",
      "Downtime Ticket Escalation to Engineering"
    ],
    aiFeatures: [
      "AI Operations Manager for bottleneck detection",
      "Predictive maintenance failure warning",
      "Production yield optimization engine"
    ],
    targetCustomers: ["Manufacturing Factories", "Textile Mills", "Food Processing", "Pharma Plants"],
    outcomes: ["25% Increase in OEE", "40% Less Downtime", "Optimized Inventory Turnover"],
    iconName: "Factory"
  },
  {
    id: "executive360",
    name: "Executive360",
    shortCode: "EXEC",
    tagline: "Single CEO Command Center, Board Analytics & Business Health Score",
    problem: "CEOs relying on outdated monthly reports, inconsistent departmental numbers, and lack of real-time risk visibility.",
    capabilities: [
      "Real-time Consolidated CEO Dashboard & Daily Briefing",
      "Automated Board Report & Investor Deck Generator",
      "Composite Business Health Score (0–100 Index)",
      "Cross-departmental Risk Alert System",
      "Strategic Goal & OKR Alignment Tracker"
    ],
    workflows: [
      "Daily Morning Executive Briefing Generation",
      "Executive Escalation Trigger for Critical Margins",
      "Quarterly Board Pack Auto-compilation"
    ],
    aiFeatures: [
      "AI CEO Strategic Advisor for scenario planning",
      "Automated competitor intelligence radar",
      "Macroeconomic & industry trend impact model"
    ],
    targetCustomers: ["Founders", "CEOs", "Board Members", "Managing Directors"],
    outcomes: ["Instant Executive Visibility", "100% Single Source of Truth", "Data-Driven Strategy"],
    iconName: "LayoutDashboard"
  },
  {
    id: "ai360",
    name: "AI360",
    shortCode: "AI",
    tagline: "Enterprise AI Agents, Decision Intelligence & Automation Studio",
    problem: "Teams spending thousands of manual hours on repetitive document analysis, data entry, and multi-step routine tasks.",
    capabilities: [
      "Autonomous Enterprise AI Agent Deployment",
      "Custom Natural Language Querying over Enterprise Data",
      "Visual No-Code Workflow & Decision Chain Studio",
      "Multi-modal Document Intelligence (PDF, Images, Audio)",
      "AI Model Guardrails & Data Privacy Control"
    ],
    workflows: [
      "Unstructured Invoice / PO Document Extraction",
      "Customer Inquiry Auto-resolution & Escalation",
      "Contract Clause Comparison Automation"
    ],
    aiFeatures: [
      "AI Strategy Officer for autonomous task delegation",
      "Enterprise RAG vector knowledge base",
      "Predictive trend simulation model"
    ],
    targetCustomers: ["Enterprise Leadership", "Digital Transformation Teams", "Operations Leaders"],
    outcomes: ["70% Operational Time Saved", "24/7 Autonomous Execution", "Scalable Growth"],
    iconName: "Cpu"
  },
  {
    id: "compliance360",
    name: "Compliance360",
    shortCode: "CMP",
    tagline: "Government Subsidy Advisory, Knowledge Base & Documentation Automation",
    problem: "Missing out on government subsidies, complex documentation requirements, and decentralized enterprise knowledge.",
    capabilities: [
      "State & Central Government Subsidy Eligibility Calculator",
      "Automated Subsidy Project Report & Application Generator",
      "Enterprise Knowledge Management & Policy Library",
      "ISO, Environmental & Industry Audit Tracker",
      "Document Archival & Version Control System"
    ],
    workflows: [
      "Subsidy Application Stage & Disbursement Monitor",
      "Annual Audit Checklist Auto-dispatch",
      "Policy Update Notification Engine"
    ],
    aiFeatures: [
      "AI Subsidy Consultant for maximum grant unlocking",
      "Automated policy match model",
      "Smart knowledge query assistant"
    ],
    targetCustomers: ["MSMEs", "New Industrial Units", "Exporters", "Green Energy Projects"],
    outcomes: ["Maximized Capital Subsidy Claims", "Zero Audit Findings", "Centralized Knowledge"],
    iconName: "FileCheck"
  }
];

export const AI_EXECUTIVES: AiExecutive[] = [
  {
    id: "ai-ceo",
    title: "AI CEO",
    role: "Strategic Direction & Vision",
    focusArea: "Growth strategies, business model expansion, and executive alignment.",
    capabilities: ["Scenario planning", "Capital allocation insights", "Strategic risk assessment"],
    sampleQuery: "What are our top 3 growth opportunities for next quarter based on current cash reserves?"
  },
  {
    id: "ai-cfo",
    title: "AI CFO",
    role: "Financial Intelligence & Cash Control",
    focusArea: "Working capital, margin optimization, and financial forecasting.",
    capabilities: ["Cash burnout alerts", "Profit margin sensitivity analysis", "Expense anomaly detection"],
    sampleQuery: "How will a 10% increase in raw material cost impact our net margin next month?"
  },
  {
    id: "ai-ca",
    title: "AI CA",
    role: "Taxation, GST & Statutory Audit",
    focusArea: "GST compliance, TDS reconciliation, and audit readiness.",
    capabilities: ["Automated GSTR 2B vs Purchase ledger matching", "Tax saving recommendations", "Penalty avoidance"],
    sampleQuery: "Are there any unverified vendor invoices in our GSTR-2B this month?"
  },
  {
    id: "ai-legal",
    title: "AI Legal Advisor",
    role: "Contracts & Governance",
    focusArea: "Contract risk scoring, statutory permits, and legal governance.",
    capabilities: ["Clause risk analysis", "License expiry monitoring", "NDA auto-drafting"],
    sampleQuery: "Review this vendor contract for indemnification risks and termination clauses."
  },
  {
    id: "ai-hr",
    title: "AI HR Director",
    role: "Talent & Organizational Culture",
    focusArea: "Recruitment, attrition prediction, and team productivity.",
    capabilities: ["Resume scoring", "Sentiment analysis", "Optimal shift scheduling"],
    sampleQuery: "Which department has the highest risk of attrition in the next 60 days?"
  },
  {
    id: "ai-sales",
    title: "AI Sales Director",
    role: "Revenue Pipeline & Conversion",
    focusArea: "Deal velocity, win probability, and salesperson effectiveness.",
    capabilities: ["Deal score modeling", "Follow-up schedule optimizer", "CPQ recommendation"],
    sampleQuery: "Which high-value leads require immediate executive intervention to close this week?"
  },
  {
    id: "ai-procurement",
    title: "AI Procurement Manager",
    role: "Vendor & Supply Chain Intelligence",
    focusArea: "Raw material sourcing, vendor negotiation, and lead times.",
    capabilities: ["Vendor price variance tracker", "Reorder point alerts", "Quality rating engine"],
    sampleQuery: "Which raw material suppliers have delivered with delays over the past quarter?"
  },
  {
    id: "ai-ops",
    title: "AI Operations Director",
    role: "Operational Efficiency & QC",
    focusArea: "Factory throughput, process bottlenecks, and quality assurance.",
    capabilities: ["OEE optimization", "Preventive maintenance scheduling", "Bottleneck detection"],
    sampleQuery: "What is causing the 15% drop in Line 2 production output today?"
  },
  {
    id: "ai-strategy",
    title: "AI Strategy Officer",
    role: "Future Transformation & Market Dynamics",
    focusArea: "Market intelligence, competitor mapping, and AI adoption roadmap.",
    capabilities: ["Industry benchmark analysis", "Emerging market trend tracking", "Tech stack ROI"],
    sampleQuery: "What AI workflows should we prioritize first for maximum ROI in manufacturing?"
  }
];
