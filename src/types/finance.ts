export type GovLevel = 'union' | 'state' | 'local';

export type FigureType =
  | 'budget_estimate'    // Initial approved authorization / target (BE)
  | 'revised_estimate'   // Mid-year revised projection (RE)
  | 'actual'             // Audited actual cash realization / expenditure
  | 'reported_finding'   // Documented observation in official audit (CAG/PAC)
  | 'calculated_metric'; // Derived ratio, variance %, or per-capita value

export type RecordStatus =
  | 'sample_demonstration' // Demonstration record for interface validation
  | 'official_verified'    // Ingested from verified official government publication
  | 'provisional';         // Subject to final CAG/CGA reconciliation

export type FinancialSectionId =
  | 'revenue'            // 1. Revenue Sources
  | 'allocation'         // 2. Budget Allocations
  | 'expenditure'        // 3. Actual Expenditure
  | 'schemes'            // 4. Schemes and Public Projects
  | 'tax_incentives'     // 5. Tax Incentives and Revenue Foregone
  | 'audits'             // 6. Audits and Findings
  | 'procurement'        // 7. Procurement and Contracts
  | 'debt'               // 8. Debt and Financial Liabilities
  | 'state_finance'      // 9. State and Local Government Finance
  | 'comparison';        // 10. Year-on-Year Comparisons

export interface SourceMetadata {
  documentTitle: string;        // Official title of the government report
  publishingAuthority: string;  // e.g. "Ministry of Finance, Government of India"
  publicationDate: string;      // e.g. "February 1, 2024"
  tableOrPageReference: string; // e.g. "Receipt Budget, Statement 1, Page 4, Table 2.1"
  sourceUrl?: string;           // Direct public link to PDF / portal
  calculationMethod: string;    // Explicit explanation of math or "Reported directly"
  coverageNotes?: string;       // Disclosures regarding exclusions, accounting coverage, or scope
  lastUpdated: string;          // Verification date
}

export interface PublicFinanceRecord {
  id: string;
  section: FinancialSectionId;
  title: string;
  plainSummary: string;         // Plain-language explanation for ordinary citizens
  financialYear: string;        // e.g. "FY 2024-25 (BE)", "FY 2023-24 (RE)"
  govLevel: GovLevel;
  departmentOrMinistry: string;
  sectorTag?: string;           // e.g. "Infrastructure", "Defence", "Health", "Agriculture"
  status: RecordStatus;

  // Primary reported amount in ₹ Crore
  amountCr: number;
  figureType: FigureType;

  // Optional comparative figures
  budgetEstimateCr?: number;    // BE
  revisedEstimateCr?: number;   // RE
  actualAmountCr?: number;      // Actual
  previousYearAmountCr?: number;// Prior financial year for comparison

  // Sub-component tagging to prevent double-counting in aggregate summaries
  isSubComponent?: boolean;     // True if component of another record (e.g. RBI surplus is component of Non-Tax)
  parentRecordId?: string;      // ID of parent aggregate record (e.g. 'rev-sample-03')

  // Detailed attributes specific to each section
  details?: {
    // 1. Revenue
    revenueType?: 'direct_tax' | 'indirect_tax' | 'non_tax' | 'capital_receipt';
    collectionEfficiencyPct?: number;

    // 2. Allocations
    shareOfTotalBudgetPct?: number;
    allocationCeilingNote?: string;

    // 3. Expenditure
    expenditureType?: 'capital' | 'revenue';
    utilizationRatePct?: number;
    unspentSurrenderedCr?: number;

    // 4. Schemes
    schemeType?: 'centrally_sponsored' | 'central_sector' | 'infrastructure_project';
    budgetedVsReleasedPct?: number;
    pendingUtilizationCertificatesCr?: number;
    physicalProgress?: string;

    // 5. Tax Incentives
    beneficiarySegment?: 'corporate' | 'individual' | 'export_promotion' | 'customs_waiver';
    statutoryProvision?: string; // e.g. "Section 80-IA / Accelerated Depreciation"
    policyRationale?: string;

    // 6. Audits
    auditType?: 'compliance' | 'performance' | 'financial';
    cagReportNumber?: string;
    financialImplicationCr?: number;
    ministryResponseStatus?: 'pending' | 'submitted' | 'under_pac_review';

    // 7. Procurement
    contractId?: string;
    vendorName?: string;
    procurementPortal?: 'GeM' | 'CPPP' | 'State e-Tender';
    awardMethod?: 'open_tender' | 'limited_tender' | 'single_source_nomination';

    // 8. Debt
    debtClassification?: 'internal_dated_securities' | 'treasury_bills' | 'external_multilateral' | 'small_savings';
    annualInterestBurdenCr?: number;
    debtToGdpPct?: number;

    // 9. State Finance
    stateName?: string;
    devolutionSharePct?: number;
    financeCommissionGrantType?: 'revenue_deficit' | 'local_body' | 'disaster_management';

    // 10. Year-on-Year
    trendMetricName?: string;
    multiYearTrend?: { year: string; amountCr: number; gdpPct?: number }[];
  };

  source: SourceMetadata;
}

export type ReceiptCategoryType =
  | 'direct_tax'
  | 'indirect_tax'
  | 'non_tax'
  | 'capital_receipt'
  | 'borrowing_liability';

export type ExpenditureCategoryType =
  | 'mandatory_transfer'
  | 'debt_servicing'
  | 'development_schemes'
  | 'defence_security'
  | 'social_subsidies'
  | 'pensions'
  | 'operations';

export interface CitizenRupeeItem {
  source?: string;
  destination?: string;
  percentage: number;                // Percentage share of total budget outlay (e.g. 27 for 27%)
  exactAmountCr: number;             // Underlying calculated financial amount in ₹ Crore
  paise: number;                     // Kept for backward compatibility
  color: string;
  categoryType?: ReceiptCategoryType | ExpenditureCategoryType;
  categoryLabel?: string;
  description?: string;
  officialSourceUrl?: string;
}

export interface MacroOverviewTotals {
  totalBudgetOutlayCr: number;       // BE Total Outlay
  totalBudgetOutlayReCr: number;     // RE Total Outlay
  totalRevenueReceiptsCr: number;    // BE Revenue Receipts
  totalRevenueReceiptsReCr: number;  // RE Revenue Receipts
  capitalExpenditureCr: number;      // BE Direct Capex
  capitalExpenditureReCr: number;    // RE Direct Capex
  effectiveCapexCr: number;          // BE Effective Capex (Capex + Grants for Capital Assets)
  effectiveCapexReCr: number;        // RE Effective Capex
  fiscalDeficitTargetPct: number;    // BE % of GDP
  fiscalDeficitRePct: number;        // RE % of GDP
  fiscalDeficitCr: number;           // BE ₹ Cr
  fiscalDeficitReCr: number;          // RE ₹ Cr
}

export interface CitizenRupeeDataset {
  yearId: string;
  financialYear: string;
  budgetBasis: string;
  where1RupeeComesFrom: CitizenRupeeItem[];
  where1RupeeGoes: CitizenRupeeItem[];
  macroTotals: MacroOverviewTotals;
}

