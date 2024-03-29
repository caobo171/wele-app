module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      'root': ['./'],
      'alias': {
        '@': './src/',
        '@components': './src/components/',
        '@store': './src/store',
        '@pages': './src/pages'
      }
    }]
  ],
};
