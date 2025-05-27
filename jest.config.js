module.exports = {
  preset: 'jest-expo',
  // Default transformIgnorePatterns from jest-expo
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  // setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'], // Removed earlier, as v9+ RTL/RN auto-extends
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    'react-native-svg-charts': '<rootDir>/__mocks__/reactNativeSvgChartsMock.js'
  },
  // Ensure the environment is not explicitly 'node' if react-native-env is expected.
  // jest-expo preset should set this to 'react-native/jest/react-native-env.js' or similar.
  // If this is the source of the error, explicitly setting it as below might be needed,
  // but let's rely on the preset first.
  // testEnvironment: 'react-native/jest/react-native-env.js'
};
