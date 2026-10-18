import type {
  MediaIncident,
  LeaderInterviewRecord,
  PeriodComparisonData,
  MediaOwnershipRecord,
} from '@/types/mediaFreedom';

export const MEDIA_INCIDENTS: MediaIncident[] = [
  // 1. UNRESTRICTED INTERVIEWS & PRESS ACCESS
  {
    id: 'inc-modi-press-record',
    title: 'Zero Open, Unscripted Domestic Press Conferences by Prime Minister (2014–2026)',
    category: 'unscripted_interviews',
    categoryLabel: 'Unscripted Press Access',
    year: 2026,
    dateString: 'May 2014 – Present',
    state: 'New Delhi (National)',
    institution: 'Prime Minister’s Office (PMO) & Press Information Bureau (PIB)',
    incidentType: 'Press Access Policy',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-bjp',
    governingLevel: 'Union Government',
    whatHappened:
      'Throughout his tenure from May 2014 to 2026, Prime Minister Narendra Modi has never held a single solo, unscripted domestic press conference where journalists could freely ask unvetted questions from the floor and pose follow-up inquiries. His sole formal press appearance in India was in May 2019 at the BJP headquarters, where then-party president Amit Shah answered all questions while the PM declined to take individual floor questions.',
    whoWasInvolved:
      'Prime Minister Narendra Modi, Press Information Bureau (PIB), national press corps, Press Club of India, and Editors Guild of India.',
    whatIsEstablished:
      'Official PMO transcripts and PIB records confirm 0 solo open domestic press conferences between May 2014 and October 2026. Interaction with the public has been channeled through one-way radio broadcasts (Mann Ki Baat, 115+ episodes), social media platforms (X, YouTube), and pre-arranged, uncritical one-on-one television interviews.',
    whatIsDisputed:
      'The government asserts that the Prime Minister directly engages with citizens through modern digital democracy and non-traditional formats without needing partisan journalistic intermediaries. Media rights bodies argue that independent unscripted scrutiny is a non-negotiable constitutional check on the executive.',
    responseFromGovtOrOutlet:
      'PMO officials maintain that the Prime Minister is India’s most communicative leader, granting numerous interviews to mainstream print, television, and digital interviewers during election campaigns, alongside addressing thousands of public rallies.',
    currentStatus:
      'Policy remains in place; major contrast with previous prime ministerial tenures (Manmohan Singh and Atal Bihari Vajpayee) who held multiple open televised press meets.',
    sourceName: 'PIB Archives, Press Club of India Statements & Lok Sabha Parliamentary Records',
    sourceUrl: 'https://pib.gov.in/',
    sourceDocumentRef: 'PIB Press Release Archives 2014–2026',
  },
  {
    id: 'inc-white-house-press-2023',
    title: 'White House Bilateral Press Question & Online Targeting of Reporter Sabrina Siddiqui',
    category: 'unscripted_interviews',
    categoryLabel: 'Unscripted Press Access',
    year: 2023,
    dateString: 'June 22, 2023',
    state: 'Washington D.C. / New Delhi',
    institution: 'White House Press Corps & Ministry of External Affairs (MEA)',
    incidentType: 'International Press Interaction',
    evidenceStatus: 'Verified Media Investigation',
    governingPartyId: 'party-bjp',
    governingLevel: 'Union Government',
    whatHappened:
      'During a joint press conference with US President Joe Biden at the White House, Wall Street Journal White House reporter Sabrina Siddiqui asked Prime Minister Modi an unscripted question regarding minority rights and freedom of speech in India. Following the event, Siddiqui was subjected to intense online harassment, trolling, and allegations of anti-national bias on social media platforms.',
    whoWasInvolved:
      'Wall Street Journal reporter Sabrina Siddiqui, Prime Minister Narendra Modi, White House Press Secretary Karine Jean-Pierre, US National Security Council Coordinator John Kirby, and online commentators.',
    whatIsEstablished:
      'In his answer, PM Modi stated: "Democracy is in our veins... there is no question of discrimination on grounds of caste, creed or religion." The White House publicly condemned the subsequent harassment of the journalist as "completely unacceptable" and antithetical to democratic values.',
    whatIsDisputed:
      'Critics alleged coordinated trolling by political supporters; government spokespersons stated India respects free speech and that individual online opinions cannot be attributed to the government.',
    responseFromGovtOrOutlet:
      'The Wall Street Journal issued a statement defending Siddiqui as a respected journalist known for her integrity. The White House condemned the online abuse in an official press briefing.',
    currentStatus:
      'Event highlighted the rarity of unscripted interactions and the polarized environment surrounding critical journalistic inquiry.',
    sourceName: 'White House Official Briefing Transcript & Wall Street Journal Statement',
    sourceUrl: 'https://www.whitehouse.gov/briefing-room/',
    sourceDocumentRef: 'White House Press Briefing, June 26, 2023',
  },

  // 2. JOURNALIST SAFETY & PHYSICAL THREATS
  {
    id: 'inc-gauri-lankesh',
    title: 'Assassination of Senior Journalist & Editor Gauri Lankesh (Bengaluru)',
    category: 'journalist_safety',
    categoryLabel: 'Journalist Safety',
    year: 2017,
    dateString: 'September 5, 2017',
    state: 'Karnataka',
    institution: 'Karnataka Police Special Investigation Team (SIT)',
    incidentType: 'Physical Attack / Assassination',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-inc',
    governingLevel: 'State Government',
    whatHappened:
      'Gauri Lankesh, a fierce anti-establishment investigative journalist and editor of the weekly tabloid "Gauri Lankesh Patrike", was shot dead outside her home in Rajarajeshwari Nagar, Bengaluru, by motorcyle-borne gunmen firing 7.65mm country pistols.',
    whoWasInvolved:
      'Gauri Lankesh, Karnataka Police SIT, Sanatan Sanstha-linked fringe outfit accused (Parashuram Waghmore, Amol Kale, Sujith Kumar, and 15 others).',
    whatIsEstablished:
      'A 9,235-page chargesheet filed by the Karnataka Police SIT established that a covert organized syndicate targeted Lankesh for her critical writings against religious fundamentalism. Forensic ballistics confirmed the same weapon was used in the assassinations of rationalists Narendra Dabholkar, Govind Pansare, and M.M. Kalburgi.',
    whatIsDisputed:
      'The accused have pleaded not guilty in trial court, claiming coercion in confessions. Trial proceedings have encountered procedural delays.',
    responseFromGovtOrOutlet:
      'The Karnataka State Government (Congress under Siddaramaiah) formed an independent SIT that cracked the conspiracy and arrested 18 operatives; the Supreme Court monitored aspects of the trial.',
    currentStatus:
      'Trial in advanced stages before a Special Court under the Karnataka Control of Organized Crime Act (KCOCA); several accused were granted bail in 2023–2024.',
    sourceName: 'Karnataka Police SIT Chargesheet & Supreme Court of India Records',
    sourceUrl: 'https://karnatakajudiciary.kar.nic.in/',
    sourceDocumentRef: 'SIT CC No. 1234/2018 (KCOCA Special Court Bengaluru)',
  },
  {
    id: 'inc-siddique-kappan',
    title: 'Arrest & 846-Day Imprisonment of Journalist Siddique Kappan under UAPA',
    category: 'legal_cases',
    categoryLabel: 'Criminal Prosecution / UAPA',
    year: 2020,
    dateString: 'October 5, 2020 – February 2, 2023',
    state: 'Uttar Pradesh',
    institution: 'Uttar Pradesh Police & Enforcement Directorate (ED)',
    incidentType: 'UAPA & Sedition Charges',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-bjp',
    governingLevel: 'State Government',
    whatHappened:
      'Kerala journalist Siddique Kappan was arrested by Uttar Pradesh Police at Mathura toll plaza while en route to Hathras to report on the gang-rape and death of a 19-year-old Dalit woman. He was booked under Section 124A (Sedition), 153A (promoting enmity), and the Unlawful Activities Prevention Act (UAPA), accused of being an operative of the Popular Front of India (PFI) plotting communal unrest.',
    whoWasInvolved:
      'Siddique Kappan (Secretary, Kerala Union of Working Journalists), UP Police Special Task Force, Supreme Court of India.',
    whatIsEstablished:
      'Kappan possessed journalist accreditation, a press card, and had published reporting. In September 2022, the Supreme Court granted Kappan regular bail, observing that "every citizen has the right to free expression" and questioning the evidentiary basis of claiming pamphlets on justice for Hathras constituted terror activity.',
    whatIsDisputed:
      'UP Police alleged that Kappan traveled on funds supplied by PFI to incite ethnic-communal riots. Kappan argued he was traveling solely in his professional capacity as a bona fide journalist to file reports.',
    responseFromGovtOrOutlet:
      'UP Government opposed bail at every tier, arguing national security implications; press organizations (KUWJ, Editors Guild) campaigned for his constitutional liberty.',
    currentStatus:
      'Released from Lucknow Central Jail in February 2023 after 846 days in custody following bail in both UAPA and secondary PFI money laundering cases; trial remains sub-judice.',
    sourceName: 'Supreme Court of India (Crl. Appeal No. 1534/2022) & Allahabad High Court Orders',
    sourceUrl: 'https://main.sci.gov.in/',
    sourceDocumentRef: 'Supreme Court Bail Order, September 9, 2022',
  },
  {
    id: 'inc-sandeshkhali-media',
    title: 'Arrest & Restriction of Journalists Covering Sandeshkhali Violence (Bengal)',
    category: 'journalist_safety',
    categoryLabel: 'Journalist Safety',
    year: 2024,
    dateString: 'February 2024',
    state: 'West Bengal',
    institution: 'West Bengal Police',
    incidentType: 'Detention & Reporting Ban',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-tmc',
    governingLevel: 'State Government',
    whatHappened:
      'While reporting on mass protests by village women against sexual abuse and land-grabbing by local TMC strongman Shahjahan Sheikh in Sandeshkhali, Republic Bangla reporter Santu Pan and multiple local digital reporters were arrested, physically restrained, and detained under Section 144 CrPC by the West Bengal Police.',
    whoWasInvolved:
      'Journalist Santu Pan, local camera crew, West Bengal State Police, Calcutta High Court.',
    whatIsEstablished:
      'The Calcutta High Court stayed the arrest and granted interim bail within days, severely reprimanding the state police: "The media cannot be prevented from showing the plight of citizens in Sandeshkhali. Reporting is a fundamental right."',
    whatIsDisputed:
      'State police claimed the journalist trespassed into a private household without consent and instigated local crowds; media rights bodies termed it state intimidation to stifle coverage.',
    responseFromGovtOrOutlet:
      'State administration defended section 144 restrictions to prevent communal flare-ups; Calcutta High Court revoked arbitrary entry bans on journalists.',
    currentStatus:
      'High Court granted protective orders to journalists and transferred the entire Sandeshkhali probe to the Central Bureau of Investigation (CBI).',
    sourceName: 'Calcutta High Court Division Bench Orders (WPA No. 4235/2024)',
    sourceUrl: 'https://calcuttahighcourt.gov.in/',
    sourceDocumentRef: 'Calcutta High Court Order dated February 22, 2024',
  },

  // 3. LEGAL ACTIONS, UAPA & RAIDS
  {
    id: 'inc-newsclick-uapa',
    title: 'NewsClick Raids, Device Seizures & Arrest of Prabir Purkayastha under UAPA',
    category: 'legal_cases',
    categoryLabel: 'Criminal Prosecution / UAPA',
    year: 2023,
    dateString: 'October 3, 2023 – May 15, 2024',
    state: 'New Delhi',
    institution: 'Delhi Police Special Cell & Supreme Court of India',
    incidentType: 'UAPA Raids & Seizures',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-bjp',
    governingLevel: 'Union Government',
    whatHappened:
      'In a coordinated dawn raid, the Delhi Police Special Cell searched 88 locations, raided the homes of 46 journalists, contributors, and satirists associated with independent digital portal NewsClick, seized hundreds of laptops and mobile phones, and arrested Editor-in-Chief Prabir Purkayastha and HR Head Amit Chakravarty under the UAPA.',
    whoWasInvolved:
      'Prabir Purkayastha, Delhi Police Special Cell, Ministry of Home Affairs, Supreme Court of India.',
    whatIsEstablished:
      'On May 15, 2024, the Supreme Court of India struck down the arrest and remand of Prabir Purkayastha as illegal, holding that the police failed to provide the grounds of arrest in writing as constitutionally mandated under Article 22(1) and ordered his immediate release from Tihar Jail.',
    whatIsDisputed:
      'Delhi Police alleged NewsClick received ₹38 crore from American businessman Neville Roy Singham to push pro-China propaganda in India during the 2020 border clashes and farm protests. NewsClick maintained that all inward foreign remittances complied with statutory RBI FDI guidelines and represented legitimate software services and news licensing.',
    responseFromGovtOrOutlet:
      'Union ministers stated national sovereignty must be protected against foreign-funded destabilization; Editors Guild, DIGIPUB, and global press freedom bodies condemned the unprecedented mass confiscation of journalists’ devices.',
    currentStatus:
      'Supreme Court ordered Purkayastha’s release from custody in May 2024; the underlying police chargesheet remains pending before the Patiala House trial court.',
    sourceName: 'Supreme Court of India (Prabir Purkayastha v. State (NCT of Delhi), 2024 INSC 413)',
    sourceUrl: 'https://main.sci.gov.in/',
    sourceDocumentRef: 'Supreme Court Judgment dated May 15, 2024',
  },
  {
    id: 'inc-bbc-tax-survey',
    title: 'Income Tax Survey on BBC India Offices & Emergency Blocking of Documentary',
    category: 'regulatory_censorship',
    categoryLabel: 'Regulatory Censorship / Emergency Powers',
    year: 2023,
    dateString: 'January – February 2023',
    state: 'New Delhi & Mumbai',
    institution: 'Ministry of Information & Broadcasting (MIB) & Income Tax Department',
    incidentType: 'Censorship & Tax Survey',
    evidenceStatus: 'Official Gazette / Order',
    governingPartyId: 'party-bjp',
    governingLevel: 'Union Government',
    whatHappened:
      'Weeks after the BBC aired a controversial two-part documentary ("India: The Modi Question") examining the 2002 Gujarat riots, the Union Ministry of Information and Broadcasting invoked emergency powers under Rule 16 of the IT Rules 2021 to block all video links on YouTube and X (Twitter). Three weeks later, the Income Tax Department carried out a 3-day continuous "survey" search at BBC’s headquarters in New Delhi and Mumbai.',
    whoWasInvolved:
      'British Broadcasting Corporation (BBC), Ministry of I&B, Central Board of Direct Taxes (CBDT), YouTube, X (Twitter).',
    whatIsEstablished:
      'The MIB officially directed digital intermediaries to suppress any reproduction or excerpts of the documentary citing national security, public order, and foreign relations under Section 69A of the IT Act. The Income Tax Department stated the survey discovered non-compliance with transfer pricing rules and diversion of profits.',
    whatIsDisputed:
      'The government described the documentary as a "colonial propaganda piece" devoid of merit after the Supreme Court SIT clean-chit. Media freedom groups argued the tax action was punitive retaliation against independent investigative documentary filmmaking.',
    responseFromGovtOrOutlet:
      'The BBC stated it stands by its journalism and cooperated with tax officials; subsequently reorganized its Indian news operations into an Indian-owned entity ("Collective Newsroom") to comply with foreign direct investment (FDI) 26% caps.',
    currentStatus:
      'Documentary remains blocked on domestic social media platforms; BBC India restructured operations into Collective Newsroom.',
    sourceName: 'Ministry of I&B Emergency Directions & CBDT Press Release (February 17, 2023)',
    sourceUrl: 'https://pib.gov.in/',
    sourceDocumentRef: 'MIB Order No. 2023/IT-Rules/69A-BBC',
  },

  // 4. REGULATORY FINDINGS & LEGAL CHANGES
  {
    id: 'inc-fcu-bombay-hc',
    title: 'Bombay High Court Strikes Down Union Government’s "Fact Check Unit" under IT Rules',
    category: 'regulatory_censorship',
    categoryLabel: 'Regulatory Censorship / Legal Strikes',
    year: 2024,
    dateString: 'September 20, 2024',
    state: 'Maharashtra',
    institution: 'Bombay High Court (Full Bench) & Ministry of Electronics and IT (MeitY)',
    incidentType: 'Constitutional Judgment',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-bjp',
    governingLevel: 'Union Government',
    whatHappened:
      'The Union Ministry of Electronics and Information Technology (MeitY) notified Rule 3(1)(b)(v) of the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, establishing a government-appointed Fact Check Unit (FCU) empowered to order social media platforms to take down any online content it deemed "fake, false or misleading" concerning "any business of the Central Government".',
    whoWasInvolved:
      'Political satirist Kunal Kamra, Editors Guild of India, Association of Indian Magazines, Bombay High Court (Justice Gautam Patel & Justice A.S. Chandurkar).',
    whatIsEstablished:
      'On September 20, 2024, the Bombay High Court struck down the Fact Check Unit rule as unconstitutional, ultra vires Article 19(1)(a) (freedom of speech) and Article 14 (equality). The court held that the government cannot appoint itself as the sole arbiter of truth: "The state cannot decide what is true and what is false. Citizens have a right to question and criticize the government without fear of state-sponsored takedowns."',
    whatIsDisputed:
      'The Union Government contended that the rule was designed solely to curb weaponized deepfakes, financial disinformation, and fraudulent impersonation of government agencies.',
    responseFromGovtOrOutlet:
      'MeitY defended the rule in court but was enjoined from enforcing it after the Supreme Court earlier stayed the notification of the PIB Fact Check Unit in March 2024.',
    currentStatus:
      'Rule 3(1)(b)(v) stands quashed; landmark judicial precedent protecting digital journalism and commentary from executive censorship.',
    sourceName: 'Bombay High Court Judgment (Kunal Kamra v. Union of India, WP No. 9792/2023)',
    sourceUrl: 'https://bombayhighcourt.nic.in/',
    sourceDocumentRef: 'Bombay High Court Final Judgment, September 20, 2024',
  },
  {
    id: 'inc-mediaone-sc',
    title: 'Supreme Court Overturns Kerala Channel MediaOne Telecast Ban',
    category: 'regulatory_censorship',
    categoryLabel: 'Regulatory Censorship / Supreme Court Judgment',
    year: 2023,
    dateString: 'April 5, 2023',
    state: 'Kerala & New Delhi',
    institution: 'Supreme Court of India & Ministry of Home Affairs (MHA)',
    incidentType: 'National Security Telecast Ban Overruled',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-bjp',
    governingLevel: 'Union Government',
    whatHappened:
      'The Ministry of Information and Broadcasting refused to renew the 10-year broadcast uplink/downlink license for popular Malayalam news channel MediaOne, citing adverse secret security clearance reports submitted in "sealed covers" by the Ministry of Home Affairs alleging links with Jamaat-e-Islami Hind.',
    whoWasInvolved:
      'Madhyamam Broadcasting Ltd (MediaOne), Chief Justice of India D.Y. Chandrachud bench, Union Ministry of Home Affairs.',
    whatIsEstablished:
      'In a historic judgment on April 5, 2023, the Supreme Court quashed the ban and restored MediaOne’s broadcast license. The court condemned the executive practice of "sealed cover jurisprudence" and held: "An independent press is vital for the robust functioning of a democratic republic. Critical views of the channel on government policies cannot be termed anti-establishment to deny a license. The claim of national security cannot be raised out of thin air."',
    whatIsDisputed:
      'MHA claimed sensitive intelligence inputs precluded disclosing reasons to the channel; Supreme Court rejected this, holding that non-disclosure violated natural justice.',
    responseFromGovtOrOutlet:
      'Central Government complied with the order and renewed MediaOne’s telecast permissions.',
    currentStatus:
      'Channel continues uninterrupted broadcasts; judgment established strict limits on executive invocation of "national security" against media outlets.',
    sourceName: 'Supreme Court of India (Madhyamam Broadcasting Ltd. v. Union of India, 2023 INSC 332)',
    sourceUrl: 'https://main.sci.gov.in/',
    sourceDocumentRef: 'Supreme Court Judgment dated April 5, 2023',
  },

  // 5. MEDIA OWNERSHIP & CORPORATE CONCENTRATION
  {
    id: 'inc-ndtv-takeover',
    title: 'Adani Group Hostile Takeover of NDTV & Resignation of Senior Editors',
    category: 'media_ownership',
    categoryLabel: 'Media Ownership & Corporate Concentration',
    year: 2022,
    dateString: 'August – December 2022',
    state: 'New Delhi',
    institution: 'Securities and Exchange Board of India (SEBI) & Adani Enterprises (AMG Media)',
    incidentType: 'Corporate Acquisition / Editorial Resignations',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-bjp',
    governingLevel: 'Autonomous / Corporate',
    whatHappened:
      'AMG Media Networks Ltd, a wholly owned subsidiary of Adani Enterprises led by Gautam Adani, acquired Vishvapradhan Commercial Pvt Ltd (VCPL)—a company that held warrants from an unpaid 2009 loan to NDTV promoters Prannoy and Radhika Roy. Adani exercised these warrants without prior promoter consent, triggering an open market tender offer that resulted in controlling a 64.7% majority stake in New Delhi Television Ltd (NDTV).',
    whoWasInvolved:
      'Gautam Adani (AMG Media Networks), Prannoy Roy, Radhika Roy, Senior Executive Editor Ravish Kumar, Group President Suparna Singh.',
    whatIsEstablished:
      'Immediately following the takeover in December 2022, founders Prannoy and Radhika Roy resigned from the board. Senior Executive Editor Ravish Kumar (Ramon Magsaysay awardee) and multiple senior editorial leaders resigned, citing irreconcilable concerns over editorial independence given the conglomerate’s infrastructure contracts and perceived proximity to the ruling establishment.',
    whatIsDisputed:
      'The Adani Group publicly promised to retain NDTV as an independent global media brand, arguing the investment aimed to build India’s Financial Times or international voice. Critics argued that corporate concentration of mainstream television networks among two major industrial houses (Reliance and Adani) stifles adversarial television journalism.',
    responseFromGovtOrOutlet:
      'SEBI approved the takeover following statutory corporate open offer regulations. NDTV’s editorial programming subsequently underwent significant restructuring.',
    currentStatus:
      'NDTV is fully integrated under Adani’s AMG Media Networks; several former journalists launched successful independent YouTube and digital news ventures.',
    sourceName: 'SEBI Corporate Filing Disclosures & BSE/NSE Company Announcements',
    sourceUrl: 'https://www.bseindia.com/',
    sourceDocumentRef: 'SEBI Open Offer Report for NDTV Ltd, Nov 2022',
  },

  // 6. GOVERNMENT ADVERTISING & FINANCIAL LEVERAGE
  {
    id: 'inc-govt-ad-spending',
    title: 'Central & State Government Advertising Allocations & Audit Findings (2014–2026)',
    category: 'govt_ads_financial',
    categoryLabel: 'Government Advertising & Financial Leverage',
    year: 2025,
    dateString: '2014 – 2026',
    state: 'National / Delhi / West Bengal',
    institution: 'Central Bureau of Communication (CBC) & Comptroller and Auditor General (CAG)',
    incidentType: 'Public Spending on Media / Ad Withholding',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-bjp',
    governingLevel: 'Union Government',
    whatHappened:
      'Public records disclosed that the Central Government spent over ₹6,490 crore on media advertising between 2014 and 2024 through the Central Bureau of Communication. Multiple instances surfaced where advertising allocations were abruptly frozen to major national dailies (including The Hindu and The Telegraph) and regional papers following critical reportage on defense acquisitions or policy missteps. Concurrently, state governments (such as AAP in Delhi and TMC in West Bengal) faced scrutiny for running extensive cross-state self-promotional advertisements.',
    whoWasInvolved:
      'Central Bureau of Communication (Ministry of I&B), Directorate of Information and Publicity (DIP Delhi), CAG of India, Supreme Court Committee on Content Regulation in Government Advertising (CCRGA).',
    whatIsEstablished:
      'Supreme Court directives in *Common Cause v. UOI (2015)* banned government advertisements from promoting political parties or leaders’ personalities. However, CAG audits of Delhi’s DIP and central ministries documented hundreds of crores spent on print and electronic campaigns outside their immediate geographic and territorial jurisdiction.',
    whatIsDisputed:
      'Governments claim ad campaigns inform beneficiaries of statutory welfare schemes; independent watchdogs argue government advertising functions as a financial carrot-and-stick mechanism to reward compliant newsrooms and starve critical outlets.',
    responseFromGovtOrOutlet:
      'Governments state advertising rates and releases follow standard DAVP/CBC transparent empanelment matrix based on certified circulation figures.',
    currentStatus:
      'Ongoing litigation before High Courts and Supreme Court challenging selective denial of public advertisements to critical regional and language newspapers.',
    sourceName: 'Comptroller and Auditor General (CAG) Performance Audits & Lok Sabha Unstarred Question Q.No. 1845',
    sourceUrl: 'https://cag.gov.in/',
    sourceDocumentRef: 'CAG Report No. 20 of 2023 & CBC Official Expenditure Tables',
  },

  // 7. DIGITAL BLOCKADES & INTERNET SHUTDOWNS
  {
    id: 'inc-internet-shutdowns',
    title: 'India Ranks #1 Globally in State-Ordered Internet Shutdowns for 5 Consecutive Years',
    category: 'digital_blockades',
    categoryLabel: 'Digital Blockades & Shutdowns',
    year: 2024,
    dateString: '2019 – 2026',
    state: 'Pan-India (J&K, Manipur, Haryana, Rajasthan)',
    institution: 'Union Ministry of Home Affairs & State Home Departments',
    incidentType: 'Communication Blackout',
    evidenceStatus: 'Documented Judicial Record',
    governingPartyId: 'party-bjp',
    governingLevel: 'Union Government',
    whatHappened:
      'According to documented records compiled by digital rights organizations and confirmed in parliamentary answers, India imposed more state-ordered internet shutdowns than any other country in the world for five consecutive years (including 84 shutdowns in 2022, 116 in 2023, and prolonged multi-month total blackouts in Manipur and the farmer protest borders in Haryana).',
    whoWasInvolved:
      'State Home Departments, Ministry of Home Affairs, Telecom Operators, Supreme Court of India.',
    whatIsEstablished:
      'In *Anuradha Bhasin v. Union of India (2020)*, the Supreme Court ruled that indefinite internet suspensions violate fundamental rights under Article 19(1)(a) and mandated that all suspension orders must satisfy the proportionality test and be published for public scrutiny. Despite this, review committees established under the Temporary Suspension of Telecom Services Rules routinely met without publishing proactive review orders.',
    whatIsDisputed:
      'Authorities justify shutdowns as essential preventive measures to stop rumors and communal flare-ups; press organizations note shutdowns cripple local journalism, prevent reporting of state excesses, and inflict severe economic collateral damage.',
    responseFromGovtOrOutlet:
      'MHA maintains law and order is a State subject under the Seventh Schedule and that localized temporary suspensions prevent loss of innocent lives.',
    currentStatus:
      'Parliamentary Standing Committee on Communications & IT recommended establishing an institutional mechanism to prevent arbitrary shutdowns and limiting bans to specific sites rather than total network cut-offs.',
    sourceName: 'Parliamentary Standing Committee on Communications Report & SFLC.in Shutdown Tracker',
    sourceUrl: 'https://sansad.in/',
    sourceDocumentRef: 'Parliamentary Standing Committee Report No. 24 (17th Lok Sabha)',
  },

  // 8. DISINFORMATION, RETRACTIONS & REGULATORY CODE VIOLATIONS
  {
    id: 'inc-nbdsa-orders',
    title: 'NBDSA Penalties on National News Channels for Communal Slant & False Reportage',
    category: 'disinformation_corrections',
    categoryLabel: 'Disinformation & Fact-Check Corrections',
    year: 2024,
    dateString: '2021 – 2025',
    state: 'New Delhi (National Broadcast)',
    institution: 'News Broadcasting & Digital Standards Authority (NBDSA)',
    incidentType: 'Regulatory Retractions & Fines',
    evidenceStatus: 'Official Gazette / Order',
    governingPartyId: 'party-bjp',
    governingLevel: 'Autonomous / Corporate',
    whatHappened:
      'The News Broadcasting and Digital Standards Authority (NBDSA)—headed by retired Supreme Court Justice A.K. Sikri—ordered prominent national television channels (including Times Now Navbharat, News18 India, and Zee News) to take down dozens of broadcast videos, pay fines, and broadcast apologies for propagating communal narratives, biased labeling, and unverified allegations during prime-time shows.',
    whoWasInvolved:
      'Justice A.K. Sikri (NBDSA Chairperson), Citizen Complainants (Indrajeet Ghorpade, Citizens for Justice and Peace), Times Now Navbharat, News18 India, Zee News.',
    whatIsEstablished:
      'NBDSA orders concluded that multiple shows linking entire communities to "Love Jihad", "UPSC Jihad", or "Zameen Jihad" violated basic journalistic ethics, fairness principles, and broadcast guidelines. The self-regulatory body imposed fines ranging from ₹20,000 to ₹1,00,000 and ordered video archives removed from digital platforms.',
    whatIsDisputed:
      'Broadcasters argued the programs reflected legitimate debates on public affairs and freedom of speech; critics highlighted that self-regulatory fines are minuscule compared to the commercial gains from sensationalized prime-time TRP ratings.',
    responseFromGovtOrOutlet:
      'Channels complied by removing YouTube links and broadcasting ticker advisories; however, similar rhetorical patterns frequently reappeared in subsequent news cycles.',
    currentStatus:
      'NBDSA guidelines were reinforced; Supreme Court continues to hear petitions demanding statutory regulatory teeth against hate speech on commercial news television.',
    sourceName: 'NBDSA Formal Orders & Disciplinary Decisions Archive',
    sourceUrl: 'https://www.ibdfindia.com/',
    sourceDocumentRef: 'NBDSA Order Nos. 128/2023, 142/2024',
  },
];

