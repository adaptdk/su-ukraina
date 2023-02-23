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
        crumbLabelUpdates: breadcrumbLabels,
        trailingSlashes: true,
      },
    },
    `gatsby-transformer-remark`,
    // `gatsby-plugin-preact`,
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
    `create-redirects`,
    `@mediacurrent/gatsby-plugin-silence-css-order-warning`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
      },
    },
    `gatsby-plugin-image`,
  ],
};
