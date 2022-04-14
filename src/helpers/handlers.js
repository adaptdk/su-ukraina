export const handlePath = (pseudoLink) => {
  switch (pseudoLink.toLowerCase()) {
    case `savanorystė`:
      return `/kaip-galiu-padeti/savanoryste/`;
    case `aukojimas`:
      return `/kaip-galiu-padeti/aukojimas/lietuvoje/`;
    case `budinkite veikti`:
      return `/protesto-formos/budinkite-veikti/ambasada/`;
    case `prekių boikotas`:
      return `/`;
    case `akcijos`:
      return `/protesto-formos/akcijos/`;
    case `renginiai`:
      return `/protesto-formos/renginiai/`;
    case `patikima informacija`:
      return `/bukime-budrus/patikima-informacija/`;
    case `piliečio atmintinė`:
      return `/bukime-budrus/piliecio-atmintine/`;
    case `sukčiai ir dezinformacija`:
      return `/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/`;
    case `informacija lietuvos gyventojams`:
      return `/informacija-lietuvos-gyventojams/`;
    case `kaip galiu padėti`:
      return `/kaip-galiu-padeti/`;
    case `protesto formos`:
      return `/protesto-formos/`;
    case `būkime budrūs`:
      return `/bukime-budrus/`;
    case `важлива інформація`:
      return `/refugee-guide/`;
    case `informacija ukrainiečiams`:
      return `/informacija-ukrainieciams/`;
  }
};

export const isUkrainianPage = (pathname) => {
  // pathname is expected as location.pathname from useLocation()
  const splitPathname = pathname.split(`/`);

  const isUkrainianPathname = [
    `pagalbos-paieska`,
    `refugee-guide`,
    `help-search`,
    `privacy-policy`,
  ].includes(splitPathname[1]);

  return isUkrainianPathname;
};
