export interface EpsteinPublicRecord {
  id: string;
  individualOrInstitution: string;
  affiliationOrContext: string;
  sourceCourtDocket: string;
  unsealedDate: string;
  referenceType: 'address_book_contact' | 'flight_manifest_entry' | 'third_party_mention' | 'meeting_calendar_entry';
  documentSummary: string;
  establishedFacts: string;
  allegationOrMisconductStatus: 'no_allegation_of_misconduct' | 'contact_only_no_wrongdoing' | 'unsubstantiated_claim';
  legalAndEvidentiaryClassification: string;
  publicResponseOrClarification: string;
  unresolvedQuestionsOrLimitations: string;
  originalDocumentUrl: string;
  lastVerifiedDate: string;
  evidenceTier: 'Tier 1' | 'Tier 2';
}

export const EPSTEIN_PUBLIC_RECORDS: EpsteinPublicRecord[] = [
  {
    id: 'epstein-rec-anil-ambani',
    individualOrInstitution: 'Anil Ambani (Reliance Group Chairman)',
    affiliationOrContext: 'Indian Industrialist / Corporate Executive',
    sourceCourtDocket: 'US District Court for the Southern District of New York (SDNY), Case 15-cv-07433-LAP (Giuffre v. Maxwell), Unsealed Exhibits January 2024',
    unsealedDate: 'January 2024 (Court-Ordered Public Disclosure)',
    referenceType: 'address_book_contact',
    documentSummary: 'Appears as an entry in Jeffrey Epstein’s personal contact address directory released as court Exhibit 242-1, listing office contact coordinates for Reliance Communications / Reliance Group in Mumbai.',
    establishedFacts: 'The unsealed court records disclose telephone numbers and corporate email addresses corresponding to Mumbai corporate offices. There are no flight log records indicating travel to Epstein’s Caribbean residence (Little St. James), nor any deposition testimony alleging presence at events involving unlawful conduct.',
    allegationOrMisconductStatus: 'no_allegation_of_misconduct',
    legalAndEvidentiaryClassification: 'Documented contact / Rolodex directory entry only. Under established legal standards, an appearance in a business directory or contact book does not constitute evidence of criminal conduct, complicity, or participation in illicit acts.',
    publicResponseOrClarification: 'Representatives of the business group noted that global corporate offices regularly exchange formal contact details in international financial networks, and affirmed that no personal, social, or commercial relationship or transaction ever transpired with Jeffrey Epstein.',
    unresolvedQuestionsOrLimitations: 'The entry does not document the circumstances or date under which the contact information was gathered; no direct correspondence or financial transaction between the parties is contained in the public court docket.',
    originalDocumentUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/',
    lastVerifiedDate: '2026-10-18',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'epstein-rec-deepak-chopra',
    individualOrInstitution: 'Deepak Chopra',
    affiliationOrContext: 'Author & Alternative Medicine Advocate (US-based Indian Origin)',
    sourceCourtDocket: 'US District Court SDNY, Giuffre v. Maxwell Disclosures & 2008 Palm Beach Police Investigation Files',
    unsealedDate: 'January 2024 / Earlier Investigative Releases',
    referenceType: 'meeting_calendar_entry',
    documentSummary: 'Documented email communications and calendar mentions regarding wellness conferences and philanthropic discussions between 2001 and 2005.',
    establishedFacts: 'Records demonstrate that Chopra attended several public charitable and scientific conferences sponsored by the Edge Foundation where Epstein was among dozens of donors and attendees. Email exchanges show formal invitations to speaking engagements.',
    allegationOrMisconductStatus: 'contact_only_no_wrongdoing',
    legalAndEvidentiaryClassification: 'Documented public/conference contact only. No victim or witness in any unsealed deposition or criminal proceeding ever made any allegation of misconduct, wrongdoing, or knowledge of illicit activities against Chopra.',
    publicResponseOrClarification: 'Chopra publicly clarified in 2019 and reaffirmed in 2024 that he met Epstein exclusively in the context of scientific and philanthropic gatherings alongside dozens of renowned researchers, was appalled by Epstein’s crimes, and had ceased any contact years prior to Epstein’s initial 2008 conviction.',
    unresolvedQuestionsOrLimitations: 'Contacts were strictly confined to public philanthropic and conference circuits; no private visits to private residences documented.',
    originalDocumentUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/',
    lastVerifiedDate: '2026-10-15',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'epstein-rec-diplomatic-delegations',
    individualOrInstitution: 'Indian Diplomatic & UN Mission Receptions',
    affiliationOrContext: 'Multilateral Diplomatic & Council on Foreign Relations (CFR) Circles',
    sourceCourtDocket: 'SDNY Unsealed Discovery Filings, Epstein Meeting Schedules & Email Records (2010–2016)',
    unsealedDate: 'January 2024',
    referenceType: 'third_party_mention',
    documentSummary: 'Calendar notations and third-party emails referencing attendance at large multilateral diplomatic receptions in New York, including UN General Assembly side-events attended by foreign delegates from multiple countries including India.',
    establishedFacts: 'Epstein sought to rebuild his network post-2008 by attending open diplomatic and think-tank receptions hosted by institutions such as the International Peace Institute (IPI) and Trilateral Commission. Generic calendar references note "Indian delegation reception" alongside dozens of other national delegations.',
    allegationOrMisconductStatus: 'no_allegation_of_misconduct',
    legalAndEvidentiaryClassification: 'Generic third-party calendar reference. No individual diplomat or official is identified with any allegation or bilateral private transaction.',
    publicResponseOrClarification: 'Foreign policy observers and former diplomats noted that high-level receptions hosted by international think-tanks involve hundreds of guests with open invitation lists, and do not signify private relationship or institutional endorsement.',
    unresolvedQuestionsOrLimitations: 'Third-party calendar notes; no verified private meetings with Indian government officials or state leaders appear in any unsealed US court docket.',
    originalDocumentUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/',
    lastVerifiedDate: '2026-10-12',
    evidenceTier: 'Tier 1',
  },
];
