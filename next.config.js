const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    filename: 'bundle.js', // Output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply the following rules to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel for JavaScript transpilation
          options: {
            presets: ['@babel/preset-env'], // Use the preset for modern JavaScript
          },
        },
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