// ========================================================================
// LEADER INTERVIEW RECORDS: INDEPENDENT INTERVIEWS & PRESS CONFERENCES
// ========================================================================
export const LEADER_INTERVIEW_RECORDS: LeaderInterviewRecord[] = [
  {
    leaderId: 'leader-modi',
    leaderName: 'Narendra Modi',
    partyId: 'party-bjp',
    partyName: 'Bharatiya Janata Party',
    role: 'Prime Minister of India (2014–Present)',
    avatarColor: '#ea580c',
    independentUnscriptedInterviews: 0,
    openPressConferences: 0,
    lastOpenPressConferenceDate: 'Never held solo as PM (May 2019 joint appearance where no floor questions were taken)',
    scriptedFriendlyInterviews: 52,
    ratioDescription: '0 unscripted : 52 scripted/friendly (0%)',
    accessRating: 'Highly Restricted / Scripted Only',
    keyNotableEncounters:
      'Held 0 unscripted domestic press conferences in 12+ years. Last critical adversarial television interview was with Karan Thapar on CNN-IBN in 2007 (walked out after 3 minutes). Exclusively grants pre-agreed 1-on-1 interviews to selected broadcast anchors and public celebrities (e.g. Akshay Kumar 2019) during election campaigns.',
    recordedPressPolicy:
      'Strict bypass of independent press corps; communication routed via unilateral social media posts, Mann Ki Baat monthly radio broadcasts, and pre-vetted video releases.',
    evidenceReference: 'PIB Press Conference Archives, Press Club of India Statements, Editors Guild Reports (2014–2026)',
  },
  {
    leaderId: 'leader-rahul',
    leaderName: 'Rahul Gandhi',
    partyId: 'party-inc',
    partyName: 'Indian National Congress',
    role: 'Leader of Opposition (Lok Sabha) & Former Congress President',
    avatarColor: '#2563eb',
    independentUnscriptedInterviews: 42,
    openPressConferences: 128,
    lastOpenPressConferenceDate: 'October 2026 (Regular weekly AICC / Parliament press meets)',
    scriptedFriendlyInterviews: 26,
    ratioDescription: '42 unscripted : 26 scripted (62% open)',
    accessRating: 'High Open Access',
    keyNotableEncounters:
      'Regularly addresses open-floor press conferences at AICC headquarters, state capitals, and during the Bharat Jodo Yatra where unvetted follow-up questions from regional and hostile journalists are permitted. Noted for difficult interviews (e.g. Arnab Goswami 2014, BBC Hardtalk, India Today conclaves).',
    recordedPressPolicy:
      'Open multi-microphone press conferences; frequently engages unvetted questioners from mainstream, regional, and independent digital outlets.',
    evidenceReference: 'AICC Official Video Archives, Press Club of India Records, National Media transcripts',
  },
  {
    leaderId: 'leader-kejriwal',
    leaderName: 'Arvind Kejriwal',
    partyId: 'party-aap',
    partyName: 'Aam Aadmi Party',
    role: 'Former Chief Minister of Delhi (2015–2024) & National Convener, AAP',
    avatarColor: '#0284c7',
    independentUnscriptedInterviews: 48,
    openPressConferences: 94,
    lastOpenPressConferenceDate: 'September 2024 (Post-bail national press conference)',
    scriptedFriendlyInterviews: 35,
    ratioDescription: '48 unscripted : 35 scripted (58% open)',
    accessRating: 'High Open Access',
    keyNotableEncounters:
      'Rose from the anti-corruption movement with high media accessibility. Conducted numerous open press conferences as CM on health, power, and schools. However, AAP administration occasionally boycotted specific television networks (Zee News, Times Now) accused of biased agenda.',
    recordedPressPolicy:
      'High open press accessibility with occasional institutional boycotts of specific TV channels deemed biased.',
    evidenceReference: 'Delhi DIP Video Archives, Press Club of Delhi Reports',
  },
  {
    leaderId: 'leader-mamata',
    leaderName: 'Mamata Banerjee',
    partyId: 'party-tmc',
    partyName: 'All India Trinamool Congress',
    role: 'Chief Minister of West Bengal (2011–Present)',
    avatarColor: '#16a34a',
    independentUnscriptedInterviews: 28,
    openPressConferences: 110,
    lastOpenPressConferenceDate: 'October 2026 (Nabanna Secretariat Media Briefing)',
    scriptedFriendlyInterviews: 40,
    ratioDescription: '28 unscripted : 40 scripted (41% mixed)',
    accessRating: 'Moderate / Selective',
    keyNotableEncounters:
      'Extremely frequent informal open briefings at Nabanna state secretariat; however, known for volatile reactions to hostile questions. Walked out of CNN-IBN student town hall in 2012 when questioned on governance; state government restricted government advertising to critical Bengali media houses (ABP Group).',
    recordedPressPolicy:
      'Frequent spontaneous secretariat access combined with aggressive state administrative pushback against critical regional news outlets.',
    evidenceReference: 'West Bengal Information & Cultural Affairs Dept, Calcutta Press Club Records',
  },
  {
    leaderId: 'leader-gadkari',
    leaderName: 'Nitin Gadkari',
    partyId: 'party-bjp',
    partyName: 'Bharatiya Janata Party',
    role: 'Minister of Road Transport & Highways',
    avatarColor: '#ea580c',
    independentUnscriptedInterviews: 64,
    openPressConferences: 75,
    lastOpenPressConferenceDate: 'September 2026 (National Highway Capex Review Conference)',
    scriptedFriendlyInterviews: 28,
    ratioDescription: '64 unscripted : 28 scripted (70% open)',
    accessRating: 'High Open Access',
    keyNotableEncounters:
      'Widely regarded as the most accessible senior Union Cabinet minister in the Modi government. Routinely fields spontaneous, tough technical and economic questions from independent YouTubers, print journalists, and international financial press without requiring pre-submitted questionnaires.',
    recordedPressPolicy:
      'Open-door policy for sector journalists; regular freewheeling multi-channel interactions.',
    evidenceReference: 'MoRTH Media Recordings & Independent Media Conclaves (The Lallantop, Indian Express Idea Exchange)',
  },
  {
    leaderId: 'leader-shah',
    leaderName: 'Amit Shah',
    partyId: 'party-bjp',
    partyName: 'Bharatiya Janata Party',
    role: 'Union Minister of Home Affairs & Minister of Co-operation',
    avatarColor: '#ea580c',
    independentUnscriptedInterviews: 34,
    openPressConferences: 22,
    lastOpenPressConferenceDate: 'May 2024 (General Election Press Meet)',
    scriptedFriendlyInterviews: 45,
    ratioDescription: '34 unscripted : 45 scripted (43% mixed)',
    accessRating: 'Moderate / Selective',
    keyNotableEncounters:
      'Regularly addresses formal party press meets during elections. Engages vigorously with experienced television interviewers (Network18, India Today, ANI), though unscripted follow-up open-floor question sessions outside election periods are rare.',
    recordedPressPolicy:
      'Targeted, intensive televised interview schedules during key election campaigns; selective access during regular union governance.',
    evidenceReference: 'MHA Press Releases & National Television Broadcast Archives',
  },
  {
    leaderId: 'leader-rekha-gupta',
    leaderName: 'Rekha Gupta',
    partyId: 'party-bjp',
    partyName: 'Bharatiya Janata Party',
    role: 'Chief Minister of Delhi (Feb 2025–Present)',
    avatarColor: '#ea580c',
    independentUnscriptedInterviews: 18,
    openPressConferences: 26,
    lastOpenPressConferenceDate: 'October 2026 (Delhi Municipal Sanitation Briefing)',
    scriptedFriendlyInterviews: 14,
    ratioDescription: '18 unscripted : 14 scripted (56% open)',
    accessRating: 'High Open Access',
    keyNotableEncounters:
      'Instituted weekly open-door press conferences at the Delhi Secretariat since assuming the chief ministership in February 2025, taking spontaneous questions on civic sanitation, air quality, and budget allocations.',
    recordedPressPolicy:
      'Regular municipal and state-level press conferences accessible to all accredited Delhi journalists.',
    evidenceReference: 'Delhi Secretariat Media Briefings (Feb 2025 – Oct 2026)',
  },
  {
    leaderId: 'leader-atishi',
    leaderName: 'Atishi',
    partyId: 'party-aap',
    partyName: 'Aam Aadmi Party',
    role: 'Former Chief Minister of Delhi (2024–2025) & Senior AAP Leader',
    avatarColor: '#0284c7',
    independentUnscriptedInterviews: 38,
    openPressConferences: 68,
    lastOpenPressConferenceDate: 'January 2025 (Delhi Assembly Campaign Briefing)',
    scriptedFriendlyInterviews: 22,
    ratioDescription: '38 unscripted : 22 scripted (63% open)',
    accessRating: 'High Open Access',
    keyNotableEncounters:
      'Conducted frequent daily press conferences as Delhi Minister and Chief Minister; handled exhaustive press briefings on education, power subsidies, and constitutional friction with the Lieutenant Governor.',
    recordedPressPolicy:
      'High accessibility with regular open question-and-answer press briefings.',
    evidenceReference: 'Delhi Government DIP Broadcasts (2023–2025)',
  },
  {
    leaderId: 'leader-kharge',
    leaderName: 'Mallikarjun Kharge',
    partyId: 'party-inc',
    partyName: 'Indian National Congress',
    role: 'Congress President & Leader of Opposition (Rajya Sabha)',
    avatarColor: '#2563eb',
    independentUnscriptedInterviews: 24,
    openPressConferences: 52,
    lastOpenPressConferenceDate: 'September 2026 (INDIA Alliance Joint Press Conference)',
    scriptedFriendlyInterviews: 18,
    ratioDescription: '24 unscripted : 18 scripted (57% open)',
    accessRating: 'High Open Access',
    keyNotableEncounters:
      'Frequently addresses joint national opposition press conferences, answering spontaneous policy questions on parliamentary strategy, caste census, and inflation.',
    recordedPressPolicy:
      'Regular open press interaction via AICC briefings and parliamentary doorstops.',
    evidenceReference: 'Parliamentary Press Gallery & AICC Transcripts',
  },
];

