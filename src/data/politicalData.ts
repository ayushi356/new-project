import type { Party, Leader, Work, Yojna, Promise_, Incident } from '@/lib/supabase';

export const SEED_PARTIES: Party[] = [
  {
    id: 'party-bjp',
    name: 'Bharatiya Janata Party',
    abbreviation: 'BJP',
    ideology: 'Right-wing, Hindutva, Cultural Nationalism, Economic Modernisation',
    represents: 'Ruling party at Centre (NDA); strong presence across Hindi heartland, West and North-East India.',
    founded_year: 1980,
    color_hex: '#ea580c',
    description:
      'Founded in 1980, the Bharatiya Janata Party is currently the largest political party in India. It advocates cultural nationalism, digital public infrastructure, national security, and welfare-driven governance, while facing significant criticism over communal polarization, civil liberties concerns, and executive centralization.',
    logo_url: null,
  },
  {
    id: 'party-inc',
    name: 'Indian National Congress',
    abbreviation: 'INC',
    ideology: 'Centre-left, Secularism, Social Democracy, Welfare State, Liberal Nationalism',
    represents: 'Principal opposition party (INDIA alliance); historic national footprint across diverse social groups and southern states.',
    founded_year: 1885,
    color_hex: '#2563eb',
    description:
      'India’s oldest political party, the Indian National Congress led the freedom movement and governed India for over five decades post-independence. It pioneered economic liberalization in 1991 and landmark rights-based welfare (RTI, MGNREGA, Food Security), but has faced criticism over legacy corruption scandals, dynastic leadership, and institutional decline.',
    logo_url: null,
  },
  {
    id: 'party-aap',
    name: 'Aam Aadmi Party',
    abbreviation: 'AAP',
    ideology: 'Populism, Anti-Corruption, Social Welfare, Public Education and Health Reforms',
    represents: 'State ruling party in Punjab and Delhi (UT); popular among urban working and middle classes.',
    founded_year: 2012,
    color_hex: '#0284c7',
    description:
      'Emerging from the 2011 India Against Corruption movement, AAP gained power on promises of participatory democracy, anti-graft oversight, free public utilities (water and electricity), and transformations in government schools and neighborhood clinics, though embroiled in excise policy investigations and institutional friction with central authorities.',
    logo_url: null,
  },
  {
    id: 'party-tmc',
    name: 'All India Trinamool Congress',
    abbreviation: 'AITC / TMC',
    ideology: 'Regionalism, Centre-left Populism, Secularism, Bengal Sub-nationalism',
    represents: 'Ruling party in West Bengal since 2011; key regional power in eastern India.',
    founded_year: 1998,
    color_hex: '#16a34a',
    description:
      'Formed by Mamata Banerjee after breaking from the Congress, TMC ended 34 years of Left Front rule in West Bengal in 2011. Known for expansive direct cash benefit schemes for women and students (Kanyashree, Lakshmir Bhandar), the party faces intense criticism regarding post-poll violence, local syndicates, and administrative corruption.',
    logo_url: null,
  },
];

export const SEED_LEADERS: Leader[] = [
  {
    id: 'leader-modi',
    party_id: 'party-bjp',
    name: 'Narendra Modi',
    role: 'Prime Minister of India (2014–Present)',
    bio: 'Former Chief Minister of Gujarat (2001–2014) and Prime Minister of India since 2014, leading the BJP to successive general election victories in 2014, 2019, and 2024.',
    represents: 'Varanasi (Lok Sabha), Uttar Pradesh',
    ideology: 'Hindutva, Economic Nationalism, Development (Vikas), Strong Executive Leadership',
    image_url: null,
  },
  {
    id: 'leader-shah',
    party_id: 'party-bjp',
    name: 'Amit Shah',
    role: 'Union Minister of Home Affairs & Minister of Co-operation',
    bio: 'Key BJP strategist, former national party president, and Union Home Minister responsible for major constitutional and internal security decisions including the abrogation of Article 370 and CAA.',
    represents: 'Gandhinagar (Lok Sabha), Gujarat',
    ideology: 'Hindutva, Zero-tolerance Security Policy, Organizational Centralization',
    image_url: null,
  },
  {
    id: 'leader-gadkari',
    party_id: 'party-bjp',
    name: 'Nitin Gadkari',
    role: 'Minister of Road Transport & Highways',
    bio: 'Senior BJP leader widely credited with record-speed expansion of national highways, expressways, and logistics corridors across India.',
    represents: 'Nagpur (Lok Sabha), Maharashtra',
    ideology: 'Infrastructure-led Economic Growth, Pragmatic Governance',
    image_url: null,
  },
  {
    id: 'leader-rekha-gupta',
    party_id: 'party-bjp',
    name: 'Rekha Gupta',
    role: 'Chief Minister of Delhi (Feb 2025–Present)',
    bio: 'Lawyer, former DUSU President (1996) and veteran municipal administrator elected MLA from Shalimar Bagh who became the 9th Chief Minister of Delhi in February 2025 following the BJP’s victory in the Delhi Assembly elections.',
    represents: 'Shalimar Bagh, Delhi Legislative Assembly',
    ideology: 'Good Governance (Suraaj), Municipal Modernisation, Women Empowerment',
    image_url: null,
  },
  {
    id: 'leader-sitharaman',
    party_id: 'party-bjp',
    name: 'Nirmala Sitharaman',
    role: 'Union Minister of Finance & Corporate Affairs',
    bio: 'First full-time woman Finance Minister of India who presented a record 7 consecutive Union Budgets, steering the post-pandemic economic recovery, Capital Expenditure expansion to ₹11+ Lakh Crore, corporate tax cuts, and GST rationalisation.',
    represents: 'Rajya Sabha (Karnataka)',
    ideology: 'Fiscal Consolidation, Supply-Side Economic Reforms, Capital Infrastructure Investment',
    image_url: null,
  },
  {
    id: 'leader-vaishnaw',
    party_id: 'party-bjp',
    name: 'Ashwini Vaishnaw',
    role: 'Union Minister for Railways, Information & Broadcasting, Electronics & IT',
    bio: 'Former IAS officer and Wharton alumnus overseeing India’s semiconductor mission, Vande Bharat train expansion, railway safety automation (Kavach), and digital personal data protection framework.',
    represents: 'Rajya Sabha (Odisha)',
    ideology: 'Technocratic Modernisation, Digital Manufacturing, Infrastructure Efficiency',
    image_url: null,
  },
  {
    id: 'leader-pralhad-joshi',
    party_id: 'party-bjp',
    name: 'Pralhad Joshi',
    role: 'Union Minister of Education, Consumer Affairs, Food & Public Distribution, New & Renewable Energy',
    bio: 'Five-time Lok Sabha MP from Dharwad, Karnataka, former Parliamentary Affairs Minister, and senior Union Cabinet Minister allocated the Ministry of Education alongside Consumer Affairs, Food & Public Distribution and New & Renewable Energy.',
    represents: 'Dharwad (Lok Sabha), Karnataka',
    ideology: 'Institutional Governance, Renewable Transition, Citizen Welfare Delivery',
    image_url: null,
  },
  {
    id: 'leader-pradhan',
    party_id: 'party-bjp',
    name: 'Dharmendra Pradhan',
    role: 'Former Union Minister of Education (2021–July 2026) & Senior BJP Leader',
    bio: 'Senior BJP leader who served as Union Minister of Education (2021–2026) overseeing National Education Policy (NEP 2020) implementation and university entrance reforms before stepping down in July 2026 taking moral responsibility amid student agitations over examination integrity.',
    represents: 'Sambalpur (Lok Sabha), Odisha',
    ideology: 'Educational Modernisation, Skill India, Social Inclusion',
    image_url: null,
  },
  {
    id: 'leader-rahul',
    party_id: 'party-inc',
    name: 'Rahul Gandhi',
    role: 'Leader of the Opposition in Lok Sabha',
    bio: 'Five-term Member of Parliament, former Congress President, and key architect of the Bharat Jodo Yatra and national caste census demand.',
    represents: 'Rae Bareli (Lok Sabha), Uttar Pradesh',
    ideology: 'Social Justice, Constitutional Rights Protection, Inclusive Welfare Capitalism',
    image_url: null,
  },
  {
    id: 'leader-kharge',
    party_id: 'party-inc',
    name: 'Mallikarjun Kharge',
    role: 'President of Indian National Congress & LoP (Rajya Sabha)',
    bio: 'Veteran parliamentarian and Dalit leader with over five decades of legislative experience in Karnataka and central politics.',
    represents: 'Rajya Sabha (Karnataka)',
    ideology: 'Democratic Socialism, Affirmative Action, Secularism',
    image_url: null,
  },
  {
    id: 'leader-kejriwal',
    party_id: 'party-aap',
    name: 'Arvind Kejriwal',
    role: 'Former Chief Minister of Delhi & National Convener, AAP',
    bio: 'Ramon Magsaysay awardee and former IRS officer who founded AAP in 2012; served three terms as Chief Minister of Delhi (2015–2024) before resigning in September 2024 following his excise case bail.',
    represents: 'New Delhi',
    ideology: 'Welfare Populism, Citizen-Centric Governance, Anti-Establishment Reform',
    image_url: null,
  },
  {
    id: 'leader-atishi',
    party_id: 'party-aap',
    name: 'Atishi',
    role: 'Former Chief Minister of Delhi & Senior AAP Leader',
    bio: 'Oxford alumnus and key architect of the Delhi government education transformation who served as Chief Minister of Delhi from September 2024 until February 2025.',
    represents: 'Kalkaji, Delhi Legislative Assembly',
    ideology: 'Public Sector Quality Revamp, Rights-based Social Welfare',
    image_url: null,
  },
  {
    id: 'leader-mamata',
    party_id: 'party-tmc',
    name: 'Mamata Banerjee',
    role: 'Chief Minister of West Bengal (2011–Present)',
    bio: 'Founder and chairperson of TMC; three-time Chief Minister who dislodged the 34-year Left Front regime through grassroots agrarian movements (Singur and Nandigram).',
    represents: 'Bhabanipur, West Bengal Legislative Assembly',
    ideology: 'Bengali Sub-nationalism, Grassroots Populism, Women-Centric Direct Welfare',
    image_url: null,
  },
  {
    id: 'leader-abhishek',
    party_id: 'party-tmc',
    name: 'Abhishek Banerjee',
    role: 'National General Secretary, AITC & Member of Parliament',
    bio: 'Key organizational leader of the Trinamool Congress and three-time Lok Sabha Member of Parliament representing Diamond Harbour.',
    represents: 'Diamond Harbour (Lok Sabha), West Bengal',
    ideology: 'Regional Federalism, Youth Mobilization, Direct Welfare Programs',
    image_url: null,
  },
  {
    id: 'leader-omar-abdullah',
    party_id: 'party-inc',
    name: 'Omar Abdullah',
    role: 'Chief Minister of Jammu & Kashmir (Oct 2024–Present)',
    bio: 'Vice-President of Jammu & Kashmir National Conference (JKNC) who formed government in alliance with Congress in October 2024 following the first J&K Assembly elections in a decade, passing a cabinet resolution demanding the restoration of full statehood.',
    represents: 'Ganderbal & Budgam, J&K Legislative Assembly',
    ideology: 'Kashmiri Federal Autonomy, Statehood Restoration, Democratic Representation',
    image_url: null,
  },
];

