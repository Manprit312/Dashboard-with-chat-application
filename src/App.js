import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';

import ScrollToTop from './components/scroll-to-top';

import AuthGuard from './helpers/authGUard'

export default function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <AuthGuard>
              <Router />
              </AuthGuard>
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}
