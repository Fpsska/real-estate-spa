import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
    buildCommand: 'npm run build',
    rewrites: [routes.rewrite('/(.*)', '/api')]
    // headers: [
    //     {
    //         source: '/(.*)',
    //         headers: [
    //             { key: 'Access-Control-Allow-Origin', value: '*' },
    //             {
    //                 key: 'Access-Control-Allow-Methods',
    //                 value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    //             }
    //         ]
    //     }
    // ]
};
