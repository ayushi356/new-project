import type { PublicFinanceRecord, FinancialSectionId } from '@/types/finance';

export interface SectionMeta {
  id: FinancialSectionId;
  label: string;
  shortLabel: string;
  iconName: string;
  plainQuestion: string;
  citizenDescription: string;
}

export const FINANCIAL_SECTIONS: SectionMeta[] = [
  {
    id: 'revenue',
    label: '1. Revenue Sources',
    shortLabel: 'Revenue',
    iconName: 'Receipt',
    plainQuestion: 'Where does public money come from?',
    citizenDescription:
      'The taxes, duties, and non-tax earnings (like dividends from the Reserve Bank and state-owned companies) collected from citizens and businesses to fund governance.',
  },
  {
    id: 'allocation',
    label: '2. Budget Allocations',
    shortLabel: 'Allocations',
    iconName: 'PieChart',
    plainQuestion: 'How is the budget partitioned across ministries?',
    citizenDescription:
      'The spending ceiling authorized by Parliament to each ministry for the year. An allocation represents an authorization ceiling, not money actually spent.',
  },
  {
    id: 'expenditure',
    label: '3. Actual Expenditure',
    shortLabel: 'Expenditure',
    iconName: 'TrendingDown',
    plainQuestion: 'How much was actually spent, and on what?',
    citizenDescription:
      'Distinguishes Capital Expenditure (investing in physical assets like roads, bridges, and defense equipment) from Revenue Expenditure (salaries, pensions, and daily operations).',
  },
  {
    id: 'schemes',
    label: '4. Schemes & Public Projects',
    shortLabel: 'Schemes',
    iconName: 'FolderKanban',
    plainQuestion: 'How do major welfare programs release and utilize money?',
    citizenDescription:
      'Tracks funding for nationwide schemes and public infrastructure: funds budgeted versus funds released to states, and utilization certificates submitted on the ground.',
  },
  {
    id: 'tax_incentives',
    label: '5. Tax Incentives & Foregone',
    shortLabel: 'Tax Incentives',
    iconName: 'Tag',
    plainQuestion: 'What taxes did the government choose not to collect?',
    citizenDescription:
      'Official statement of "Revenue Foregone" — statutory tax deductions, tariff waivers, and corporate rebates granted to incentivize industrial growth or personal savings.',
  },
  {
    id: 'audits',
    label: '6. Audits & CAG Findings',
    shortLabel: 'Audits',
    iconName: 'FileCheck2',
    plainQuestion: 'What did independent government auditors discover?',
    citizenDescription:
      'Factual summaries of reports table-laid in Parliament by the Comptroller and Auditor General of India (CAG), including financial deviations, delays, and ministry responses.',
  },
  {
    id: 'procurement',
    label: '7. Procurement & Contracts',
    shortLabel: 'Procurement',
    iconName: 'FileSignature',
    plainQuestion: 'How are commercial contracts and vendors selected?',
    citizenDescription:
      'Public purchasing records from platforms like the Government e-Marketplace (GeM) and tender portals, distinguishing competitive open tenders from single-source nominations.',
  },
  {
    id: 'debt',
    label: '8. Debt & Financial Liabilities',
    shortLabel: 'Debt & Loans',
    iconName: 'Landmark',
    plainQuestion: 'How much does the government owe, and at what cost?',
    citizenDescription:
      'National borrowing through treasury bonds, small savings, and external loans, along with the annual interest payment burden required to service past debt.',
  },
  {
    id: 'state_finance',
    label: '9. State & Local Devolution',
    shortLabel: 'State & Local',
    iconName: 'GitFork',
    plainQuestion: 'How is national tax revenue shared with states and cities?',
    citizenDescription:
      'The sharing of central taxes with 28 states under the 41% formula recommended by the Finance Commission, alongside municipal and panchayat local body grants.',
  },
  {
    id: 'comparison',
    label: '10. Year-on-Year Comparisons',
    shortLabel: 'YoY Trends',
    iconName: 'BarChart3',
    plainQuestion: 'How has national financial health evolved over time?',
    citizenDescription:
      'Five-year trajectory of key fiscal health indicators including Fiscal Deficit as a percentage of GDP, the growth in infrastructure capex, and tax-to-GDP ratios.',
  },
];

