import whiteLabelEnvLive from "./whiteLabelEnvLive";

const whiteLabelEnvTest = {};

whiteLabelEnvTest["localhost"] = {
    ...whiteLabelEnvLive["localhost"],
    "REACT_APP_API_URL": process.env.REACT_APP_API_URL || "https://mrdcare-backend.deno.dev",
};

whiteLabelEnvTest["dev-app.mrdcare.com"] = {
    ...whiteLabelEnvLive["app.mrdcare.com"],
    "REACT_APP_API_URL": "https://mrdcare-backend.deno.dev",
};

whiteLabelEnvTest["staging-app.mrdcare.com"] = {
    ...whiteLabelEnvLive["app.mrdcare.com"],
    "REACT_APP_API_URL": "https://mrdcare-backend.deno.dev",
};

export default whiteLabelEnvTest;