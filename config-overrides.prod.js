const R = require('ramda');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const reactLoadablePlugin = require('react-loadable/webpack')
  .ReactLoadablePlugin;
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const webpack = require('webpack');
//change this version for deployment

const pokedex_version = "pokedex_v0";

const version_enum = {
  pokedex: 'pokedex',
};

const getVersionName = () => {
  switch (process.argv[3]) {
    case version_enum.pokedex:
      return pokedex_version;
    default:
      return pokedex_version;
  }
};

const publicPath =
  process.argv[4] === 'staging'
    ? '/' + getVersionName() + '/'
    : '/' + getVersionName() + '/';

module.exports = function(config) {
  let webfontLoaderConfig = {
    test: /\.font\.js/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'webfonts-loader',
        options: {
          publicPath
        }
      }
    ]
  };
  config.module.rules.push(webfontLoaderConfig);
  config.devtool = false;
  config.output.filename = 'static/js/bundle.[chunkhash:8].js';
  config.output.chunkFilename = 'static/js/[name].[chunkhash:8].js';
  config.output.publicPath = publicPath; //process.env.REACT_APP_ENV === 'development' ? '/' : '//assetscdn1.paytm.com/';
  const miniCssExtractPluginIndex = R.findIndex(
    plugin => plugin instanceof MiniCssExtractPlugin,
    config.plugins
  );
  config.plugins[miniCssExtractPluginIndex] = new MiniCssExtractPlugin({
    filename: 'static/css/[name].[chunkhash:8].css',
    chunkFilename: 'static/css/[name].[chunkhash:8].chunk.css'
  });
  config.plugins.push(
    new reactLoadablePlugin({
      filename: 'build/react-loadable.json'
    })
  );
  // remove restriction that source files can't be outside src folder
  config.resolve.plugins = config.resolve.plugins.filter(function(p) {
    return R.not(p instanceof ModuleScopePlugin);
  });
  config.plugins.push(
    new webpack.DefinePlugin({
      BASE_PATH: JSON.stringify(publicPath + 'index.html'),
      DEV_MODE_APP: JSON.stringify([])
    })
  );
};
