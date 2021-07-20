import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import messages_en from "./translations/en.json";
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './scss/style.scss';

const messages = {
  'en': messages_en,
};

const language = navigator.language.split(/[-_]/)[0];  // browser's language without region code

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <IntlProvider locale={language} messages={messages[language]} defaultLocale="en">
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
