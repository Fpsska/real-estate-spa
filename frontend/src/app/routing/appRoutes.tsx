import { type RouteObject } from 'react-router-dom';

import { Layout } from '../../widgets/layout';
import { MainPage } from '../../pages/main-page';
import { ErrorPage } from '../../pages/error-page';

// /. imports

export const appRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: '*',
                element: <ErrorPage />
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
];