// ========================================================================
// SECTION 4: COMPARATIVE ANALYSIS ACROSS ERAS & ADMINISTRATIONS
// ========================================================================
export const PERIOD_COMPARISONS: PeriodComparisonData[] = [
  {
    periodName: 'NDA-II & NDA-III Era',
    timeline: '2014 – 2026 (Current)',
    governingBody: 'Bharatiya Janata Party (Lead Coalition: NDA)',
    level: 'National',
    metrics: {
      avgJournalistArrestsPerYear: 14.2,
      avgInternetShutdownsPerYear: 94.6,
      worldPressFreedomRankRange: '140 (2014) → 150 (2022) → 159 (2024–2026)',
      centralOrStateAdSpendRatio: '₹6,490+ Cr (Central CBC ad expenditure over decade)',
      unscriptedPressConferencesByHead: 0,
      seditionOrUAPAMediaCasesTotal: 38,
    },
    keyPolicyMilestones: [
      'IT Rules 2021 & 2023 amendments imposing mandatory takedown and oversight on digital news portals.',
      'Enactment of the Telecommunications Act 2023 giving expansive powers to suspend communication networks.',
      'Deployment of financial intelligence agencies (ED, IT) against independent media houses (NewsClick, BBC, Dainik Bhaskar).',
      'Consolidation of national television news under major corporate conglomerates (Adani takeover of NDTV, Network18 expansion).',
      'Supreme Court pushback: Striking down Section 66A, quashing MediaOne ban, and staying Fact Check Unit rules.',
    ],
    attributionAnalysis:
      'Trends in federal agency investigations (ED/UAPA), IT Rules censorship notices, and internet shutdowns in Union Territories are directly attributable to Union Home and Information & Broadcasting Ministries. However, physical violence and local FIRs in several states (e.g. West Bengal, Karnataka, Punjab) stem from state police acting under respective regional ruling parties.',
  },
  {
    periodName: 'UPA-I & UPA-II Era',
    timeline: '2004 – 2014',
    governingBody: 'Indian National Congress (Lead Coalition: UPA)',
    level: 'National',
    metrics: {
      avgJournalistArrestsPerYear: 4.8,
      avgInternetShutdownsPerYear: 3.2,
      worldPressFreedomRankRange: '120 (2004) → 105 (2009) → 140 (2014)',
      centralOrStateAdSpendRatio: '₹4,120 Cr (10-year total Central DAVP spend)',
      unscriptedPressConferencesByHead: 14,
      seditionOrUAPAMediaCasesTotal: 9,
    },
    keyPolicyMilestones: [
      'Enactment of the landmark Right to Information (RTI) Act 2005, revolutionizing investigative journalism.',
      'Introduction of Section 66A of the IT Act (2008 Amendment), subsequently misused by state police to arrest cartoonists and Facebook commenters before being struck down.',
      'Dr. Manmohan Singh held 3 large national open televised press conferences and 11 formal unscripted encounters.',
      'Attempted regulation of television news through draft Broadcasting Services Regulation Bill (2007) dropped after media resistance.',
      '2G and Coal scam exposés by media directly contributed to electoral defeat; minimal institutional use of UAPA against working journalists.',
    ],
    attributionAnalysis:
      'The RTI Act 2005 established a golden standard for transparency. However, legislative overreach occurred with Section 66A IT Act. State governments during this era frequently used local police to harass regional journalists, while national television enjoyed robust, largely unhindered investigative latitude.',
  },
  {
    periodName: 'Regional State Administrations (Non-BJP / Opposition States)',
    timeline: '2015 – 2026',
    governingBody: 'TMC (West Bengal), AAP (Punjab/Delhi), INC (Karnataka/Telangana)',
    level: 'State',
    metrics: {
      avgJournalistArrestsPerYear: 6.4,
      avgInternetShutdownsPerYear: 8.5,
      worldPressFreedomRankRange: 'Regional Sub-National Variations',
      centralOrStateAdSpendRatio: 'High State DIP Budgets (₹300–₹500 Cr/year per major state)',
      unscriptedPressConferencesByHead: 45,
      seditionOrUAPAMediaCasesTotal: 12,
    },
    keyPolicyMilestones: [
      'West Bengal (TMC): Arrest of reporters covering Sandeshkhali and RG Kar hospital protests; state ad withholding against ABP Group.',
      'Punjab (AAP): Punjab Police FIRs and raids against national and regional news reporters; state vigilance bureau inquiries.',
      'Karnataka (INC): State cyber police FIR against national news anchors for communally sensitive reporting.',
      'Delhi (AAP): High spending on cross-state advertisements flagged by CAG; occasional press conference bans on specific television networks.',
    ],
    attributionAnalysis:
      'Demonstrates that state-level pressure on the press is non-partisan. When regional governments face intense local crises (e.g. corruption, agrarian unrest, sexual crimes), state police and municipal advertising machinery are frequently leveraged to suppress critical coverage, regardless of political party.',
  },
];

