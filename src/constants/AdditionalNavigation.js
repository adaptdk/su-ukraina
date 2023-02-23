export const ADDITIONAL_NAVIGATION = {
  "/pagalba-ukrainai/savanoryste": [
    {
      pathname: `/pagalba-ukrainai/aukojimas`,
      title: `Aukojimas`,
    },
  ],
  "/pagalba-ukrainai/aukojimas": [
    {
      pathname: `/pagalba-ukrainai/savanoryste`,
      title: `Savanorystė`,
    },
  ],
  "/ua/dopomoha/pozhertvy": [
    {
      pathname: `/ua/dopomoha/volonterstvo`,
      title: `Волонтерство`,
    },
  ],
  "/ua/dopomoha/volonterstvo": [
    {
      pathname: `/ua/dopomoha/pozhertvy`,
      title: `Пожертви`,
    },
  ],
  "/en/support-ukraine/donation": [
    {
      pathname: `/en/support-ukraine/volunteering`,
      title: `Volunteering`,
    },
  ],
  "/en/support-ukraine/volunteering": [
    {
      pathname: `/en/support-ukraine/donation`,
      title: `Donation`,
    },
  ],
  // @todo: fix these links once we have all the slugs for personalized guide pages
  "/ua/guide-for-new-arrivals": [
    {
      pathname: `/ua`,
      title: `Temp link`,
    },
    {
      pathname: `/ua`,
      title: `temp link 2`,
    },
  ],
};