export const SEED_WORKS: Work[] = [
  // BJP Positive
  {
    id: 'work-bjp-good-1',
    party_id: 'party-bjp',
    leader_id: 'leader-modi',
    title: 'Digital Public Infrastructure & Unified Payments Interface (UPI) Expansion',
    description: 'Pioneered zero-fee, instant interoperable mobile payment ecosystem (UPI), making India the global leader in real-time digital financial transactions with over 14 billion monthly transactions.',
    type: 'good',
    severity: null,
    category: 'Economy & Technology',
    date_year: 2016,
    impact: 'Formalized millions of small businesses, eliminated transaction fees for ordinary vendors, and established a scalable public digital rails model studied worldwide.',
    source_url: 'https://www.npci.org.in/',
    source_name: 'National Payments Corporation of India (NPCI)',
  },
  {
    id: 'work-bjp-good-2',
    party_id: 'party-bjp',
    leader_id: 'leader-gadkari',
    title: 'National Expressway & Highway Network Transformation',
    description: 'Scaled highway construction from 12 km/day in 2014 to over 30 km/day, completing flagship access-controlled greenfield expressways (Delhi-Mumbai, Purvanchal, Samruddhi Mahamarg).',
    type: 'good',
    severity: null,
    category: 'Infrastructure',
    date_year: 2022,
    impact: 'Drastically reduced inter-state freight transit times, modernized national logistics competitiveness, and connected interior economic zones.',
    source_url: 'https://morth.nic.in/',
    source_name: 'Ministry of Road Transport and Highways',
  },
  {
    id: 'work-delhi-sanitation-2025',
    party_id: 'party-bjp',
    leader_id: 'leader-rekha-gupta',
    title: 'Delhi Municipal Solid Waste Remediation & Biomining Acceleration',
    description: 'Spearheaded mission-mode legacy waste clearance across Ghazipur, Bhalaswa, and Okhla landfill mounds using modern trommel screening, achieving enhanced daily biomining targets in the NCT of Delhi.',
    type: 'good',
    severity: null,
    category: 'Urban Sanitation & Governance',
    date_year: 2025,
    impact: 'Accelerated legacy waste reclamation, curbed seasonal landfill fire hazards, and upgraded decentralized waste segregation systems across the capital.',
    source_url: 'https://mcdonline.nic.in/',
    source_name: 'Municipal Corporation of Delhi (MCD) & Urban Development Department',
  },
  {
    id: 'work-bjp-good-3',
    party_id: 'party-bjp',
    leader_id: 'leader-modi',
    title: 'Pradhan Mantri Jan Dhan Yojana (Financial Inclusion)',
    description: 'Massive drive that opened over 530 million zero-balance bank accounts, connecting over 55% women and rural citizens directly to the banking framework.',
    type: 'good',
    severity: null,
    category: 'Welfare & Economy',
    date_year: 2014,
    impact: 'Plugged subsidy leakages through Direct Benefit Transfer (DBT), eliminating middleman graft in welfare delivery.',
    source_url: 'https://pmjdy.gov.in/',
    source_name: 'Ministry of Finance, Government of India',
  },
  // BJP Bad
  {
    id: 'work-bjp-bad-1',
    party_id: 'party-bjp',
    leader_id: 'leader-modi',
    title: '2016 Overnight Demonetization Shock',
    description: 'Sudden invalidation of 86% of circulating currency (₹500 and ₹1,000 notes) on 4 hours notice, severely disrupting cash-dependent unorganized commerce and rural livelihoods.',
    type: 'bad',
    severity: 'extreme',
    category: 'Economy',
    date_year: 2016,
    impact: 'Over 100 queue-related deaths, widespread MSME closures, severe temporary drop in GDP growth, while 99.3% of demonetized notes returned to RBI.',
    source_url: 'https://rbi.org.in/',
    source_name: 'Reserve Bank of India Annual Report 2018',
  },
  {
    id: 'work-bjp-bad-2',
    party_id: 'party-bjp',
    leader_id: null,
    title: 'Electoral Bonds Scheme (Struck Down as Unconstitutional)',
    description: 'Introduced anonymous donor bonds for corporate funding to political parties. Struck down unanimously by a 5-judge Supreme Court Constitution Bench in 2024 for violating citizens’ fundamental Right to Information (Article 19(1)(a)).',
    type: 'bad',
    severity: 'extreme',
    category: 'Electoral Integrity & Corruption',
    date_year: 2024,
    impact: 'Enabled legalized opacity and quid-pro-quo corporate donor contracts; over ₹16,500 crore in opaque political financing tracked.',
    source_url: 'https://main.sci.gov.in/supremecourt/2017/33924/33924_2017_1_1501_50882_Judgement_15-Feb-2024.pdf',
    source_name: 'Supreme Court of India Judgment (Association for Democratic Reforms v. Union of India)',
  },
  {
    id: 'work-bjp-bad-3',
    party_id: 'party-bjp',
    leader_id: null,
    title: 'COVID-19 Second Wave Medical Oxygen & Hospital Bed Crisis',
    description: 'Severe breakdown of medical supply chains during the Delta surge in April–May 2021, leading to acute oxygen shortages, black marketing of cylinders, and hospital bed shortages.',
    type: 'bad',
    severity: 'extreme',
    category: 'Public Health',
    date_year: 2021,
    impact: 'Hundreds of preventable patient deaths in hospitals due to oxygen depletion; unrecorded excess mortality across north Indian states.',
    source_url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)01052-7/fulltext',
    source_name: 'The Lancet Editorial & Delhi High Court Hearings',
  },
  {
    id: 'work-bjp-bad-4',
    party_id: 'party-bjp',
    leader_id: null,
    title: 'Bilkis Bano Gang-Rape & Murder Convicts Premature Remission',
    description: 'Premature release granted to 11 life convicts in the 2002 Bilkis Bano gang-rape and mass murder case by Gujarat state authorities; quashed by the Supreme Court in 2024 as illegal and an abuse of executive discretion.',
    type: 'bad',
    severity: 'extreme',
    category: 'Justice & Law',
    date_year: 2024,
    impact: 'Severe erosion of survivor trust in judicial protection; court mandated re-incarceration of all 11 convicts.',
    source_url: 'https://main.sci.gov.in/judgment/judgments.php',
    source_name: 'Supreme Court of India (Bilkis Yakub Rasool v. Union of India)',
  },

  // INC Positive
  {
    id: 'work-inc-good-1',
    party_id: 'party-inc',
    leader_id: null,
    title: 'Right to Information (RTI) Act 2005',
    description: 'Enacted historic transparency legislation empowering any citizen to inspect public records and question government decisions, transforming anti-corruption activism.',
    type: 'good',
    severity: null,
    category: 'Transparency & Governance',
    date_year: 2005,
    impact: 'Exposed major irregularities, democratized bureaucratic accountability, and empowered millions of ordinary citizens and journalists.',
    source_url: 'https://rti.gov.in/',
    source_name: 'Government of India RTI Portal',
  },
  {
    id: 'work-inc-good-2',
    party_id: 'party-inc',
    leader_id: null,
    title: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    description: 'Legally guaranteed 100 days of wage employment per financial year to every rural household whose adult members volunteer to do unskilled manual work.',
    type: 'good',
    severity: null,
    category: 'Social Welfare & Rural Economy',
    date_year: 2005,
    impact: 'Served as an indispensable rural safety net, increased rural wage floors, improved female workforce participation, and saved millions from distress during economic crises.',
    source_url: 'https://nrega.nic.in/',
    source_name: 'Ministry of Rural Development',
  },
  {
    id: 'work-inc-good-3',
    party_id: 'party-inc',
    leader_id: null,
    title: 'Right of Children to Free and Compulsory Education (RTE) Act',
    description: 'Made elementary education for children aged 6 to 14 a fundamental right under Article 21A, mandating 25% reservation for underprivileged children in private schools.',
    type: 'good',
    severity: null,
    category: 'Education & Human Rights',
    date_year: 2009,
    impact: 'Achieved near-universal primary school enrollment and institutionalized pupil-teacher ratio norms.',
    source_url: 'https://dsel.education.gov.in/rte',
    source_name: 'Department of School Education & Literacy',
  },
  // INC Bad
  {
    id: 'work-inc-bad-1',
    party_id: 'party-inc',
    leader_id: null,
    title: '2G Spectrum Allocation Irregularities',
    description: 'Flawed first-come-first-served policy in 2008 without transparent auctions resulting in 122 telecom licenses cancelled by the Supreme Court in 2012 due to arbitrary allocation.',
    type: 'bad',
    severity: 'extreme',
    category: 'Corruption & Telecom',
    date_year: 2012,
    impact: 'Stagnated the telecom sector, caused huge revenue loss estimates (CAG estimate ₹1.76 lakh crore), and destroyed citizen trust in UPA governance.',
    source_url: 'https://main.sci.gov.in/jonew/judis/39031.pdf',
    source_name: 'Supreme Court Judgment (Centre for Public Interest Litigation v. Union of India)',
  },
  {
    id: 'work-inc-bad-2',
    party_id: 'party-inc',
    leader_id: null,
    title: 'Coalgate: Irregular Coal Block Allocation Scam',
    description: 'CAG audit revealed arbitrary non-competitive allocation of over 200 captive coal blocks between 2004 and 2009 without open competitive bidding, quashed by the Supreme Court in 2014.',
    type: 'bad',
    severity: 'extreme',
    category: 'Corruption & Natural Resources',
    date_year: 2014,
    impact: 'Cancelled 214 coal block allocations, stalled power sector capital investment, and led to CBI prosecutions of senior officials and politicians.',
    source_url: 'https://cag.gov.in/',
    source_name: 'Comptroller and Auditor General of India (CAG) Report',
  },
  {
    id: 'work-inc-bad-3',
    party_id: 'party-inc',
    leader_id: null,
    title: 'The National Emergency (1975–1977)',
    description: 'Declaration of internal emergency by Indira Gandhi suspending fundamental rights, imposing strict press censorship, and detaining over 100,000 political opponents and civil rights activists without trial.',
    type: 'bad',
    severity: 'extreme',
    category: 'Democracy & Civil Liberties',
    date_year: 1975,
    impact: 'Subversion of constitutional democracy, forced sterilization drives, and jailing of opposition leaders, judges, and journalists.',
    source_url: 'https://archive.org/details/ShahCommissionOfInquiryReport',
    source_name: 'Shah Commission of Inquiry Report',
  },

  // AAP Positive
  {
    id: 'work-aap-good-1',
    party_id: 'party-aap',
    leader_id: 'leader-atishi',
    title: 'Delhi Government School Infrastructure & Academic Overhaul',
    description: 'Modernized public classrooms, established specialized Schools of Specialized Excellence (SOSE), provided international teacher training, resulting in government schools outperforming private schools in CBSE pass percentages.',
    type: 'good',
    severity: null,
    category: 'Education',
    date_year: 2018,
    impact: 'Afforded dignified, high-quality learning environments to over 1.6 million working-class children in Delhi.',
    source_url: 'https://edudel.nic.in/',
    source_name: 'Delhi Directorate of Education',
  },
  {
    id: 'work-aap-good-2',
    party_id: 'party-aap',
    leader_id: 'leader-kejriwal',
    title: 'Aam Aadmi Mohalla Clinics (Neighborhood Primary Healthcare)',
    description: 'Set up over 500 air-conditioned neighborhood clinics offering free primary consultations, 200+ diagnostic tests, and essential medicines within walking distance of communities.',
    type: 'good',
    severity: null,
    category: 'Healthcare',
    date_year: 2016,
    impact: 'Reduced out-of-pocket medical expenditure for slum dwellers and decongested secondary and tertiary government hospitals.',
    source_url: 'https://health.delhigovt.nic.in/',
    source_name: 'Delhi State Health Mission',
  },
  {
    id: 'work-aap-good-3',
    party_id: 'party-aap',
    leader_id: 'leader-kejriwal',
    title: 'Free Lifeline Water & Electricity Subsidies (Zero Bills)',
    description: 'Provided zero electricity bills for consumption up to 200 units/month and 20,000 liters of free metered tap water per household.',
    type: 'good',
    severity: null,
    category: 'Public Utilities',
    date_year: 2015,
    impact: 'Direct cash relief for over 4 million low- and middle-income families; incentivized household energy conservation.',
    source_url: 'https://delhi.gov.in/',
    source_name: 'Delhi Department of Power & DJB',
  },
  // AAP Bad
  {
    id: 'work-aap-bad-1',
    party_id: 'party-aap',
    leader_id: 'leader-kejriwal',
    title: 'Delhi Excise Liquor Policy 2021–22 Irregularities',
    description: 'Controversial restructuring of Delhi’s liquor retail market that handed entire trade to private players with alleged cartelization, 12% profit margins, and kickbacks investigated by CBI and ED.',
    type: 'bad',
    severity: 'extreme',
    category: 'Corruption & Governance',
    date_year: 2022,
    impact: 'Complete administrative paralysis in Delhi, arrests of Chief Minister Arvind Kejriwal, Deputy CM Manish Sisodia, and MP Sanjay Singh before supreme court bail.',
    source_url: 'https://cbi.gov.in/',
    source_name: 'Central Bureau of Investigation (CBI) & Enforcement Directorate',
  },
  {
    id: 'work-aap-bad-2',
    party_id: 'party-aap',
    leader_id: null,
    title: 'Delhi Jal Board Deficit & Financial Irregularities',
    description: 'CAG reports and municipal audits noted severe non-submission of balance sheets for over 6 years and alleged sewage line contract kickbacks in the Delhi Jal Board.',
    type: 'bad',
    severity: 'mild',
    category: 'Municipal Governance',
    date_year: 2023,
    impact: 'Delayed infrastructure upgrades, continuing water leakages, and acute seasonal water contamination in colonies.',
    source_url: 'https://cag.gov.in/',
    source_name: 'CAG Audit on Delhi Jal Board',
  },

  // TMC Positive
  {
    id: 'work-tmc-good-1',
    party_id: 'party-tmc',
    leader_id: 'leader-mamata',
    title: 'Kanyashree Prakalpa (Girls Education & Anti-Child Marriage Scheme)',
    description: 'Conditional cash transfer scheme incentivizing schooling of teen girls and penalizing underage marriage, recognized with the United Nations Public Service First Prize in 2017.',
    type: 'good',
    severity: null,
    category: 'Gender Empowerment & Education',
    date_year: 2013,
    impact: 'Benefited over 8 million girls across West Bengal, sharply curbing school dropouts and child marriage rates.',
    source_url: 'https://wbkanyashree.gov.in/',
    source_name: 'United Nations Public Service Awards & Govt of West Bengal',
  },
  {
    id: 'work-tmc-good-2',
    party_id: 'party-tmc',
    leader_id: 'leader-mamata',
    title: 'Lakshmir Bhandar Universal Basic Cash Support for Women',
    description: 'Monthly direct financial support of ₹1,000–₹1,200 to female heads of households across West Bengal, reaching over 20 million women.',
    type: 'good',
    severity: null,
    category: 'Direct Welfare',
    date_year: 2021,
    impact: 'Provided autonomous discretionary income directly to women, buffering rural households against post-pandemic inflation.',
    source_url: 'https://wb.gov.in/',
    source_name: 'Government of West Bengal Finance Dept',
  },
  // TMC Bad
  {
    id: 'work-tmc-bad-1',
    party_id: 'party-tmc',
    leader_id: null,
    title: 'West Bengal School Service Commission (WBSSC) Cash-for-Jobs Scam',
    description: 'Systemic recruitment fraud where thousands of unqualified candidates were given teacher and staff appointments in exchange for massive bribes, while deserving candidates protested for years.',
    type: 'bad',
    severity: 'extreme',
    category: 'Corruption & Education',
    date_year: 2022,
    impact: 'Calcutta High Court cancelled over 25,000 school appointments; recovery of over ₹50 crore in cash from education minister Partha Chatterjee’s aide.',
    source_url: 'https://calcuttahighcourt.gov.in/',
    source_name: 'Calcutta High Court Division Bench Judgment',
  },
  {
    id: 'work-tmc-bad-2',
    party_id: 'party-tmc',
    leader_id: null,
    title: 'Saradha & Rose Valley Multi-Thousand Crore Chit Fund Scams',
    description: 'Illegal collective investment schemes that siphoned billions from poor rural depositors in Bengal, with top political leaders accused of patronage and advertising partnerships.',
    type: 'bad',
    severity: 'extreme',
    category: 'Financial Crime',
    date_year: 2013,
    impact: 'Estimated ₹10,000+ crore wiped out from 1.7 million poor rural families; led to dozens of investor suicides across Bengal and Odisha.',
    source_url: 'https://cbi.gov.in/',
    source_name: 'CBI & Shyamal Sen Commission Reports',
  },
  {
    id: 'work-tmc-bad-rg-kar',
    party_id: 'party-tmc',
    leader_id: 'leader-mamata',
    title: 'RG Kar Hospital Trainee Doctor Crime & Systemic Administrative Lapses',
    description: 'Brutal rape and murder of an on-duty postgraduate doctor inside state-run RG Kar Medical College in August 2024; administrative attempts to classify as suicide and institutional delays triggered historic statewide doctors’ agitation.',
    type: 'bad',
    severity: 'extreme',
    category: 'Public Health & Law Enforcement',
    date_year: 2024,
    impact: 'Supreme Court suo motu intervention transferring investigation to CBI; nationwide healthcare strikes; removal of Kolkata Police Commissioner and health department officials.',
    source_url: 'https://www.sci.gov.in/',
    source_name: 'Supreme Court of India (In Re: Alleged Rape and Murder Incident in RG Kar Medical College)',
  },
  // Additional Updated BJP Records (2023–2026)
  {
    id: 'work-bjp-good-nari-shakti',
    party_id: 'party-bjp',
    leader_id: 'leader-modi',
    title: 'Nari Shakti Vandan Adhiniyam (106th Constitutional Amendment Act)',
    description: 'Enacted historic legislation reserving 33% of seats for women in the Lok Sabha and State Legislative Assemblies, ending a three-decade parliamentary deadlock.',
    type: 'good',
    severity: null,
    category: 'Gender Rights & Parliamentary Reform',
    date_year: 2023,
    impact: 'Mandates guaranteed political representation for women across national and state lawmaking bodies, scheduled for rollout following the national census and delimitation exercise.',
    source_url: 'https://egazette.gov.in/',
    source_name: 'Gazette of India (The Constitution 106th Amendment Act, 2023)',
  },
  {
    id: 'work-bjp-good-ups',
    party_id: 'party-bjp',
    leader_id: 'leader-modi',
    title: 'Unified Pension Scheme (UPS) Rollout',
    description: 'Approved comprehensive pension framework offering central government employees with 25+ years of service an assured pension of 50% of average basic pay drawn in the last 12 months, plus family pension protection.',
    type: 'good',
    severity: null,
    category: 'Social Security & Public Administration',
    date_year: 2024,
    impact: 'Resolved decade-long political conflict between the Old Pension Scheme (OPS) and market-linked NPS for over 2.3 million central government employees and state equivalents.',
    source_url: 'https://pib.gov.in/',
    source_name: 'Union Cabinet Notification & Ministry of Finance Resolution',
  },
  {
    id: 'work-bjp-bad-neet-2024',
    party_id: 'party-bjp',
    leader_id: 'leader-pradhan',
    title: 'NEET-UG 2024 Examination Irregularities & NTA Oversight Crisis',
    description: 'Compromise of the national pre-medical entrance examination taken by 2.4 million candidates, involving Patna question paper leaks, grace marks controversies, and systemic failure of the National Testing Agency (NTA).',
    type: 'bad',
    severity: 'extreme',
    category: 'Education & Examination Integrity',
    date_year: 2024,
    impact: 'Triggered nationwide student agitations, CBI criminal prosecution across Bihar and Gujarat, and Supreme Court directives mandating complete restructuring of the NTA under a high-level committee.',
    source_url: 'https://www.sci.gov.in/',
    source_name: 'Supreme Court of India (Vanshika Shukla v. National Testing Agency)',
  },
  {
    id: 'work-bjp-bad-rail-safety',
    party_id: 'party-bjp',
    leader_id: 'leader-vaishnaw',
    title: 'Balasore & Kanchanjunga Rail Disasters & Kavach Rollout Delays',
    description: 'Fatal multi-train collisions—Balasore in June 2023 (296 casualties) and Kanchanjunga Express in June 2024—highlighting critical delays in deploying the indigenous Kavach Automatic Train Protection system across main trunk routes.',
    type: 'bad',
    severity: 'extreme',
    category: 'Public Safety & Transportation',
    date_year: 2023,
    impact: 'Commission of Railway Safety (CRS) inquiries confirmed signaling relay wiring lapses and track maintenance staff overload, prompting emergency capital reallocation to rail signaling automation.',
    source_url: 'https://indianrailways.gov.in/',
    source_name: 'Commission of Railway Safety (CRS) Statutory Inquiries & CAG Railway Safety Report',
  },
  // Additional Updated Congress Records
  {
    id: 'work-inc-good-guarantees',
    party_id: 'party-inc',
    leader_id: 'leader-kharge',
    title: 'State Social Security Architecture (Karnataka & Telangana Five Guarantees)',
    description: 'Implemented rights-based universal direct benefit transfers in Congress-ruled states: Gruha Lakshmi (₹2,000/mo to 12M women), Shakti (free public bus rides for women - 3B+ rides recorded), and Mahalakshmi gas subsidy.',
    type: 'good',
    severity: null,
    category: 'Social Security & Gender Welfare',
    date_year: 2023,
    impact: 'Substantially enhanced rural women’s household purchasing power and daily workforce mobility; debated nationally regarding state fiscal space and capital expenditure trade-offs.',
    source_url: 'https://karnataka.gov.in/',
    source_name: 'Government of Karnataka Planning Department Outcome Reports',
  },
];

