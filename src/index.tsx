import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import App from './components/app/App';
import AppContainer from './utils/appContainer';
import getConfig from './config';
import rootStore from './app/store';
import theme from './app/theme';

const config = getConfig();
const container = new AppContainer(config);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <ThemeProvider theme={theme}>
        <App container={container} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
