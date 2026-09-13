import { resolve } from 'path';

import { defineConfig, type UserConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import reactPlugin from '@vitejs/plugin-react';

// /. imports

enum Mode {
    development = 'development',
    production = 'production',
    docker = 'docker'
}

const getPlugins = (mode = Mode.development): UserConfig['plugins'] => {
    const isMinifyMode = [Mode.production, Mode.docker].includes(mode);
    const isDevMode = mode === Mode.development;

    const plugins: UserConfig['plugins'] = [reactPlugin()];

    if (isDevMode) {
        plugins.push({
            name: 'watch-app-config',
            configureServer(server) {
                const path = 'public/config.js';
                server.watcher.add(path);
                server.watcher.on('change', (path) => {
                    if (path.endsWith(path)) {
                        server.ws.send({ type: 'full-reload' });
                    }
                });
            }
        });
    }

    if (isMinifyMode) {
        plugins.push(
            ViteMinifyPlugin({
                minifyCSS: true,
                minifyJS: true,
                collapseWhitespace: true,
                removeComments: true
            })
        );
    }

    return plugins;
};

export default defineConfig(({ mode }): UserConfig => {
    const base = mode !== Mode.docker ? '/real-estate-spa/' : '/';
    const api =
        mode !== Mode.docker
            ? 'https://real-estate-spa-backend.vercel.app'
            : 'http://localhost:8080';

    return {
        base,
        define: {
            __BASE_URL__: JSON.stringify(base),
            __API_URL__: JSON.stringify(api)
        },
        server: {
            port: 3000,
            open: true
        },
        build: {
            outDir: 'build',
            emptyOutDir: true,
            rollupOptions: {
                input: [resolve(__dirname, 'index.html')],
                output: {
                    entryFileNames: 'assets/scripts/[name]-entry.js',
                    chunkFileNames: 'assets/scripts/chunks/[name]-[hash].js',
                    assetFileNames: ({ names }) => {
                        const fileName = names[0];

                        if (/\.css$/.test(fileName)) {
                            return 'assets/css/[name]-[hash][extname]';
                        }

                        if (/\.(gif|jpe?g|png|svg)$/.test(fileName)) {
                            return 'assets/images/[name]-[hash][extname]';
                        }

                        if (/\.(ttf|woff|woff2|eot|otf)$/.test(fileName)) {
                            return 'assets/fonts/[name]-[hash][extname]';
                        }

                        return 'assets/[name]-[hash][extname]';
                    }
                }
            }
        },
        plugins: getPlugins(mode as Mode)
    };
});
