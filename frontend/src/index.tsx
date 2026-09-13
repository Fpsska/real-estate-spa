import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import { store } from './app/store/store';

// /. imports

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <BrowserRouter basename={__BASE_URL__}>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);
