import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import './index.css';

/*
if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, { include: [/^CoursesFilter$/] });
}
*/
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
