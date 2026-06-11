/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ConfigProvider from './context/ConfigContext';
// Load admin styles only when on admin routes
if (typeof window !== 'undefined' && window.location) {
  const isAdminRoute = window.location.pathname?.startsWith('/admin') || window.location.hash?.startsWith('#/admin');
  if (isAdminRoute) {
    // eslint-disable-next-line import/first
    import('./admin.css');
  }
}
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
