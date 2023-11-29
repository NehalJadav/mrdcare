import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import store from './store';
import history from './history'
import Layouts from './layouts'
import { THEME_CONFIG } from './configs/AppConfig';
import './lang'
import JWTAuthProvider from './services/JWTAuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
  return (
    <GoogleOAuthProvider clientId={window.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID}>
      <div className="App">
        <Provider store={store}>
          <BrowserRouter history={history}>
            <JWTAuthProvider>
              <ThemeSwitcherProvider
                themeMap={themes}
                defaultTheme={THEME_CONFIG.currentTheme}
                insertionPoint="styles-insertion-point"
              >
                <Layouts />
              </ThemeSwitcherProvider>
            </JWTAuthProvider>
          </BrowserRouter>
        </Provider>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
