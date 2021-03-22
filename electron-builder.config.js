module.exports = {
  appId: 'com.pablo1v.hi-browser',
  productName: 'Hi Browser',
  asar: true,
  files: ['src/**/*', 'resources/**/*'],
  extraMetadata: {
    main: 'src/main/main.js',
  },
  win: {
    target: ['portable'],
  },
  mac: {
    category: 'public.app-category.developer-tools',
  },
  linux: {
    category: 'Development',
    artifactName: '${productName}-${version}-${arch}.${ext}',
    target: ['deb', 'AppImage'],
  },
  directories: {
    output: 'release',
    buildResources: 'resources',
  },
};

/* eslint no-template-curly-in-string: 0 */
