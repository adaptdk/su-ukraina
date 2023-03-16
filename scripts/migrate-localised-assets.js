require(`dotenv`).config();
const contentfulManagement = require(`contentful-management`);

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_ENV = process.env.CONTENTFUL_ENV || `sandbox`;
const DEFAULT_LOCALE = `lt-LT`;

// Console.log messages only if you run the script with the `--verbose` flag
const verbose = process.argv.includes(`--verbose`);
const verboseLog = (msg) => {
  if (verbose) {
    console.log(msg);
  }
};

if (!verbose) {
  console.log(
    `If you want to see more detailed logs, run the script again with the --verbose flag.`
  );
}

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error(
    `Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables.`
  );
  process.exit(1);
}

const client = contentfulManagement.createClient({
  accessToken: ACCESS_TOKEN,
});

async function migrateAssets() {
  const space = await client.getSpace(SPACE_ID);
  const environments = await space.getEnvironments();

  console.log(`Available environments:`);
  environments.items.forEach((env) => console.log(`- ${env.sys.id}`));
  console.log(`\nMigrating environment: ${CONTENTFUL_ENV}\n`);

  const environment = await space.getEnvironment(CONTENTFUL_ENV);
  const assets = await environment.getAssets();

  for (const asset of assets.items) {
    const assetId = asset.sys.id;
    const locales = [`lt-LT`, `en-US`, `uk-UA`];
    let updateAsset = false;

    locales.forEach((locale) => {
      // Check if the asset is published
      if (asset.sys.publishedCounter > 0) {
        const fields = asset.fields;

        if (!fields.title[locale]) {
          // Title is missing, let's copy from the default locale
          asset.fields.title[locale] = asset.fields.title[DEFAULT_LOCALE];
          updateAsset = true;
        }
        if (!fields.file[locale]) {
          // File is missing, let's copy from the default locale
          asset.fields.file[locale] = asset.fields.file[DEFAULT_LOCALE];
          updateAsset = true;
        } else {
          // File locale is present, let's check for missing fields
          const defaultFields = asset.fields.file[DEFAULT_LOCALE];
          for (const field of Object.keys(defaultFields)) {
            if (!fields.file[locale][field]) {
              // Field is missing, let's copy from the default locale
              asset.fields.file[locale][field] = defaultFields[field];
              updateAsset = true;
            }
          }
        }
      }
    });

    try {
      if (updateAsset) {
        await asset.update();
        verboseLog(`Updated asset ${assetId}`);
      } else {
        verboseLog(`Skipping asset ${assetId}`);
      }
    } catch (e) {
      console.log(`Failed updating asset. ID: `, assetId);
      console.error(e);
    }
  }
}

migrateAssets()
  .then(() => {
    console.log(`\nMigration completed \x1b[32msuccessfully\x1b[0m! Hooray!`);
    console.warn(
      `\nDon't forget to check your migrated assets. They are not published yet!`
    );
    console.log(
      `\nIf everything looks OK - you should now \x1b[32mre-publish\x1b[0m your changed assets.`
    );
  })
  .catch(console.error);