export const SEED_YOJNAS: Yojna[] = [
  // BJP Yojnas
  {
    id: 'yojna-pmkisan',
    party_id: 'party-bjp',
    title: 'PM Kisan Samman Nidhi',
    description: 'Direct income support of ₹6,000 per year transferred in three equal installments to eligible landholding farmer families.',
    claimed_target: 'Provide predictable income support to all 140 million agricultural households in India to manage farm inputs.',
    actual_implementation: 'Disbursed over ₹3 lakh crore directly into bank accounts of ~110 million registered farmers via Aadhaar DBT; widely recognized as an efficient delivery model, though tenant farmers and landless laborers remain excluded.',
    implementation_status: 'implemented',
    launched_year: 2019,
    budget_announced: '₹60,000 crore/year',
    category: 'Agriculture & Direct Welfare',
    source_url: 'https://pmkisan.gov.in/',
    source_name: 'PM-KISAN Official Portal',
  },
  {
    id: 'yojna-pmjay',
    party_id: 'party-bjp',
    title: 'Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    description: 'Flagship health insurance scheme offering ₹5 lakh cashless secondary and tertiary hospitalization cover per family per year.',
    claimed_target: 'Cover bottom 40% vulnerable population (~500 million citizens, expanded to senior citizens 70+ in 2024).',
    actual_implementation: 'Issued over 300 million Ayushman cards and authorized over 65 million hospital admissions. Highly beneficial in public hospitals, but major private tertiary hospitals in metros frequently decline empanelment or deny treatments citing low package rates.',
    implementation_status: 'partial',
    launched_year: 2018,
    budget_announced: '₹7,500 crore/year',
    category: 'Healthcare',
    source_url: 'https://pmjay.gov.in/',
    source_name: 'National Health Authority (NHA)',
  },
  {
    id: 'yojna-smartcities',
    party_id: 'party-bjp',
    title: 'Smart Cities Mission',
    description: 'Urban renewal and retrofitting program to develop 100 cities with smart infrastructure, integrated command centers, and sustainable transport.',
    claimed_target: 'Transform 100 Indian urban centers into citizen-friendly and sustainable smart hubs by 2020.',
    actual_implementation: 'Integrated Command and Control Centers (ICCCs) and smart lights installed, but core urban flood prevention, sustainable public transit, and slum redevelopment remain largely unfulfilled; multiple deadline extensions up to 2025.',
    implementation_status: 'partial',
    launched_year: 2015,
    budget_announced: '₹2,05,018 crore total outlay',
    category: 'Urban Development',
    source_url: 'https://smartcities.gov.in/',
    source_name: 'Ministry of Housing and Urban Affairs',
  },
  {
    id: 'yojna-namamigange',
    party_id: 'party-bjp',
    title: 'Namami Gange Mission',
    description: 'Integrated conservation mission to accomplish effective abatement of pollution, conservation, and rejuvenation of National River Ganga.',
    claimed_target: 'Make river Ganga completely clean, swimmable, and stop untreated municipal sewage discharge by 2020.',
    actual_implementation: 'Sewage treatment plant (STP) capacity expanded significantly in Varanasi and Kanpur, but CPCB monitoring shows coliform bacteria and biochemical oxygen demand (BOD) levels remain dangerously above bathing standards in key Bihar and Bengal stretches.',
    implementation_status: 'partial',
    launched_year: 2014,
    budget_announced: '₹20,000 crore initial budget',
    category: 'Environment & Water',
    source_url: 'https://nmcg.nic.in/',
    source_name: 'National Mission for Clean Ganga & CPCB',
  },
  {
    id: 'yojna-skillindia',
    party_id: 'party-bjp',
    title: 'Skill India Mission (PMKVY)',
    description: 'Skill certification program to enable youth to take up industry-relevant skill training for better livelihoods.',
    claimed_target: 'Train and certify 400 million youth across India in vocational skills by 2022.',
    actual_implementation: 'CAG and parliamentary standing committee reports revealed under 20% certified candidates secured certified wage employment; marred by fake enrollment centers and poor industry placement linkage.',
    implementation_status: 'failed',
    launched_year: 2015,
    budget_announced: '₹12,000 crore',
    category: 'Employment & Youth',
    source_url: 'https://cag.gov.in/',
    source_name: 'Parliamentary Standing Committee on Labour & CAG Audit',
  },

  // INC Yojnas
  {
    id: 'yojna-nrega-inc',
    party_id: 'party-inc',
    title: 'National Rural Employment Guarantee (MGNREGA)',
    description: 'Rights-based demand-driven rural wage employment guarantee program.',
    claimed_target: 'Eradicate extreme rural poverty by providing guaranteed 100 days of manual work to all willing rural adult citizens.',
    actual_implementation: 'Transformed rural labor markets and sustained agrarian families through droughts and COVID lockdowns, although average workdays generated peaked at ~50 days/year rather than the 100-day statutory ceiling, and wage disbursement delays persisted.',
    implementation_status: 'implemented',
    launched_year: 2006,
    budget_announced: '₹40,000+ crore/year',
    category: 'Rural Welfare',
    source_url: 'https://nrega.nic.in/',
    source_name: 'Ministry of Rural Development',
  },
  {
    id: 'yojna-nfsa-inc',
    party_id: 'party-inc',
    title: 'National Food Security Scheme (NFSA)',
    description: 'Statutory legal right providing subsidized food grains to approximately 67% of India’s population.',
    claimed_target: 'Eliminate hunger and malnutrition by ensuring subsidized rice at ₹3/kg, wheat at ₹2/kg to 813 million citizens.',
    actual_implementation: 'Successfully established the bedrock public distribution architecture that formed the backbone of pandemic food distribution (PMGKAY); leakages reduced with biometric digitization, though nutritional diversity (pulses/oils) remained unaddressed.',
    implementation_status: 'implemented',
    launched_year: 2013,
    budget_announced: '₹1.2 lakh crore/year',
    category: 'Food Security',
    source_url: 'https://dfpd.gov.in/',
    source_name: 'Department of Food and Public Distribution',
  },

  // AAP Yojnas
  {
    id: 'yojna-mohalla-aap',
    party_id: 'party-aap',
    title: 'Aam Aadmi Mohalla Clinic Network',
    description: 'Decentralized primary health centers located in dense residential colonies and slums.',
    claimed_target: 'Build 1,000 modern clinics to handle 80% of routine outpatient ailments free of cost.',
    actual_implementation: 'Approximately 530 clinics operationalized, serving millions with free medicines and lab tests. However, project fell short of the 1,000 clinic goal, faced land disputes with DDA, and was subjected to probes regarding private diagnostic outsourcing.',
    implementation_status: 'partial',
    launched_year: 2015,
    budget_announced: '₹400 crore/year',
    category: 'Healthcare',
    source_url: 'https://health.delhigovt.nic.in/',
    source_name: 'Delhi State Health Mission',
  },

  // TMC Yojnas
  {
    id: 'yojna-duaresarkar-tmc',
    party_id: 'party-tmc',
    title: 'Duare Sarkar (Government at Your Doorstep)',
    description: 'Outreach camps set up in every gram panchayat and municipal ward to deliver 30+ public welfare schemes on the spot.',
    claimed_target: 'Bring complete government administration to the doorsteps of all 100 million citizens of West Bengal.',
    actual_implementation: 'Held over 300,000 camps registering 50+ million service requests; drastically reduced bribery and touts for basic caste certificates, rations, and cash assistance.',
    implementation_status: 'implemented',
    launched_year: 2020,
    budget_announced: '₹1,500 crore/year',
    category: 'Public Service Delivery',
    source_url: 'https://wb.gov.in/',
    source_name: 'Government of West Bengal',
  },
];

