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
    fromPath: `/help-search*`,
    toPath: `/ua/poshuk-posluh:splat`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/help-search*`,
    toPath: `/ua/poshuk-posluh:splat`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/pagalbos-paieska*`,
    toPath: `/pagalba-ukrainai/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/events`,
    toPath: `/ua/podii/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/events/`,
    toPath: `/ua/podii/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/privacy-policy`,
    toPath: `/ua/polityka-konfideitsinosti/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/privacy-policy/`,
    toPath: `/ua/polityka-konfideitsinosti/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/refugee-guide*`,
    toPath: `/ua/vazhlyva-informatsiia/`,
    isPermanent: true,
  });

  // new UA refugee guide paths
  createRedirect({
    fromPath: `/ua/refugee-guide`,
    toPath: `/ua/vazhlyva-informatsiia/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/`,
    toPath: `/ua/vazhlyva-informatsiia/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/employment`,
    toPath: `/ua/vazhlyva-informatsiia/poshuk-roboty/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/employment/`,
    toPath: `/ua/vazhlyva-informatsiia/poshuk-roboty/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/migration-office`,
    toPath: `/ua/vazhlyva-informatsiia/mihratsiini-posluhy/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/migration-office/`,
    toPath: `/ua/vazhlyva-informatsiia/mihratsiini-posluhy/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/rent-in-lithuania`,
    toPath: `/ua/vazhlyva-informatsiia/orenda-zhytla-v-lytvi/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/rent-in-lithuania/`,
    toPath: `/ua/vazhlyva-informatsiia/orenda-zhytla-v-lytvi/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/social-support`,
    toPath: `/ua/vazhlyva-informatsiia/sotsialna-pidtrymka/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/social-support/`,
    toPath: `/ua/vazhlyva-informatsiia/sotsialna-pidtrymka/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/residence`,
    toPath: `/ua/vazhlyva-informatsiia/bezkoshtovne-zhytlo/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/residence/`,
    toPath: `/ua/vazhlyva-informatsiia/bezkoshtovne-zhytlo/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/mobile-communication`,
    toPath: `/ua/vazhlyva-informatsiia/mobilnyi-zviazok/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/mobile-communication/`,
    toPath: `/ua/vazhlyva-informatsiia/mobilnyi-zviazok/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/currency-exchange`,
    toPath: `/ua/vazhlyva-informatsiia/obmin-valiuty/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/currency-exchange/`,
    toPath: `/ua/vazhlyva-informatsiia/obmin-valiuty/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/financial-services`,
    toPath: `/ua/vazhlyva-informatsiia/banky-ta-finansovi-posluhy/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/financial-services/`,
    toPath: `/ua/vazhlyva-informatsiia/banky-ta-finansovi-posluhy/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/school-kindergarten`,
    toPath: `/ua/vazhlyva-informatsiia/shkola-dytiachyi-sadok/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/school-kindergarten/`,
    toPath: `/ua/vazhlyva-informatsiia/shkola-dytiachyi-sadok/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/healthcare`,
    toPath: `/ua/vazhlyva-informatsiia/medychni-posluhy/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/healthcare/`,
    toPath: `/ua/vazhlyva-informatsiia/medychni-posluhy/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/psychological-assistance`,
    toPath: `/ua/vazhlyva-informatsiia/psykholohichna-dopomoha/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/psychological-assistance/`,
    toPath: `/ua/vazhlyva-informatsiia/psykholohichna-dopomoha/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/public-transport`,
    toPath: `/ua/vazhlyva-informatsiia/bezkoshtovnyi-hromadskyi-transport/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/public-transport/`,
    toPath: `/ua/vazhlyva-informatsiia/bezkoshtovnyi-hromadskyi-transport/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/pets`,
    toPath: `/ua/vazhlyva-informatsiia/domashni-tvaryny/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/pets/`,
    toPath: `/ua/vazhlyva-informatsiia/domashni-tvaryny/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/contacts`,
    toPath: `/ua/vazhlyva-informatsiia/potochni-kontakty/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/contacts/`,
    toPath: `/ua/vazhlyva-informatsiia/potochni-kontakty/`,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/ua/refugee-guide/humanitarian-help`,
    toPath: `/ua/vazhlyva-informatsiia/humanitarna-dopomoha/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/ua/refugee-guide/humanitarian-help/`,
    toPath: `/ua/vazhlyva-informatsiia/humanitarna-dopomoha/`,
    isPermanent: true,
  });
};
