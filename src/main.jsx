import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('Accepting the updated App module!');
    const NextApp = require('./App').default; //eslint-disable-line
    ReactDOM.render(
      <NextApp />,
      document.getElementById('app')
    );
  });
}