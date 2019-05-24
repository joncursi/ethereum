/**
 * @prettier
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable filenames/match-regex */

/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const withCSS = require('@zeit/next-css');
/* eslint-enable import/no-extraneous-dependencies */

// eslint-disable-next-line immutable/no-mutation
module.exports = withCSS({
  useFileSystemPublicRoutes: false,
  webpack(config, { isServer }) {
    // use the bundle analyzer if `ANALYZE` is enabled
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        }),
      );
    }

    config.plugins.push(
      new WebpackBar({
        color: isServer ? 'orange' : 'green',
        name: isServer ? 'server' : 'client',
      }),
    );

    return config;
  },
});
