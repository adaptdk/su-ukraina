import React from "react";

import FaqNav from "./FaqNav";

export default {
  component: FaqNav,
  title: `Components/FaqNav`,
};

const Template = (args) => {
  return <FaqNav {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  navData: [
    {
      title: `residence`,
      title_override: `Проживання`,
      slug: `/residence`,
      html: undefined,
    },
    {
      title: `migration-office`,
      title_override: `Міграційні служби`,
      slug: `/migration-office`,
      html: undefined,
    },
    {
      title: `currency-exchange`,
      title_override: `ОБМІН ВАЛЮТИ`,
      slug: `/currency-exchange`,
      html: undefined,
    },
    {
      title: `financial-services`,
      title_override: `Банки - фінансові сервіси`,
      slug: `/financial-services`,
      html: undefined,
    },
    {
      title: `school-kindergarten`,
      title_override: `Школа - дитячий садок`,
      slug: `/school-kindergarten`,
      html: undefined,
    },
    {
      title: `healthcare`,
      title_override: `ОХОРОНА ЗДОРОВ'Я`,
      slug: `/healthcare`,
      html: undefined,
    },
    {
      title: `psychological-assistance`,
      title_override: `ПСИХОЛОГІЧНА ДОПОМОГА`,
      slug: `/psychological-assistance`,
      html: undefined,
    },
    {
      title: `employment`,
      title_override: `ПОШУК РОБОТИ/СЛУЖБА ЗАЙНЯТОСТІ`,
      slug: `/employment`,
      html: undefined,
    },
    {
      title: `mobile-communication`,
      title_override: `МОБІЛЬНЕ ЗВ'ЯЗКУ`,
      slug: `/mobile-communication`,
      html: undefined,
    },
    {
      title: `public-transport`,
      title_override: `ГРОМАДСЬКИЙ ТРАНСПОРТ – БЕЗКОШТОВНО`,
      slug: `/public-transport`,
      html: undefined,
    },
    {
      title: `pets`,
      title_override: `Домашні тварини`,
      slug: `/pets`,
      html: undefined,
    },
    {
      title: `contacts`,
      title_override: `Поточні контакти`,
      slug: `/contacts`,
      html: undefined,
    },
    {
      title: `social-support`,
      title_override: `Соціальна підтримка`,
      slug: `/social-support`,
      html: undefined,
    },
  ],
  pathname: `/currency-exchange`,
};
