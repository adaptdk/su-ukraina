<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>

# SuUkraina.lt

## 🚀 Quick start

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd su-ukraina/
    npm run develop
    ```

2.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.js` to see your site update in real-time!

3.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

## Working with `/help-search` using Algolia

1.  Create an application in Algolia;
2.  Create a new index called `Support` in the freshly created application;
3.  Click on "Add record(s)" and choose to do it manually;
4.  Go to the `/help-search` page on production environment and look for
    `algolia` in the "Network" panel of your devtools. Find the
    `queries` request response and preview it. Copy the array in
    `results[0].hits` and paste it in the Algolia GUI's textarea for new
    records and click "Save".
5.  Go to the "Configuration" panel for the "Support" index in Algolia;
6.  Add `searchableAttributes` "Searchable attributes":
    - `title_lt,title_ru,title_uk`;
    - `tags_lt,tags_ru,tags_uk`;
    - `purpose_lt,purpose_ru,purpose_uk`;
7.  Add `attributesForFaceting` in "Facets":
    - languages
    - region_lt
    - region_ru
    - region_uk
    - tags_lt
    - tags_ru
    - tags_uk
8.  Add API keys in the `.env` file (from the "API Keys" section in the
    Algolia application).
