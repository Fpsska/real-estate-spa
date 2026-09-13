import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Icards } from '../model/types';

// /. imports

const URL = 'https://real-estate-spa-backend.vercel.app/';

export const cardTemplatesAPI = createApi({
    reducerPath: 'cardTemplatesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: URL
    }),
    endpoints: (build) => ({
        getCardTemplates: build.query<Icards[], void>({
            query: () => ({
                url: 'cards'
            })
        })
    })
});

export const { useGetCardTemplatesQuery } = cardTemplatesAPI;
