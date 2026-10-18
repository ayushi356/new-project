export type MediaCategory =
  | 'journalist_safety'
  | 'legal_cases'
  | 'media_ownership'
  | 'regulatory_censorship'
  | 'unscripted_interviews'
  | 'govt_ads_financial'
  | 'digital_blockades'
  | 'disinformation_corrections';

export interface MediaIncident {
  id: string;
  title: string;
  category: MediaCategory;
  categoryLabel: string;
  year: number;
  dateString?: string;
  state: string;
  institution: string;
  incidentType: string;
  evidenceStatus: 'Documented Judicial Record' | 'Official Gazette / Order' | 'Verified Media Investigation' | 'Under Trial / Sub-Judice';
  governingPartyId?: string; // 'party-bjp' | 'party-inc' | 'party-aap' | 'party-tmc'
  governingLevel: 'Union Government' | 'State Government' | 'Autonomous / Corporate';
  
  // Section 3 structured case fields
  whatHappened: string;
  whoWasInvolved: string;
  whatIsEstablished: string;
  whatIsDisputed: string;
  responseFromGovtOrOutlet: string;
  currentStatus: string;
  
  // Sources
  sourceName: string;
  sourceUrl?: string;
  sourceDocumentRef?: string;
}

export interface LeaderInterviewRecord {
  leaderId: string;
  leaderName: string;
  partyId: string;
  partyName: string;
  role: string;
  avatarColor: string;
  
  // Key metrics requested
  independentUnscriptedInterviews: number; // 1-on-1 interviews with adversarial / non-aligned press
  openPressConferences: number; // Open press meets where open follow-up questions from floor allowed
  lastOpenPressConferenceDate: string;
  scriptedFriendlyInterviews: number;
  ratioDescription: string;
  accessRating: 'High Open Access' | 'Moderate / Selective' | 'Highly Restricted / Scripted Only';
  
  keyNotableEncounters: string;
  recordedPressPolicy: string;
  evidenceReference: string;
}

export interface PeriodComparisonData {
  periodName: string;
  timeline: string;
  governingBody: string;
  level: 'National' | 'State';
  
  metrics: {
    avgJournalistArrestsPerYear: number;
    avgInternetShutdownsPerYear: number;
    worldPressFreedomRankRange: string;
    centralOrStateAdSpendRatio: string;
    unscriptedPressConferencesByHead: number;
    seditionOrUAPAMediaCasesTotal: number;
  };
  
  keyPolicyMilestones: string[];
  attributionAnalysis: string;
}

export interface MediaOwnershipRecord {
  outletName: string;
  mediaType: 'Television Network' | 'Print & Digital Daily' | 'Digital News Portal' | 'News Agency';
  parentConglomerate: string;
  ultimateBeneficialOwner: string;
  politicalAdSpendShare: string;
  corporateSectors: string[];
  editorialStanceNotes: string;
}
