module.exports = {
  packagerConfig: {
    name: 'Wooslick Browser',
    icon: 'resources/icon',
    executableName: 'wooslick',
    appBundleId: 'com.pablo1v.wooslick',
    extraResource: ['resources'],
    asar: true,
    ignore: [
      '.github',
      '.vscode',
      'build',
      'config',
      '.yarnrc',
      '.gitignore',
      '.eslintrc.js',
      '.editorconfig',
      '.eslintignore',
      '.prettierignore',
      'yarn.lock',
      'renovate.json',
    ],
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
};
