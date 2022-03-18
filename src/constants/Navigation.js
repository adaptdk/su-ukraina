// All of the available navigation items.
export const NAVIGATION_ITEM_HOW_CAN_I_HELP = {
  pathname: `/kaip-galiu-padeti/`,
  title: `Kaip galiu padėti?`,
};

export const NAVIGATION_ITEM_HOW_CAN_I_HELP_DONATION_LITHUANIA = {
  pathname: `/kaip-galiu-padeti/aukojimas/lietuvoje/`,
  title: `Aukojimas`,
};

export const NAVIGATION_ITEM_HOW_CAN_I_HELP_VOLUNTEER = {
  pathname: `/kaip-galiu-padeti/savanoryste/`,
  title: `Savanorystė`,
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
  pathname: `/bukime-budrus/piliecio-atmintine/`,
  title: `Piliečio atmintinė`,
};

export const NAVIGATION_ITEM_BE_VIGILANT_RELIABLE_INFORMATION = {
  pathname: `/bukime-budrus/patikima-informacija/`,
  title: `Patikima informacija`,
};

export const NAVIGATION_ITEM_BE_VIGILANT_SCAMS_AND_MISINFORMATION = {
  pathname: `/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/`,
  title: `Sukčiai ir dezinformacija`,
};

export const NAVIGATION_ITEM_KNOW_WHAT_YOU_BUY = {
  pathname: `/bukime-budrus/zinokite-ka-perkate/`,
  title: `Žinokite ką perkate`,
};

// Main menu navigation.
export const NAVIGATION_MAIN = [
  {
    ...NAVIGATION_ITEM_HOW_CAN_I_HELP,
    children: [
      NAVIGATION_ITEM_HOW_CAN_I_HELP_DONATION_LITHUANIA,
      NAVIGATION_ITEM_HOW_CAN_I_HELP_VOLUNTEER,
    ],
  },
  {
    ...NAVIGATION_ITEM_PROTEST_FORMS,
    children: [
      NAVIGATION_ITEM_PROTEST_FORMS_ACTIONS,
      NAVIGATION_ITEM_PROTEST_FORMS_EVENTS,
      NAVIGATION_ITEM_PROTEST_WAKE_UP_EMBASSY,
    ],
  },
  {
    ...NAVIGATION_ITEM_BE_VIGILANT,
    children: [
      NAVIGATION_ITEM_BE_VIGILANT_CITIZEN_HANDBOOK,
      NAVIGATION_ITEM_BE_VIGILANT_RELIABLE_INFORMATION,
      NAVIGATION_ITEM_BE_VIGILANT_SCAMS_AND_MISINFORMATION,
      NAVIGATION_ITEM_KNOW_WHAT_YOU_BUY,
    ],
  },
];
