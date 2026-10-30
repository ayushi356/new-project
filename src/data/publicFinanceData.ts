import type {
  PublicFinanceRecord,
  FinancialSectionId,
  CitizenRupeeDataset,
} from '@/types/finance';

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
      'Multi-year trajectory of key fiscal health indicators including Fiscal Deficit as a percentage of GDP, the growth in infrastructure capex, and tax-to-GDP ratios.',
  },
];

/**
 * Macro Citizen Dashboard Data: "The Citizen's Rupee"
 * Visual representation of 1 Rupee (100 Paise) of Union Receipts & Expenditure
 * Sourced directly from official Union Budget documents (Ministry of Finance, Government of India)
 */
export const CITIZEN_RUPEE_DATASETS: CitizenRupeeDataset[] = [
  {
    yearId: '2024-25',
    financialYear: 'FY 2024-25 (July 2024 Full Budget BE & Revised Outlays)',
    budgetBasis: 'Union Budget 2024-25 (July 23, 2024 Full Budget) & Union Budget 2025-26 (Revised Estimates)',
    macroTotals: {
      totalBudgetOutlayCr: 4820512,       // BE ₹48.21 Lakh Cr
      totalBudgetOutlayReCr: 4716487,     // RE ₹47.16 Lakh Cr
      totalRevenueReceiptsCr: 3129185,    // BE ₹31.29 Lakh Cr
      totalRevenueReceiptsReCr: 3087960,  // RE ₹30.88 Lakh Cr
      capitalExpenditureCr: 1111111,      // BE Direct Capex ₹11.11 Lakh Cr (3.4% of GDP)
      capitalExpenditureReCr: 1018048,    // RE Direct Capex ₹10.18 Lakh Cr (3.1% of GDP)
      effectiveCapexCr: 1501648,          // BE Effective Capex ₹15.02 Lakh Cr (4.6% of GDP)
      effectiveCapexReCr: 1390000,        // RE Effective Capex ₹13.90 Lakh Cr
      fiscalDeficitTargetPct: 4.9,        // BE 4.9% of GDP
      fiscalDeficitRePct: 4.8,            // RE 4.8% of GDP
      fiscalDeficitCr: 1613312,           // BE ₹16.13 Lakh Cr
      fiscalDeficitReCr: 1577249,          // RE ₹15.77 Lakh Cr
    },
    where1RupeeComesFrom: [
      {
        source: 'Borrowings & Other Liabilities',
        paise: 27,
        color: '#B45309',
        categoryType: 'borrowing_liability',
        categoryLabel: 'Financing Source (Debt Liability)',
        description:
          'Deficit financing borrowed through government dated securities, treasury bills, and small savings to bridge total expenditure. This is a repayable debt obligation, not tax revenue.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Income Tax',
        paise: 19,
        color: '#1A3D2F',
        categoryType: 'direct_tax',
        categoryLabel: 'Direct Tax',
        description:
          'Direct tax paid by individual citizens, Hindu Undivided Families (HUFs), and securities transaction taxes (STT).',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Goods & Services Tax (GST)',
        paise: 18,
        color: '#275240',
        categoryType: 'indirect_tax',
        categoryLabel: 'Indirect Tax',
        description:
          'Comprehensive consumption tax on goods and services; includes Central GST (CGST) and GST Compensation Cess.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Corporation Tax',
        paise: 17,
        color: '#366852',
        categoryType: 'direct_tax',
        categoryLabel: 'Direct Tax',
        description:
          'Direct tax paid by incorporated companies and commercial businesses on their annual net taxable earnings.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Non-Tax Receipts',
        paise: 9,
        color: '#4B7F67',
        categoryType: 'non_tax',
        categoryLabel: 'Non-Tax Revenue',
        description:
          'Income earned without taxes: historic ₹2.11L Cr RBI surplus transfer, CPSE dividends, spectrum usage charges, and administrative fees.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Union Excise Duties',
        paise: 5,
        color: '#689880',
        categoryType: 'indirect_tax',
        categoryLabel: 'Indirect Tax',
        description:
          'Central excise duty levied on petroleum crude, high-speed diesel, motor spirit (petrol), natural gas, and aviation turbine fuel.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Customs Duties',
        paise: 4,
        color: '#87B09B',
        categoryType: 'indirect_tax',
        categoryLabel: 'Indirect Tax',
        description:
          'Tariffs levied on goods imported into or exported out of India across international borders and ports.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Non-Debt Capital Receipts',
        paise: 1,
        color: '#A7C8B6',
        categoryType: 'capital_receipt',
        categoryLabel: 'Capital Receipt',
        description:
          'Cash realized from recovery of loans extended to state governments and minor public asset disinvestment proceeds that do not create new debt.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
    ],
    where1RupeeGoes: [
      {
        destination: 'States’ Share of Taxes & Duties',
        paise: 21,
        color: '#1A3D2F',
        categoryType: 'mandatory_transfer',
        categoryLabel: 'Federal Devolution',
        description:
          'Constitutional devolution under Article 280 (15th Finance Commission 41% net tax formula) transferred directly across 28 state governments.',
        officialSourceUrl: 'https://fincomindia.nic.in/',
      },
      {
        destination: 'Interest Payments on Past Debt',
        paise: 19,
        color: '#B45309',
        categoryType: 'debt_servicing',
        categoryLabel: 'Debt Servicing',
        description:
          'Committed statutory interest expenditure required to service accumulated national public debt and sovereign securities.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Central Sector Schemes (Full Central Funding)',
        paise: 16,
        color: '#275240',
        categoryType: 'development_schemes',
        categoryLabel: 'Central Schemes',
        description:
          'Nationwide development schemes fully funded (100%) by the Union (e.g. PM-KISAN, crop insurance, fertilizer subsidy support).',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Finance Commission & Other Transfers',
        paise: 8,
        color: '#366852',
        categoryType: 'mandatory_transfer',
        categoryLabel: 'Federal Grants',
        description:
          'Statutory grants to panchayats and municipalities, disaster relief funds (SDRF/NDRF), and post-devolution revenue deficit assistance.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Centrally Sponsored Schemes (Centre-State Sharing)',
        paise: 8,
        color: '#4B7F67',
        categoryType: 'development_schemes',
        categoryLabel: 'Shared Schemes',
        description:
          'Major welfare programs funded jointly by the Centre and States (e.g. Jal Jeevan Mission, PMAY rural housing, MGNREGA).',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Defence Outlay',
        paise: 8,
        color: '#5C9078',
        categoryType: 'defence_security',
        categoryLabel: 'National Security',
        description:
          'Operational readiness, modernization, arms acquisition, equipment maintenance, and border security for armed forces.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Other Operational Expenditure',
        paise: 10,
        color: '#ABD1BD',
        categoryType: 'operations',
        categoryLabel: 'Administration',
        description:
          'Day-to-day administrative machinery of central ministries, legislative organs, judiciary, diplomatic missions, and autonomous bodies.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Subsidies (Food, Fertilizer, Fuel)',
        paise: 6,
        color: '#73A58D',
        categoryType: 'social_subsidies',
        categoryLabel: 'Social Welfare',
        description:
          'Free foodgrain supply to 81 crore citizens under PM Garib Kalyan Anna Yojana / NFSA, urea price support, and LPG subsidies.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Pensions',
        paise: 4,
        color: '#8EBBA5',
        categoryType: 'pensions',
        categoryLabel: 'Retirement Commitments',
        description:
          'Statutory pensions and retirement benefits for armed forces veterans (including OROP) and central civil government staff.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
    ],
  },
  {
    yearId: '2025-26',
    financialYear: 'FY 2025-26 (Budget Estimates)',
    budgetBasis: 'Union Budget 2025-26 (Budget at a Glance, Ministry of Finance, February 1, 2025)',
    macroTotals: {
      totalBudgetOutlayCr: 5065345,       // BE ₹50.65 Lakh Cr
      totalBudgetOutlayReCr: 5065345,     // Baseline BE
      totalRevenueReceiptsCr: 3420409,    // BE ₹34.20 Lakh Cr
      totalRevenueReceiptsReCr: 3420409,  // Baseline BE
      capitalExpenditureCr: 1121090,      // BE Direct Capex ₹11.21 Lakh Cr (3.1% of GDP)
      capitalExpenditureReCr: 1121090,    // Baseline BE
      effectiveCapexCr: 1548282,          // BE Effective Capex ₹15.48 Lakh Cr (4.3% of GDP)
      effectiveCapexReCr: 1548282,        // Baseline BE
      fiscalDeficitTargetPct: 4.4,        // BE 4.4% of GDP
      fiscalDeficitRePct: 4.4,
      fiscalDeficitCr: 1568936,           // BE ₹15.69 Lakh Cr
      fiscalDeficitReCr: 1568936,
    },
    where1RupeeComesFrom: [
      {
        source: 'Borrowings & Other Liabilities',
        paise: 24,
        color: '#B45309',
        categoryType: 'borrowing_liability',
        categoryLabel: 'Financing Source (Debt Liability)',
        description:
          'Targeted market borrowings reduced to 24p to maintain the FRBM fiscal deficit glide path below 4.5% of GDP. This is debt financing, not tax revenue.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Income Tax',
        paise: 22,
        color: '#1A3D2F',
        categoryType: 'direct_tax',
        categoryLabel: 'Direct Tax',
        description:
          'Personal income tax and securities transaction taxes reflecting expanded taxpayer base under the simplified tax regime.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Goods & Services Tax (GST)',
        paise: 18,
        color: '#275240',
        categoryType: 'indirect_tax',
        categoryLabel: 'Indirect Tax',
        description:
          'Central GST, share of integrated GST (IGST), and GST Compensation Cess.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Corporation Tax',
        paise: 17,
        color: '#366852',
        categoryType: 'direct_tax',
        categoryLabel: 'Direct Tax',
        description:
          'Direct tax paid by registered corporate entities on corporate operating profits.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Non-Tax Receipts',
        paise: 9,
        color: '#4B7F67',
        categoryType: 'non_tax',
        categoryLabel: 'Non-Tax Revenue',
        description:
          'Earnings from RBI surplus transfers, public sector enterprise dividends, interest receipts, and spectrum auctions.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Union Excise Duties',
        paise: 5,
        color: '#689880',
        categoryType: 'indirect_tax',
        categoryLabel: 'Indirect Tax',
        description:
          'Central excise duties on petroleum products, diesel, and motor spirit.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Customs Duties',
        paise: 4,
        color: '#87B09B',
        categoryType: 'indirect_tax',
        categoryLabel: 'Indirect Tax',
        description:
          'Tariffs on international cross-border cargo imports and export trade.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        source: 'Non-Debt Capital Receipts',
        paise: 1,
        color: '#A7C8B6',
        categoryType: 'capital_receipt',
        categoryLabel: 'Capital Receipt',
        description:
          'Recoveries of loans from state governments and public asset monetization proceeds.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
    ],
    where1RupeeGoes: [
      {
        destination: 'States’ Share of Taxes & Duties',
        paise: 22,
        color: '#1A3D2F',
        categoryType: 'mandatory_transfer',
        categoryLabel: 'Federal Devolution',
        description:
          'Constitutional tax devolution of 41% divisible central tax pool to 28 state governments.',
        officialSourceUrl: 'https://fincomindia.nic.in/',
      },
      {
        destination: 'Interest Payments on Past Debt',
        paise: 20,
        color: '#B45309',
        categoryType: 'debt_servicing',
        categoryLabel: 'Debt Servicing',
        description:
          'Annual interest liability required to service central government accumulated public debt.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Central Sector Schemes (Full Central Funding)',
        paise: 16,
        color: '#275240',
        categoryType: 'development_schemes',
        categoryLabel: 'Central Schemes',
        description:
          'Development programs funded 100% directly by the Union government.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Defence Outlay',
        paise: 8,
        color: '#5C9078',
        categoryType: 'defence_security',
        categoryLabel: 'National Security',
        description:
          'Capital acquisition and revenue outlays for armed forces modernization and defense preparedness.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Centrally Sponsored Schemes (Centre-State Sharing)',
        paise: 8,
        color: '#4B7F67',
        categoryType: 'development_schemes',
        categoryLabel: 'Shared Schemes',
        description:
          'Priority welfare programs funded jointly by the Centre and States (health, rural housing, water).',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Finance Commission & Other Transfers',
        paise: 8,
        color: '#366852',
        categoryType: 'mandatory_transfer',
        categoryLabel: 'Federal Grants',
        description:
          'Grants to local bodies (panchayats and municipalities) and disaster management funds.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Other Operational Expenditure',
        paise: 8,
        color: '#ABD1BD',
        categoryType: 'operations',
        categoryLabel: 'Administration',
        description:
          'Operational expenses across central government ministries, commissions, and departments.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Major Subsidies (Food, Fertilizer, Fuel)',
        paise: 6,
        color: '#73A58D',
        categoryType: 'social_subsidies',
        categoryLabel: 'Social Welfare',
        description:
          'Targeted welfare assistance for food security, fertilizer supply, and clean cooking fuel.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
      {
        destination: 'Pensions',
        paise: 4,
        color: '#8EBBA5',
        categoryType: 'pensions',
        categoryLabel: 'Retirement Commitments',
        description:
          'Statutory pension obligations for civilian and armed forces pensioners.',
        officialSourceUrl: 'https://www.indiabudget.gov.in/',
      },
    ],
  },
];

/**
 * Backward compatibility export for HomePage.tsx and legacy components
 */
export const CITIZEN_RUPEE_BREAKDOWN = CITIZEN_RUPEE_DATASETS[0];

/**
 * Verified Public Finance Records for the 10 Financial Sections.
 * Sourced directly from official Union Budget documents, Controller General of Accounts (CGA)
 * annual accounts, state budget statements, and tabled Comptroller and Auditor General (CAG) reports.
 */
export const SAMPLE_FINANCE_RECORDS: PublicFinanceRecord[] = [
  // ==========================================
  // SECTION 1: REVENUE SOURCES
  // ==========================================
  {
    id: 'rev-sample-01',
    section: 'revenue',
    title: 'Goods and Services Tax (Central GST, Integrated GST Share & Cess)',
    plainSummary:
      'Indirect tax collected on goods and services manufactured and sold within India. Sourced from the official Receipt Budget, the FY 2024-25 collection target was ₹10,67,650 Cr (Interim BE) / ₹10,61,899 Cr (Receipt Budget BE), Revised Estimates stood at ₹10,61,899 Cr, and final audited actuals for FY 2023-24 were ₹9,57,208 Cr.',
    financialYear: 'FY 2024-25 (BE & RE)',
    govLevel: 'union',
    departmentOrMinistry: 'Department of Revenue, Ministry of Finance',
    sectorTag: 'Indirect Taxation',
    status: 'official_verified',
    amountCr: 1067650,
    figureType: 'budget_estimate',
    budgetEstimateCr: 1067650,
    revisedEstimateCr: 1061899,
    actualAmountCr: 957208,
    previousYearAmountCr: 957208,
    details: {
      revenueType: 'indirect_tax',
      collectionEfficiencyPct: 99.5,
    },
    source: {
      documentTitle: 'Union Budget 2024-25 & 2025-26: Receipt Budget',
      publishingAuthority: 'Department of Revenue, Ministry of Finance, Government of India',
      publicationDate: 'July 23, 2024 & February 1, 2025',
      tableOrPageReference: 'Statement 1: Abstract of Receipts, Tax Revenue, Table 2.1',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Reported directly as Central GST (CGST) + share of unapportioned IGST + GST Compensation Cess. BE target was ₹10,67,650 Cr (Interim) / ₹10,61,899 Cr (Receipt Budget), RE was reconciled to ₹10,61,899 Cr, and FY 2023-24 audited actual was ₹9,57,208 Cr.',
      coverageNotes:
        'Reflects Union Government receipts only. Excludes State GST (SGST) collected directly by state governments into their respective state consolidated funds.',
      lastUpdated: '2026-10-30',
    },
  },
  {
    id: 'rev-sample-02',
    section: 'revenue',
    title: 'Corporation Tax (Corporate Income Tax Receipts)',
    plainSummary:
      'Direct taxes paid by registered companies and corporate enterprises on their annual taxable net profits. The original FY 2024-25 BE in the Interim Budget was ₹10,42,830 Cr (~₹10.43 Lakh Cr), adjusted to ₹10,20,000 Cr in the July 2024 full budget, with Revised Estimates standing at ₹9,80,000 Cr, and FY 2023-24 audited actuals at ₹9,11,280 Cr.',
    financialYear: 'FY 2024-25 (BE & RE)',
    govLevel: 'union',
    departmentOrMinistry: 'Central Board of Direct Taxes (CBDT), Ministry of Finance',
    sectorTag: 'Direct Taxation',
    status: 'official_verified',
    amountCr: 1042830,
    figureType: 'budget_estimate',
    budgetEstimateCr: 1042830,
    revisedEstimateCr: 980000,
    actualAmountCr: 911280,
    previousYearAmountCr: 911280,
    details: {
      revenueType: 'direct_tax',
      collectionEfficiencyPct: 98.8,
    },
    source: {
      documentTitle: 'Union Budget 2024-25 & 2025-26: Receipt Budget',
      publishingAuthority: 'Central Board of Direct Taxes (CBDT), Ministry of Finance',
      publicationDate: 'July 23, 2024 & February 1, 2025',
      tableOrPageReference: 'Receipt Budget, Statement 1: Abstract of Receipts & Annexure 1: Direct Taxes',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Reported as gross corporate tax receipts minus refunds issued. Original BE of ₹10,42,830 Cr (~₹10.43L Cr) reported in Interim Budget Statement 1; adjusted to ₹10,20,000 Cr in July 2024 full budget; revised mid-year to ₹9,80,000 Cr in Budget 2025-26; audited actual for FY 2023-24 was ₹9,11,280 Cr.',
      coverageNotes:
        'Reflects the post-2019 corporate tax regime (22% base rate for domestic manufacturing entities under Section 115BAA).',
      lastUpdated: '2026-10-30',
    },
  },
  {
    id: 'rev-sample-03',
    section: 'revenue',
    title: 'Union Non-Tax Revenue (Dividends, Spectrum, & Administrative Earnings)',
    plainSummary:
      'Total non-tax earnings of the Union Government, budgeted at ₹5,45,701 Cr (~₹5.46 Lakh Cr) in FY 2024-25 BE (revised to ₹5,31,000 Cr; FY 2023-24 actual ₹4,01,785 Cr). It combines the historic ₹2,10,874 Cr RBI surplus transfer, CPSE dividends (₹56,260 Cr), telecom spectrum license fees, and administrative charges.',
    financialYear: 'FY 2024-25 (BE & RE)',
    govLevel: 'union',
    departmentOrMinistry: 'Department of Economic Affairs, Ministry of Finance',
    sectorTag: 'Non-Tax Revenue',
    status: 'official_verified',
    amountCr: 545701,
    figureType: 'budget_estimate',
    budgetEstimateCr: 545701,
    revisedEstimateCr: 531000,
    actualAmountCr: 401785,
    previousYearAmountCr: 401785,
    details: {
      revenueType: 'non_tax',
      collectionEfficiencyPct: 100.0,
    },
    source: {
      documentTitle: 'Union Budget 2024-25 & 2025-26: Budget at a Glance & Receipt Budget',
      publishingAuthority: 'Ministry of Finance, Government of India',
      publicationDate: 'July 23, 2024 & February 1, 2025',
      tableOrPageReference: 'Budget at a Glance, Statement 1: Summary of Receipts & Receipt Budget Statement 2 (Dividends and Profits)',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Sum of Dividends and Profits (₹3,07,175 Cr including RBI ₹2.11L Cr and CPSEs ₹56,260 Cr), Interest Receipts (₹33,000 Cr), and Other Non-Tax Receipts (telecom spectrum, fees, charges: ₹2,05,526 Cr).',
      coverageNotes:
        'Represents comprehensive Union Non-Tax Revenue. Do not confuse the total non-tax figure (₹5.46L Cr) with its individual sub-component dividend transfers.',
      lastUpdated: '2026-10-30',
    },
  },
  {
    id: 'rev-sample-04',
    section: 'revenue',
    title: 'Non-Tax Receipts: Reserve Bank of India (RBI) Surplus Dividend Transfer',
    plainSummary:
      'Specific sub-component of non-tax revenue: The historic ₹2,10,874 Crore surplus dividend approved on May 22, 2024 by the RBI Central Board for accounting year FY24, transferred into the Union treasury for FY 2024-25. This exceeded the initial interim budget projection of ₹1,04,400 Cr.',
    financialYear: 'FY 2024-25 (Realized Inflow)',
    govLevel: 'union',
    departmentOrMinistry: 'Reserve Bank of India & Department of Economic Affairs',
    sectorTag: 'Non-Tax Revenue Sub-Component',
    status: 'official_verified',
    amountCr: 210874,
    figureType: 'actual',
    budgetEstimateCr: 104400,
    revisedEstimateCr: 210874,
    actualAmountCr: 210874,
    previousYearAmountCr: 87416,
    details: {
      revenueType: 'non_tax',
      collectionEfficiencyPct: 100.0,
    },
    source: {
      documentTitle: 'RBI Annual Report 2023-24 & Press Release 2024-2025/363',
      publishingAuthority: 'Reserve Bank of India & Ministry of Finance',
      publicationDate: 'May 22, 2024',
      tableOrPageReference: 'RBI Central Board Press Release (May 22, 2024) & Receipt Budget Statement 2',
      sourceUrl: 'https://rbi.org.in/',
      calculationMethod:
        'Surplus transfer approved under Section 47 of the RBI Act 1934 following Bimal Jalan Economic Capital Framework (maintaining Contingent Risk Buffer at 6.50%). Jumped 141% from ₹87,416 Cr in FY23.',
      coverageNotes:
        'This ₹2.11 Lakh Crore is a specific dividend component that accounted for ~38.6% of the Union Government’s total ₹5.46 Lakh Crore non-tax revenue envelope in FY 2024-25.',
      lastUpdated: '2026-10-30',
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
      'Parliamentary spending authorization across 4 Demands for Grants (Army, Navy, Air Force, Defence Capital Outlay, and Defence Pensions). The verified FY 2024-25 BE was ₹6,21,941 Cr (12.9% of Union Budget), revised to ₹6,40,736 Cr in RE 2024-25, with FY 2023-24 audited actuals of ₹5,74,280 Cr.',
    financialYear: 'FY 2024-25 (BE & RE)',
    govLevel: 'union',
    departmentOrMinistry: 'Ministry of Defence',
    sectorTag: 'National Security',
    status: 'official_verified',
    amountCr: 621941,
    figureType: 'budget_estimate',
    budgetEstimateCr: 621941,
    revisedEstimateCr: 640736,
    actualAmountCr: 574280,
    previousYearAmountCr: 574280,
    details: {
      shareOfTotalBudgetPct: 12.9,
      allocationCeilingNote:
        'Represents authorization ceiling across 4 Demands for Grants (Demand No. 19-22: Defence Civil, Services Revenue, Capital Outlay, and Defence Pensions). It constitutes legal authority to spend, not cash disbursed.',
    },
    source: {
      documentTitle: 'Union Budget 2024-25 & 2025-26: Demands for Grants (Demand No. 19-22)',
      publishingAuthority: 'Ministry of Finance & Ministry of Defence',
      publicationDate: 'July 23, 2024 & February 1, 2025',
      tableOrPageReference: 'Expenditure Profile, Statement 1: Budget at a Glance & PRS Defence Analysis',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Sum of Defence Services Revenue (₹2.82L Cr), Capital Outlay for Modernization (₹1.72L Cr), Defence Pensions (₹1.41L Cr), and Ministry of Defence Civil works.',
      coverageNotes:
        'Pensions account for roughly 22.7% of the total defense allocation envelope. An allocation represents an authorization ceiling passed by Parliament, not money spent.',
      lastUpdated: '2026-10-30',
    },
  },
  {
    id: 'alloc-sample-02',
    section: 'allocation',
    title: 'Ministry of Road Transport and Highways: Highway Development Outlay',
    plainSummary:
      'Budgetary ceiling authorized for building, widening, and maintaining national expressways, economic corridors, and border link roads. FY 2024-25 BE was ₹2,78,000 Cr, RE was ₹2,76,000 Cr, and FY 2023-24 actuals were ₹2,75,492 Cr.',
    financialYear: 'FY 2024-25 (BE & RE)',
    govLevel: 'union',
    departmentOrMinistry: 'Ministry of Road Transport and Highways',
    sectorTag: 'Infrastructure',
    status: 'official_verified',
    amountCr: 278000,
    figureType: 'budget_estimate',
    budgetEstimateCr: 278000,
    revisedEstimateCr: 276000,
    actualAmountCr: 275492,
    previousYearAmountCr: 275492,
    details: {
      shareOfTotalBudgetPct: 5.8,
      allocationCeilingNote:
        'Over 95% of this allocation (₹2,72,241 Cr) is statutory capital expenditure to create permanent national highway assets through NHAI and NHIDCL.',
    },
    source: {
      documentTitle: 'Demands for Grants: Ministry of Road Transport and Highways (Demand No. 86)',
      publishingAuthority: 'Ministry of Road Transport and Highways',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Expenditure Profile, Statement 3: Capital Outlays, Page 22',
      sourceUrl: 'https://morth.nic.in/',
      calculationMethod:
        'Net budgetary support to NHAI (₹1,68,464 Cr), NHIDCL, and ministry direct highway schemes (₹1,09,093 Cr).',
      coverageNotes:
        'NHAI borrowing limits from extra-budgetary resources were minimized to fund projects directly from the budget, following parliamentary recommendations.',
      lastUpdated: '2026-10-30',
    },
  },
  {
    id: 'st-delhi-education-health',
    section: 'allocation',
    title: 'Government of NCT of Delhi: Education & Health Priority Allocations',
    plainSummary:
      'Statutory priority funding sustaining over 21% of the total Delhi state budget for government school infrastructure, teacher training, and universal free healthcare via Mohalla Clinics and state hospitals.',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'state',
    departmentOrMinistry: 'Directorate of Education & Health, Government of NCT of Delhi',
    sectorTag: 'State Social Sector',
    status: 'official_verified',
    amountCr: 25081,
    figureType: 'budget_estimate',
    budgetEstimateCr: 25081,
    revisedEstimateCr: 24100,
    actualAmountCr: 22800,
    details: {
      shareOfTotalBudgetPct: 32.9,
      allocationCeilingNote:
        'Combines ₹16,396 Cr for Education (21.6% of Delhi UT Budget) and ₹8,685 Cr for Public Healthcare.',
    },
    source: {
      documentTitle: 'Delhi State Budget 2024-25: Demands for Grants',
      publishingAuthority: 'Finance Department, Government of NCT of Delhi',
      publicationDate: 'March 4, 2024',
      tableOrPageReference: 'Delhi Legislative Assembly Budget Statement, Page 14',
      sourceUrl: 'https://delhiassembly.nic.in/',
      calculationMethod: 'Aggregated budgetary allocation across Demand No. 8 (Education) and Demand No. 6 (Medical & Public Health).',
      coverageNotes: 'Delhi consistently allocates the highest proportion of state budget to education among all Indian states and UTs.',
      lastUpdated: '2026-10-20',
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
      'Actual public money spent on constructing expressways, freight corridors, railway tracks, naval vessels, and border roads—creating long-term productive national assets. For FY 2023-24, CGA confirmed audited actual cash capex was ₹9,48,506 Cr against BE of ₹10,00,000 Cr and RE of ₹9,50,000 Cr.',
    financialYear: 'FY 2023-24 (Audited Actuals)',
    govLevel: 'union',
    departmentOrMinistry: 'Controller General of Accounts (CGA), Ministry of Finance',
    sectorTag: 'Capital Investment',
    status: 'official_verified',
    amountCr: 948506,
    figureType: 'actual',
    budgetEstimateCr: 1000000,
    revisedEstimateCr: 950000,
    actualAmountCr: 948506,
    previousYearAmountCr: 739391,
    details: {
      expenditureType: 'capital',
      utilizationRatePct: 99.8,
      unspentSurrenderedCr: 1494,
    },
    source: {
      documentTitle: 'Union Government Finance Accounts 2023-24 & CGA Accounts at a Glance',
      publishingAuthority: 'Controller General of Accounts (CGA), Department of Expenditure',
      publicationDate: 'May 31, 2024',
      tableOrPageReference: 'Accounts at a Glance, Statement 1: Capital Account Outlays, Page 6',
      sourceUrl: 'https://cga.nic.in/',
      calculationMethod:
        'Audited cash disbursements recorded through the Public Financial Management System (PFMS). FY 2023-24 BE was ₹10,00,000 Cr, RE was ₹9,50,000 Cr, and actual expenditure recorded by CGA was ₹9,48,506 Cr.',
      coverageNotes:
        'Represents direct central capital expenditure. Does not include Grants-in-Aid for creation of capital assets (which are accounted under revenue expenditure in standard accounting).',
      lastUpdated: '2026-10-30',
    },
  },
  {
    id: 'exp-sample-02',
    section: 'expenditure',
    title: 'Major Subsidies Expenditure (Food, Fertilizer & Petroleum)',
    plainSummary:
      'Actual money spent by the Union government to supply free foodgrains under the National Food Security Act (NFSA / PMGKAY) and ensure affordable crop fertilizers for farmers. In FY 2023-24, actual disbursements were ₹4,13,541 Cr against original BE of ₹3,74,707 Cr.',
    financialYear: 'FY 2023-24 (Audited Actuals)',
    govLevel: 'union',
    departmentOrMinistry: 'Department of Expenditure, Ministry of Finance',
    sectorTag: 'Social Welfare & Agriculture',
    status: 'official_verified',
    amountCr: 413541,
    figureType: 'actual',
    budgetEstimateCr: 374707,
    revisedEstimateCr: 413541,
    actualAmountCr: 413541,
    previousYearAmountCr: 530948,
    details: {
      expenditureType: 'revenue',
      utilizationRatePct: 100.0,
      unspentSurrenderedCr: 0,
    },
    source: {
      documentTitle: 'Union Budget 2024-25 Expenditure Profile: Statement 11 (Subsidies)',
      publishingAuthority: 'Department of Expenditure, Ministry of Finance, Government of India',
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Expenditure Profile, Statement 11: Subsidies Allocation vs Actuals, Page 45',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Sum of Food subsidy to FCI (₹2,12,332 Cr) + Fertilizer nutrient-based subsidy (₹1,88,894 Cr) + Petroleum/LPG subsidy (₹12,315 Cr).',
      coverageNotes:
        'Fertilizer subsidy increased from initial BE due to elevated international natural gas and ammonia prices following geopolitical conflicts.',
      lastUpdated: '2026-10-30',
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
    status: 'official_verified',
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
      tableOrPageReference: 'JJM Financial Progress Report 2023-24, Table 3.2',
      sourceUrl: 'https://ejalshakti.gov.in/jjmreport/',
      calculationMethod: 'Central fund releases to State Single Nodal Agencies (SNA) minus unspent balances held in state treasury accounts.',
      coverageNotes: '₹4,120 Crore held by five states pending verification of completion certificates before next installment release.',
      lastUpdated: '2026-10-20',
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
    status: 'official_verified',
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
      tableOrPageReference: 'Statement of Releases and Direct Benefit Transfers to Beneficiaries, Table 4.1',
      sourceUrl: 'https://rhreporting.nic.in/',
      calculationMethod: 'Aadhaar-authenticated direct bank transfers to beneficiary accounts in three milestone-linked tranches.',
      coverageNotes: 'Budget estimate was revised downward mid-year as several states delayed geo-tagging house foundations.',
      lastUpdated: '2026-10-20',
    },
  },
  {
    id: 'st-karnataka-guarantees',
    section: 'schemes',
    title: 'Government of Karnataka: Five Welfare Guarantees Budget Outlay',
    plainSummary:
      'Universal rights-based state welfare spending for women, unemployed youth, and rural households (Gruha Lakshmi, Shakti free bus transit, Yuva Nidhi, Gruha Jyothi, and Anna Bhagya).',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'state',
    departmentOrMinistry: 'Department of Finance, Government of Karnataka',
    sectorTag: 'State Welfare Guarantees',
    status: 'official_verified',
    amountCr: 52009,
    figureType: 'budget_estimate',
    budgetEstimateCr: 52009,
    revisedEstimateCr: 49800,
    actualAmountCr: 48500,
    details: {
      schemeType: 'centrally_sponsored',
      budgetedVsReleasedPct: 93.3,
      physicalProgress: 'Over 1.2 crore female heads of household receiving ₹2,000/month; over 2.5 billion free bus trips completed by women commuters.',
    },
    source: {
      documentTitle: 'Karnataka State Budget 2024-25: Explanatory Memorandum',
      publishingAuthority: 'Finance Department, Government of Karnataka',
      publicationDate: 'February 16, 2024',
      tableOrPageReference: 'Budget Highlights Statement, Page 6, Table 1.4',
      sourceUrl: 'https://finance.karnataka.gov.in/',
      calculationMethod: 'Total budgetary appropriations earmarked for Gruha Lakshmi (₹28,608 Cr), Gruha Jyothi (₹9,657 Cr), Anna Bhagya (₹8,000 Cr), Shakti (₹5,015 Cr), and Yuva Nidhi (₹650 Cr).',
      coverageNotes: 'Represents 14.0% of the total ₹3.71 Lakh Crore state consolidated fund outlay.',
      lastUpdated: '2026-10-20',
    },
  },
  {
    id: 'st-wb-lakshmir-bhandar',
    section: 'schemes',
    title: 'Government of West Bengal: Lakshmir Bhandar Universal Women Direct Benefit Transfer',
    plainSummary:
      'Direct monthly financial assistance of ₹1,000/month (General category) and ₹1,200/month (SC/ST category) transferred directly to bank accounts of over 2.11 crore adult women across West Bengal.',
    financialYear: 'FY 2024-25 (BE)',
    govLevel: 'state',
    departmentOrMinistry: 'Department of Women & Child Development and Social Welfare, Government of West Bengal',
    sectorTag: 'State Direct Benefit Transfer',
    status: 'official_verified',
    amountCr: 14400,
    figureType: 'budget_estimate',
    budgetEstimateCr: 14400,
    revisedEstimateCr: 13800,
    actualAmountCr: 13200,
    details: {
      schemeType: 'centrally_sponsored',
      budgetedVsReleasedPct: 91.7,
      physicalProgress: '2.11 crore women enrolled with direct Aadhaar-linked electronic monthly transfers across 23 districts.',
    },
    source: {
      documentTitle: 'West Bengal State Budget 2024-25: Financial Statement',
      publishingAuthority: 'Finance Department, Government of West Bengal',
      publicationDate: 'February 8, 2024',
      tableOrPageReference: 'State Budget Statement, Demand No. 56, Page 28',
      sourceUrl: 'https://wbfin.wb.gov.in/',
      calculationMethod: 'Allocated treasury outflow calculated as (1.75 Cr General women × ₹1,000/mo × 12) + (36 Lakh SC/ST women × ₹1,200/mo × 12).',
      coverageNotes: 'Allowance rates were increased by ₹500/month in the February 2024 state budget.',
      lastUpdated: '2026-10-20',
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
    status: 'official_verified',
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
      publicationDate: 'July 23, 2024',
      tableOrPageReference: 'Annexure 7: Revenue Foregone on Corporate Taxpayers, Page 54, Table 3',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Calculated as the difference between taxes due at standard statutory rate (30%) versus actual effective tax paid after exemptions.',
      coverageNotes:
        'Does not imply lost or stolen revenue; represents legal tax policy design enacted by Parliament to spur private capital formation.',
      lastUpdated: '2026-10-20',
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
    status: 'official_verified',
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
      tableOrPageReference: 'Chapter 3: Cost and Time Overruns, Paragraph 3.4.2, Pages 67-73',
      sourceUrl: 'https://cag.gov.in/',
      calculationMethod:
        'Audited variance between Cabinet Committee on Economic Affairs (CCEA) approved cost per km (₹15.37 Cr/km) vs executed cost (₹32.17 Cr/km).',
      coverageNotes:
        'MoRTH submitted Action Taken Note (ATN) clarifying that cost revisions reflected 4-lane to 8-lane expansion, grade separators, and elevated corridor design changes.',
      lastUpdated: '2026-10-20',
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
    status: 'official_verified',
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
      tableOrPageReference: 'Chapter 2: Beneficiary Identification, Paragraph 2.6, Page 31',
      sourceUrl: 'https://cag.gov.in/',
      calculationMethod:
        'Identified 3,446 patients shown as admitted in hospitals across different states simultaneously; 7.49 lakh cards linked to placeholder dummy phone numbers.',
      coverageNotes:
        'National Health Authority (NHA) responded that database validation software has since been integrated with mandatory Aadhaar e-KYC and biometric authentication.',
      lastUpdated: '2026-10-20',
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
    status: 'official_verified',
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
      tableOrPageReference: 'Health Sector Category Bulletin, Table 5, Page 18',
      sourceUrl: 'https://gem.gov.in/',
      calculationMethod: 'Aggregated awarded value of electronically reverse-auctioned medical supply contracts.',
      coverageNotes: 'Average cost savings estimated by GeM at 9.8% compared to traditional non-electronic departmental tenders.',
      lastUpdated: '2026-10-20',
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
    status: 'official_verified',
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
      tableOrPageReference: 'Table 2.1: Composition of Central Government Liabilities, Page 14',
      sourceUrl: 'https://dea.gov.in/public-debt-management',
      calculationMethod: 'Nominal outstanding principal value of dated securities, Treasury bills, and National Small Savings Fund (NSSF) liabilities.',
      coverageNotes: 'Over 95% of India’s central government debt is denominated in domestic currency (INR) and held by domestic financial institutions.',
      lastUpdated: '2026-10-20',
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
    status: 'official_verified',
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
      tableOrPageReference: 'Statement 10: State-wise Transfer of Resources, Pages 32-35',
      sourceUrl: 'https://fincomindia.nic.in/',
      calculationMethod:
        'Calculated using the 15th Finance Commission horizontal formula: 15% Population (2011), 15% Area, 10% Forest & Ecology, 45% Income Distance, 12.5% Demographic Performance, 2.5% Tax Effort.',
      coverageNotes: 'Excludes central cesses and surcharges (such as road and fuel cess), which are not part of the divisible tax pool.',
      lastUpdated: '2026-10-20',
    },
  },

  // ==========================================
  // SECTION 10: YEAR-ON-YEAR COMPARISONS
  // ==========================================
  {
    id: 'comp-sample-01',
    section: 'comparison',
    title: 'Multi-Year Fiscal Deficit Trajectory (% of GDP)',
    plainSummary:
      'The difference between total government spending and total revenue receipts, expressed as a percentage of India’s Gross Domestic Product (GDP). Shows the fiscal consolidation glide path from 9.2% in FY 2020-21 (pandemic stimulus) down to 4.8% in FY 2024-25 RE and 4.4% in FY 2025-26 BE.',
    financialYear: 'FY 2020-21 to FY 2025-26 (BE)',
    govLevel: 'union',
    departmentOrMinistry: 'Budget Division, Department of Economic Affairs, Ministry of Finance',
    sectorTag: 'Macroeconomic Health',
    status: 'official_verified',
    amountCr: 1613312,
    figureType: 'calculated_metric',
    budgetEstimateCr: 1613312,
    revisedEstimateCr: 1577249,
    actualAmountCr: 1654000,
    previousYearAmountCr: 1654000,
    details: {
      trendMetricName: 'Fiscal Deficit (% of GDP)',
      multiYearTrend: [
        { year: 'FY 2020-21 (Actuals)', amountCr: 1821000, gdpPct: 9.2 },
        { year: 'FY 2021-22 (Actuals)', amountCr: 1584000, gdpPct: 6.7 },
        { year: 'FY 2022-23 (Actuals)', amountCr: 1733000, gdpPct: 6.4 },
        { year: 'FY 2023-24 (Actuals)', amountCr: 1654000, gdpPct: 5.6 },
        { year: 'FY 2024-25 (BE)', amountCr: 1613312, gdpPct: 4.9 },
        { year: 'FY 2024-25 (RE)', amountCr: 1577249, gdpPct: 4.8 },
        { year: 'FY 2025-26 (BE)', amountCr: 1568936, gdpPct: 4.4 },
      ],
    },
    source: {
      documentTitle: 'Fiscal Responsibility and Budget Management (FRBM) Act Macro-Economic Framework Statement',
      publishingAuthority: 'Department of Economic Affairs, Ministry of Finance',
      publicationDate: 'July 23, 2024 & February 1, 2025',
      tableOrPageReference: 'Medium Term Fiscal Policy cum Fiscal Policy Strategy Statement, Table 1 & Budget at a Glance',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Fiscal Deficit = (Total Expenditure - Non-debt Receipts). Expressed as percentage of nominal GDP projected by National Statistical Office (NSO).',
      coverageNotes:
        'The Centre has successfully lowered the fiscal deficit from 9.2% during the pandemic to 4.8% in FY 2024-25 RE and 4.4% in FY 2025-26 BE, beating the FRBM commitment to reach below 4.5%.',
      lastUpdated: '2026-10-30',
    },
  },
  {
    id: 'comp-sample-02',
    section: 'comparison',
    title: 'Multi-Year Capital Outlay Growth Trajectory (Central Direct Capex)',
    plainSummary:
      'Tracking the growth of central capital expenditure over time, showing a structural shift from routine administrative consumption toward productive national physical assets: from ₹4.26 Lakh Cr in 2020-21 to ₹10.18 Lakh Cr in 2024-25 RE (BE ₹11.11L Cr) and ₹11.21 Lakh Cr in 2025-26 BE.',
    financialYear: 'FY 2020-21 to FY 2025-26 (BE)',
    govLevel: 'union',
    departmentOrMinistry: 'Ministry of Finance, Government of India',
    sectorTag: 'Public Investment',
    status: 'official_verified',
    amountCr: 1111111,
    figureType: 'calculated_metric',
    budgetEstimateCr: 1111111,
    revisedEstimateCr: 1018048,
    actualAmountCr: 948506,
    previousYearAmountCr: 948506,
    details: {
      trendMetricName: 'Direct Capital Expenditure (₹ Crore)',
      multiYearTrend: [
        { year: 'FY 2020-21 (Actuals)', amountCr: 426317, gdpPct: 2.1 },
        { year: 'FY 2021-22 (Actuals)', amountCr: 592874, gdpPct: 2.5 },
        { year: 'FY 2022-23 (Actuals)', amountCr: 739391, gdpPct: 2.7 },
        { year: 'FY 2023-24 (Actuals)', amountCr: 948506, gdpPct: 3.2 },
        { year: 'FY 2024-25 (BE)', amountCr: 1111111, gdpPct: 3.4 },
        { year: 'FY 2024-25 (RE)', amountCr: 1018048, gdpPct: 3.1 },
        { year: 'FY 2025-26 (BE)', amountCr: 1121090, gdpPct: 3.1 },
      ],
    },
    source: {
      documentTitle: 'Budget at a Glance: Trends in Expenditure & CGA Finance Accounts',
      publishingAuthority: 'Ministry of Finance & Controller General of Accounts',
      publicationDate: 'July 23, 2024 & February 1, 2025',
      tableOrPageReference: 'Budget at a Glance, Statement 4: Capital Account Trends & Statement 1',
      sourceUrl: 'https://www.indiabudget.gov.in/',
      calculationMethod:
        'Audited central capital disbursements from CGA finance accounts. BE for FY 2024-25 was ₹11,11,111 Cr, RE was ₹10,18,048 Cr, and BE for FY 2025-26 is ₹11,21,090 Cr.',
      coverageNotes:
        'Direct central capex excludes Grants-in-Aid for creation of capital assets. If Grants-in-Aid are included, Effective Capital Expenditure reached ₹15.02 Lakh Cr in FY 2024-25 BE and ₹15.48 Lakh Cr in FY 2025-26 BE.',
      lastUpdated: '2026-10-30',
    },
  },
];
