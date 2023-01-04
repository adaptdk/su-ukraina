exports.createPages = async ({ actions }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/kaip-galiu-padeti/aukojimas/lietuvoje/`,
    toPath: `/kaip-galiu-padeti/aukojimas/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/kaip-galiu-padeti/aukojimas/lietuvoje`,
    toPath: `/kaip-galiu-padeti/aukojimas/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/kaip-galiu-padeti/aukojimas/uzsienyje/`,
    toPath: `/kaip-galiu-padeti/aukojimas/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/kaip-galiu-padeti/aukojimas/uzsienyje`,
    toPath: `/kaip-galiu-padeti/aukojimas/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/protesto-formos/budinkite-veikti`,
    toPath: `/protesto-formos/budinkite-veikti/ambasada/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/protesto-formos/budinkite-veikti/`,
    toPath: `/protesto-formos/budinkite-veikti/ambasada/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/protesto-formos/renginiai`,
    toPath: `/renginiai/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/protesto-formos/renginiai/`,
    toPath: `/renginiai/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos`,
    toPath: `/informacija-lietuviams/sukciai-ir-dezinformacija/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/`,
    toPath: `/informacija-lietuviams/sukciai-ir-dezinformacija/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/bukime-budrus/patikima-informacija`,
    toPath: `/patikimi-saltiniai/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/bukime-budrus/patikima-informacija/`,
    toPath: `/patikimi-saltiniai/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/bukime-budrus/piliecio-atmintine`,
    toPath: `/piliecio-atmintine/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/bukime-budrus/piliecio-atmintine/`,
    toPath: `/piliecio-atmintine/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/refugee-guide*`,
    toPath: `/ua/vazhlyva-informatsiia`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/help-search*`,
    toPath: `/ua/help-search:splat`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/pagalbos-paieska`,
    toPath: `/pagalba-ukrainai`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide`,
    toPath: `/ua/vazhlyva-informatsiia`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/employment`,
    toPath: `/poshuk-roboty`,
    isPermanent: true,
  });
};
