import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/reset.css'
import service from 'auth/FetchInterceptor'
import whiteLabelEnvLive from "./configs/whiteLabelEnvLive";
import whiteLabelEnvTest from "./configs/whiteLabelEnvTest";

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

//Very important to run app
window.env = process.env.REACT_APP_ENV == "production" ?
  whiteLabelEnvLive[isLocalhost ? 'localhost' : window.location.hostname] || whiteLabelEnvLive['app.mrdcare.com'] :
  whiteLabelEnvTest[isLocalhost ? 'localhost' : window.location.hostname] || whiteLabelEnvTest['staging-app.mrdcare.com'];

service.defaults.baseURL = window.env.REACT_APP_API_URL + "/api";

document.getElementById("favicon").href = window.env.REACT_APP_FAVICON
document.getElementById("apple-touch-icon").href = window.env.REACT_APP_FAVICON
document.getElementById("app-page-title").text = window.env.REACT_APP_PAGETITLE

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  process.env.REACT_APP_ENV == "local" ?
    <App />
    :
    <React.StrictMode>
      <App />
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