export const SEED_PROMISES: Promise_[] = [
  // BJP Promises
  {
    id: 'promise-bjp-1',
    party_id: 'party-bjp',
    title: 'Creation of 2 Crore Jobs Every Year',
    description: 'Promised during the 2014 Lok Sabha campaign as part of the youth economic revival manifesto.',
    election_year: 2014,
    election_context: '2014 Lok Sabha General Election Manifesto & Rallies',
    status: 'broken',
    reality_check: 'Government data from the Periodic Labour Force Survey (PLFS) showed formal job creation remained far below 20 million annually, with youth unemployment rates hovering at multi-decade highs.',
    source_url: 'https://mospi.gov.in/',
    source_name: 'Ministry of Statistics and Programme Implementation (PLFS)',
  },
  {
    id: 'promise-bjp-2',
    party_id: 'party-bjp',
    title: 'Abrogation of Article 370 in Jammu & Kashmir',
    description: 'Core ideological pledge since Jan Sangh days to end Jammu and Kashmir’s special constitutional autonomy.',
    election_year: 2019,
    election_context: '2019 Lok Sabha Election Manifesto (Sankalp Patra)',
    status: 'fulfilled',
    reality_check: 'Passed by Parliament in August 2019, revoking special status under Article 370, reorganizing the state into the Union Territories of J&K and Ladakh, and upheld by the Supreme Court in December 2023.',
    source_url: 'https://main.sci.gov.in/supremecourt/2019/28811/28811_2019_1_1501_49141_Judgement_11-Dec-2023.pdf',
    source_name: 'Supreme Court Constitution Bench Judgment on Article 370',
  },
  {
    id: 'promise-bjp-3',
    party_id: 'party-bjp',
    title: 'Construction of the Grand Ram Mandir at Ayodhya',
    description: 'Manifesto commitment to pave the way for the construction of a Ram temple in Ayodhya.',
    election_year: 2019,
    election_context: '2019 Lok Sabha Election Manifesto',
    status: 'fulfilled',
    reality_check: 'Following the unanimous Supreme Court verdict in 2019, temple construction was overseen by the Shri Ram Janmabhoomi Teerth Kshetra trust, culminating in the Pran Pratishtha ceremony in January 2024.',
    source_url: 'https://srjbtkshetra.org/',
    source_name: 'Shri Ram Janmabhoomi Teerth Kshetra',
  },
  {
    id: 'promise-bjp-4',
    party_id: 'party-bjp',
    title: 'Doubling Farmers’ Income by 2022',
    description: 'Announced in 2016 by Prime Minister Modi as a measurable goal for agricultural reform and farmer welfare.',
    election_year: 2019,
    election_context: '2019 Lok Sabha Manifesto & Ashok Dalwai Committee Goal',
    status: 'broken',
    reality_check: 'The National Sample Survey (NSS 77th Round) showed average monthly farmer household income rose marginally to ~₹10,218, far short of doubling in real inflation-adjusted terms; input costs for diesel, fertilizers, and equipment rose steeply.',
    source_url: 'https://mospi.gov.in/',
    source_name: 'NSSO Situation Assessment of Agricultural Households',
  },
  {
    id: 'promise-bjp-5',
    party_id: 'party-bjp',
    title: 'Retrieval of Foreign Black Money & ₹15 Lakh Distribution',
    description: '2014 campaign rhetoric promising to repatriate illegal offshore wealth stored in tax havens.',
    election_year: 2014,
    election_context: '2014 General Election Campaign Rallies',
    status: 'abandoned',
    reality_check: 'Publicly termed an illustrative political rhetorical flourish (“Chunavi Jumla”) by BJP President Amit Shah in February 2015; no direct ₹15 lakh deposits materialized.',
    source_url: 'https://indianexpress.com/article/india/politics/amit-shah-clarifies-15-lakh-black-money-remark-was-a-jumla/',
    source_name: 'National Media Interviews (ABP News / Indian Express)',
  },

  // INC Promises
  {
    id: 'promise-inc-1',
    party_id: 'party-inc',
    title: 'NYAY: Nyuntam Aay Yojana (₹72,000/year to Poorest Families)',
    description: 'Flagship 2019 manifesto promise guaranteeing minimum income cash transfer of ₹6,000/month to bottom 20% poorest households.',
    election_year: 2019,
    election_context: '2019 Lok Sabha Manifesto (Hum Nibhayenge)',
    status: 'abandoned',
    reality_check: 'Congress was defeated in the 2019 general election; scheme was not enacted nationally, though elements were adopted in state schemes (e.g. Gruha Lakshmi in Karnataka).',
    source_url: 'https://inc.in/',
    source_name: 'INC 2019 Lok Sabha Manifesto',
  },
  {
    id: 'promise-inc-2',
    party_id: 'party-inc',
    title: 'Enactment of Right to Fair Compensation in Land Acquisition Act',
    description: 'Pledged to replace the colonial 1894 Land Acquisition Act with humane rehabilitation and 4x market value compensation.',
    election_year: 2009,
    election_context: '2009 UPA-II Common Minimum Programme',
    status: 'fulfilled',
    reality_check: 'Enacted the landmark Land Acquisition, Rehabilitation and Resettlement (LARR) Act in 2013 mandating consent of 70–80% landowners and social impact assessments.',
    source_url: 'https://legislative.gov.in/',
    source_name: 'LARR Act 2013 Gazette Notification',
  },

  // AAP Promises
  {
    id: 'promise-aap-1',
    party_id: 'party-aap',
    title: 'Independent Jan Lokpal Bill with Strong Prosecutorial Powers',
    description: 'Core foundational promise of the India Against Corruption movement to create an autonomous anti-corruption ombudsman covering all government tiers.',
    election_year: 2015,
    election_context: '2015 Delhi Assembly Manifesto (70-Point Action Plan)',
    status: 'partially_fulfilled',
    reality_check: 'Passed the Delhi Janlokpal Bill in the Delhi Assembly in 2015, but it remained stalled without Presidential/MHA assent amid jurisdictional turf battles between the UT government and Central Government.',
    source_url: 'https://delhiassembly.nic.in/',
    source_name: 'Delhi Legislative Assembly Proceedings',
  },
  {
    id: 'promise-aap-2',
    party_id: 'party-aap',
    title: 'Complete Cleaning of the Yamuna River by 2025',
    description: 'Public commitment by CM Arvind Kejriwal to bathe in a clean, de-polluted Yamuna River by 2025.',
    election_year: 2020,
    election_context: '2020 Delhi Assembly Manifesto & Press Conferences',
    status: 'broken',
    reality_check: 'CPCB and DPCC tests continue to record toxic chemical foam and untreated industrial effluents flowing unchecked through the Najafgarh and Shahdara drains, with BOD levels up to 30 times safe limits.',
    source_url: 'https://cpcb.nic.in/',
    source_name: 'Central Pollution Control Board (CPCB) Yamuna Monitoring Reports',
  },
];

