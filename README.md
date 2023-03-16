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
    - `languages`
    - `region_lt`
    - `region_ru`
    - `region_uk`
    - `tags_lt`
    - `tags_ru`
    - `tags_uk`
8.  Add API keys in the `.env` file (from the "API Keys" section in the
    Algolia application).

## Updating localised Contentful assets

This project's Contentful space is using three different locales.
Because of the way Contentful is, when uploading an asset you have to upload it to each locale.
That may be troublesome, therefore we have an automated way of doing that.

### Disclaimer

It is highly advised to first make a backup of your space. Read up more in the [official Contentful CLI documentation](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

### Using the script

1.  Set up your `.env` keys
    - You can get the `CONTENTFUL_SPACE_ID` by going to **Contentful** -> **Settings** -> **General settings**
    - You can get the `CONTENTFUL_ACCESS_TOKEN` by going to **Contentful** -> **Settings** -> **API Keys** -> **Content management tokens** -> **Generate personal token**
    - Set the `CONTENTFUL_ENV` to the desired environment
      - You can also specify the `CONTENTFUL_ENV` when running the script. See example below.
2.  Run the migration script
3.  You should see in your terminal log that the migration was successful. Now you can go to the Contentful web app and review/publish your assets.

#### Run the script with default settings (sandbox env)

```
node scripts/migrate-localised-assets.js
```

#### Run the script for master environment

```
CONTENTFUL_ENV=master node scripts/migrate-localised-assets.js
```

#### Run the script with status logs for each asset

```
node scripts/migrate-localised-assets.js --verbose
```
