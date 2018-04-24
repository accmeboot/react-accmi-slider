import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppContainer } from './App/App';

const container = document.getElementById('app');

if (container) {
  ReactDOM.render(<AppContainer />, container);
}
