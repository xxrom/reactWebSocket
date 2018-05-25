const path = require('path');
module.exports = {
  mode: 'development',
  entry: { main: './src/main.jsx' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json', '.css' ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};