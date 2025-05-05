// module.exports = {
//     presets: ['babel-preset-expo'],
//     plugins: ['react-native-reanimated/plugin'], 
//   };


module.exports = {
  presets: [
    'babel-preset-expo', // if using Expo
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: ['react-native-reanimated/plugin'],
};