export const SEED_INCIDENTS: Incident[] = [
  // ==========================================
  // LATEST MAJOR PROTESTS & AGITATIONS (UP TO 18 OCT 2026)
  // ==========================================

  // --- Protest 1: CJP Anti-CEC & Electoral Roll Deletion Street Agitation (2026) ---
  {
    id: 'inc-protest-cjp-cec',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'CJP Anti-CEC & Electoral Roll Deletion Mass Street Protests (2026)',
    description:
      'In late September and October 2026, the Cockroach Janta Party (CJP)—a prominent youth-led, Gen Z satirical activist movement—spearheaded nationwide street demonstrations against the Election Commission of India’s (ECI) Special Intensive Revision (SIR) of voter lists. CJP alongside student wings (AISA, SFI, AISF) mobilized thousands alleging millions of legitimate voters were summarily expunged without due notice to advantage ruling benches. Protesters demanded the resignation of Chief Election Commissioner Gyanesh Kumar, triggering heavy police cordons, Section 163 BNSS bans, and multiple central Delhi metro closures.',
    date_year: 2026,
    location: 'Jantar Mantar, Connaught Place, New Delhi & August Kranti Maidan, Mumbai',
    severity: 'extreme',
    demands:
      'Immediate resignation of Chief Election Commissioner Gyanesh Kumar; independent judicial audit by a Supreme Court-monitored committee into voter deletions under the Special Intensive Revision (SIR); unconditional restoration of expunged citizen names; cessation of police harassment against peaceful youth activists; constitutional safeguards establishing transparent multi-party oversight over electoral roll revisions.',
    state_response:
      'Delhi Police and central paramilitary contingents sealed off central Delhi, locking down multiple metro stations and imposing Section 163 BNSS prohibitions. Prominent CJP figures (including Abhijeet Dipke, Saurav Das, and Ashutosh Ranka) were detained under the Bharatiya Nagarik Suraksha Sanhita (BNSS) and Delhi Police Act. Human rights watchdogs criticized the heavy-handed detentions, while local courts granted bail to key organizers in mid-October 2026.',
    citizen_impact:
      'Massive traffic gridlocks and metro station closures affected hundreds of thousands of commuters across central Delhi. The agitation galvanized Gen Z civic participation, shifting national focus toward institutional integrity and constitutional checks in electoral administration.',
    deaths_reported: 0,
    source_url: 'https://www.thehindu.com/news/national/',
    source_name: 'Amnesty International, The Hindu & Delhi Police Special Branch Reports',
  },

  // --- Protest 2: Pan-India Student Front & Youth Anti-Paper Leak Strikes (2026) ---
  {
    id: 'inc-protest-cjp-neet-2026',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'Pan-India Student Front Anti-Paper Leak Strikes & Education Ministry Resignation (2026)',
    description:
      'In June–July 2026, building upon persistent examination irregularities and paper leak grievances, national student organizations alongside youth coalitions organized intense relays of hunger strikes at Jantar Mantar and a mass "Sansad Chalo" march. Facing intense street-level pressure and mounting public scrutiny over public testing monopolies, Union Education Minister Dharmendra Pradhan tendered his resignation on July 25, 2026 taking moral responsibility, following which Union Minister Pralhad Joshi was given charge of the portfolio.',
    date_year: 2026,
    location: 'Jantar Mantar & Parliament Annexe, New Delhi',
    severity: 'extreme',
    demands:
      'Accountability for examination leak syndicates; dissolution and structural replacement of the National Testing Agency (NTA); fast-track criminal tribunals for paper-leak mafia; national institutional support and compensation for distressed aspirants.',
    state_response:
      'Authorities deployed barricades and water cannons to halt the Sansad Chalo march. However, mounting youth pressure and parliamentary deadlocks culminated in the resignation of Education Minister Dharmendra Pradhan on July 25, 2026, and an administrative overhaul of testing protocols under interim ministerial leadership.',
    citizen_impact:
      'Milestone in modern Indian student mobilization, demonstrating youth civic influence over cabinet accountability and structural education reforms.',
    deaths_reported: 0,
    source_url: 'https://sansad.in/',
    source_name: 'Parliamentary Records, PIB Official Releases & National Media Investigations',
  },

  // --- Protest 3: Delhi University Sexual Assault & Women’s Safety Protests (2026) ---
  {
    id: 'inc-protest-du-rape-2026',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'Delhi University Student Mass Agitation & Women’s Safety Protests (2026)',
    description:
      'In early 2026, massive student-led agitations and night vigils erupted across Delhi University following the brutal sexual assault of a female student near the North Campus. Thousands of students and faculty members staged continuous sit-ins outside the Arts Faculty and marched to Delhi Police Headquarters demanding round-the-clock campus security, comprehensive transit audits, and immediate judicial prosecution.',
    date_year: 2026,
    location: 'Arts Faculty, North Campus, DU & Delhi Police HQ, New Delhi',
    severity: 'extreme',
    demands:
      'Fast-track special court trial for the accused; mandatory 24/7 dedicated PCR patrols across North and South Campuses; installation of high-intensity street lighting in all student residential lanes; deployment of specialized female police units (Tejaswini); student-elected representation on Internal Complaints Committees (ICC).',
    state_response:
      'Delhi Police arrested the accused within 48 hours following forensic and CCTV evidence. The Delhi administration and Ministry of Home Affairs sanctioned the immediate installation of 500+ high-definition facial recognition CCTV cameras, deployment of 15 round-the-clock mobile PCR vans, and mandatory security audits for student accommodations and transit routes.',
    citizen_impact:
      'Re-ignited the national debate on women’s safety in educational hubs, drawing thousands of citizens to joint night vigils across Delhi, Kolkata, and Mumbai.',
    deaths_reported: 0,
    source_url: 'https://delhipolice.gov.in/',
    source_name: 'Delhi Police Statements & National Press Coverage',
  },

  // --- Protest 4: LPU Campus Safety & Mental Health Protests (Punjab, 2025) ---
  {
    id: 'inc-protest-lpu-punjab',
    party_id: 'party-aap',
    category: 'protest',
    title: 'Lovely Professional University (LPU) Student Campus Safety & Mental Health Protests',
    description:
      'Massive protests and night-long vigils broke out at Lovely Professional University (LPU) in Phagwara, Kapurthala district, Punjab, involving thousands of resident students following suspicious student deaths and severe allegations of mental harassment, draconian hostel curfews, and institutional apathy by private university authorities. Students gathered in large numbers outside hostel blocks, clashing with private security guards who attempted to confiscate mobile phones and prevent students from documenting the scene.',
    date_year: 2025,
    location: 'LPU Campus, Phagwara, Kapurthala District, Punjab',
    severity: 'extreme',
    demands:
      'Independent judicial inquiry into student fatalities and hostel administration; termination of staff accused of mental harassment; complete restructuring of campus mental health and counseling services; removal of punitive hostel curfew rules; transparent internal grievance redressal mechanism.',
    state_response:
      'The Punjab State Government under Chief Minister Bhagwant Mann directed the Kapurthala district administration to initiate a sub-divisional magisterial probe. Massive Punjab Police contingents were deployed on the national highway and campus perimeter to de-escalate tensions. The state higher education department issued compliance notices mandating 24/7 student counseling cells and transparent internal grievance committees.',
    citizen_impact:
      '2 student deaths reported. Triggered nationwide scrutiny regarding commercial private university hostel regimes, student mental health crises, and the rights of out-of-state students across North India.',
    deaths_reported: 2,
    source_url: 'https://punjab.gov.in/',
    source_name: 'Kapurthala District Administration Orders & The Tribune',
  },

  // --- Protest 5: Farmers' Protests 2.0 (Dilli Chalo & MSP Guarantee 2024–2026) ---
  {
    id: 'inc-protest-farmers-2',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'Farmers’ Dilli Chalo Agitation & Statutory MSP Guarantee Movement (2024–2026)',
    description:
      'From February 2024 through 2026, tens of thousands of farmers under the banner of Samyukt Kisan Morcha (Non-Political) and Kisan Mazdoor Morcha led by Jagjit Singh Dallewal and Sarwan Singh Pandher launched the "Dilli Chalo" march demanding a statutory legal guarantee for Minimum Support Prices (MSP) calculated via the Swaminathan Commission’s C2+50% formula. Heavy barricading and state police deterrence at the Haryana border resulted in prolonged multi-year encampments at Shambhu and Khanauri border points, accompanied by nationwide rail-roko protests and hunger strikes.',
    date_year: 2024,
    location: 'Shambhu & Khanauri Borders (Punjab–Haryana) / New Delhi',
    severity: 'extreme',
    demands:
      'Statutory legal guarantee for MSP on all crops using C2+50% formula; complete waiver of agricultural debts; pension of ₹10,000/month for farmers and agricultural laborers aged 60+; implementation of the Land Acquisition Act 2013 with farmer consent; withdrawal of all police cases registered during the 2020–21 agitation; justice and compensation for the victims of the Lakhimpur Kheri incident.',
    state_response:
      'Haryana and Central authorities converted state borders into fortified buffer zones with multi-layer concrete blocks, iron nails welded to highways, and concertina wire. Drones were deployed to drop tear-gas canisters across the border onto farmers in Punjab territory. Mobile internet and bulk SMS were suspended in multiple districts. On February 21, 2024, 21-year-old farmer Shubhkaran Singh was killed at Khanauri border from suspected firearm/pellet head injury, prompting the Punjab & Haryana High Court to constitute a judicial probe headed by a retired High Court judge.',
    citizen_impact:
      '5 protester casualties recorded. Prolonged multi-month blockades disrupted northern inter-state trade, national highways, and logistics corridors; heightened national debates on the economic viability of farm guarantees versus severe agrarian distress.',
    deaths_reported: 5,
    source_url: 'https://www.thehindu.com/news/national/',
    source_name: 'Punjab & Haryana High Court Orders & The Hindu',
  },

  // --- Protest 2: Junior Doctors' "Abhaya" Strike (RG Kar Hospital) ---
  {
    id: 'inc-protest-doctors-rg-kar',
    party_id: 'party-tmc',
    category: 'protest',
    title: 'Pan-India Resident Doctors’ Cease-Work & "Reclaim the Night" Protests (RG Kar Movement)',
    description:
      'Following the brutal rape and murder of an on-duty 31-year-old postgraduate trainee doctor at RG Kar Medical College in Kolkata, junior doctors across West Bengal launched an unprecedented cease-work, fast-unto-death relay, and public campaign demanding workplace safety and institutional justice. The protest evolved into a historic mass civil movement characterized by midnight "Reclaim the Night" rallies across global cities.',
    date_year: 2024,
    location: 'Kolkata, West Bengal & Pan-India Medical Colleges',
    severity: 'extreme',
    demands:
      'Immediate trial and maximum penalty for all perpetrators and conspirators; dismantling of the corrupt syndicate in state medical administration; removal of Kolkata Police Commissioner Vineet Goyal for botching crime scene preservation; institutional safety protocols including 24/7 security guards, functional CCTV networks, panic buttons, and gender-segregated on-call doctor rooms; end to the pervasive intimidation culture in state medical councils.',
    state_response:
      'Initial institutional efforts by state health authorities attempted to label the death as suicide and rapidly renovate spaces next to the crime scene. On August 14, 2024, a midnight mob stormed and ransacked the hospital emergency department while Kolkata police stood by. Following weeks of stalemate, Chief Minister Mamata Banerjee held direct live-broadcast negotiations with protesting doctors, conceding the removal of the Kolkata Police Commissioner and director of medical education. The Supreme Court took suo motu cognizance and set up a National Task Force (NTF) for healthcare workers.',
    citizen_impact:
      '1 casualty (the murder of the on-duty doctor). Electrified civil society on women’s safety in public institutions. While non-emergency outpatient services in Bengal were suspended for over 50 days, protesting doctors operated free citizen "Abhaya Clinics" in public parks providing medical relief to over 50,000 citizens.',
    deaths_reported: 1,
    source_url: 'https://main.sci.gov.in/',
    source_name: 'Supreme Court of India (Suo Motu WP (Crl.) No. 2/2024) & Calcutta High Court',
  },

  // --- Protest 3: NEET-UG & UGC-NET Paper Leak National Student Protests ---
  {
    id: 'inc-protest-neet-leak',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'NEET-UG & UGC-NET Paper Leak National Student Protests',
    description:
      'Following the announcement of NEET-UG 2024 medical entrance results, unprecedented anomalies emerged—including 67 students securing the top rank (720/720), arbitrary grace marks awarded to over 1,500 candidates, and reports of solved question paper leaks. Massive student demonstrations broke out nationwide, demanding the scrapping of the exam and an overhaul of the National Testing Agency (NTA). The crisis intensified when the Ministry of Education cancelled the UGC-NET exam 24 hours after conducting it due to compromised integrity.',
    date_year: 2024,
    location: 'Jantar Mantar (New Delhi), Patna, Kota & Pan-India',
    severity: 'extreme',
    demands:
      'Complete cancellation and re-examination of NEET-UG 2024; comprehensive independent CBI inquiry into the NTA and paper-leak solver gangs; abolition of centralized computer testing monopolies; strict criminal sentencing for examination mafia; resignation of Union Education Minister Dharmendra Pradhan.',
    state_response:
      'The Union Government initially dismissed claims of widespread leakage as isolated. However, investigations by the Bihar Police Economic Offences Unit (EOU) confirmed burnt copies of the question paper in Patna, leading to multiple arrests of organized solver gangs. The Union Government removed NTA Director General Subodh Kumar Singh, notified the Public Examinations (Prevention of Unfair Means) Act 2024 with penalties up to 10 years in jail, and appointed an expert panel headed by former ISRO chief K. Radhakrishnan to reform testing architecture.',
    citizen_impact:
      'Impacted over 2.4 million medical aspirants and their families, causing profound mental distress and multi-month delays in national medical admissions.',
    deaths_reported: 0,
    source_url: 'https://main.sci.gov.in/',
    source_name: 'Supreme Court of India (Vanshika Shukla v. NTA) & Bihar EOU / CBI Findings',
  },

  // --- Protest 4: Ladakh Climate Fast & Sixth Schedule Statehood Protests ---
  {
    id: 'inc-protest-ladakh-wangchuk',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'Ladakh Statehood & Sixth Schedule Climate Protests (Sonam Wangchuk’s March)',
    description:
      'Led by education reformer and Magsaysay awardee Sonam Wangchuk along with the Leh Apex Body and Kargil Democratic Alliance, thousands of Ladakhi citizens engaged in prolonged hunger strikes, climate fasts, and a 1,000-km march to New Delhi. The agitations protest against direct bureaucratic rule by the UT administration and demand constitutional safeguards for Ladakh’s fragile Himalayan ecosystem.',
    date_year: 2024,
    location: 'Leh (Ladakh) to Singhu Border / Rajghat, New Delhi',
    severity: 'mild',
    demands:
      'Constitutional inclusion of Ladakh in the Sixth Schedule of the Constitution to protect tribal land ownership and culture (97% tribal population); restoration of full statehood with a legislative assembly; separate Lok Sabha seats for Leh and Kargil; creation of an independent Ladakh Public Service Commission to guarantee government employment for local youth; moratorium on unchecked industrial mining on glacial pastures.',
    state_response:
      'High-level committee talks held by the Union Ministry of Home Affairs stalled without granting constitutional Sixth Schedule protections. When Sonam Wangchuk and 150 Ladakhi volunteers undertook the 30-day "Delhi Chalo Padyatra" walking 1,000 km to Delhi in September–October 2024, Delhi Police invoked Section 163 BNSS prohibitions across state borders and detained Wangchuk and all 150 marchers at the Singhu border for over 36 hours before permitting a restricted visit to Rajghat.',
    citizen_impact:
      'Wangchuk completed a 21-day climate fast on water and salt in sub-zero -15°C temperatures; galvanized national public consciousness around the environmental fragility of Himalayan glaciers and the lack of representative democracy under UT status.',
    deaths_reported: 0,
    source_url: 'https://www.thehindu.com/news/national/',
    source_name: 'Delhi High Court Habeas Corpus Petitions & The Hindu / BBC',
  },

  // --- Protest 5: Olympic Wrestlers' Protest at Jantar Mantar ---
  {
    id: 'inc-protest-wrestlers',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'Olympic Wrestlers’ Sit-in Protest against Brij Bhushan Sharan Singh',
    description:
      'India’s top decorated international wrestlers—including Olympic medalists Sakshi Malik, Bajrang Punia, and World Championship medalist Vinesh Phogat—camped on the pavements of Jantar Mantar for 38 days in protest against Wrestling Federation of India (WFI) President and sitting BJP MP Brij Bhushan Sharan Singh, accusing him of systemic sexual harassment and intimidation of female athletes.',
    date_year: 2023,
    location: 'Jantar Mantar, New Delhi',
    severity: 'extreme',
    demands:
      'Immediate criminal arrest and prosecution of Brij Bhushan Sharan Singh; dissolution of the existing WFI management; establishment of an independent, women-led safety committee in sports federations; protection for the complainant female wrestlers.',
    state_response:
      'Delhi Police initially refused to register an FIR for months, filing cases only after the Supreme Court issued direct notices. On May 28, 2023 (the day of the new Parliament building inauguration), Delhi Police forcibly cleared the protest site, dragging Olympic medalists onto police buses, detaining them, and dismantling their tents. Police subsequently filed a 1,500-page chargesheet, and a Delhi court framed criminal charges for sexual harassment against Brij Bhushan under IPC Sections 354, 354A, and 354D.',
    citizen_impact:
      'Public spectacle of Olympic heroes sleeping on footpaths and threatening to immerse their medals in the river Ganga in Haridwar; sparked nationwide reckoning regarding sexual abuse and political shielding in Indian sports bodies.',
    deaths_reported: 0,
    source_url: 'https://delhidistrictcourts.nic.in/',
    source_name: 'Delhi Rouse Avenue Court Orders & Supreme Court of India',
  },

  // --- Protest 6: Agnipath Scheme Military Recruitment Youth Protests ---
  {
    id: 'inc-protest-agnipath',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'Nationwide Agnipath Military Recruitment Scheme Youth Protests',
    description:
      'In June 2022, the Central Government announced the "Agnipath" scheme, ending decades of permanent armed forces recruitment and replacing it with a 4-year contractual tour of duty, where 75% of recruits ("Agniveers") are demobilized without lifelong pension, canteen (CSD), or ex-serviceman status. Spontaneous and fierce youth protests erupted across railway hubs and military-feeder belts.',
    date_year: 2022,
    location: 'Bihar, Uttar Pradesh, Telangana, Haryana, Rajasthan',
    severity: 'extreme',
    demands:
      'Immediate rollback of the 4-year Agnipath contractual framework; reinstatement of regular, permanent soldier recruitment with lifelong pension benefits; completion of recruitment processes for over 1.5 lakh youth whose entrance tests had been cleared prior to the freeze.',
    state_response:
      'Security forces deployed baton charges, tear gas, and live firing. In Secunderabad, a 24-year-old protester was killed in police firing. Over 1,000 youth were arrested, and internet services were suspended across multiple states. Armed forces issued directives requiring a police clearance certificate confirming non-involvement in protests as a precondition for Agniveer recruitment. The Supreme Court upheld the constitutional validity of the scheme as a sovereign policy choice.',
    citizen_impact:
      '2 deaths reported. Arson and destruction of multiple train rakes (Danapur, Secunderabad) causing hundreds of crores in railway property loss; deep economic anxiety among rural youth from traditional soldier-providing families.',
    deaths_reported: 2,
    source_url: 'https://main.sci.gov.in/',
    source_name: 'Supreme Court of India (Harsh Vardhan v. Union of India) & Railway Board Records',
  },

  // --- Protest 7: Kashmiri Pandit Relocation Protests in J&K ---
  {
    id: 'inc-protest-kashmiri-pandit',
    party_id: 'party-bjp',
    category: 'protest',
    title: 'Kashmiri Pandit & PM Package Employees Relocation Protests',
    description:
      'Following a surge in targeted killings of minority employees in the Kashmir Valley by terrorists (including the assassination of Rahul Bhat inside his tehsildar office and schoolteacher Rajni Bala), hundreds of Kashmiri Pandit and reserved-category employees under the Prime Minister’s Rehabilitation Package staged a continuous 300-day strike and sit-in demanding relocation to Jammu until their physical security could be ensured.',
    date_year: 2022,
    location: 'Jammu & Srinagar, Jammu & Kashmir',
    severity: 'mild',
    demands:
      'Temporary administrative transfer/relocation of PM Package employees out of the Valley to safe zones in Jammu; provision of secured residential accommodations in Kashmir; accountability and security inquiry into assassinations inside government offices.',
    state_response:
      'The Lieutenant Governor administration of Jammu & Kashmir took a stern stance, invoking the "no work, no pay" principle and freezing the salaries of striking employees for more than six months. Biometric attendance was made compulsory to release pay, and police sealed transit migrant colonies in Srinagar to prevent employee protest rallies.',
    citizen_impact:
      'Minority families endured months of financial hardship with frozen salaries while coping with terror threats; highlighted security vulnerabilities contradicting official claims of complete post-370 normalcy.',
    deaths_reported: 0,
    source_url: 'https://www.thehindu.com/news/national/',
    source_name: 'Jammu & Kashmir High Court Filings & The Indian Express',
  },

  // --- Protest 8: Delhi Anganwadi Workers Protests ---
  {
    id: 'inc-protest-anganwadi-delhi',
    party_id: 'party-aap',
    category: 'protest',
    title: 'Delhi Anganwadi Workers’ 38-Day Strike & ESMA Termination Crisis',
    description:
      'Thousands of women Anganwadi workers and helpers affiliated with the Delhi State Anganwadi Workers and Helpers Union staged a 38-day sit-in outside the residence of Delhi Chief Minister Arvind Kejriwal, demanding minimum wages, employee recognition, and retirement benefits after serving on the frontlines during the COVID-19 pandemic.',
    date_year: 2022,
    location: 'Civil Lines, New Delhi (Outside CM Residence)',
    severity: 'mild',
    demands:
      'Hike in monthly honorarium to ₹25,000 for workers and ₹18,000 for helpers; formal recognition of Anganwadi staff as permanent Grade-C and Grade-D government employees; retirement gratuity, pension, and PF benefits.',
    state_response:
      'The Delhi Government invoked the stringent Essential Services Maintenance Act (ESMA) to ban the strike, declaring childcare and food distribution an essential service. When workers refused to end the agitation, the Department of Women and Child Development issued termination notices to 884 Anganwadi workers and helpers. The Delhi High Court subsequently stayed coercive action and questioned the administration’s invocation of ESMA on scheme-based honorarium workers.',
    citizen_impact:
      'Temporary disruption of supplementary nutrition and immunization tracking for thousands of infants and pregnant women in Delhi’s slums; highlighted precarious labor conditions of women scheme workers across urban India.',
    deaths_reported: 0,
    source_url: 'https://delhihighcourt.nic.in/',
    source_name: 'Delhi High Court Orders & The Hindu / LiveLaw',
  },

  // --- Protest 9: Wayanad Landslide Central Aid Statewide Protests ---
  {
    id: 'inc-protest-wayanad',
    party_id: 'party-inc',
    category: 'protest',
    title: 'Wayanad Landslide Rehabilitation & Central Aid Statewide Protests',
    description:
      'Following the catastrophic July 2024 landslides in Chooralmala and Meppadi in Wayanad, Kerala, that killed over 400 people and destroyed entire villages, political parties across Kerala—led by the Congress-led United Democratic Front (UDF)—staged massive statewide protests and a general strike (hartal) in Wayanad against the Central Government’s delay in declaring it a national disaster and releasing special relief assistance.',
    date_year: 2024,
    location: 'Wayanad, Kozhikode & Thiruvananthapuram, Kerala',
    severity: 'mild',
    demands:
      'Declaration of the Wayanad landslide disaster as a Level-3 (L3) Severe National Disaster; immediate sanction of ₹2,000 crore special reconstruction grant from the National Disaster Response Fund (NDRF); complete write-off of all bank loans and housing debts for affected survivor families; comprehensive resettlement housing project.',
    state_response:
      'The Kerala Legislative Assembly passed a unanimous resolution demanding urgent central disaster relief. The Central Government dispatched multiple assessment teams but delayed financial package notifications, leading to heated exchanges in Parliament between the treasury and opposition benches.',
    citizen_impact:
      'Hundreds of displaced landslide survivor families remained in temporary rented accommodations without permanent rehabilitation blueprints, caught in federal-state financial standoffs.',
    deaths_reported: 0,
    source_url: 'https://niyamasabha.nic.in/',
    source_name: 'Kerala Legislative Assembly Proceedings & Parliamentary Debates',
  },

  // ==========================================
  // MAJOR VIOLENT INCIDENTS, CRISES & CASES
  // ==========================================

  // --- 1. Pahalgam Terror Attack ---
  {
    id: 'inc-pahalgam-terror',
    party_id: 'party-bjp',
    category: 'terror',
    title: 'Pahalgam Civilian & Tourist Terror Attack (Jammu & Kashmir)',
    description:
      'A devastating terrorist attack targeting civilians and visiting tourists in the Baisaran Valley meadow near Pahalgam, Anantnag district, Jammu & Kashmir. Armed militants linked to The Resistance Front (TRF) / Lashkar-e-Taiba opened fire on unarmed tourists and local pony operators who intervened to protect them. The massacre occurred under direct Union Ministry of Home Affairs governance in Jammu & Kashmir, exposing severe gaps in high-altitude tourist security protocols and triggering nationwide grief and retaliatory counter-terror manhunts.',
    date_year: 2025,
    location: 'Baisaran Valley, Pahalgam, Jammu & Kashmir',
    severity: 'extreme',
    citizen_impact:
      '26 innocent civilians (including domestic tourists and local Kashmiri pony operators) were massacred in cold blood. The attack shattered tourist confidence, dealt a severe economic blow to local service workers and tour operators, and raised intense questions about intelligence and perimeter defense under direct central administration.',
    deaths_reported: 26,
    source_url: 'https://www.thehindu.com/news/national/jammu-and-kashmir/',
    source_name: 'The Hindu & PIB Official Statements',
  },

  // --- 2. Women Paraded Naked in Manipur ---
  {
    id: 'inc-manipur-women-paraded',
    party_id: 'party-bjp',
    category: 'violence',
    title: 'Manipur Ethnic Violence: Women Stripped, Paraded Naked & Sexually Assaulted',
    description:
      'On May 4, 2023, amidst brutal ethnic clashes between Meitei and Kuki-Zo communities in Manipur, a heavily armed mob attacked B. Phainom village in Kangpokpi district, abducted two Kuki women, stripped them naked, paraded them through the streets, and subjected one to gang-rape in broad daylight. Two male relatives who attempted to protect the women were murdered on the spot. Despite an FIR filed on May 18, state police took virtually no action for over two months until the horrific video went viral globally in July 2023. The Supreme Court of India initiated suo motu proceedings, expressing deep anguish and censuring the Manipur State and Union governments for using women as instruments of perpetrating violence and total failure of the state machinery.',
    date_year: 2023,
    location: 'B. Phainom Village, Kangpokpi District, Manipur',
    severity: 'extreme',
    citizen_impact:
      'Gross human rights violation, weaponization of gang-rape and sexual violence against women during ethnic conflict, and state failure to protect citizens. Over 220 people were killed in the broader Manipur violence, over 60,000 citizens internally displaced into squalid relief camps, and internet banned for months under Chief Minister N. Biren Singh’s administration.',
    deaths_reported: 220,
    source_url: 'https://main.sci.gov.in/supremecourt/2023/20857/20857_2023_1_1501_45781_Judgement_07-Aug-2023.pdf',
    source_name: 'Supreme Court of India (Dinganglung Gangmei v. State of Manipur)',
  },

  // --- 3. Sikkim Governor Appointment / Ankita Bhandari Case Controversy ---
  {
    id: 'inc-sikkim-governor-controversy',
    party_id: 'party-bjp',
    category: 'scandal',
    title: 'Sikkim Gubernatorial Appointment Controversy & the Ankita Bhandari Case Allegations',
    description:
      'The Union Government’s appointment of senior BJP national leader Dushyant Kumar Gautam as the Governor of Sikkim sparked massive public outrage and protests across New Delhi and Uttarakhand. Protests were led by the parents of 19-year-old receptionist Ankita Bhandari—who was murdered in 2022 at a Rishikesh resort owned by Pulkit Arya (son of a former BJP leader, convicted and sentenced to life imprisonment) for refusing to provide illicit “special services” to an unnamed “VIP”. The victim’s family and opposition parties publicly demanded an independent CBI probe into the “VIP” angle, questioning why Gautam was elevated to a high constitutional office conferring absolute criminal immunity under Article 361 of the Constitution while allegations remained unresolved. Gautam vehemently rejected all allegations as politically motivated, baseless, and filed defamation suits, asserting no court or chargesheet has named or convicted him.',
    date_year: 2024,
    location: 'Sikkim / New Delhi / Uttarakhand',
    severity: 'extreme',
    citizen_impact:
      'Sparked nationwide public indignation over the perceived shielding of politically connected figures using gubernatorial appointments and Article 361 immunity. The victim’s grieving parents staged protests at India Gate demanding justice, raising critical questions regarding institutional accountability and safety of young women workers in hospitality.',
    deaths_reported: 1,
    source_url: 'https://www.thehindu.com/news/national/',
    source_name: 'The Hindu & India Today News Investigation',
  },

  // --- 4. Morbi Suspension Bridge Collapse (Gujarat) ---
  {
    id: 'inc-morbi-bridge',
    party_id: 'party-bjp',
    category: 'disaster',
    title: 'Morbi Suspension Bridge Collapse Tragedy (Gujarat)',
    description:
      'The historic British-era suspension bridge over the Machchhu River in Morbi, Gujarat, collapsed just four days after being reopened to the public following uncertified repairs. The municipal maintenance contract had been awarded for 15 years to clockmaker Oreva Group without a competitive open tender, fitness audit, or crowd management protocol. Over 400 people were on the bridge when the rusted cables snapped.',
    date_year: 2022,
    location: 'Morbi, Gujarat',
    severity: 'extreme',
    citizen_impact:
      '141 innocent citizens lost their lives, including 47 children and dozens of women. The tragedy laid bare municipal corruption, crony contracting, and negligence by local authorities and private operators.',
    deaths_reported: 141,
    source_url: 'https://gujarathighcourt.nic.in/',
    source_name: 'Gujarat High Court Suo Motu PIL on Morbi Collapse',
  },

  // --- 5. Hathras Gang-Rape & Midnight Police Cremation (UP) ---
  {
    id: 'inc-hathras-rape',
    party_id: 'party-bjp',
    category: 'violence',
    title: 'Hathras Dalit Woman Gang-Rape & Forcible Midnight Cremation',
    description:
      'A 19-year-old Dalit woman was brutally assaulted and gang-raped in Hathras, Uttar Pradesh. After succumbing to spinal and cervical injuries in Delhi’s Safdarjung Hospital, UP police transported her body back and forcibly cremated it in the middle of the night (2:30 AM) without family presence or consent, locking the grieving parents inside their house and cordoning off the village to bar reporters.',
    date_year: 2020,
    location: 'Hathras, Uttar Pradesh',
    severity: 'extreme',
    citizen_impact:
      'Horrific crime against a vulnerable marginalized Dalit woman compounded by high-handed police intimidation and denial of basic funerary rights. Condemned by the Allahabad High Court as a violation of basic human dignity.',
    deaths_reported: 1,
    source_url: 'https://www.livelaw.in/pdf_upload/pdf_upload-383188.pdf',
    source_name: 'Allahabad High Court Suo Motu Order (Right to Decent Burial)',
  },

  // --- 6. 2020 North-East Delhi Communal Riots ---
  {
    id: 'inc-delhi-riots-2020',
    party_id: 'party-bjp',
    category: 'violence',
    title: '2020 North-East Delhi Communal Riots',
    description:
      'Waves of communal violence engulfed North-East Delhi over five days following inflammatory speeches by political figures surrounding the Citizenship Amendment Act (CAA) protests. Mobs armed with rods, petrol bombs, and firearms clashed while Delhi Police (under Union Home Ministry command) faced severe criticism from courts for delayed response, biased investigations, and failure to preserve CCTV footage.',
    date_year: 2020,
    location: 'North-East Delhi',
    severity: 'extreme',
    citizen_impact:
      '53 citizens killed, over 200 grievously injured, and hundreds of local shops, homes, and places of worship gutted. Displaced thousands of working-class families and deepened communal mistrust in the national capital.',
    deaths_reported: 53,
    source_url: 'https://delhihighcourt.nic.in/',
    source_name: 'Delhi High Court Proceedings & Delhi Minorities Commission Report',
  },

  // --- 7. Lakhimpur Kheri Protesting Farmers Runover ---
  {
    id: 'inc-lakhimpur-kheri',
    party_id: 'party-bjp',
    category: 'violence',
    title: 'Lakhimpur Kheri Convoy Violence against Protesting Farmers',
    description:
      'A three-vehicle convoy, including an SUV owned by Union Minister of State for Home Ajay Mishra Teni’s son Ashish Mishra, drove into a crowd of protesting farmers walking along the road in Tikunia, Lakhimpur Kheri, crushing four farmers and a journalist. The ensuing violence resulted in three more deaths. The Supreme Court intervened to constitute an independent SIT headed by a retired High Court judge to oversee the murder trial.',
    date_year: 2021,
    location: 'Tikunia, Lakhimpur Kheri, Uttar Pradesh',
    severity: 'extreme',
    citizen_impact:
      '8 lives lost. Demonstrated political intimidation against democratic farmer protests and ignited nationwide outrage regarding executive shielding of powerful political kin.',
    deaths_reported: 8,
    source_url: 'https://main.sci.gov.in/',
    source_name: 'Supreme Court Monitored SIT Report',
  },

  // --- 8. RG Kar Medical College Hospital Rape & Murder (Kolkata) ---
  {
    id: 'inc-rg-kar-hospital',
    party_id: 'party-tmc',
    category: 'violence',
    title: 'RG Kar Medical College Hospital Doctor Rape-Murder & Cover-Up Crisis',
    description:
      'A 31-year-old on-duty postgraduate trainee doctor was brutally raped and murdered inside the seminar room of RG Kar Medical College and Hospital, Kolkata. Institutional authorities initially misreported the death as a suicide, delayed FIR registration by 14 hours, and allowed rapid renovation work near the crime scene, triggering allegations of systemic evidence tampering. On August 14, 2024, a midnight mob ransacked the hospital emergency ward while Kolkata police stood by. The Supreme Court took suo motu cognizance, transferring the probe to the CBI and condemning state administrative complicity.',
    date_year: 2024,
    location: 'Kolkata, West Bengal',
    severity: 'extreme',
    citizen_impact:
      'Shook the entire medical fraternity across India, leading to nationwide strikes by resident doctors demanding workplace safety. Exposed state institutional rot, medical college syndicates, and administrative suppression of campus crimes.',
    deaths_reported: 1,
    source_url: 'https://main.sci.gov.in/',
    source_name: 'Supreme Court of India Suo Motu Writ Petition (Crl.) No. 2/2024',
  },

  // --- 9. Sandeshkhali Sexual Exploitation & Land Grabbing (Bengal) ---
  {
    id: 'inc-sandeshkhali',
    party_id: 'party-tmc',
    category: 'violence',
    title: 'Sandeshkhali Systemic Sexual Exploitation & Tribal Land Grabbing',
    description:
      'Local TMC strongman Shahjahan Sheikh and his associates operated a multi-year syndicate of terror in the riverine island of Sandeshkhali, North 24 Parganas, West Bengal. Village women revealed systemic harassment, nighttime coercion to attend party offices, and the forcible takeover of fertile multi-crop agricultural land belonging to marginalized Adivasi families to convert them into commercial saltwater shrimp bheries. Local police consistently refused to register victims’ complaints until massive grassroots protests erupted and the Calcutta High Court ordered a CBI probe.',
    date_year: 2024,
    location: 'Sandeshkhali, North 24 Parganas, West Bengal',
    severity: 'extreme',
    citizen_impact:
      'Prolonged sexual violation and economic dispossession of marginalized rural women and tribal families by local party henchmen operating under political protection; total abdication of local law enforcement.',
    deaths_reported: 0,
    source_url: 'https://calcuttahighcourt.gov.in/',
    source_name: 'Calcutta High Court Division Bench Order on Sandeshkhali',
  },

  // --- 10. 1984 Anti-Sikh Massacres (Delhi & North India) ---
  {
    id: 'inc-1984-anti-sikh-riots',
    party_id: 'party-inc',
    category: 'violence',
    title: '1984 Anti-Sikh Massacres Following Indira Gandhi’s Assassination',
    description:
      'Following the tragic assassination of Prime Minister Indira Gandhi by her bodyguards on October 31, 1984, organized mobs led by local Congress leaders unleashed four days of horrific violence targeting Sikh families across Delhi, Kanpur, and Bokaro. Mobs were armed with voter lists, iron rods, kerosene, and tires, burning Sikh men alive and looting properties while Delhi Police remained passive or actively disarmed victims. Decades later, judicial inquiries and the Delhi High Court convicted senior Congress leaders like Sajjan Kumar for criminal conspiracy and genocide.',
    date_year: 1984,
    location: 'Delhi, Kanpur, Bokaro',
    severity: 'extreme',
    citizen_impact:
      'Over 3,350 Sikh men, women, and children were slaughtered across India (nearly 2,800 in Delhi alone). Destroyed entire neighborhoods (Trilokpuri, Kalyanpuri), left thousands of widows and orphans, and remains one of the darkest stains on India’s secular democracy.',
    deaths_reported: 3350,
    source_url: 'https://delhihighcourt.nic.in/upload/Judgments/Judgments_PDF/17122018_CRL_A_1099_2013.pdf',
    source_name: 'Delhi High Court Judgment (State v. Sajjan Kumar) & Nanavati Commission Report',
  },

  // --- 11. Bhagalpur Communal Riots (Bihar, 1989) ---
  {
    id: 'inc-bhagalpur-riots',
    party_id: 'party-inc',
    category: 'violence',
    title: '1989 Bhagalpur Communal Massacres (Bihar)',
    description:
      'Brutal communal riots erupted in Bhagalpur district of Bihar over Ramshila processions, continuing for nearly two months under the Congress state government led by Satyendra Narayan Sinha. The violence was marked by extreme police brutality and complicity, including the infamous Logain massacre where 116 Muslims were killed and buried in cauliflower fields by police and rioters.',
    date_year: 1989,
    location: 'Bhagalpur, Bihar',
    severity: 'extreme',
    citizen_impact:
      'Over 1,000 citizens killed and 50,000 displaced; destruction of the regional Bhagalpur handloom weaving economy and historic breakdown of minority security under state administration.',
    deaths_reported: 1070,
    source_url: 'https://archive.org/details/BhagalpurRiotsInquiryCommissionReport',
    source_name: 'Bhagalpur Inquiry Commission Report',
  },

  // --- 12. Punjab Spurious Liquor Hooch Tragedy ---
  {
    id: 'inc-punjab-hooch-tragedy',
    party_id: 'party-aap',
    category: 'crisis',
    title: 'Sangrur Spurious Toxic Liquor Deaths (Punjab)',
    description:
      'In March 2024, an illicit toxic methanol-laced spurious alcohol network caused the deaths of 21 daily-wage laborers across Dirba and Sunam in Sangrur district, Punjab, under the AAP state government. The incident occurred in the home district of Chief Minister Bhagwant Mann, exposing deep-rooted illegal distillery syndicates and failure of the state excise department.',
    date_year: 2024,
    location: 'Sangrur District, Punjab',
    severity: 'extreme',
    citizen_impact:
      '21 poor laborers died in agony from organ failure; devastated impoverished rural families and revealed the persistence of fatal counterfeit alcohol distribution.',
    deaths_reported: 21,
    source_url: 'https://www.tribuneindia.com/news/punjab/sangrur-hooch-tragedy',
    source_name: 'Punjab Police Special Investigation Team (SIT) & Tribune India',
  },

  // --- 13. Delhi Water Crisis & Tanker Mafia Extortion ---
  {
    id: 'inc-delhi-water-crisis',
    party_id: 'party-aap',
    category: 'crisis',
    title: 'Severe Delhi Heatwave Drinking Water Shortage & Tanker Crisis',
    description:
      'During scorching 48°C peak summer heatwaves in May–June 2024, millions of residents in unauthorized colonies and slums across Chhatarpur, Sangam Vihar, and Geeta Colony suffered acute drinking water shortages. As piped water dried up and Delhi Jal Board tanker supplies failed, unauthorized private tanker mafias charged extortionate prices while political blame games paralyzed municipal relief between the Delhi and Haryana governments.',
    date_year: 2024,
    location: 'National Capital Territory of Delhi',
    severity: 'mild',
    citizen_impact:
      'Millions of vulnerable citizens endured severe physical hardship and dehydration, queuing for hours under extreme heat; highlights severe water distribution inequalities in the national capital.',
    deaths_reported: 0,
    source_url: 'https://main.sci.gov.in/',
    source_name: 'Supreme Court Special Bench on Delhi Water Scarcity',
  },
];

