// All of the available navigation items.
export const NAVIGATION_ITEM_HOW_CAN_I_HELP = {
  slug: `kaip-galiu-padeti/`,
  title: `Kaip galiu padėti?`,
};

export const NAVIGATION_ITEM_HOW_CAN_I_HELP_DONATION = {
  slug: `kaip-galiu-padeti/aukojimas/`,
  title: `Aukojimas`,
  iconHandle: `donate`,
};

export const NAVIGATION_ITEM_HOW_CAN_I_HELP_VOLUNTEER = {
  slug: `kaip-galiu-padeti/savanoryste/`,
  title: `Savanorystė`,
  iconHandle: `volunteer`,
};

export const NAVIGATION_ITEM_PROTEST_FORMS = {
  slug: `protesto-formos/`,
  title: `Protesto formos`,
};

export const NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS = {
  slug: `protesto-formos/akcijos/`,
  title: `Akcijos`,
};

export const NAVIGATION_ITEM_EVENTS = {
  slug: `renginiai/`,
  title: `Renginiai`,
};

export const NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY = {
  slug: `protesto-formos/budinkite-veikti/ambasada/`,
  title: `Budinkite veikti`,
};

export const NAVIGATION_ITEM_PROTEST_WAKE_UP_COMPANY = {
  slug: `protesto-formos/budinkite-veikti/imone/`,
  title: `Budinkite veikti`,
};

export const NAVIGATION_ITEM_BE_VIGILANT = {
  slug: `bukime-budrus/`,
  title: `Būkime budrūs`,
};

export const NAVIGATION_ITEM_BE_VIGILANT_CITIZEN_HANDBOOK = {
  slug: `piliecio-atmintine/`,
  title: `Piliečio atmintinė`,
};

export const NAVIGATION_ITEM_RELIABLE_INFORMATION = {
  slug: `patikimi-saltiniai/`,
  title: `Patikimi šaltiniai`,
};

export const NAVIGATION_ITEM_INFORMATION_FOR_LITHUANIAN_CITIZENS = {
  slug: `informacija-lietuviams/`,
  title: `Informacija Lietuviams`,
};

export const NAVIGATION_ITEM_BE_VIGILANT_SCAMS_AND_MISINFORMATION = {
  slug: `informacija-lietuviams/sukciai-ir-dezinformacija/`,
  title: `Sukčiai ir dezinformacija`,
  altTitle: `Kaip apsisaugoti nuo sukčių ir dezinformacijos?`,
};

export const NAVIGATION_ITEM_HELP = {
  slug: `/ua/help-search/`,
  title: `Послуги для українців`,
  altTitle: `Послуги`,
  translation: `Pagalba`,
};

export const NAVIGATION_ITEM_REFUGEE_GUIDE = {
  slug: `ua/refugee-guide/`,
  title: `Важлива інформація`,
  altTitle: `Інформація`,
  translation: `Informacija`,
};

export const NAVIGATION_ITEM_EVENTS_UA = {
  slug: `ua/podii/`,
  title: `Події`,
  altTitle: `Події`,
  translation: `Renginiai`,
};

// Navigation of how can I help page.
export const NAVIGATION_HOW_CAN_I_HELP = [
  NAVIGATION_ITEM_HOW_CAN_I_HELP_DONATION,
  NAVIGATION_ITEM_HOW_CAN_I_HELP_VOLUNTEER,
];

// Navigation of protest forms page.
export const NAVIGATION_PROTEST_FORMS = [
  NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS,
  NAVIGATION_ITEM_EVENTS,
  NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY,
];

// Navigation of be vigilant page.
export const NAVIGATION_BE_VIGILANT = [
  NAVIGATION_ITEM_RELIABLE_INFORMATION,
  NAVIGATION_ITEM_BE_VIGILANT_SCAMS_AND_MISINFORMATION,
];

// Navigation of citizen guide
export const NAVIGATION_CITIZEN_GUIDE = [NAVIGATION_ITEM_RELIABLE_INFORMATION];

// Navigation of main menu.
export const NAVIGATION_MAIN_MENU = [
  {
    ...NAVIGATION_ITEM_HOW_CAN_I_HELP,
    children: [...NAVIGATION_HOW_CAN_I_HELP],
  },
  // {
  //   ...NAVIGATION_ITEM_PROTEST_FORMS,
  //   children: [
  //     NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS,
  //     NAVIGATION_ITEM_EVENTS,
  //     NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY,
  //   ],
  // },
  {
    ...NAVIGATION_ITEM_INFORMATION_FOR_LITHUANIAN_CITIZENS,
    //children: [...NAVIGATION_CITIZEN_GUIDE],
  },
  NAVIGATION_ITEM_EVENTS,
  NAVIGATION_ITEM_RELIABLE_INFORMATION,
];

// Navigation of alternative main menu.
export const NAVIGATION_MAIN_MENU_ALT = [
  NAVIGATION_ITEM_HELP,
  NAVIGATION_ITEM_REFUGEE_GUIDE,
  NAVIGATION_ITEM_EVENTS_UA,
];

// External links.
export const NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP = {
  url: `https://0rs0r9mdix1.typeform.com/to/QXLxIUjt`,
  title: `Noriu suteikti pagalbą`,
  iconHandle: `ua-flag`,
};

export const ADDITIONAL_NAVIGATION = {
  [NAVIGATION_ITEM_BE_VIGILANT_SCAMS_AND_MISINFORMATION.slug]: [
    NAVIGATION_ITEM_RELIABLE_INFORMATION,
  ],
  [NAVIGATION_ITEM_RELIABLE_INFORMATION.slug]: [
    //NAVIGATION_ITEM_BE_VIGILANT_SCAMS_AND_MISINFORMATION,
  ],
  [NAVIGATION_ITEM_HOW_CAN_I_HELP_VOLUNTEER.slug]: [
    NAVIGATION_ITEM_HOW_CAN_I_HELP_DONATION,
  ],
  [NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS.slug]: [
    NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY,
    NAVIGATION_ITEM_EVENTS,
  ],
  [NAVIGATION_ITEM_EVENTS.slug]: [],
  [NAVIGATION_ITEM_HOW_CAN_I_HELP_DONATION.slug]: [
    NAVIGATION_ITEM_HOW_CAN_I_HELP_VOLUNTEER,
  ],
  [NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY.slug]: [
    NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS,
  ],
  [NAVIGATION_ITEM_PROTEST_WAKE_UP_COMPANY.slug]: [
    NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS,
  ],
};