/**
 * Macro Citizen Dashboard Data: "The Citizen's Rupee"
 * Visual representation of 1 Rupee (100 Paise) of Union Receipts & Expenditure
 */
export const CITIZEN_RUPEE_BREAKDOWN = {
  financialYear: 'FY 2024-25 (Budget Estimates)',
  where1RupeeComesFrom: [
    { source: 'Borrowings & Other Liabilities', paise: 27, color: '#B45309' }, // Muted Saffron for deficit liability
    { source: 'Income Tax', paise: 19, color: '#1A3D2F' }, // Primary Forest Green
    { source: 'Goods & Services Tax (GST)', paise: 18, color: '#275240' },
    { source: 'Corporation Tax', paise: 17, color: '#366852' },
    { source: 'Non-Tax Receipts (RBI / PSUs)', paise: 9, color: '#4B7F67' },
    { source: 'Union Excise Duties', paise: 5, color: '#689880' },
    { source: 'Customs Duties', paise: 4, color: '#87B09B' },
    { source: 'Non-Debt Capital Receipts', paise: 1, color: '#A7C8B6' },
  ],
  where1RupeeGoes: [
    { destination: 'Interest Payments on Past Debt', paise: 19, color: '#B45309' }, // Muted Saffron for past debt servicing
    { destination: 'States’ Share of Taxes & Duties', paise: 21, color: '#1A3D2F' }, // Primary Forest Green
    { destination: 'Central Sector Schemes (Full Central Funding)', paise: 16, color: '#275240' },
    { destination: 'Finance Commission & Other Transfers', paise: 9, color: '#366852' },
    { destination: 'Centrally Sponsored Schemes (Centre-State Sharing)', paise: 8, color: '#4B7F67' },
    { destination: 'Defence Outlay', paise: 8, color: '#5C9078' },
    { destination: 'Subsidies (Food, Fertilizer, Fuel)', paise: 6, color: '#73A58D' },
    { destination: 'Pensions', paise: 4, color: '#8EBBA5' },
    { destination: 'Other Operational Expenditure', paise: 9, color: '#ABD1BD' },
  ],
  macroTotals: {
    totalBudgetOutlayCr: 4820512, // ₹48.21 Lakh Crore
    totalRevenueReceiptsCr: 3129185,
    capitalExpenditureCr: 1111111, // Record ₹11.11 Lakh Cr Capex
    fiscalDeficitTargetPct: 4.9, // 4.9% of GDP target for FY25
  },
};

/**
 * Sample Demonstration Records for the 10 Financial Sections.
 * All figures are clearly marked as sample records for interface demonstration.
 */
