import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Icards } from '../model/types';

// /. imports

export const cardTemplatesAPI = createApi({
    reducerPath: 'cardTemplatesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: __API_URL__
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
