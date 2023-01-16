const ltLabels = [
  {
    pathname: `/pagalba-ukrainai`,
    crumbLabel: `Pagalba Ukrainai`,
  },
  {
    pathname: `/pagalba-ukrainai/aukojimas`,
    crumbLabel: `Aukojimas`,
  },
  {
    pathname: `/pagalba-ukrainai/savanoryste`,
    crumbLabel: `Savanorystė`,
  },
  {
    pathname: `/bukime-budrus`,
    crumbLabel: `Būkime budrūs`,
  },
  {
    pathname: `/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos`,
    crumbLabel: `Kaip saugotis nuo sukčių ir dezinformacijos`,
  },
  {
    pathname: `/patikimi-saltiniai`,
    crumbLabel: `Patikimi šaltiniai`,
  },
  {
    pathname: `/informacija-ukrainieciams`,
    crumbLabel: `Informacija Ukrainiečiams`,
  },
  {
    pathname: `/protesto-formos`,
    crumbLabel: `Protesto formos`,
  },
  {
    pathname: `/protesto-formos/akcijos`,
    crumbLabel: `Akcijos`,
  },
  {
    pathname: `/renginiai`,
    crumbLabel: `Renginiai`,
  },
  {
    pathname: `/protesto-formos/budinkite-veikti`,
    crumbLabel: `Budinkite veikti`,
  },
  {
    pathname: `/protesto-formos/budinkite-veikti/imone`,
    crumbLabel: `Įmonė`,
  },
  {
    pathname: `/protesto-formos/budinkite-veikti/ambasada`,
    crumbLabel: `Ambasada`,
  },
  {
    pathname: `/apie-mus`,
    crumbLabel: `Apie mus`,
  },
  {
    pathname: `/informacija-lietuviams`,
    crumbLabel: `Informacija Lietuviams`,
  },
  {
    pathname: `/piliecio-atmintine`,
    crumbLabel: `Piliečio atmintinė`,
  },
  {
    pathname: `/privatumo-politika`,
    crumbLabel: `Privatumo politika`,
  },
];

const uaLabels = [
  {
    pathname: `/ua/dopomoha`,
    crumbLabel: `Допомога`,
  },
  {
    pathname: `/ua/dopomoha/pozhertvy`,
    crumbLabel: `Пожертви`,
  },
  {
    pathname: `/ua/dopomoha/volonterstvo`,
    crumbLabel: `Волонтерство`,
  },
  {
    pathname: `/ua/podii`,
    crumbLabel: `Події`,
  },
  {
    pathname: `/ua/privacy-policy`,
    crumbLabel: `Політика конфіденційності`,
  },
  {
    pathname: `/ua/dovireni-dzherela`,
    crumbLabel: `Довірені джерела`,
  },
  {
    pathname: `/ua/polityka-konfideitsinosti/`,
    crumbLabel: `Політика конфіденційності`,
  },
];

const uaFaqLabels = [
  {
    pathname: `/ua/vazhlyva-informatsiia`,
    crumbLabel: `Важлива інформація`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/mihratsiini-posluhy`,
    crumbLabel: `Міграційні послуги`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/bezkoshtovne-zhytlo`,
    crumbLabel: `Допомога з житлом`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/sotsialna-pidtrymka`,
    crumbLabel: `Соціальна підтримка`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/banky-ta-finansovi-posluhy`,
    crumbLabel: `Банки та фінансові послуги`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/shkola-dityachii-sadok`,
    crumbLabel: `Школа та дитячий садок`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/medychni-posluhy`,
    crumbLabel: `Медичні послуги`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/poshuk-roboty`,
    crumbLabel: `Пошук роботи`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/orenda-zhytla-v-lytvi`,
    crumbLabel: `Оренда житла в Литві`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/visha-osvita`,
    crumbLabel: `Вища освіта`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/mobilnyi-zviazok`,
    crumbLabel: `Мобільний зв'язок`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/obmin-valiuty`,
    crumbLabel: `Обмін валюти`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/psykholohichna-dopomoha`,
    crumbLabel: `Психологічна допомога`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/bezkoshtovnyi-hromadskyi-transport`,
    crumbLabel: `Безкоштовний громадський транспорт`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/domashni-tvaryny`,
    crumbLabel: `Домашні тварини`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/potochni-kontakty`,
    crumbLabel: `Поточні контакти`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/humanitarna-dopomoha`,
    crumbLabel: `Гуманітарна допомога`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/movni-kursi`,
    crumbLabel: `Мовні курси`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/kulturno-osvitni-centri`,
    crumbLabel: `Культура й дозвілля`,
  },
  {
    pathname: `/ua/vazhlyva-informatsiia/stipendiyi-dlya-ukrayinciv-v-litvi`,
    crumbLabel: `Стипендії для українців в Литві`,
  },
];

const enLabels = [
  {
    pathname: `/en/support-ukraine`,
    crumbLabel: `How can I help?`,
  },
];

const breadcrumbLabels = [
  ...ltLabels,
  ...uaLabels,
  ...uaFaqLabels,
  ...enLabels,
];

module.exports = {
  breadcrumbLabels,
};
