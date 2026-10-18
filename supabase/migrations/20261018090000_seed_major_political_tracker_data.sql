/*
# Seed Major Indian Political Tracker Data
Adds comprehensive data for major political parties (BJP, INC, AAP, TMC),
key national leaders, works (positive achievements and serious concerns),
flagship yojnas, manifesto promises, major national incidents, and the latest
mass protests (Farmers 2.0, Doctors Abhaya strike, NEET paper leak, Ladakh climate march, etc.)
*/

-- 0. SCHEMA EXTENSIONS
ALTER TABLE incidents ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE incidents ADD COLUMN IF NOT EXISTS demands text;
ALTER TABLE incidents ADD COLUMN IF NOT EXISTS state_response text;

-- 1. PARTIES
INSERT INTO parties (id, name, abbreviation, ideology, represents, founded_year, color_hex, description)
VALUES
(
  'party-bjp',
  'Bharatiya Janata Party',
  'BJP',
  'Right-wing, Hindutva, Cultural Nationalism, Economic Modernisation',
  'Ruling party at Centre (NDA); strong presence across Hindi heartland, West and North-East India.',
  1980,
  '#ea580c',
  'Founded in 1980, the Bharatiya Janata Party is currently the largest political party in India. It advocates cultural nationalism, digital public infrastructure, national security, and welfare-driven governance, while facing significant criticism over communal polarization, civil liberties concerns, and executive centralization.'
),
(
  'party-inc',
  'Indian National Congress',
  'INC',
  'Centre-left, Secularism, Social Democracy, Welfare State, Liberal Nationalism',
  'Principal opposition party (INDIA alliance); historic national footprint across diverse social groups and southern states.',
  1885,
  '#2563eb',
  'India’s oldest political party, the Indian National Congress led the freedom movement and governed India for over five decades post-independence. It pioneered economic liberalization in 1991 and landmark rights-based welfare (RTI, MGNREGA, Food Security), but has faced criticism over legacy corruption scandals, dynastic leadership, and institutional decline.'
),
(
  'party-aap',
  'Aam Aadmi Party',
  'AAP',
  'Populism, Anti-Corruption, Social Welfare, Public Education and Health Reforms',
  'State ruling party in Punjab and Delhi (UT); popular among urban working and middle classes.',
  2012,
  '#0284c7',
  'Emerging from the 2011 India Against Corruption movement, AAP gained power on promises of participatory democracy, anti-graft oversight, free public utilities (water and electricity), and transformations in government schools and neighborhood clinics, though embroiled in excise policy investigations and institutional friction with central authorities.'
),
(
  'party-tmc',
  'All India Trinamool Congress',
  'AITC / TMC',
  'Regionalism, Centre-left Populism, Secularism, Bengal Sub-nationalism',
  'Ruling party in West Bengal since 2011; key regional power in eastern India.',
  1998,
  '#16a34a',
  'Formed by Mamata Banerjee after breaking from the Congress, TMC ended 34 years of Left Front rule in West Bengal in 2011. Known for expansive direct cash benefit schemes for women and students (Kanyashree, Lakshmir Bhandar), the party faces intense criticism regarding post-poll violence, local syndicates, and administrative corruption.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  abbreviation = EXCLUDED.abbreviation,
  ideology = EXCLUDED.ideology,
  represents = EXCLUDED.represents,
  color_hex = EXCLUDED.color_hex,
  description = EXCLUDED.description;

-- 2. LEADERS
INSERT INTO leaders (id, party_id, name, role, bio, represents, ideology)
VALUES
(
  'leader-modi',
  'party-bjp',
  'Narendra Modi',
  'Prime Minister of India (2014–Present)',
  'Former Chief Minister of Gujarat (2001–2014) and Prime Minister of India since 2014, leading the BJP to successive general election victories in 2014, 2019, and 2024.',
  'Varanasi (Lok Sabha), Uttar Pradesh',
  'Hindutva, Economic Nationalism, Development (Vikas), Strong Executive Leadership'
),
(
  'leader-shah',
  'party-bjp',
  'Amit Shah',
  'Union Minister of Home Affairs & Minister of Co-operation',
  'Key BJP strategist, former national party president, and Union Home Minister responsible for major constitutional and internal security decisions including the abrogation of Article 370 and CAA.',
  'Gandhinagar (Lok Sabha), Gujarat',
  'Hindutva, Zero-tolerance Security Policy, Organizational Centralization'
),
(
  'leader-gadkari',
  'party-bjp',
  'Nitin Gadkari',
  'Minister of Road Transport & Highways',
  'Senior BJP leader widely credited with record-speed expansion of national highways, expressways, and logistics corridors across India.',
  'Nagpur (Lok Sabha), Maharashtra',
  'Infrastructure-led Economic Growth, Pragmatic Governance'
),
(
  'leader-rahul',
  'party-inc',
  'Rahul Gandhi',
  'Leader of the Opposition in Lok Sabha',
  'Five-term Member of Parliament, former Congress President, and key architect of the Bharat Jodo Yatra and national caste census demand.',
  'Rae Bareli (Lok Sabha), Uttar Pradesh',
  'Social Justice, Constitutional Rights Protection, Inclusive Welfare Capitalism'
),
(
  'leader-kharge',
  'party-inc',
  'Mallikarjun Kharge',
  'President of Indian National Congress & LoP (Rajya Sabha)',
  'Veteran parliamentarian and Dalit leader with over five decades of legislative experience in Karnataka and central politics.',
  'Rajya Sabha (Karnataka)',
  'Democratic Socialism, Affirmative Action, Secularism'
),
(
  'leader-kejriwal',
  'party-aap',
  'Arvind Kejriwal',
  'National Convener, Aam Aadmi Party',
  'Ramon Magsaysay awardee and former IRS officer who founded AAP in 2012; served three terms as Chief Minister of Delhi before resigning in 2024 following his excise case bail.',
  'New Delhi',
  'Welfare Populism, Citizen-Centric Governance, Anti-Establishment Reform'
),
(
  'leader-atishi',
  'party-aap',
  'Atishi',
  'Chief Minister of Delhi',
  'Oxford alumnus and key architect of the Delhi government education turnaround who assumed the Chief Ministership of Delhi in 2024.',
  'Kalkaji, Delhi Legislative Assembly',
  'Public Sector Quality Revamp, Rights-based Social Welfare'
),
(
  'leader-mamata',
  'party-tmc',
  'Mamata Banerjee',
  'Chief Minister of West Bengal (2011–Present)',
  'Founder and chairperson of TMC; three-time Chief Minister who dislodged the 34-year Left Front regime through grassroots agrarian movements (Singur and Nandigram).',
  'Bhabanipur, West Bengal Legislative Assembly',
  'Bengali Sub-nationalism, Grassroots Populism, Women-Centric Direct Welfare'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  represents = EXCLUDED.represents,
  ideology = EXCLUDED.ideology;

-- 3. INCIDENTS & PROTESTS
INSERT INTO incidents (id, party_id, title, description, date_year, location, severity, category, demands, state_response, citizen_impact, deaths_reported, source_url, source_name)
VALUES
-- Protests
(
  'inc-protest-farmers-2',
  'party-bjp',
  'Farmers’ Dilli Chalo Agitation & Statutory MSP Guarantee Protests',
  'In February 2024, tens of thousands of farmers under the banner of Samyukt Kisan Morcha (Non-Political) and Kisan Mazdoor Morcha launched the "Dilli Chalo" march demanding a statutory legal guarantee for Minimum Support Prices (MSP) calculated via the Swaminathan Commission’s C2+50% formula. Heavy barricading and state police deterrence at the Haryana border resulted in prolonged encampments at Shambhu and Khanauri border points lasting through 2024.',
  2024,
  'Shambhu & Khanauri Borders (Punjab–Haryana) / New Delhi',
  'extreme',
  'protest',
  'Statutory legal guarantee for MSP on all crops using C2+50% formula; complete waiver of agricultural debts; pension of ₹10,000/month for farmers and agricultural laborers aged 60+; implementation of the Land Acquisition Act 2013 with farmer consent; withdrawal of all police cases registered during the 2020–21 agitation; justice and compensation for the victims of the Lakhimpur Kheri incident.',
  'Haryana and Central authorities converted state borders into fortified buffer zones with multi-layer concrete blocks, iron nails welded to highways, and concertina wire. Drones were deployed to drop tear-gas canisters across the border onto farmers in Punjab territory. Mobile internet and bulk SMS were suspended in multiple districts. On February 21, 2024, 21-year-old farmer Shubhkaran Singh was killed at Khanauri border from suspected firearm/pellet head injury, prompting the Punjab & Haryana High Court to constitute a judicial probe headed by a retired High Court judge.',
  '5 protester casualties recorded. Prolonged multi-month blockades disrupted northern inter-state trade, national highways, and logistics corridors; heightened national debates on the economic viability of farm guarantees versus severe agrarian distress.',
  5,
  'https://www.thehindu.com/news/national/',
  'Punjab & Haryana High Court Orders & The Hindu'
),
(
  'inc-protest-doctors-rg-kar',
  'party-tmc',
  'Pan-India Resident Doctors’ Cease-Work & "Reclaim the Night" Protests (RG Kar Movement)',
  'Following the brutal rape and murder of an on-duty 31-year-old postgraduate trainee doctor at RG Kar Medical College in Kolkata, junior doctors across West Bengal launched an unprecedented cease-work, fast-unto-death relay, and public campaign demanding workplace safety and institutional justice. The protest evolved into a historic mass civil movement characterized by midnight "Reclaim the Night" rallies across global cities.',
  2024,
  'Kolkata, West Bengal & Pan-India Medical Colleges',
  'extreme',
  'protest',
  'Immediate trial and maximum penalty for all perpetrators and conspirators; dismantling of the corrupt syndicate in state medical administration; removal of Kolkata Police Commissioner Vineet Goyal for botching crime scene preservation; institutional safety protocols including 24/7 security guards, functional CCTV networks, panic buttons, and gender-segregated on-call doctor rooms; end to the pervasive intimidation culture in state medical councils.',
  'Initial institutional efforts by state health authorities attempted to label the death as suicide and rapidly renovate spaces next to the crime scene. On August 14, 2024, a midnight mob stormed and ransacked the hospital emergency department while Kolkata police stood by. Following weeks of stalemate, Chief Minister Mamata Banerjee held direct live-broadcast negotiations with protesting doctors, conceding the removal of the Kolkata Police Commissioner and director of medical education. The Supreme Court took suo motu cognizance and set up a National Task Force (NTF) for healthcare workers.',
  '1 casualty (the murder of the on-duty doctor). Electrified civil society on women’s safety in public institutions. While non-emergency outpatient services in Bengal were suspended for over 50 days, protesting doctors operated free citizen "Abhaya Clinics" in public parks providing medical relief to over 50,000 citizens.',
  1,
  'https://main.sci.gov.in/',
  'Supreme Court of India (Suo Motu WP (Crl.) No. 2/2024) & Calcutta High Court'
),
(
  'inc-protest-neet-leak',
  'party-bjp',
  'NEET-UG & UGC-NET Paper Leak National Student Protests',
  'Following the announcement of NEET-UG 2024 medical entrance results, unprecedented anomalies emerged—including 67 students securing the top rank (720/720), arbitrary grace marks awarded to over 1,500 candidates, and reports of solved question paper leaks. Massive student demonstrations broke out nationwide, demanding the scrapping of the exam and an overhaul of the National Testing Agency (NTA). The crisis intensified when the Ministry of Education cancelled the UGC-NET exam 24 hours after conducting it due to compromised integrity.',
  2024,
  'Jantar Mantar (New Delhi), Patna, Kota & Pan-India',
  'extreme',
  'protest',
  'Complete cancellation and re-examination of NEET-UG 2024; comprehensive independent CBI inquiry into the NTA and paper-leak solver gangs; abolition of centralized computer testing monopolies; strict criminal sentencing for examination mafia; resignation of Union Education Minister Dharmendra Pradhan.',
  'The Union Government initially dismissed claims of widespread leakage as isolated. However, investigations by the Bihar Police Economic Offences Unit (EOU) confirmed burnt copies of the question paper in Patna, leading to multiple arrests of organized solver gangs. The Union Government removed NTA Director General Subodh Kumar Singh, notified the Public Examinations (Prevention of Unfair Means) Act 2024 with penalties up to 10 years in jail, and appointed an expert panel headed by former ISRO chief K. Radhakrishnan to reform testing architecture.',
  'Impacted over 2.4 million medical aspirants and their families, causing profound mental distress and multi-month delays in national medical admissions.',
  0,
  'https://main.sci.gov.in/',
  'Supreme Court of India (Vanshika Shukla v. NTA) & Bihar EOU / CBI Findings'
),
(
  'inc-protest-ladakh-wangchuk',
  'party-bjp',
  'Ladakh Statehood & Sixth Schedule Climate Protests (Sonam Wangchuk’s March)',
  'Led by education reformer and Magsaysay awardee Sonam Wangchuk along with the Leh Apex Body and Kargil Democratic Alliance, thousands of Ladakhi citizens engaged in prolonged hunger strikes, climate fasts, and a 1,000-km march to New Delhi. The agitations protest against direct bureaucratic rule by the UT administration and demand constitutional safeguards for Ladakh’s fragile Himalayan ecosystem.',
  2024,
  'Leh (Ladakh) to Singhu Border / Rajghat, New Delhi',
  'mild',
  'protest',
  'Constitutional inclusion of Ladakh in the Sixth Schedule of the Constitution to protect tribal land ownership and culture (97% tribal population); restoration of full statehood with a legislative assembly; separate Lok Sabha seats for Leh and Kargil; creation of an independent Ladakh Public Service Commission to guarantee government employment for local youth; moratorium on unchecked industrial mining on glacial pastures.',
  'High-level committee talks held by the Union Ministry of Home Affairs stalled without granting constitutional Sixth Schedule protections. When Sonam Wangchuk and 150 Ladakhi volunteers undertook the 30-day "Delhi Chalo Padyatra" walking 1,000 km to Delhi in September–October 2024, Delhi Police imposed Section 163 BNSS prohibitions across state borders and detained Wangchuk and all 150 marchers at the Singhu border for over 36 hours before permitting a restricted visit to Rajghat.',
  'Wangchuk completed a 21-day climate fast on water and salt in sub-zero -15°C temperatures; galvanized national public consciousness around the environmental fragility of Himalayan glaciers and the lack of representative democracy under UT status.',
  0,
  'https://www.thehindu.com/news/national/',
  'Delhi High Court Habeas Corpus Petitions & The Hindu / BBC'
),
(
  'inc-protest-wrestlers',
  'party-bjp',
  'Olympic Wrestlers’ Sit-in Protest against Brij Bhushan Sharan Singh',
  'India’s top decorated international wrestlers—including Olympic medalists Sakshi Malik, Bajrang Punia, and World Championship medalist Vinesh Phogat—camped on the pavements of Jantar Mantar for 38 days in protest against Wrestling Federation of India (WFI) President and sitting BJP MP Brij Bhushan Sharan Singh, accusing him of systemic sexual harassment and intimidation of female athletes.',
  2023,
  'Jantar Mantar, New Delhi',
  'extreme',
  'protest',
  'Immediate criminal arrest and prosecution of Brij Bhushan Sharan Singh; dissolution of the existing WFI management; establishment of an independent, women-led safety committee in sports federations; protection for the complainant female wrestlers.',
  'Delhi Police initially refused to register an FIR for months, filing cases only after the Supreme Court issued direct notices. On May 28, 2023 (the day of the new Parliament building inauguration), Delhi Police forcibly cleared the protest site, dragging Olympic medalists onto police buses, detaining them, and dismantling their tents. Police subsequently filed a 1,500-page chargesheet, and a Delhi court framed criminal charges for sexual harassment against Brij Bhushan under IPC Sections 354, 354A, and 354D.',
  'Public spectacle of Olympic heroes sleeping on footpaths and threatening to immerse their medals in the river Ganga in Haridwar; sparked nationwide reckoning regarding sexual abuse and political shielding in Indian sports bodies.',
  0,
  'https://delhidistrictcourts.nic.in/',
  'Delhi Rouse Avenue Court Orders & Supreme Court of India'
),
(
  'inc-protest-agnipath',
  'party-bjp',
  'Nationwide Agnipath Military Recruitment Scheme Youth Protests',
  'In June 2022, the Central Government announced the "Agnipath" scheme, ending decades of permanent armed forces recruitment and replacing it with a 4-year contractual tour of duty, where 75% of recruits ("Agniveers") are demobilized without lifelong pension, canteen (CSD), or ex-serviceman status. Spontaneous and fierce youth protests erupted across railway hubs and military-feeder belts.',
  2022,
  'Bihar, Uttar Pradesh, Telangana, Haryana, Rajasthan',
  'extreme',
  'protest',
  'Immediate rollback of the 4-year Agnipath contractual framework; reinstatement of regular, permanent soldier recruitment with lifelong pension benefits; completion of recruitment processes for over 1.5 lakh youth whose entrance tests had been cleared prior to the freeze.',
  'Security forces deployed baton charges, tear gas, and live firing. In Secunderabad, a 24-year-old protester was killed in police firing. Over 1,000 youth were arrested, and internet services were suspended across multiple states. Armed forces issued directives requiring a police clearance certificate confirming non-involvement in protests as a precondition for Agniveer recruitment. The Supreme Court upheld the constitutional validity of the scheme as a sovereign policy choice.',
  '2 deaths reported. Arson and destruction of multiple train rakes (Danapur, Secunderabad) causing hundreds of crores in railway property loss; deep economic anxiety among rural youth from traditional soldier-providing families.',
  2,
  'https://main.sci.gov.in/',
  'Supreme Court of India (Harsh Vardhan v. Union of India) & Railway Board Records'
),
-- Major Violent Incidents & Crises
(
  'inc-pahalgam-terror',
  'party-bjp',
  'Pahalgam Civilian & Tourist Terror Attack (Jammu & Kashmir)',
  'A devastating terrorist attack targeting civilians and visiting tourists in the Baisaran Valley meadow near Pahalgam, Anantnag district, Jammu & Kashmir. Armed militants linked to The Resistance Front (TRF) / Lashkar-e-Taiba opened fire on unarmed tourists and local pony operators who intervened to protect them. The massacre occurred under direct Union Ministry of Home Affairs governance in Jammu & Kashmir, exposing severe gaps in high-altitude tourist security protocols and triggering nationwide grief and retaliatory counter-terror manhunts.',
  2025,
  'Baisaran Valley, Pahalgam, Jammu & Kashmir',
  'extreme',
  'terror',
  NULL,
  'Security forces launched Operation Sindoor across South Kashmir, cordon-and-search operations in high altitude meadows, and retaliatory diplomatic/economic measures including placing the Indus Waters Treaty in abeyance.',
  '26 innocent civilians (including domestic tourists and local Kashmiri pony operators) were massacred in cold blood. The attack shattered tourist confidence, dealt a severe economic blow to local service workers and tour operators, and raised intense questions about intelligence and perimeter defense under direct central administration.',
  26,
  'https://www.thehindu.com/news/national/jammu-and-kashmir/',
  'The Hindu & PIB Official Statements'
),
(
  'inc-manipur-women-paraded',
  'party-bjp',
  'Manipur Ethnic Violence: Women Stripped, Paraded Naked & Sexually Assaulted',
  'On May 4, 2023, amidst brutal ethnic clashes between Meitei and Kuki-Zo communities in Manipur, a heavily armed mob attacked B. Phainom village in Kangpokpi district, abducted two Kuki women, stripped them naked, paraded them through the streets, and subjected one to gang-rape in broad daylight. Two male relatives who attempted to protect the women were murdered on the spot. Despite an FIR filed on May 18, state police took virtually no action for over two months until the horrific video went viral globally in July 2023. The Supreme Court of India initiated suo motu proceedings, expressing deep anguish and censuring the Manipur State and Union governments for using women as instruments of perpetrating violence and total failure of the state machinery.',
  2023,
  'B. Phainom Village, Kangpokpi District, Manipur',
  'extreme',
  'violence',
  NULL,
  'State police sat on zero FIR for two months; Supreme Court intervened to transfer prosecution to CBI and appointed an all-women former judges committee headed by Justice Gita Mittal.',
  'Gross human rights violation, weaponization of gang-rape and sexual violence against women during ethnic conflict, and state failure to protect citizens. Over 220 people were killed in the broader Manipur violence, over 60,000 citizens internally displaced into squalid relief camps, and internet banned for months under Chief Minister N. Biren Singh’s administration.',
  220,
  'https://main.sci.gov.in/supremecourt/2023/20857/20857_2023_1_1501_45781_Judgement_07-Aug-2023.pdf',
  'Supreme Court of India (Dinganglung Gangmei v. State of Manipur)'
),
(
  'inc-sikkim-governor-controversy',
  'party-bjp',
  'Sikkim Gubernatorial Appointment Controversy & the Ankita Bhandari Case Allegations',
  'The Union Government’s appointment of senior BJP national leader Dushyant Kumar Gautam as the Governor of Sikkim sparked massive public outrage and protests across New Delhi and Uttarakhand. Protests were led by the parents of 19-year-old receptionist Ankita Bhandari—who was murdered in 2022 at a Rishikesh resort owned by Pulkit Arya (son of a former BJP leader, convicted and sentenced to life imprisonment) for refusing to provide illicit “special services” to an unnamed “VIP”. The victim’s family and opposition parties publicly demanded an independent CBI probe into the “VIP” angle, questioning why Gautam was elevated to a high constitutional office conferring absolute criminal immunity under Article 361 of the Constitution while allegations remained unresolved. Gautam vehemently rejected all allegations as politically motivated, baseless, and filed defamation suits, asserting no court or chargesheet has named or convicted him.',
  2024,
  'Sikkim / New Delhi / Uttarakhand',
  'extreme',
  'scandal',
  'Withdrawal or suspension of gubernatorial appointment; comprehensive CBI investigation into the unnamed VIP angle in Ankita Bhandari murder case; removal of Article 361 shield for criminal investigations.',
  'BJP leaders and Sikkim unit defended the constitutional appointment, noting no official charges or conviction; Gautam filed defamation suits against accusers.',
  'Sparked nationwide public indignation over the perceived shielding of politically connected figures using gubernatorial appointments and Article 361 immunity. The victim’s grieving parents staged protests at India Gate demanding justice, raising critical questions regarding institutional accountability and safety of young women workers in hospitality.',
  1,
  'https://www.thehindu.com/news/national/',
  'The Hindu & India Today News Investigation'
),
(
  'inc-morbi-bridge',
  'party-bjp',
  'Morbi Suspension Bridge Collapse Tragedy (Gujarat)',
  'The historic British-era suspension bridge over the Machchhu River in Morbi, Gujarat, collapsed just four days after being reopened to the public following uncertified repairs. The municipal maintenance contract had been awarded for 15 years to clockmaker Oreva Group without a competitive open tender, fitness audit, or crowd management protocol. Over 400 people were on the bridge when the rusted cables snapped.',
  2022,
  'Morbi, Gujarat',
  'extreme',
  'disaster',
  NULL,
  'SIT constituted by Gujarat government; arrest of Oreva MD Jaysukh Patel; Gujarat High Court mandated interim compensation and monitoring of municipal contracting reforms.',
  '141 innocent citizens lost their lives, including 47 children and dozens of women. The tragedy laid bare municipal corruption, crony contracting, and negligence by local authorities and private operators.',
  141,
  'https://gujarathighcourt.nic.in/',
  'Gujarat High Court Suo Motu PIL on Morbi Collapse'
),
(
  'inc-1984-anti-sikh-riots',
  'party-inc',
  '1984 Anti-Sikh Massacres Following Indira Gandhi’s Assassination',
  'Following the tragic assassination of Prime Minister Indira Gandhi by her bodyguards on October 31, 1984, organized mobs led by local Congress leaders unleashed four days of horrific violence targeting Sikh families across Delhi, Kanpur, and Bokaro. Mobs were armed with voter lists, iron rods, kerosene, and tires, burning Sikh men alive and looting properties while Delhi Police remained passive or actively disarmed victims. Decades later, judicial inquiries and the Delhi High Court convicted senior Congress leaders like Sajjan Kumar for criminal conspiracy and genocide.',
  1984,
  'Delhi, Kanpur, Bokaro',
  'extreme',
  'violence',
  NULL,
  'Decades of delayed inquiries (Marwah, Misra, Nanavati Commissions); Delhi High Court overturned acquittals in 2018 sentencing key leaders to life imprisonment.',
  'Over 3,350 Sikh men, women, and children were slaughtered across India (nearly 2,800 in Delhi alone). Destroyed entire neighborhoods (Trilokpuri, Kalyanpuri), left thousands of widows and orphans, and remains one of the darkest stains on India’s secular democracy.',
  3350,
  'https://delhihighcourt.nic.in/upload/Judgments/Judgments_PDF/17122018_CRL_A_1099_2013.pdf',
  'Delhi High Court Judgment (State v. Sajjan Kumar) & Nanavati Commission Report'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  date_year = EXCLUDED.date_year,
  location = EXCLUDED.location,
  severity = EXCLUDED.severity,
  category = EXCLUDED.category,
  demands = EXCLUDED.demands,
  state_response = EXCLUDED.state_response,
  citizen_impact = EXCLUDED.citizen_impact,
  deaths_reported = EXCLUDED.deaths_reported,
  source_url = EXCLUDED.source_url,
  source_name = EXCLUDED.source_name;
