import { parse as tldts } from 'tldts';
const commonEnv = {
    ...process.env,
    "REACT_APP_DOMAIN": tldts(window.location.hostname).domain,
    "REACT_APP_PAGETITLE": "Portal - MRDCare",
    "REACT_APP_LOGO": "/img/mrdcare-logo.svg",
    "REACT_APP_LOGO_SMALL": "/img/mrdcare-logo-sm.svg",
    "REACT_APP_LOGO_WHITE": "/img/mrdcare-logo-white.svg",
    "REACT_APP_LOGO_SMALL_WHITE": "/img/mrdcare-logo-sm-white.svg",
    "REACT_APP_AUTH_BACKGROUND": "/img/others/img-17.jpg",
    "REACT_APP_FAVICON": "/mrdcare-favicon.png",
    "REACT_APP_LOGO_ALT": "MRDCare",
    "REACT_APP_GOOGLE_SIGNIN_CLIENT_ID": "524143824291-69q0il5ojjek9su64ir4gtk7eruu8ijv.apps.googleusercontent.com"
}

const whiteLabelEnvLive = {};

whiteLabelEnvLive["localhost"] = {
    ...commonEnv,
    "REACT_APP_IS_MRDCARE": true,
};

whiteLabelEnvLive["app.mrdcare.com"] = {
    ...commonEnv,
    "REACT_APP_IS_MRDCARE": true,
    "REACT_APP_API_URL": "https://mrdcare-backend.deno.dev",
};

export default whiteLabelEnvLive;