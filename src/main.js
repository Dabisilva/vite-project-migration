import React from "react";
import ReactDOM from "react-dom/client";

// import { App } from './app';

import { bugsnag } from "utils";

//import { bugsnag } from '@utils';
// import ErrorBoundary from './errorBoundary';
// import './statics/storage/index.js';
//import './statics/tracking/index.js';

const AppRender = () => {
  console.log(bugsnag);
  return (
    <React.StrictMode>
      <span>teste</span>
      {/* <ErrorBoundary>
      </ErrorBoundary> */}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<AppRender />);
