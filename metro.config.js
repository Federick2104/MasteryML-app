// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

defaultConfig.resolver.sourceExts.push("ios.js", "android.js");

module.exports = defaultConfig;
