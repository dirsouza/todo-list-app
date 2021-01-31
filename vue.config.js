const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  lintOnSave: 'error',
  configureWebpack: {
    resolve: {
      alias: {
        App: path.resolve(__dirname, 'src/app/'),
        Support: path.resolve(__dirname, 'src/support/'),
        Domain: path.resolve(__dirname, 'src/domain/'),
        Assets: path.resolve(__dirname, 'src/assets/'),
        Locales: path.resolve(__dirname, 'src/locales/'),
        Plugin: path.resolve(__dirname, 'src/plugins/'),
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
  pluginOptions: {
    i18n: {},
  },
};
