/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import { dependencies } from './package.json';

function renderChunks(deps: Record<string, string>): Record<string, string[]> {
    const chunks: Record<string, string[]> = {};
    Object.keys(deps).forEach(key => {
        if (['react', 'react-dom'].includes(key)) return;
        chunks[key] = [key];
    });
    return chunks;
}

export default defineConfig(({ mode }) => ({
    build: {
        outDir: 'build',
        rollupOptions: {
            external: ['fsevents'],
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    ...renderChunks(dependencies)
                }
            }
        },
        sourcemap: process.env.SENTRY_DISABLE !== 'true'
    },
    test: {
        css: false,
        include: ['src/**/tests/*'],
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/setupTests.ts',
        clearMocks: true,
        coverage: {
            provider: 'istanbul',
            enabled: true,
            '100': true,
            reporter: ['text', 'lcov'],
            reportsDirectory: 'coverage'
        }
    },
    plugins: [
        tsconfigPaths(),
        svgr(),
        react(),
        ...(mode === 'test'
            ? []
            : [
                eslintPlugin(),
                VitePWA({
                    registerType: 'autoUpdate',
                    includeAssets: [
                        'favicon.png',
                        'robots.txt',
                        'apple-touch-icon.png',
                        'icons/*.svg',
                        'fonts/*.woff2'
                    ],
                    manifest: {
                        theme_color: '#BD34FE',
                        icons: [
                            {
                                src: '/android-chrome-192x192.png',
                                sizes: '192x192',
                                type: 'image/png',
                                purpose: 'any maskable'
                            },
                            {
                                src: '/android-chrome-512x512.png',
                                sizes: '512x512',
                                type: 'image/png'
                            }
                        ]
                    }
                })
            ]),
        sentryVitePlugin({
            disable: true,
            org: 'pontus-salenbo',
            project: 'study-planner',
            authToken: process.env.SENTRY_AUTH_TOKEN
        })
    ]
}));

/**
 *     visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'build/analyze.html'
    })
 */
