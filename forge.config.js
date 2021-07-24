const { join } = require('path');

module.exports = {
  packagerConfig: {
    name: 'Hi Browser',
    icon: join(__dirname, 'resources', 'icon'),
    executableName: 'hi-browser',
    appBundleId: 'com.pablo1v.hi-browser',
    extraResource: ['resources'],
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
    },

    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack/webpack.main.config.js',
        renderer: {
          config: './webpack/webpack.renderer.config.js',
          entryPoints: [
            {
              name: 'header',
              html: './src/renderer/header.html',
              js: './src/renderer/compositions/header/start.js',
              preload: {
                js: './src/renderer/compositions/header/preload.js',
              },
            },
            {
              name: 'view',
              html: './src/renderer/view.html',
              js: './src/renderer/compositions/view/start.js',
            },
          ],
        },
      },
    ],
  ],
};
