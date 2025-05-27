module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', 
      // '@babel/preset-env' // jest-expo preset should handle this. If not, it might be added by babel-jest.
                           // The error messages suggest @babel/preset-env is being used.
                           // Let's ensure the options are consistent.
      ['@babel/preset-env', { loose: true }] // Aligning loose mode
    ],
    plugins: [
      // Explicitly set loose mode for these plugins as suggested by the warning
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
    ]
  };
};
