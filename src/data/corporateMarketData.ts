export interface CorporateConcessionRecord {
  id: string;
  entityGroup: string;
  sector: string;
  scopeOfAsset: string;
  tenurePeriod: string;
  scrutinyFocus: string;
  establishedFacts: string;
  disputedAllegations: string;
  regulatoryOrJudicialFindings: string;
  officialResponse: string;
  competitiveTenderingStatus: string;
  marketShareIndicator: string;
  primarySource: string;
  sourceUrl: string;
  lastVerifiedDate: string;
  evidenceTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
}

export const CORPORATE_CONCESSION_RECORDS: CorporateConcessionRecord[] = [
  {
    id: 'corp-adani-airports',
    entityGroup: 'Adani Group (Adani Airport Holdings Ltd)',
    sector: 'Civil Aviation & Airport Concessions',
    scopeOfAsset: '6 AAI Airports (Ahmedabad, Lucknow, Mangaluru, Jaipur, Guwahati, Thiruvananthapuram) + Navi Mumbai Greenfield International Airport',
    tenurePeriod: '2019 – 2069 (50-Year Concession Leases)',
    scrutinyFocus: 'Award of all 6 state-owned airports in a single bidding round; relaxation of prior airport operations experience criteria; single-entity operational concentration.',
    establishedFacts: 'In 2018–19, the Airports Authority of India (AAI) conducted international competitive bidding on a per-passenger fee model. Adani Enterprises emerged as the highest bidder (H1) across all six airports, bidding substantially higher fees payable to AAI per passenger than competitors. In 2021, the group acquired a 74% controlling stake in Mumbai International Airport Ltd (MIAL) and Navi Mumbai Airport from the GVK Group.',
    disputedAllegations: 'Opposition parties and media reports cited internal dissent memos from NITI Aayog and the Department of Economic Affairs (DEA) in 2018 recommending that no single bidder be awarded more than two airports to mitigate systemic risk. It was alleged that central investigative agency actions against the GVK group facilitated the Mumbai airport ownership transfer.',
    regulatoryOrJudicialFindings: 'In *S. Venkatesan v. Union of India*, the Kerala High Court and subsequently the Supreme Court of India dismissed petitions challenging the Thiruvananthapuram airport lease, holding that the competitive bidding process was transparent, open to all qualified participants, and in public interest. CAG Audit Report on AAI (2023) noted compliance with standard concession procedures while recommending stricter oversight on capital expenditure milestones.',
    officialResponse: 'Ministry of Civil Aviation stated that the bidding rules were formulated transparently by an Empowered Group of Secretaries, that AAI earns significantly higher revenue per passenger from the private operator than under public management, and that GVK shareholders voluntarily accepted debt restructuring terms.',
    competitiveTenderingStatus: 'Awarded via international competitive e-tendering with multiple bidders (GMR, AMP Capital, Zurich Airport).',
    marketShareIndicator: '~23% of total passenger traffic in India and ~33% of national air cargo transit as of 2026.',
    primarySource: 'AAI Concession Agreements, Supreme Court Judgment (SLP Civil 14619/2020) & CAG Civil Aviation Report',
    sourceUrl: 'https://www.aai.aero/',
    lastVerifiedDate: '2026-10-18',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'corp-hindenburg-sc-probe',
    entityGroup: 'Adani Group / Listed Companies',
    sector: 'Capital Markets, Offshore Entities & Corporate Governance',
    scopeOfAsset: 'Listed securities across ports, power, transmission, green energy, gas, and edible oils',
    tenurePeriod: 'January 2023 – October 2026',
    scrutinyFocus: 'Allegations of offshore Mauritius/Cyprus shell entities holding stock; Minimum Public Shareholding (MPS) compliance; SEBI regulatory timeline.',
    establishedFacts: 'On January 24, 2023, US short-seller Hindenburg Research published a report alleging improper use of offshore funds, stock manipulation, and excessive leverage across Adani Group companies. The report triggered a sharp drop in market capitalization of over $100 billion before a substantial subsequent rebound as the group prepaid $2.5B in debt and secured institutional investments from GQG Partners.',
    disputedAllegations: 'Hindenburg and opposition parties alleged that regulatory authorities delayed investigations into 13 offshore funds and alleged that familial ties between regulatory consultants and the conglomerate compromised independence.',
    regulatoryOrJudicialFindings: 'On March 2, 2023, the Supreme Court of India constituted a 6-member Expert Committee headed by retired SC Justice A.M. Sapre. In May 2023, the committee reported no evidence of regulatory failure by SEBI and found no prima facie proof of stock price manipulation. On January 3, 2024, a 3-judge SC bench headed by CJI in *Vishal Tiwari v. Union of India* declined to transfer the investigation to a Special Investigation Team (SIT) or CBI, affirming SEBI’s statutory authority and directing closure of remaining matters.',
    officialResponse: 'The conglomerate published a detailed 413-page rebuttal dismissing all allegations as a calculated attack on India and its institutions, confirming full compliance with Indian securities laws, and achieving debt-to-EBITDA ratio reductions verified by credit rating agencies.',
    competitiveTenderingStatus: 'Not applicable (Capital markets scrutiny & regulatory oversight).',
    marketShareIndicator: 'Conglomerate operates India’s largest private port network (Mundra, Krishnapatnam, Vizhinjam - handling ~27% of national maritime cargo).',
    primarySource: 'Supreme Court Expert Committee Report (May 2023) & Supreme Court Judgment in WP (Civil) 162/2023',
    sourceUrl: 'https://www.sci.gov.in/',
    lastVerifiedDate: '2026-10-16',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'corp-electoral-bonds-sc',
    entityGroup: 'Multi-Corporate & All Major Political Parties',
    sector: 'Political Finance, Corporate Donations & Transparency',
    scopeOfAsset: '₹16,518 Crore in anonymous interest-free bearer banking instruments redeemed between 2018 and 2024',
    tenurePeriod: '2018 – February 2024',
    scrutinyFocus: 'Anonymity of corporate funding; removal of 7.5% profit cap on corporate donations; correlation between political donations, government contracts, and enforcement agency investigations.',
    establishedFacts: 'On February 15, 2024, a unanimous 5-judge Constitution Bench of the Supreme Court in *Association for Democratic Reforms (ADR) v. Union of India* declared the Electoral Bond Scheme unconstitutional, holding that anonymous political funding violates the citizens’ Right to Information under Article 19(1)(a). The Court ordered the State Bank of India (SBI) to disclose complete alphanumeric serial numbers to the Election Commission of India (ECI) for public publication.',
    disputedAllegations: 'Investigative journalists and civic watchdogs documented multiple instances where corporate donors purchased bonds shortly before or after winning major public contracts, or within weeks of searches by the Enforcement Directorate (ED) or Income Tax Department. Government representatives maintained that donations were voluntary and routed entirely via formal banking channels.',
    regulatoryOrJudicialFindings: 'Supreme Court ruled that the scheme created an unconstitutional information asymmetry, enabling potential *quid pro quo* arrangements without voter knowledge. The Court struck down amendments to the Companies Act 2013 and Representation of the People Act 1951 that had allowed loss-making shell companies to donate unlimited amounts.',
    officialResponse: 'The Union Government defended the scheme as an effort to curb cash black money in elections by routing 100% of donations through verifiable banking channels via KYC-compliant SBI accounts, arguing that donor privacy protected contributors from political retribution.',
    competitiveTenderingStatus: 'Statutory political finance framework struck down by the judiciary.',
    marketShareIndicator: 'ECI Data Share: BJP redeemed ₹6,060 Cr (36.7%), AITC/TMC ₹1,610 Cr (9.7%), INC ₹1,422 Cr (8.6%), BRS ₹1,215 Cr (7.4%), BJD ₹775 Cr (4.7%), DMK ₹639 Cr (3.9%).',
    primarySource: 'Supreme Court 5-Judge Constitution Bench Judgment (WP Civil No. 880 of 2017) & ECI Official Disclosures',
    sourceUrl: 'https://www.eci.gov.in/',
    lastVerifiedDate: '2026-10-15',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'corp-telecom-market-concentration',
    entityGroup: 'Reliance Jio Infocomm, Bharti Airtel & Vodafone Idea',
    sector: 'Telecommunications & Digital Infrastructure',
    scopeOfAsset: '4G/5G Spectrum Licenses, Undersea Cable Landing Stations, Fiber Backhaul Network',
    tenurePeriod: '2016 – 2026',
    scrutinyFocus: 'Consolidation of the telecom sector from 10+ operators into a private duopoly (Jio and Airtel) with a financially stressed third player (Vi); Adjusted Gross Revenue (AGR) liabilities; spectrum auction pricing.',
    establishedFacts: 'Following the 2016 entry of Reliance Jio with free voice calls and aggressive data pricing, the Indian telecom sector consolidated rapidly. By 2024–2026, Reliance Jio and Bharti Airtel collectively held over 71% of total wireless subscribers and over 80% of national broadband traffic, while state-run BSNL/MTNL held under 8% subscriber share.',
    disputedAllegations: 'Competitors and consumer rights groups raised concerns that the reduction in competition would eventually lead to simultaneous tariff hikes and barriers to entry for smaller digital service providers. Sector regulators maintained that India retains among the lowest data tariffs in the world.',
    regulatoryOrJudicialFindings: 'Telecom Regulatory Authority of India (TRAI) reviewed predatory pricing guidelines in 2018. Supreme Court in 2020 mandated a 10-year repayment schedule for AGR dues to prevent insolvency of telecom operators. In 2022, the Union Government converted ₹16,133 Crore of Vodafone Idea’s accrued interest dues into government equity (~33% stake) to maintain a three-player market structure.',
    officialResponse: 'Department of Telecommunications (DoT) emphasized that telecom reforms, digital connectivity expansion, and 5G rollout occurred at record speeds, maintaining high network availability for 1.1 billion wireless users while safeguarding state equity in viable competition.',
    competitiveTenderingStatus: 'Spectrum allocated through open, transparent electronic auctions conducted by DoT.',
    marketShareIndicator: 'Private duopoly: Jio (~40.5%), Airtel (~33.1%), Vodafone Idea (~18.8%), BSNL (~7.6%) as of 2026.',
    primarySource: 'TRAI Performance Indicator Reports & Supreme Court AGR Judgment Records',
    sourceUrl: 'https://www.trai.gov.in/',
    lastVerifiedDate: '2026-10-10',
    evidenceTier: 'Tier 1',
  },
];
