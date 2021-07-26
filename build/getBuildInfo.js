const { cyan, bold, white } = require('chalk');

const { filesMetaCache } = require('./build');
const {
  transformBytesInKilobytes,
} = require('./utils/transformBytesInKilobytes');

const SLASH_REGEX = /\//g;

function getBuildInfo() {
  return Array.from(filesMetaCache)
    .sort(([, metaA], [, metaB]) => metaA.bytes - metaB.bytes)
    .map(([file, meta]) => {
      const fileDirectories = file.split(SLASH_REGEX);
      const fileName = fileDirectories.pop();
      const fileBasePath = fileDirectories.join('/');

      const kilobytes = transformBytesInKilobytes(meta.bytes);
      const kilobytesParsed = kilobytes > 0 ? `${kilobytes}kb` : white('-');

      return `${fileBasePath}/${bold(fileName)} ${cyan(kilobytesParsed)}`;
    })
    .join('\n');
}

module.exports = {
  getBuildInfo,
};
