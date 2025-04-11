import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App';
import { Helmet } from "react-helmet";
import { AuthProvider } from './components/common/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          {`
            @import url("https://fonts.googleapis.com/css?family=Manrope:500,400,600|Inter+Tight:400");
            @import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
          
            * {
              -webkit-font-smoothing: antialiased;
              box-sizing: border-box;
            }
            html,
            body {
              margin: 0px;
              height: 100%;
            }
            button:focus-visible {
              outline: 2px solid #4a90e2 !important;
              outline: -webkit-focus-ring-color auto 5px !important;
            }
            a {
              text-decoration: none;
            }
          `}
        </style>
      </Helmet>
      <App />
    </>
  </AuthProvider>
);
