const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  modifyObstructiveCode: false,
  video: false,
  screenshots: false,
  numTestsKeptInMemory: 0,
  experimentalMemoryManagement: true,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: './cypress/integration/**/*.{feature,features}',
    supportFile: './cypress/support/e2e.js',
    baseUrl:
        'https://steamcommunity.com/openid/loginform/?goto=%2Fopenid%2Flogin%3Fopenid.ns%3Dhttp%253A%252F%252Fspecs.openid.net%252Fauth%252F2.0%26openid.mode%3Dcheckid_setup%26openid.return_to%3Dhttps%253A%252F%252Fcsgoempirelogin8.com%252Fapi%252Fv2%252Flogin%253Fe%253Dp1.1p%2526s%253D702fcdcc73b3746400056b999e1a2d50a8fd80a3ab16b6ce35d1a7367b866e01%26openid.realm%3Dhttps%253A%252F%252Fcsgoempirelogin8.com%26openid.identity%3Dhttp%253A%252F%252Fspecs.openid.net%252Fauth%252F2.0%252Fidentifier_select%26openid.claimed_id%3Dhttp%253A%252F%252Fspecs.openid.net%252Fauth%252F2.0%252Fidentifier_select%3Fopenid.ns%3Dhttp%253A%252F%252Fspecs.openid.net%252Fauth%252F2.0%26openid.mode%3Dcheckid_setup%26openid.return_to%3Dhttps%253A%252F%252Fcsgoempirelogin8.com%252Fapi%252Fv2%252Flogin%253Fe%253Dp1.1p%2526s%253D702fcdcc73b3746400056b999e1a2d50a8fd80a3ab16b6ce35d1a7367b866e01%26openid.realm%3Dhttps%253A%252F%252Fcsgoempirelogin8.com%26openid.identity%3Dhttp%253A%252F%252Fspecs.openid.net%252Fauth%252F2.0%252Fidentifier_select%26openid.claimed_id%3Dhttp%253A%252F%252Fspecs.openid.net%252Fauth%252F2.0%252Fidentifier_select',
  },
});
