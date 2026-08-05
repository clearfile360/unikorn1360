export interface QuizQuestion {
  id: number;
  category: "finance" | "sales" | "automation" | "ai_readiness" | "compliance" | "data_integration";
  categoryTitle: string;
  question: string;
  options: {
    label: string;
    score: number;
    description: string;
  }[];
}

export const ASSESSMENT_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "finance",
    categoryTitle: "Finance & Accounting Intelligence",
    question: "How are your accounting, invoices, and bank reconciliations currently performed?",
    options: [
      { label: "Fully manual on spreadsheets / physical registers", score: 20, description: "High risk of human error & delayed reporting" },
      { label: "Standalone accounting software (e.g. Tally) with manual entries", score: 50, description: "Decent core ledger, isolated from sales/inventory" },
      { label: "Integrated ERP with partial bank feeds and GST sync", score: 80, description: "Good automation, requires periodic reconciliation" },
      { label: "Fully automated real-time Finance360 ledger with predictive cash flow", score: 100, description: "Peak financial intelligence & zero late penalties" }
    ]
  },
  {
    id: 2,
    category: "finance",
    categoryTitle: "Finance & Accounting Intelligence",
    question: "How long does it take your leadership team to obtain a consolidated cash flow & profit report?",
    options: [
      { label: "More than 15 days after month-end", score: 25, description: "Outdated insights hinder timely decisions" },
      { label: "7 to 14 days", score: 50, description: "Standard periodic reporting cycle" },
      { label: "1 to 3 days", score: 75, description: "Near real-time financial tracking" },
      { label: "Instant real-time dashboard on mobile & desktop", score: 100, description: "24/7 continuous financial visibility" }
    ]
  },
  {
    id: 3,
    category: "sales",
    categoryTitle: "Sales & Customer Intelligence",
    question: "How do your sales reps create quotations and manage the customer pipeline?",
    options: [
      { label: "Word documents or manual Excel files sent via personal email", score: 20, description: "Inconsistent formatting and zero central tracking" },
      { label: "Basic CRM software with manual quotation typing", score: 50, description: "Central leads list, slow quotation turnaround" },
      { label: "Automated CPQ generator integrated with inventory", score: 80, description: "Fast quote generation with product catalogs" },
      { label: "AI Sales360 pipeline with predictive deal scoring & instant quote generation", score: 100, description: "Maximum conversion velocity and automated follow-ups" }
    ]
  },
  {
    id: 4,
    category: "sales",
    categoryTitle: "Sales & Customer Intelligence",
    question: "What percentage of inbound customer leads receive a response within 15 minutes?",
    options: [
      { label: "Less than 25%", score: 20, description: "Heavy lead leakage and lost potential revenue" },
      { label: "25% to 50%", score: 50, description: "Delayed response dependent on sales rep availability" },
      { label: "50% to 85%", score: 75, description: "Proactive sales team execution" },
      { label: "Over 85% via automated WhatsApp & email instant response", score: 100, description: "Zero lead drop-off & immediate engagement" }
    ]
  },
  {
    id: 5,
    category: "automation",
    categoryTitle: "Process Automation",
    question: "How much time do staff spend re-entering data from one software to another (e.g. Sales to Billing)?",
    options: [
      { label: "Over 15 hours per week per employee", score: 20, description: "Severe manual bottleneck and double-data entry" },
      { label: "5 to 15 hours per week", score: 45, description: "Moderate manual effort across departments" },
      { label: "1 to 5 hours per week", score: 75, description: "Mostly connected systems with few manual bridges" },
      { label: "Under 1 hour — system flows automatically end-to-end", score: 100, description: "Maximum process efficiency and seamless data flow" }
    ]
  },
  {
    id: 6,
    category: "automation",
    categoryTitle: "Process Automation",
    question: "How are inventory levels and raw material reorder points monitored?",
    options: [
      { label: "Physical stock counting when shortages occur", score: 20, description: "Unplanned stockouts and emergency purchasing" },
      { label: "Periodic manual Excel stock audits", score: 45, description: "Delayed visibility of material stock" },
      { label: "System triggers email alert on low stock threshold", score: 75, description: "Proactive safety stock tracking" },
      { label: "Predictive Factory360 reorder trigger with supplier PO generation", score: 100, description: "Optimal stock turnover and zero production delays" }
    ]
  },
  {
    id: 7,
    category: "ai_readiness",
    categoryTitle: "AI & Decision Readiness",
    question: "Does your leadership team utilize AI or machine learning for business decision-making?",
    options: [
      { label: "No AI usage; relying strictly on intuition and static reports", score: 20, description: "Conventional management approach" },
      { label: "Occasional public AI tools (e.g. ChatGPT) for drafting copy", score: 45, description: "Individual prompt usage, unintegrated with enterprise data" },
      { label: "Internal AI prototypes or search models over company files", score: 75, description: "Early adoption of RAG & search tools" },
      { label: "Dedicated UNIKORN360 AI Executives (AI CEO, CFO, Legal) orchestrating daily operations", score: 100, description: "Fully integrated Digital Business Brain" }
    ]
  },
  {
    id: 8,
    category: "ai_readiness",
    categoryTitle: "AI & Decision Readiness",
    question: "Is your company data organized in a searchable format accessible to AI agents?",
    options: [
      { label: "Scattered across paper documents, personal drives, and chat apps", score: 15, description: "Siloed and unsearchable institutional knowledge" },
      { label: "Stored in cloud folders (Google Drive / OneDrive) with basic folder structure", score: 50, description: "Central storage, manual file search required" },
      { label: "Structured database with document tags and metadata", score: 80, description: "Clean data pipeline ready for indexing" },
      { label: "Enterprise Knowledge Graph and RAG Vector Database deployed", score: 100, description: "Instant semantic knowledge retrieval across the enterprise" }
    ]
  },
  {
    id: 9,
    category: "compliance",
    categoryTitle: "Compliance & Legal Risk",
    question: "How are statutory licenses, permits, and contract expirations tracked in your company?",
    options: [
      { label: "No tracking system; discovered when penalties or legal notices arrive", score: 15, description: "Critical regulatory exposure and penalty risk" },
      { label: "Manual calendar reminders managed by an individual employee", score: 45, description: "Vulnerable to employee turnover or missed dates" },
      { label: "Digital compliance software with automated email notifications", score: 75, description: "Structured compliance tracking" },
      { label: "Autonomous Legal360 risk engine with contract clause scoring and direct auto-renewals", score: 100, description: "100% audit readiness and zero compliance failures" }
    ]
  },
  {
    id: 10,
    category: "compliance",
    categoryTitle: "Compliance & Legal Risk",
    question: "Does your company actively track government subsidies, incentives, and tax concessions?",
    options: [
      { label: "No awareness of applicable subsidies", score: 20, description: "Missing out on substantial government financial grants" },
      { label: "Relying on external consultants to periodically check subsidies", score: 50, description: "Intermittent claims with delayed documentation" },
      { label: "Internal team manually reviews policy documents", score: 75, description: "Proactive manual policy review" },
      { label: "Compliance360 Automated Subsidy Calculator & Instant DPR Generator deployed", score: 100, description: "Maximized capital grant claims and zero missed opportunities" }
    ]
  },
  {
    id: 11,
    category: "data_integration",
    categoryTitle: "Data Integration & Infrastructure",
    question: "Can your CEO or board view a single unified dashboard showing live KPIs from Finance, HR, Sales, and Production?",
    options: [
      { label: "No, numbers are gathered from 4 separate departments and manually combined into PPT", score: 20, description: "Labor-intensive and prone to conflicting numbers" },
      { label: "Partially combined monthly presentation", score: 50, description: "Static summary without drill-down capabilities" },
      { label: "BI Dashboard (e.g. PowerBI / Tableau) updated daily", score: 80, description: "Solid visual analytics requiring manual data pipeline maintenance" },
      { label: "Executive360 Single Source of Truth dashboard with real-time morning AI briefing", score: 100, description: "Complete real-time executive visibility" }
    ]
  },
  {
    id: 12,
    category: "data_integration",
    categoryTitle: "Data Integration & Infrastructure",
    question: "How are multi-branch or remote operational teams connected?",
    options: [
      { label: "Standalone offline desktop software at each location", score: 20, description: "Siloed branch data with delayed end-of-month reporting" },
      { label: "Remote desktop access or periodic Excel emailing", score: 45, description: "Cumbersome and slow connectivity" },
      { label: "Cloud-hosted web application with role-based permissions", score: 80, description: "Unified cloud accessibility" },
      { label: "Enterprise Cloud Portal with RBAC, Mobile access, and offline sync capability", score: 100, description: "Seamless multi-branch collaboration and security" }
    ]
  }
];
