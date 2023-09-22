/* eslint-disable */
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue2';

const path = require('path');

const isDevEnv = process.env.NODE_ENV === 'development';
const isProdEnv = process.env.NODE_ENV === 'production';
const hashReference = () => {
    if (isDevEnv) {
        return 'dist/[name].js';
    }
    return 'dist/[name]-[hash].min.js';
};

const moveJsToBodyPlugin = () => {
    return {
        name: 'html-transform',
        transformIndexHtml(html) {
            const indexJsFile = /index(.+)js/.exec(html);
            const vendorJsFile = /vendor(.+)js/.exec(html);
            const utdAllJsFile = /utd-all(.+)js/.exec(html);

            // Remove JS file references from the <HEAD>
            const remove = html.replace(
                /<script(.+)\/app\/dist\/index(.+)>/,
                '<!-- index.js -->'
            ).replace(
                /<link rel="modulepreload" href="\/app\/dist\/vendor(.+)js">/,
                '<!-- vendor.js -->'
            ).replace(
                /<link rel="modulepreload" href="\/app\/dist\/utd-all(.+)js">/,
                '<!-- utd-all.js -->'
            );
            
            // Add JS files to the <BODY>
            const final = remove.replace(
                /<!-- CHUNK: INDEX -->/,
                `<script type="module" src="/app/dist/${indexJsFile[0]}"></script>`
            ).replace(
                /<!-- CHUNK: VENDORS -->/,
                isDevEnv ? '' : `<script type="module" src="/app/dist/${vendorJsFile[0]}"></script>`
            ).replace(
                /<!-- CHUNK: UTD-ALL -->/,
                `<script type="module" src="/app/dist/${utdAllJsFile[0]}"></script>`
            );

            return final;
        }
    }
};

export default defineConfig({
    base: '/app/',
    publicDir: 'assets',
    build: {
        outDir: './target',
        sourcemap: true,
        minify: isProdEnv,
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            input: {
                index: path.resolve('./index.html'),
                'utd-all': path.resolve('./src/main.js')
            },
            output: {
                entryFileNames: hashReference,
                chunkFileNames: hashReference,
                assetFileNames: () => {
                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    },
    resolve: {
        alias: {
            '_acaSrc': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        vue(),
        splitVendorChunkPlugin(),
        moveJsToBodyPlugin()
    ]
});
