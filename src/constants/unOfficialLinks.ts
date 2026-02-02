/** Official UN links by category: documents/articles, legislation, main bodies, agencies, missions, founders & members */

export const UN_SOURCES_BY_CATEGORY: { category: string; sources: { name: string; url: string }[] }[] = [
  {
    category: 'Documents & articles',
    sources: [
      { name: 'UN Official Document System (ODS)', url: 'https://documents.un.org/' },
      { name: 'UN Digital Library', url: 'https://digitallibrary.un.org/' },
      { name: 'UN News', url: 'https://news.un.org/' },
      { name: 'UN Yearbook', url: 'https://www.un.org/en/yearbook/' },
      { name: 'UN Press', url: 'https://press.un.org/' },
    ],
  },
  {
    category: 'Legislation & treaties',
    sources: [
      { name: 'UN Treaty Collection', url: 'https://treaties.un.org/' },
      { name: 'UN Audiovisual Library of International Law', url: 'https://legal.un.org/avl/' },
      { name: 'UNCITRAL (International Trade Law)', url: 'https://uncitral.un.org/' },
      { name: 'UN Charter', url: 'https://www.un.org/en/about-us/un-charter' },
    ],
  },
  {
    category: 'Main bodies',
    sources: [
      { name: 'UN General Assembly', url: 'https://www.un.org/ga/' },
      { name: 'UN Security Council', url: 'https://www.un.org/securitycouncil/' },
      { name: 'UN ECOSOC', url: 'https://www.un.org/ecosoc/' },
      { name: 'International Court of Justice (ICJ)', url: 'https://www.icj-cij.org/' },
      { name: 'UN Secretariat', url: 'https://www.un.org/sg/' },
      { name: 'UN Trusteeship Council', url: 'https://www.un.org/en/about-us/trusteeship-council' },
    ],
  },
  {
    category: 'Programmes & funds',
    sources: [
      { name: 'UNDP', url: 'https://www.undp.org/' },
      { name: 'UNICEF', url: 'https://www.unicef.org/' },
      { name: 'UNHCR', url: 'https://www.unhcr.org/' },
      { name: 'WFP (World Food Programme)', url: 'https://www.wfp.org/' },
      { name: 'UNFPA', url: 'https://www.unfpa.org/' },
      { name: 'UN Environment Programme (UNEP)', url: 'https://www.unep.org/' },
      { name: 'UN Women', url: 'https://www.unwomen.org/' },
      { name: 'UN-Habitat', url: 'https://unhabitat.org/' },
    ],
  },
  {
    category: 'Specialized agencies & related',
    sources: [
      { name: 'WHO', url: 'https://www.who.int/' },
      { name: 'UNESCO', url: 'https://www.unesco.org/' },
      { name: 'IOM (International Organization for Migration)', url: 'https://www.iom.int/' },
      { name: 'UN Office on Drugs and Crime (UNODC)', url: 'https://www.unodc.org/' },
      { name: 'UN Office for Disarmament Affairs (UNODA)', url: 'https://www.un.org/disarmament/' },
      { name: 'UN Human Rights (OHCHR)', url: 'https://www.ohchr.org/' },
      { name: 'World Bank', url: 'https://www.worldbank.org/' },
      { name: 'IMF', url: 'https://www.imf.org/' },
      { name: 'ILO', url: 'https://www.ilo.org/' },
      { name: 'FAO', url: 'https://www.fao.org/' },
    ],
  },
  {
    category: 'Peacekeeping & missions',
    sources: [
      { name: 'UN Peacekeeping', url: 'https://peacekeeping.un.org/' },
      { name: 'UN Peacekeeping – current missions', url: 'https://peacekeeping.un.org/en/missions' },
      { name: 'UN Special Political Missions', url: 'https://dppa.un.org/en/special-political-missions' },
    ],
  },
  {
    category: 'Founders & members',
    sources: [
      { name: 'UN Member States', url: 'https://www.un.org/en/about-us/member-states' },
      { name: 'UN System (founders & members)', url: 'https://www.un.org/en/about-us/un-system' },
      { name: 'UN History', url: 'https://www.un.org/en/about-us/history' },
    ],
  },
]

export const UN_OFFICIAL_SOURCES: { name: string; url: string }[] = UN_SOURCES_BY_CATEGORY.flatMap((c) => c.sources)