export interface GovernanceTenure {
  level: 'national' | 'state' | 'opposition';
  title: string;
  period: string;
  details: string;
  jurisdiction: string;
}

export interface LegislativePolicyRecord {
  id: string;
  party_id: string;
  title: string;
  year: number;
  type: 'enacted_act' | 'constitutional_amendment' | 'policy_stance' | 'opposed_bill';
  summary: string;
  stance: string;
  source_name: string;
  source_url?: string;
}

export const PARTY_TENURES: Record<string, GovernanceTenure[]> = {
  'party-bjp': [
    {
      level: 'national',
      title: 'Union Government (NDA-II & NDA-III)',
      period: '2014 – Present',
      jurisdiction: 'National (Central Government)',
      details:
        'Single-party majority in 16th & 17th Lok Sabha (2014, 2019) and coalition lead in 18th Lok Sabha (2024). Governed during GST rollout, Article 370 abrogation, digitization expansion, and infrastructure capex push.',
    },
    {
      level: 'national',
      title: 'Union Government (NDA-I)',
      period: '1998 – 2004',
      jurisdiction: 'National (Central Government)',
      details:
        'Prime Minister Atal Bihari Vajpayee led NDA coalition. Landmark achievements included Pokhran-II, Golden Quadrilateral highways, and Sarva Shiksha Abhiyan.',
    },
    {
      level: 'state',
      title: 'Continuous State Governance (Gujarat Model)',
      period: '1998 – Present',
      jurisdiction: 'Gujarat',
      details:
        'Longest continuous ruling party in Gujarat (26+ consecutive years), emphasizing industrial infrastructure, port logistics, and investment summits.',
    },
    {
      level: 'state',
      title: 'State Governance (Uttar Pradesh)',
      period: '2017 – Present',
      jurisdiction: 'Uttar Pradesh',
      details:
        'Two consecutive assembly majorities under Chief Minister Yogi Adityanath focusing on expressway connectivity, law enforcement, and religious tourism corridors.',
    },
    {
      level: 'state',
      title: 'State Governance (NCT of Delhi — Rekha Gupta Administration)',
      period: 'Feb 2025 – Present',
      jurisdiction: 'National Capital Territory of Delhi',
      details:
        'Returned to power in Delhi after 27 years in the February 2025 Assembly elections. Rekha Gupta sworn in as Chief Minister focusing on municipal sanitation overhaul, Yamuna rejuvenation, and administrative coordination between Union and UT authorities.',
    },
    {
      level: 'opposition',
      title: 'Principal National Opposition (UPA Era)',
      period: '2004 – 2014',
      jurisdiction: 'Parliament of India',
      details:
        'Served as the primary constitutional opposition in Lok Sabha and Rajya Sabha led by L.K. Advani, Sushma Swaraj, and Arun Jaitley, heavily challenging UPA over inflation and corruption allegations.',
    },
  ],
  'party-inc': [
    {
      level: 'national',
      title: 'Union Government (UPA-I & UPA-II)',
      period: '2004 – 2014',
      jurisdiction: 'National (Central Government)',
      details:
        'Coalition government headed by Dr. Manmohan Singh. Pioneered rights-based social welfare legislation (RTI, MGNREGA, Food Security, Forest Rights) alongside record 8.4% average GDP growth.',
    },
    {
      level: 'national',
      title: 'Union Government (Economic Liberalisation)',
      period: '1991 – 1996',
      jurisdiction: 'National (Central Government)',
      details:
        'Prime Minister P.V. Narasimha Rao and Finance Minister Manmohan Singh dismantled the Licence Raj, opened foreign direct investment, and initiated India’s modern market economy.',
    },
    {
      level: 'state',
      title: 'Current State Governments',
      period: '2022 / 2023 – Present',
      jurisdiction: 'Karnataka, Telangana, Himachal Pradesh (also coalition partner in Jharkhand & J&K)',
      details:
        'Formed state governments with expansive 5-guarantee welfare models (free bus travel for women, 200 units power, monthly direct cash assistance), alongside ruling alliance governments in Jharkhand (re-elected Nov 2024) and Jammu & Kashmir (elected Oct 2024).',
    },
    {
      level: 'opposition',
      title: 'Principal National Opposition (NDA Era)',
      period: '2014 – Present',
      jurisdiction: 'Parliament of India',
      details:
        'Principal opposition in the 16th, 17th, and 18th Lok Sabha. Reached constitutional Leader of the Opposition status in 2024 under Rahul Gandhi; focal campaigns include caste census, MSP legal guarantees, and youth unemployment.',
    },
  ],
  'party-aap': [
    {
      level: 'state',
      title: 'Former State Governance (NCT of Delhi — Kejriwal & Atishi Cabinets)',
      period: '2015 – Feb 2025 (also 2013–14)',
      jurisdiction: 'National Capital Territory of Delhi',
      details:
        'Governed Delhi for a decade through Arvind Kejriwal (2015–2024) and Atishi (2024–2025), delivering municipal school reforms, 500+ Mohalla Clinics, and electricity/water subsidies, transitioning to Delhi legislative opposition in February 2025.',
    },
    {
      level: 'state',
      title: 'State Government of Punjab (Bhagwant Mann Cabinet)',
      period: '2022 – Present',
      jurisdiction: 'Punjab',
      details:
        'Secured 92 of 117 assembly seats in 2022 under Chief Minister Bhagwant Mann. Implemented free electricity subsidies, Aam Aadmi Clinics, and anti-corruption helplines while confronting state debt and law enforcement challenges.',
    },
    {
      level: 'opposition',
      title: 'Principal Opposition in Delhi Assembly & Parliamentary Voice',
      period: 'Feb 2025 – Present',
      jurisdiction: 'Delhi Assembly & Parliament of India',
      details:
        'Serving as the principal opposition in the Delhi Legislative Assembly following the 2025 elections alongside parliamentary representation in Rajya Sabha and Lok Sabha.',
    },
  ],
  'party-tmc': [
    {
      level: 'state',
      title: 'Government of West Bengal',
      period: '2011 – Present',
      jurisdiction: 'West Bengal',
      details:
        'Elected for three consecutive terms (2011, 2016, 2021) under Chief Minister Mamata Banerjee, ending 34 years of Left Front rule. Instituted nationwide-acclaimed direct beneficiary schemes (Kanyashree, Lakshmir Bhandar, Swasthya Sathi).',
    },
    {
      level: 'national',
      title: 'Union Coalition Partner (Ministry of Railways)',
      period: '1999 – 2001 (NDA) & 2009 – 2012 (UPA)',
      jurisdiction: 'National (Central Government)',
      details:
        'Held the Union Cabinet portfolio for Railways under both NDA and UPA regimes, introducing the Duronto train network and regional railway projects before exiting over FDI policy differences.',
    },
    {
      level: 'opposition',
      title: 'National Parliamentary Opposition',
      period: '2012 – Present',
      jurisdiction: 'Parliament of India',
      details:
        'Fourth largest parliamentary party in Lok Sabha. Vocally opposed demonetisation, central agency investigations against regional leaders, and NRC/CAA.',
    },
  ],
};

