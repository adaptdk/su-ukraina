require(`dotenv`).config();
const { breadcrumbLabels } = require(`./src/constants/breadcrumbLabels`);

module.exports = {
  siteMetadata: {
    siteUrl: `https://suukraina.lt`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        autoGenHomeLabel: `Titulinis`,
        crumbLabelUpdates: breadcrumbLabels,
        trailingSlashes: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `orgs-for-donating`,
        path: `${__dirname}/src/content/organizacijos-aukojimui`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `orgs-for-volunteering`,
        path: `${__dirname}/src/content/organizacijos-savanorystei`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `initiatives`,
        path: `${__dirname}/src/content/initiatives`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `events`,
        path: `${__dirname}/src/content/events`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `addressees`,
        path: `${__dirname}/src/content/addressees`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `citizen-handbooks`,
        path: `${__dirname}/src/content/citizen-handbook`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `beware-of-scams-and-misinformation`,
        path: `${__dirname}/src/content/beware-of-scams-and-misinformation`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `info-orgs`,
        path: `${__dirname}/src/content/info-orgs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `info-people`,
        path: `${__dirname}/src/content/info-people`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `info-foreign`,
        path: `${__dirname}/src/content/info-foreign`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `partners`,
        path: `${__dirname}/src/content/partners`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `page-contents`,
        path: `${__dirname}/src/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `refugee-guide`,
        path: `${__dirname}/src/content/refugee-guide`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `refugee-guide-lt`,
        path: `${__dirname}/src/content/refugee-guide-lt`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/src/content/uploads`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-preact`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          placeholder: `dominantColor`,
          quality: 80,
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SuUkraina.lt`,
        short_name: `SuUkraina.lt`,
        start_url: `/`,
        background_color: `#0F47AF`,
        theme_color: `#FFD500`,
        display: `standalone`,
        icon: `src/images/main-icon.svg`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }
        `,
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `remove-empty-fields`,
      options: {
        fieldsToRemove: [`image`],
      },
    },
  ],
};