export const SAMPLE_FINANCE_RECORDS: PublicFinanceRecord[] = [
  // ==========================================
  // SECTION 1: REVENUE SOURCES
  // ==========================================
  {
    id: 'rev-sample-01',
    section: 'revenue',
    title: 'Goods and Services Tax (Central GST & Share of Integrated GST)',
    plainSummary:
      'Indirect tax collected on goods and services manufactured and sold within India, shared between the Union and the States.',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'union',
    departmentOrMinistry: 'Department of Revenue, Ministry of Finance',
    sectorTag: 'Indirect Taxation',
    status: 'sample_demonstration',
    amountCr: 1067650,
    figureType: 'budget_estimate',
    budgetEstimateCr: 1067650,
    revisedEstimateCr: 956600,
    actualAmountCr: 819300,
    previousYearAmountCr: 819300,
    details: {
      revenueType: 'indirect_tax',
      collectionEfficiencyPct: 98.4,
    },
    source: {
      documentTitle: 'Union Budget 2024-25: Receipt Budget',
      publishingAuthority: 'Ministry of Finance, Government of India',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Statement 1: Revenue Receipts, Page 4, Table 2 (Sample demonstration citation)',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod: 'Reported directly as Central GST + estimated share of unapportioned IGST.',
      coverageNotes: 'Excludes state GST (SGST) collected directly by state governments into their respective treasuries.',
      lastUpdated: '2024-08-01',
    },
  },
  {
    id: 'rev-sample-02',
    section: 'revenue',
    title: 'Corporation Tax (Corporate Income Tax Receipts)',
    plainSummary:
      'Direct taxes paid by registered companies and corporate enterprises on their annual taxable net profits.',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'union',
    departmentOrMinistry: 'Central Board of Direct Taxes (CBDT), Ministry of Finance',
    sectorTag: 'Direct Taxation',
    status: 'sample_demonstration',
    amountCr: 1020000,
    figureType: 'budget_estimate',
    budgetEstimateCr: 1020000,
    revisedEstimateCr: 922675,
    actualAmountCr: 825834,
    previousYearAmountCr: 825834,
    details: {
      revenueType: 'direct_tax',
      collectionEfficiencyPct: 99.1,
    },
    source: {
      documentTitle: 'Union Budget 2024-25: Receipt Budget',
      publishingAuthority: 'Ministry of Finance, Government of India',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Receipt Budget, Annexure 1: Direct Tax Receipts, Page 12 (Sample citation)',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod: 'Reported as gross corporate tax receipts minus refunds issued during the financial year.',
      coverageNotes: 'Reflects the post-2019 corporate tax rate structure (22% base rate for domestic manufacturing entities).',
      lastUpdated: '2024-08-01',
    },
  },
  {
    id: 'rev-sample-03',
    section: 'revenue',
    title: 'Non-Tax Revenue: Reserve Bank of India Surplus Transfer & PSU Dividends',
    plainSummary:
      'Income earned by the Union Government without levying taxes, primarily through the annual surplus dividend transferred by the Reserve Bank of India.',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'union',
    departmentOrMinistry: 'Department of Economic Affairs, Ministry of Finance',
    sectorTag: 'Non-Tax Revenue',
    status: 'sample_demonstration',
    amountCr: 210874,
    figureType: 'budget_estimate',
    budgetEstimateCr: 210874,
    revisedEstimateCr: 104400,
    actualAmountCr: 87400,
    previousYearAmountCr: 87400,
    details: {
      revenueType: 'non_tax',
      collectionEfficiencyPct: 100.0,
    },
    source: {
      documentTitle: 'RBI Annual Report & Union Budget Receipt Budget',
      publishingAuthority: 'Reserve Bank of India & Ministry of Finance',
      publicationDate: 'May 22, 2024',
      tableOrPageReference: 'Receipt Budget, Statement 2: Dividends and Profits, Page 16 (Sample citation)',
      sourceUrl: 'https://rbi.org.in/',
      calculationMethod: 'Calculated as RBI board-approved surplus dividend plus dividends from Central Public Sector Enterprises (CPSEs).',
      coverageNotes: 'Includes a historic ₹2.11 Lakh Crore dividend transfer approved by the RBI Central Board for FY 2023-24 accounted in FY25 receipts.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 2: BUDGET ALLOCATIONS
  // ==========================================
  {
    id: 'alloc-sample-01',
    section: 'allocation',
    title: 'Ministry of Defence: Total Budget Authorization (Defence Services & Capital)',
    plainSummary:
      'Parliamentary spending authorization for armed forces modernization, equipment procurement, military salaries, pensions, and border maintenance.',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'union',
    departmentOrMinistry: 'Ministry of Defence',
    sectorTag: 'National Security',
    status: 'sample_demonstration',
    amountCr: 621541,
    figureType: 'budget_estimate',
    budgetEstimateCr: 621541,
    revisedEstimateCr: 593538,
    actualAmountCr: 574000,
    previousYearAmountCr: 574000,
    details: {
      shareOfTotalBudgetPct: 12.9,
      allocationCeilingNote:
        'Represents authorization ceiling across 4 Demand for Grants (Defence Civil, Army, Navy, Air Force, and Defence Pensions). Not money spent.',
    },
    source: {
      documentTitle: 'Union Budget 2024-25: Demands for Grants (Demand No. 19-22)',
      publishingAuthority: 'Ministry of Finance & Ministry of Defence',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Expenditure Profile, Statement 1: Budget at a Glance, Page 8 (Sample citation)',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod: 'Sum of Revenue Outlay (₹2.82L Cr), Capital Outlay (₹1.72L Cr), and Pensions (₹1.41L Cr) and Civil works.',
      coverageNotes: 'Pensions account for roughly 22.7% of the total defense allocation envelope.',
      lastUpdated: '2024-08-01',
    },
  },
  {
    id: 'alloc-sample-02',
    section: 'allocation',
    title: 'Ministry of Road Transport and Highways: Highway Development Outlay',
    plainSummary:
      'Budgetary ceiling authorized for building, widening, and maintaining national expressways, economic corridors, and border link roads.',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'union',
    departmentOrMinistry: 'Ministry of Road Transport and Highways',
    sectorTag: 'Infrastructure',
    status: 'sample_demonstration',
    amountCr: 278000,
    figureType: 'budget_estimate',
    budgetEstimateCr: 278000,
    revisedEstimateCr: 276000,
    actualAmountCr: 242000,
    previousYearAmountCr: 242000,
    details: {
      shareOfTotalBudgetPct: 5.8,
      allocationCeilingNote:
        'Over 95% of this allocation is statutory capital expenditure to create permanent national highway assets.',
    },
    source: {
      documentTitle: 'Demands for Grants: Ministry of Road Transport and Highways (Demand No. 86)',
      publishingAuthority: 'Ministry of Road Transport and Highways',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Expenditure Profile, Statement 3: Capital Outlays, Page 22 (Sample citation)',
      sourceUrl: 'https://morth.nic.in/',
      calculationMethod: 'Net budgetary support to NHAI, NHIDCL, and ministry direct highway schemes.',
      coverageNotes: 'NHAI borrowing limits from extra-budgetary resources were minimized to fund projects directly from the budget.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 3: ACTUAL EXPENDITURE
  // ==========================================
  {
    id: 'exp-sample-01',
    section: 'expenditure',
    title: 'Capital Expenditure: Creation of National Physical & Strategic Assets',
    plainSummary:
      'Actual public money spent on constructing highways, laying railway tracks, purchasing defense hardware, and building ports—creating long-term productive assets for the country.',
    financialYear: 'FY 2023-24 (Actuals)',
    govLevel: 'union',
    departmentOrMinistry: 'Controller General of Accounts (CGA), Ministry of Finance',
    sectorTag: 'Capital Investment',
    status: 'sample_demonstration',
    amountCr: 948506,
    figureType: 'actual',
    budgetEstimateCr: 1000000,
    revisedEstimateCr: 950000,
    actualAmountCr: 948506,
    previousYearAmountCr: 736000,
    details: {
      expenditureType: 'capital',
      utilizationRatePct: 99.8,
      unspentSurrenderedCr: 1494,
    },
    source: {
      documentTitle: 'Union Government Finance Accounts 2023-24',
      publishingAuthority: 'Controller General of Accounts (CGA), Department of Expenditure',
      publicationDate: 'May 31, 2024',
      tableOrPageReference: 'Accounts at a Glance, Statement 1: Capital Account Outlays, Page 6 (Sample citation)',
      sourceUrl: 'https://cga.nic.in/',
      calculationMethod: 'Audited cash disbursements recorded through the Public Financial Management System (PFMS).',
      coverageNotes: 'Includes capital grants given to states specifically for capital asset creation under the 50-year interest-free capex loan scheme.',
      lastUpdated: '2024-08-01',
    },
  },
  {
    id: 'exp-sample-02',
    section: 'expenditure',
    title: 'Major Subsidies Expenditure (Food, Fertilizer & Petroleum)',
    plainSummary:
      'Actual money spent by the Union government to supply subsidized food grains under the National Food Security Act and ensure affordable crop fertilizer for farmers.',
    financialYear: 'FY 2023-24 (Actuals)',
    govLevel: 'union',
    departmentOrMinistry: 'Department of Expenditure, Ministry of Finance',
    sectorTag: 'Social Welfare & Agriculture',
    status: 'sample_demonstration',
    amountCr: 413541,
    figureType: 'actual',
    budgetEstimateCr: 374707,
    revisedEstimateCr: 413541,
    actualAmountCr: 413541,
    previousYearAmountCr: 531000,
    details: {
      expenditureType: 'revenue',
      utilizationRatePct: 100.0,
      unspentSurrenderedCr: 0,
    },
    source: {
      documentTitle: 'Expenditure Profile: Statement 11 (Subsidies)',
      publishingAuthority: 'Ministry of Finance, Government of India',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Statement 11: Subsidies Allocation vs Actuals, Page 45 (Sample citation)',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod: 'Food subsidy (FCI disbursements) ₹2.12L Cr + Fertilizer subsidy ₹1.88L Cr + LPG subsidy ₹12K Cr.',
      coverageNotes: 'Fertilizer subsidy increased due to international natural gas and urea price shocks following geopolitical conflicts.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 4: SCHEMES & PUBLIC PROJECTS
  // ==========================================
  {
    id: 'scheme-sample-01',
    section: 'schemes',
    title: 'Jal Jeevan Mission: Tap Water for Every Rural Household (Har Ghar Jal)',
    plainSummary:
      'Centrally sponsored scheme funded 50:50 between the Union and State governments to provide functional tap water connections to every rural home.',
    financialYear: 'FY 2023-24 (RE vs Actuals)',
    govLevel: 'union',
    departmentOrMinistry: 'Department of Drinking Water and Sanitation, Ministry of Jal Shakti',
    sectorTag: 'Rural Infrastructure',
    status: 'sample_demonstration',
    amountCr: 70000,
    figureType: 'actual',
    budgetEstimateCr: 70000,
    revisedEstimateCr: 70000,
    actualAmountCr: 68340,
    previousYearAmountCr: 55000,
    details: {
      schemeType: 'centrally_sponsored',
      budgetedVsReleasedPct: 97.6,
      pendingUtilizationCertificatesCr: 4120,
      physicalProgress: 'Over 150 million rural households connected with tap water connections out of ~193 million target.',
    },
    source: {
      documentTitle: 'Jal Jeevan Mission Dashboard & Ministry of Finance Centrally Sponsored Schemes Release Statement',
      publishingAuthority: 'Ministry of Jal Shakti & PFMS Portal',
      publicationDate: 'April 15, 2024',
      tableOrPageReference: 'JJM Financial Progress Report 2023-24, Table 3.2 (Sample citation)',
      sourceUrl: 'https://ejalshakti.gov.in/jjmreport/',
      calculationMethod: 'Central fund releases to State Single Nodal Agencies (SNA) minus unspent balances held in state treasury accounts.',
      coverageNotes: '₹4,120 Crore held by five states pending verification of completion certificates before next installment release.',
      lastUpdated: '2024-08-01',
    },
  },
  {
    id: 'scheme-sample-02',
    section: 'schemes',
    title: 'Pradhan Mantri Awas Yojana – Gramin (PMAY-G Housing)',
    plainSummary:
      'Direct financial assistance of ₹1.20 lakh to ₹1.30 lakh per rural beneficiary family to build permanent, flood-resilient pucca houses.',
    financialYear: 'FY 2023-24 (Actuals)',
    govLevel: 'union',
    departmentOrMinistry: 'Ministry of Rural Development',
    sectorTag: 'Rural Housing',
    status: 'sample_demonstration',
    amountCr: 32000,
    figureType: 'actual',
    budgetEstimateCr: 54487,
    revisedEstimateCr: 32000,
    actualAmountCr: 31800,
    previousYearAmountCr: 48000,
    details: {
      schemeType: 'centrally_sponsored',
      budgetedVsReleasedPct: 58.7,
      pendingUtilizationCertificatesCr: 1850,
      physicalProgress: '29.5 million rural houses constructed against target of 29.5 million; extended for another 20 million houses.',
    },
    source: {
      documentTitle: 'AwaasSoft MIS Financial Progress Report',
      publishingAuthority: 'Ministry of Rural Development, Government of India',
      publicationDate: 'March 31, 2024',
      tableOrPageReference: 'Statement of Releases and Direct Benefit Transfers to Beneficiaries, Table 4.1 (Sample citation)',
      sourceUrl: 'https://rhreporting.nic.in/',
      calculationMethod: 'Aadhaar-authenticated direct bank transfers to beneficiary accounts in three milestone-linked tranches.',
      coverageNotes: 'Budget estimate was revised downward mid-year as several states delayed geo-tagging house foundations.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 5: TAX INCENTIVES & REVENUE FOREGONE
  // ==========================================
  {
    id: 'taxinc-sample-01',
    section: 'tax_incentives',
    title: 'Corporate Income Tax Concessions: Statement of Revenue Foregone',
    plainSummary:
      'The calculated amount of corporation tax the government chose not to collect because of accelerated depreciation, R&D tax credits, and special economic zone exemptions.',
    financialYear: 'FY 2022-23 (Audited Data)',
    govLevel: 'union',
    departmentOrMinistry: 'Central Board of Direct Taxes (CBDT), Ministry of Finance',
    sectorTag: 'Corporate Tax Policy',
    status: 'sample_demonstration',
    amountCr: 104500,
    figureType: 'calculated_metric',
    details: {
      beneficiarySegment: 'corporate',
      statutoryProvision: 'Income Tax Act 1961: Section 115BAA, Section 80-IA, Section 35(2AB)',
      policyRationale:
        'Incentivizing domestic manufacturing, capital re-investment in factory machinery, and competitive parity with Asian export economies.',
    },
    source: {
      documentTitle: 'Union Budget Statement of Revenue Impact of Tax Incentives under the Income Tax Act',
      publishingAuthority: 'Department of Revenue, Ministry of Finance',
      publicationDate: 'February 1, 2024',
      tableOrPageReference: 'Annexure 7: Revenue Foregone on Corporate Taxpayers, Page 54, Table 3 (Sample citation)',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Calculated as the difference between taxes due at standard statutory rate (30%) versus actual effective tax paid after exemptions.',
      coverageNotes:
        'Does not imply lost or stolen revenue; represents legal tax policy design enacted by Parliament to spur private capital formation.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 6: AUDITS & FINDINGS
  // ==========================================
  {
    id: 'audit-sample-01',
    section: 'audits',
    title: 'CAG Performance Audit: Bharatmala Pariyojana Phase-I Highway Development',
    plainSummary:
      'Independent audit by the Comptroller and Auditor General examining project cost escalations, bidding deviations, and safety audits across major highway corridors.',
    financialYear: 'Report Tabled 2023-24',
    govLevel: 'union',
    departmentOrMinistry: 'Comptroller and Auditor General of India (CAG)',
    sectorTag: 'Highway Infrastructure Audit',
    status: 'sample_demonstration',
    amountCr: 84600,
    figureType: 'reported_finding',
    details: {
      auditType: 'performance',
      cagReportNumber: 'CAG Report No. 19 of 2023 (Union Government - Civil)',
      financialImplicationCr: 84600,
      ministryResponseStatus: 'submitted',
    },
    source: {
      documentTitle: 'Performance Audit of Bharatmala Pariyojana Phase-I (Highways)',
      publishingAuthority: 'Comptroller and Auditor General of India (CAG)',
      publicationDate: 'August 10, 2023',
      tableOrPageReference: 'Chapter 3: Cost and Time Overruns, Paragraph 3.4.2, Pages 67-73 (Sample citation)',
      sourceUrl: 'https://cag.gov.in/',
      calculationMethod:
        'Audited variance between Cabinet Committee on Economic Affairs (CCEA) approved cost per km (₹15.37 Cr/km) vs executed cost (₹32.17 Cr/km).',
      coverageNotes:
        'MoRTH submitted Action Taken Note (ATN) clarifying that cost revisions reflected 4-lane to 8-lane expansion, grade separators, and elevated corridor design changes.',
      lastUpdated: '2024-08-01',
    },
  },
  {
    id: 'audit-sample-02',
    section: 'audits',
    title: 'CAG Compliance Audit: Ayushman Bharat PM-JAY Beneficiary Database Verification',
    plainSummary:
      'Audit inspecting software checks in the Ayushman Bharat database, identifying instances of single phone numbers linked to thousands of cards and claims processed after recorded patient deaths.',
    financialYear: 'Report Tabled 2023-24',
    govLevel: 'union',
    departmentOrMinistry: 'Comptroller and Auditor General of India (CAG)',
    sectorTag: 'Healthcare Audit',
    status: 'sample_demonstration',
    amountCr: 697,
    figureType: 'reported_finding',
    details: {
      auditType: 'compliance',
      cagReportNumber: 'CAG Report No. 11 of 2023 (Union Government - Health)',
      financialImplicationCr: 697,
      ministryResponseStatus: 'under_pac_review',
    },
    source: {
      documentTitle: 'Performance Audit of Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
      publishingAuthority: 'Comptroller and Auditor General of India (CAG)',
      publicationDate: 'August 8, 2023',
      tableOrPageReference: 'Chapter 2: Beneficiary Identification, Paragraph 2.6, Page 31 (Sample citation)',
      sourceUrl: 'https://cag.gov.in/',
      calculationMethod:
        'Identified 3,446 patients shown as admitted in hospitals across different states simultaneously; 7.49 lakh cards linked to placeholder dummy phone numbers.',
      coverageNotes:
        'National Health Authority (NHA) responded that database validation software has since been integrated with mandatory Aadhaar e-KYC and biometric authentication.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 7: PROCUREMENT & CONTRACTS
  // ==========================================
  {
    id: 'proc-sample-01',
    section: 'procurement',
    title: 'GeM Public Procurement: Centralized Medical Equipment & Medicines Portal',
    plainSummary:
      'Commercial purchase of hospital equipment, diagnostic kits, and generic medicines for central government hospitals through the government e-marketplace.',
    financialYear: 'FY 2023-24',
    govLevel: 'union',
    departmentOrMinistry: 'Ministry of Commerce & Industry / Ministry of Health',
    sectorTag: 'Public Procurement',
    status: 'sample_demonstration',
    amountCr: 21500,
    figureType: 'actual',
    details: {
      contractId: 'GEM-MED-2023-994182',
      vendorName: 'Consortium of MSME Certified Pharmaceutical Suppliers',
      procurementPortal: 'GeM',
      awardMethod: 'open_tender',
    },
    source: {
      documentTitle: 'Government e-Marketplace (GeM) Annual Transaction Report 2023-24',
      publishingAuthority: 'GeM Special Purpose Vehicle, Ministry of Commerce and Industry',
      publicationDate: 'May 10, 2024',
      tableOrPageReference: 'Health Sector Category Bulletin, Table 5, Page 18 (Sample citation)',
      sourceUrl: 'https://gem.gov.in/',
      calculationMethod: 'Aggregated awarded value of electronically reverse-auctioned medical supply contracts.',
      coverageNotes: 'Average cost savings estimated by GeM at 9.8% compared to traditional non-electronic departmental tenders.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 8: DEBT & FINANCIAL LIABILITIES
  // ==========================================
  {
    id: 'debt-sample-01',
    section: 'debt',
    title: 'Central Government Public Debt: Internal Market Borrowings (Dated Securities)',
    plainSummary:
      'Total money borrowed by the central government from banks, insurance companies, and mutual funds through long-term government bonds to fund the fiscal deficit.',
    financialYear: 'FY 2023-24 (Year-End Outstanding)',
    govLevel: 'union',
    departmentOrMinistry: 'Public Debt Management Cell, Ministry of Finance',
    sectorTag: 'Public Debt',
    status: 'sample_demonstration',
    amountCr: 16872500,
    figureType: 'actual',
    details: {
      debtClassification: 'internal_dated_securities',
      annualInterestBurdenCr: 1045000,
      debtToGdpPct: 56.8,
    },
    source: {
      documentTitle: 'Status Paper on Government Debt 2023-24',
      publishingAuthority: 'Ministry of Finance, Government of India',
      publicationDate: 'June 2024',
      tableOrPageReference: 'Table 2.1: Composition of Central Government Liabilities, Page 14 (Sample citation)',
      sourceUrl: 'https://dea.gov.in/public-debt-management',
      calculationMethod: 'Nominal outstanding principal value of dated securities, Treasury bills, and National Small Savings Fund (NSSF) liabilities.',
      coverageNotes: 'Over 95% of India’s central government debt is denominated in domestic currency (INR) and held by domestic financial institutions.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 9: STATE & LOCAL GOVERNMENT FINANCE
  // ==========================================
  {
    id: 'state-sample-01',
    section: 'state_finance',
    title: '15th Finance Commission Tax Devolution: 41% Net Central Tax Share to States',
    plainSummary:
      'Constitutionally mandated transfer of 41% of all divisible net central taxes distributed across 28 states based on population, area, forest cover, and tax effort.',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'state',
    departmentOrMinistry: 'Department of Expenditure, Ministry of Finance',
    sectorTag: 'Fiscal Federalism',
    status: 'sample_demonstration',
    amountCr: 1247211,
    figureType: 'budget_estimate',
    budgetEstimateCr: 1247211,
    revisedEstimateCr: 1104494,
    actualAmountCr: 948406,
    previousYearAmountCr: 948406,
    details: {
      devolutionSharePct: 41.0,
      financeCommissionGrantType: 'revenue_deficit',
    },
    source: {
      documentTitle: 'Fifteenth Finance Commission Final Report (2021-26) & Union Budget Statement 10',
      publishingAuthority: 'Finance Commission of India & Ministry of Finance',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Statement 10: State-wise Transfer of Resources, Pages 32-35 (Sample citation)',
      sourceUrl: 'https://fincomindia.nic.in/',
      calculationMethod:
        'Calculated using the 15th Finance Commission horizontal formula: 15% Population (2011), 15% Area, 10% Forest & Ecology, 45% Income Distance, 12.5% Demographic Performance, 2.5% Tax Effort.',
      coverageNotes: 'Excludes central cesses and surcharges (such as road and fuel cess), which are not part of the divisible tax pool.',
      lastUpdated: '2024-08-01',
    },
  },

  // ==========================================
  // SECTION 10: YEAR-ON-YEAR COMPARISONS
  // ==========================================
  {
    id: 'comp-sample-01',
    section: 'comparison',
    title: 'Five-Year Fiscal Deficit Trajectory (% of GDP)',
    plainSummary:
      'The difference between total government spending and total revenue receipts, expressed as a percentage of India’s Gross Domestic Product (GDP).',
    financialYear: 'FY 2020-21 to FY 2024-25',
    govLevel: 'union',
    departmentOrMinistry: 'Budget Division, Ministry of Finance',
    sectorTag: 'Macroeconomic Health',
    status: 'sample_demonstration',
    amountCr: 1613312,
    figureType: 'calculated_metric',
    details: {
      trendMetricName: 'Fiscal Deficit (% of GDP)',
      multiYearTrend: [
        { year: 'FY 2020-21 (Actuals)', amountCr: 1821000, gdpPct: 9.2 },
        { year: 'FY 2021-22 (Actuals)', amountCr: 1584000, gdpPct: 6.7 },
        { year: 'FY 2022-23 (Actuals)', amountCr: 1733000, gdpPct: 6.4 },
        { year: 'FY 2023-24 (Actuals/RE)', amountCr: 1654000, gdpPct: 5.6 },
        { year: 'FY 2024-25 (BE Target)', amountCr: 1613312, gdpPct: 4.9 },
      ],
    },
    source: {
      documentTitle: 'Fiscal Responsibility and Budget Management (FRBM) Act Macro-Economic Framework Statement',
      publishingAuthority: 'Department of Economic Affairs, Ministry of Finance',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Medium Term Fiscal Policy cum Fiscal Policy Strategy Statement, Table 1, Page 3 (Sample citation)',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Fiscal Deficit = (Total Expenditure - Non-debt Receipts). Expressed as percentage of nominal GDP projected by CSO.',
      coverageNotes: 'The Centre has committed to a glide path bringing fiscal deficit below 4.5% of GDP by FY 2025-26.',
      lastUpdated: '2024-08-01',
    },
  },
  {
    id: 'comp-sample-02',
    section: 'comparison',
    title: 'Five-Year Capital Outlay Growth Trajectory (Central Capex)',
    plainSummary:
      'Tracking the growth of central capital expenditure over five years, reflecting the shift from revenue subsidies to long-term asset building.',
    financialYear: 'FY 2020-21 to FY 2024-25',
    govLevel: 'union',
    departmentOrMinistry: 'Ministry of Finance',
    sectorTag: 'Public Investment',
    status: 'sample_demonstration',
    amountCr: 1111111,
    figureType: 'calculated_metric',
    details: {
      trendMetricName: 'Capital Expenditure (₹ Crore)',
      multiYearTrend: [
        { year: 'FY 2020-21', amountCr: 425000, gdpPct: 2.1 },
        { year: 'FY 2021-22', amountCr: 593000, gdpPct: 2.5 },
        { year: 'FY 2022-23', amountCr: 736000, gdpPct: 2.7 },
        { year: 'FY 2023-24', amountCr: 950000, gdpPct: 3.2 },
        { year: 'FY 2024-25 (BE)', amountCr: 1111111, gdpPct: 3.4 },
      ],
    },
    source: {
      documentTitle: 'Budget at a Glance: Trends in Expenditure',
      publishingAuthority: 'Ministry of Finance, Government of India',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Budget at a Glance, Statement 4: Capital Account Trends, Page 10 (Sample citation)',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod: 'Annual compound growth calculation across audited central capital disbursements.',
      coverageNotes: 'Capital expenditure increased nearly 2.6x from FY 2020-21 to FY 2024-25.',
      lastUpdated: '2024-08-01',
    },
  },
];
