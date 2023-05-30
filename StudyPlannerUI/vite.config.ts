/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import svgr from 'vite-plugin-svgr';

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
    base:"/study-planner/",
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
        }
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
            ])
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