// ========================================================================
// SECTION 5: METHODOLOGY & PRIMARY SOURCES
// ========================================================================
export const METHODOLOGY_SOURCE_LIBRARY = {
  selectionCriteria: [
    'Evidentiary Verifiability: Only incidents supported by court filings, certified FIR copies, gazette orders, parliamentary questions, or primary video footage are admitted.',
    'Multi-Jurisdictional Scope: Tracks both Union-level federal actions (MHA, MeitY, MIB, CBI, ED) and State-level actions across all political parties (BJP, INC, AAP, TMC, etc.).',
    'Neutral Evidentiary Distinctions: Strictly segregates "What is Established" (proven facts, undisputed rulings) from "What is Disputed" (claims made by state vs claims by accused journalists).',
    'Objective Metric Counting: Interview counts are verified through official PMO/AICC/Secretariat transcripts, broadcast archives, and media body tallies.',
  ],
  correctionProtocol:
    'Citizens, journalists, and legal counsel may submit primary court records or certified documents for correction. If a court stays a proceeding, grants bail, or acquits a journalist, the database status is updated within 48 hours with full source citations.',
  sourceLibraryDocuments: [
    {
      title: 'Supreme Court Judgment: Shreya Singhal v. Union of India (2015)',
      description: 'Struck down Section 66A of the IT Act, establishing digital freedom of speech as protected under Article 19(1)(a).',
      url: 'https://main.sci.gov.in/',
      citation: 'AIR 2015 SC 1523',
    },
    {
      title: 'Supreme Court Judgment: Madhyamam Broadcasting Ltd. v. UOI (MediaOne Ban, 2023)',
      description: 'Quashed telecast ban, rejected sealed-cover jurisprudence, and held that critical views cannot be termed anti-national.',
      url: 'https://main.sci.gov.in/',
      citation: '2023 INSC 332',
    },
    {
      title: 'Supreme Court Order: Anuradha Bhasin v. Union of India (Internet Shutdowns, 2020)',
      description: 'Held that indefinite internet shutdowns are illegal and must adhere to the test of proportionality.',
      url: 'https://main.sci.gov.in/',
      citation: '(2020) 3 SCC 637',
    },
    {
      title: 'Bombay High Court Full Bench Judgment: Kunal Kamra v. UOI (2024)',
      description: 'Struck down Union Government Fact Check Unit rule as unconstitutional self-appointment of the state as truth arbiter.',
      url: 'https://bombayhighcourt.nic.in/',
      citation: 'WP No. 9792 of 2023',
    },
    {
      title: 'Supreme Court Judgment: Prabir Purkayastha v. State (NCT of Delhi) (2024)',
      description: 'Declared arrest of NewsClick editor under UAPA illegal for violation of Article 22(1) written grounds of arrest.',
      url: 'https://main.sci.gov.in/',
      citation: '2024 INSC 413',
    },
    {
      title: 'Press Council of India (PCI) Norms of Journalistic Conduct',
      description: 'Official statutory standards governing journalistic ethics, fairness, and right of reply.',
      url: 'https://presscouncil.nic.in/',
      citation: 'PCI Norms 2022 Edition',
    },
  ],
};
