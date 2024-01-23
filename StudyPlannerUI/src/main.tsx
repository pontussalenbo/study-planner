/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

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
