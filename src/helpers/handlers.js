import { useLocation } from "@gatsbyjs/reach-router";

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
      return `/renginiai/`;
    case `patikimi šaltiniai`:
      return `/patikima-saltiniai/`;
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
      return `/ua/refugee-guide/`;
    case `informacija ukrainiečiams`:
      return `/informacija-ukrainieciams/`;
  }
};

export const isUkrainianPage = () => {
  const { pathname } = useLocation();
  return pathname.includes(`/ua/`);
};