export const SEED_LEGISLATIVE_RECORDS: LegislativePolicyRecord[] = [
  // BJP
  {
    id: 'leg-bjp-01',
    party_id: 'party-bjp',
    title: 'Abrogation of Article 370 & Jammu and Kashmir Reorganisation Act',
    year: 2019,
    type: 'constitutional_amendment',
    summary:
      'Revoked the special constitutional status granted to Jammu and Kashmir under Article 370 and bifurcated the state into two Union Territories (J&K and Ladakh). Fully upheld by the Supreme Court of India in December 2023.',
    stance: 'Core civil and constitutional manifesto commitment championing national integration.',
    source_name: 'Gazette of India & Supreme Court of India Constitutional Bench Judgment',
    source_url: 'https://main.sci.gov.in/',
  },
  {
    id: 'leg-bjp-02',
    party_id: 'party-bjp',
    title: 'Goods and Services Tax (GST) — 101st Constitutional Amendment Act',
    year: 2017,
    type: 'constitutional_amendment',
    summary:
      'Subsumed 17 central and state indirect levies into a unified nationwide destination-based tax system governed by the federal GST Council.',
    stance: 'Spearheaded consensus across states for single national market reform.',
    source_name: 'Ministry of Finance & GST Council Official Records',
    source_url: 'https://gstcouncil.gov.in/',
  },
  {
    id: 'leg-bjp-03',
    party_id: 'party-bjp',
    title: 'Digital Personal Data Protection (DPDP) Act',
    year: 2023,
    type: 'enacted_act',
    summary:
      'Enacted India’s first comprehensive statutory framework regulating the digital processing of personal data, user consent rights, and data protection board oversight.',
    stance: 'Enacted to balance digital economy growth with citizen privacy safeguards.',
    source_name: 'Ministry of Electronics and Information Technology (MeitY)',
    source_url: 'https://www.meity.gov.in/',
  },
  {
    id: 'leg-bjp-04',
    party_id: 'party-bjp',
    title: 'Three Farm Reform Laws (Enacted 2020, Repealed 2021)',
    year: 2020,
    type: 'enacted_act',
    summary:
      'Legislation aimed to deregulate agricultural produce marketing beyond APMC mandis and facilitate contract farming. Repealed by Parliament in November 2021 following sustained farmer protests.',
    stance: 'Advocated as market-access modernization; subsequently repealed to preserve social peace.',
    source_name: 'Parliament of India Farm Laws Repeal Act 2021',
    source_url: 'https://sansad.in/',
  },

  // INC
  {
    id: 'leg-inc-01',
    party_id: 'party-inc',
    title: 'Right to Information (RTI) Act',
    year: 2005,
    type: 'enacted_act',
    summary:
      'Landmark citizen empowerment law mandating timely responses from public authorities to citizen requests for government records and accountability disclosures.',
    stance: 'Flagship transparency reform championed by UPA National Advisory Council.',
    source_name: 'Department of Personnel and Training (DoPT) & Gazette of India',
    source_url: 'https://dopt.gov.in/',
  },
  {
    id: 'leg-inc-02',
    party_id: 'party-inc',
    title: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    year: 2005,
    type: 'enacted_act',
    summary:
      'World’s largest social safety program guaranteeing at least 100 days of wage employment in a financial year to every rural household whose adult members volunteer for unskilled manual work.',
    stance: 'Core rights-based livelihood security legislation under UPA-I.',
    source_name: 'Ministry of Rural Development',
    source_url: 'https://nrega.nic.in/',
  },
  {
    id: 'leg-inc-03',
    party_id: 'party-inc',
    title: 'National Food Security Act (NFSA)',
    year: 2013,
    type: 'enacted_act',
    summary:
      'Transformed food assistance into a statutory legal right, covering up to 75% of rural and 50% of urban populations with subsidized foodgrains through the Targeted Public Distribution System.',
    stance: 'Statutory social entitlement legislation to combat malnutrition and hunger.',
    source_name: 'Department of Food & Public Distribution',
    source_url: 'https://dfpd.gov.in/',
  },
  {
    id: 'leg-inc-04',
    party_id: 'party-inc',
    title: 'Right to Fair Compensation and Transparency in Land Acquisition (LARR Act)',
    year: 2013,
    type: 'enacted_act',
    summary:
      'Replaced the colonial 1894 Land Acquisition Act. Mandated mandatory social impact assessments, 70–80% landowner consent for private/PPP projects, and 4x compensation in rural areas.',
    stance: 'Enacted to safeguard farmer rights against arbitrary state land acquisition.',
    source_name: 'Ministry of Rural Development & Gazette of India',
    source_url: 'https://dolr.gov.in/',
  },

  // AAP
  {
    id: 'leg-aap-01',
    party_id: 'party-aap',
    title: 'Delhi Jan Lokpal Bill & Anti-Corruption Framework',
    year: 2015,
    type: 'policy_stance',
    summary:
      'Passed by the Delhi Legislative Assembly to create an autonomous investigative ombudsman with powers to investigate corruption across state departments and municipal bodies.',
    stance: 'Founding ideological cornerstone for clean governance and institutional oversight.',
    source_name: 'Delhi Legislative Assembly Proceedings',
    source_url: 'http://delhiassembly.nic.in/',
  },
  {
    id: 'leg-aap-02',
    party_id: 'party-aap',
    title: 'Opposition to Government of NCT of Delhi (Amendment) Act 2023',
    year: 2023,
    type: 'opposed_bill',
    summary:
      'Opposed the central parliamentary legislation creating the National Capital Civil Service Authority (NCCSA) which placed control over bureaucracy and appointments under the Lieutenant Governor.',
    stance: 'Fought legally and politically as an erosion of elected legislative autonomy.',
    source_name: 'Supreme Court of India Petitions & Delhi Assembly Resolutions',
    source_url: 'https://main.sci.gov.in/',
  },
  {
    id: 'leg-aap-03',
    party_id: 'party-aap',
    title: 'Statutory 25% Budget Guarantee for Public School Education',
    year: 2016,
    type: 'enacted_act',
    summary:
      'Policy decision sustaining 22–25% of the total annual state budget for state school modernization, teacher training, and Mega PTM parent engagement.',
    stance: 'Human capital development policy prioritizing universal quality public schooling.',
    source_name: 'Delhi Government Directorate of Education Budget Statements',
    source_url: 'http://edudel.nic.in/',
  },

  // TMC
  {
    id: 'leg-tmc-01',
    party_id: 'party-tmc',
    title: 'Singur Land Rehabilitation and Return Act',
    year: 2011,
    type: 'enacted_act',
    summary:
      'First legislative act passed by the TMC government in 2011 returning 400 acres of forcefully acquired farmland to unwilling farmers in Singur. Upheld by Supreme Court in 2016.',
    stance: 'Fulfilled founding agrarian protest pledge against industrial land grab.',
    source_name: 'West Bengal Legislative Assembly & Supreme Court Singur Judgment (2016)',
    source_url: 'https://main.sci.gov.in/',
  },
  {
    id: 'leg-tmc-02',
    party_id: 'party-tmc',
    title: 'Resolution Against National Register of Citizens (NRC)',
    year: 2019,
    type: 'policy_stance',
    summary:
      'Passed official resolution in the West Bengal Legislative Assembly rejecting implementation of a nationwide NRC in the state, citing documentation hardships for poor and marginalized citizens.',
    stance: 'Defended state autonomy and secular citizen rights against citizenship documentation.',
    source_name: 'West Bengal Legislative Assembly Official Records',
    source_url: 'https://wbassembly.gov.in/',
  },
  {
    id: 'leg-tmc-03',
    party_id: 'party-tmc',
    title: 'Kanyashree and Lakshmir Bhandar Statutory Women Welfare Schemes',
    year: 2021,
    type: 'enacted_act',
    summary:
      'Legislatively funded universal direct benefit transfer providing financial autonomy to 2.1+ crore women across West Bengal through direct treasury bank transfers.',
    stance: 'Core grassroots women empowerment and social safety net policy.',
    source_name: 'Department of Women & Child Development, Government of West Bengal',
    source_url: 'https://wb.gov.in/',
  },
];

