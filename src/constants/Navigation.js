// All of the available navigation items.
export const NAVIGATION_ITEM_HOW_CAN_I_HELP = {
  pathname: `/kaip-galiu-padeti/`,
  title: `Kaip galiu padėti?`,
};

export const NAVIGATION_ITEM_HOW_CAN_I_HELP_DONATION_LITHUANIA = {
  pathname: `/kaip-galiu-padeti/aukojimas/lietuvoje/`,
  title: `Aukojimas`,
  iconHandle: `donate`,
};

export const NAVIGATION_ITEM_HOW_CAN_I_HELP_VOLUNTEER = {
  pathname: `/kaip-galiu-padeti/savanoryste/`,
  title: `Savanorystė`,
  iconHandle: `volunteer`,
};

export const NAVIGATION_ITEM_PROTEST_FORMS = {
  pathname: `/protesto-formos/`,
  title: `Protesto formos`,
};

export const NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS = {
  pathname: `/protesto-formos/akcijos/`,
  title: `Akcijos`,
};

export const NAVIGATION_ITEM_PROTEST_FORMS_EVENTS = {
  pathname: `/protesto-formos/renginiai/`,
  title: `Renginiai`,
};

export const NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY = {
  pathname: `/protesto-formos/budinkite-veikti/ambasada/`,
  title: `Budinkite veikti`,
};

export const NAVIGATION_ITEM_BE_VIGILANT = {
  pathname: `/bukime-budrus/`,
  title: `Būkime budrūs`,
};

export const NAVIGATION_ITEM_BE_VIGILANT_CITIZEN_HANDBOOK = {
  pathname: `/piliecio-atmintine/`,
  title: `Piliečio atmintinė`,
};

export const NAVIGATION_ITEM_BE_VIGILANT_RELIABLE_INFORMATION = {
  pathname: `/bukime-budrus/patikima-informacija/`,
  title: `Patikima informacija`,
};

export const NAVIGATION_ITEM_BE_VIGILANT_SCAMS_AND_MISINFORMATION = {
  pathname: `/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/`,
  title: `Sukčiai ir dezinformacija`,
  altTitle: `Kaip apsisaugoti nuo sukčių ir dezinformacijos?`,
};

export const NAVIGATION_ITEM_HELP = {
  pathname: `/help-search/`,
  title: `Знайти довідку`,
  altTitle: `Послуги`,
};

export const NAVIGATION_ITEM_REFUGEE_GUIDE = {
  pathname: `/refugee-guide/`,
  title: `Важлива інформація`,
  altTitle: `Інформація`,
};

// Navigation of how can I help page.
export const NAVIGATION_HOW_CAN_I_HELP = [
  NAVIGATION_ITEM_HOW_CAN_I_HELP_DONATION_LITHUANIA,
  NAVIGATION_ITEM_HOW_CAN_I_HELP_VOLUNTEER,
];

// Navigation of protest forms page.
export const NAVIGATION_PROTEST_FORMS = [
  NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS,
  NAVIGATION_ITEM_PROTEST_FORMS_EVENTS,
  NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY,
];

// Navigation of be vigilant page.
export const NAVIGATION_BE_VIGILANT = [
  NAVIGATION_ITEM_BE_VIGILANT_RELIABLE_INFORMATION,
  NAVIGATION_ITEM_BE_VIGILANT_SCAMS_AND_MISINFORMATION,
];

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
  //     NAVIGATION_ITEM_PROTEST_FORMS_EVENTS,
  //     NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY,
  //   ],
  // },
  NAVIGATION_ITEM_BE_VIGILANT_CITIZEN_HANDBOOK,
  {
    ...NAVIGATION_ITEM_BE_VIGILANT,
    children: [...NAVIGATION_BE_VIGILANT],
  },
];

// Navigation of alternative main menu.
export const NAVIGATION_MAIN_MENU_ALT = [
  NAVIGATION_ITEM_HELP,
  NAVIGATION_ITEM_REFUGEE_GUIDE,
];

// External links.
export const NAVIGATION_EXTERNAL_LINK_PROVIDE_HELP = {
  url: `https://0rs0r9mdix1.typeform.com/to/QXLxIUjt`,
  title: `Noriu suteikti pagalbą`,
  iconHandle: `ua-flag`,
};
