module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `organisations`,
          path: `${__dirname}/src/content/organizacijos`,
        },
      },
      `gatsby-transformer-remark`,
    ]
}
