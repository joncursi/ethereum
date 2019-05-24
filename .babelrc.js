/**
 * @prettier
 */

module.exports = {
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: './app',
      },
    ],
  ],
  presets: ['next/babel'],
};
