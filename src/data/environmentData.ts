export interface EnvironmentRecord {
  id: string;
  projectName: string;
  promoterOrAuthority: string;
  location: string;
  state: string;
  landAreaHectares: number | null;
  category: 'mining' | 'infrastructure_port' | 'river_interlink' | 'statutory_act' | 'forest_conservation';
  status: 'approved_under_litigation' | 'stayed_by_court' | 'under_review' | 'operational' | 'legislated_stayed';
  statusLabel: string;
  forestClearanceStatus: string;
  gramSabhaStatus: string;
  environmentalImpactSummary: string;
  tribalRightsContext: string;
  legalChallenges: string;
  officialResponse: string;
  primarySource: string;
  sourceUrl: string;
  lastVerifiedDate: string;
  evidenceTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
}

export const ENVIRONMENT_RECORDS: EnvironmentRecord[] = [
  {
    id: 'env-hasdeo-arand',
    projectName: 'Hasdeo Arand Coal Block Mining (Parsa East & Kente Basan - PEKB Phase II)',
    promoterOrAuthority: 'Rajasthan Rajya Vidyut Utpadan Nigam Ltd (RRVUNL) with Adani Enterprises as Mine Developer & Operator (MDO)',
    location: 'Surguja & Korba Districts',
    state: 'Chhattisgarh',
    landAreaHectares: 1898,
    category: 'mining',
    status: 'operational',
    statusLabel: 'Operational Amid Ongoing Forest Felling & Local Protests',
    forestClearanceStatus: 'Stage-II Forest Clearance granted by MoEFCC in March 2022 after conditional Stage-I approval.',
    gramSabhaStatus: 'Contested. Village Gram Sabhas of Salhi, Hariharpur, and Fatehpur passed resolutions in 2015 and 2019 opposing diversion; local Adivasi groups allege that subsequent Gram Sabha approvals presented to authorities were forged.',
    environmentalImpactSummary: 'Hasdeo Arand is one of the largest contiguous dense sal forest canopies in Central India, functioning as an elephant corridor (Lemru Elephant Reserve) and the catchment basin for the Hasdeo Bango reservoir supporting 300,000+ hectares of farmland.',
    tribalRightsContext: 'Gond and other Scheduled Tribe communities hold customary forest rights under the Forest Rights Act (FRA) 2006. In 2024–2026, prolonged padayatras and indefinite sit-ins occurred protesting tree felling in the Tara and Ghatbarra compartments.',
    legalChallenges: 'Supreme Court of India (Writ Petition 435/2022) examined the biodiversity impact following Wildlife Institute of India (WII) and Indian Council of Forestry Research (ICFRE) reports that cautioned against opening non-contiguous blocks.',
    officialResponse: 'The Government of Rajasthan stated that coal supply from PEKB is critical to avert power outages across 4,340 MW of thermal generation capacity. The project operator stated that compensatory afforestation is being conducted at twice the diverted area with 10 million saplings planted.',
    primarySource: 'PARIVESH MoEFCC Portal Clearance File FP/CG/COAL/545/2011 & Supreme Court Order Records',
    sourceUrl: 'https://forestsclearance.nic.in/',
    lastVerifiedDate: '2026-10-18',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'env-great-nicobar',
    projectName: 'Great Nicobar Island Holistic Development Project',
    promoterOrAuthority: 'Andaman and Nicobar Islands Integrated Development Corporation (ANIIDCO)',
    location: 'Galathea Bay & Great Nicobar Biosphere Reserve',
    state: 'Andaman & Nicobar Islands (UT)',
    landAreaHectares: 16610,
    category: 'infrastructure_port',
    status: 'approved_under_litigation',
    statusLabel: 'Statutory Clearance Granted; Under National Green Tribunal & High Court Scrutiny',
    forestClearanceStatus: 'Stage-I In-principle Forest Clearance approved in October 2022 for 130.75 sq km of pristine rainforest; Environmental Clearance granted November 2022.',
    gramSabhaStatus: 'Tribal Council of Little Andaman and Great Nicobar initially consented in August 2022, but subsequently withdrew consent in November 2022, citing lack of information on complete relocation and impact on ancestral foraging grounds.',
    environmentalImpactSummary: 'Galathea Bay is the premier nesting site in the Northern Indian Ocean for the giant leatherback sea turtle. The project entails felling an estimated 8.5 to 9.6 lakh trees in a recognized UNESCO Biosphere Reserve with endemic flora and fauna.',
    tribalRightsContext: 'Directly impacts the habitat and cultural autonomy of the indigenous Shompen (Particularly Vulnerable Tribal Group, population ~240) and Great Nicobarese communities who rely on primary rainforest for subsistence.',
    legalChallenges: 'National Green Tribunal (NGT Appeal No. 29/2023) constituted a High-Powered Committee (HPC) in April 2023 to review coastal regulation compliance, coral reef translocation feasibility, and seismic vulnerability in Zone V.',
    officialResponse: 'The Union Government affirmed that the project is strategically indispensable for national maritime security overlooking the Malacca Strait, providing an international container transshipment terminal, greenfield international airport, and defense station. ANIIDCO committed ₹4,000+ Cr for environmental mitigation, coral translocation, and mangrove restoration.',
    primarySource: 'MoEFCC Environmental Clearance File No. 10-17/2019-IA.III & NGT Principal Bench Judgment',
    sourceUrl: 'https://environmentclearance.nic.in/',
    lastVerifiedDate: '2026-10-15',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'env-fca-amendment-2023',
    projectName: 'Forest (Conservation) Amendment Act 2023 & Supreme Court Forest Definition Review',
    promoterOrAuthority: 'Ministry of Environment, Forest and Climate Change (MoEFCC) / Parliament of India',
    location: 'National (Applies to all States and Union Territories)',
    state: 'All India',
    landAreaHectares: null,
    category: 'statutory_act',
    status: 'legislated_stayed',
    statusLabel: 'Enacted by Parliament; Key Provisions Subject to Supreme Court Interim Stay (2024–2026)',
    forestClearanceStatus: 'The amendment narrowed the definition of forests to land officially notified under the Indian Forest Act 1927 or recorded in government records, exempting lands within 100 km of international borders for strategic defense linear projects.',
    gramSabhaStatus: 'Significant opposition from North-Eastern State Assemblies (Nagaland, Mizoram) and tribal federations arguing the 100 km border exemption infringes on customary land ownership protected under Article 371A and 371G.',
    environmentalImpactSummary: 'Environmental scientists estimated that excluding unrecorded or deemed forests could remove statutory protection from millions of hectares of sacred groves, community conserved areas, and Aravalli scrub forests.',
    tribalRightsContext: 'Concerns raised that bypassing forest clearance for linear defense projects and eco-tourism safaris within forests removes the mandatory requirement of prior informed Gram Sabha consent under the Forest Rights Act 2006.',
    legalChallenges: 'In February 2024, a 3-judge Supreme Court bench headed by CJI in *Pravinbhai Kiritbhai Patel v. Union of India* issued an interim order directing that the expansive dictionary definition of forests established in the 1996 *Godavarman* judgment must continue to apply nationwide until state forest expert panels finalize their registries.',
    officialResponse: 'MoEFCC stated that the amendment was crucial to eliminate regulatory bottlenecks for national security border roads, promote tree plantations on private land to meet carbon sink targets under the Paris Accord, and clarify ambiguities in forest records.',
    primarySource: 'The Forest (Conservation) Amendment Act, 2023 (Act No. 15 of 2023) & Supreme Court Order in WP (Civil) 1164/2023',
    sourceUrl: 'https://www.sci.gov.in/',
    lastVerifiedDate: '2026-10-12',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'env-ken-betwa',
    projectName: 'Ken-Betwa River Interlinking Project (Link Canal & Daudhan Dam)',
    promoterOrAuthority: 'National Water Development Agency (NWDA) & Ken-Betwa Link Project Authority',
    location: 'Bundelkhand Region (Chhatarpur, Panna, Tikamgarh, Banda, Mahoba)',
    state: 'Madhya Pradesh & Uttar Pradesh',
    landAreaHectares: 9000,
    category: 'river_interlink',
    status: 'approved_under_litigation',
    statusLabel: 'Under Execution; Construction Ongoing with Wildlife Safeguard Monitoring',
    forestClearanceStatus: 'Stage-II Forest Clearance granted for 6,017 hectares of forest land, including 4,141 hectares inside Panna Tiger Reserve core and buffer areas.',
    gramSabhaStatus: 'Gram Sabhas of 10 villages facing submergence in Panna and Chhatarpur passed resolutions demanding land-for-land rehabilitation and compensation under the 2013 LARR Act prior to reservoir filling.',
    environmentalImpactSummary: 'First major inter-basin river transfer under the National Perspective Plan. Entails submergence of critical tiger breeding habitat and nesting gorges of endangered vulture species in Panna.',
    tribalRightsContext: 'Over 1,900 families, predominantly Gond and Kol tribal households, scheduled for relocation with dedicated R&R packages funded under the ₹44,605 Crore central project budget.',
    legalChallenges: 'Supreme Court Central Empowered Committee (CEC) in 2019 flagged concerns regarding downstream hydrology of the Ken river and tiger corridor disruption. National Board for Wildlife (NBWL) clearance subjected to an eco-sensitive zone management plan.',
    officialResponse: 'Ministry of Jal Shakti emphasized that the link provides drinking water to 62 lakh people and irrigates 10.62 lakh hectares of parched agricultural land in drought-prone Bundelkhand across 13 backward districts of MP and UP.',
    primarySource: 'National Water Development Agency (NWDA) DPR & Central Wildlife Division Clearance Records',
    sourceUrl: 'https://nwda.gov.in/',
    lastVerifiedDate: '2026-09-28',
    evidenceTier: 'Tier 1',
  },
  {
    id: 'env-aravali-mining',
    projectName: 'Aravalli Range Mining Regulation & Natural Conservation Zone (NCZ) Delimitation',
    promoterOrAuthority: 'Supreme Court Monitoring Committee, Haryana & Rajasthan Forest Departments',
    location: 'Gurugram, Faridabad, Nuh, Alwar, Jhunjhunu',
    state: 'Haryana & Rajasthan',
    landAreaHectares: 12500,
    category: 'forest_conservation',
    status: 'stayed_by_court',
    statusLabel: 'Commercial Mining Prohibited in Notified Zones; Strict Anti-Illegal Quarrying Enforcement',
    forestClearanceStatus: 'Commercial stone and marble quarrying in the Aravalli hills banned under Supreme Court directives in *M.C. Mehta v. Union of India* (2002 and 2009).',
    gramSabhaStatus: 'Panchayats across Mewat and South Haryana passed resolutions demanding protection of common grazing land (Gair Mumkin Pahar) from urban real estate encroachments.',
    environmentalImpactSummary: 'The Aravalli Range acts as the primary ecological green wall blocking the eastward expansion of the Thar Desert toward the National Capital Region (NCR) and provides critical groundwater recharge for Delhi and Haryana.',
    tribalRightsContext: 'Local pastoralists and Meo farming communities depend on Aravalli commons for fodder and aquifer sustainability.',
    legalChallenges: 'Supreme Court in July 2024 rejected Haryana Government petitions seeking dilution of Section 4 and 5 of the Punjab Land Preservation Act (PLPA) 1900, reaffirming that PLPA notified lands cannot be opened for commercial construction.',
    officialResponse: 'Haryana and Rajasthan state governments stated that organized mining is strictly restricted to designated non-forest pockets with electronic mineral surveillance (e-Rawanna), while balancing local infrastructure construction material demands.',
    primarySource: 'Supreme Court Judgment in Civil Appeal No. 10294/2013 & Forest Survey of India Aravalli Atlas',
    sourceUrl: 'https://www.sci.gov.in/',
    lastVerifiedDate: '2026-10-05',
    evidenceTier: 'Tier 1',
  },
];
