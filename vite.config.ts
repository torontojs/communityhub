/* eslint-env node */
/* eslint-disable camelcase */

import fs from 'node:fs';
import path from 'node:path';

import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';

import { defineConfig, type UserConfig } from 'vite';
import { virtualMpaPlugin } from './plugins/vite-plugin-virtual-mpa';

export default defineConfig(({ mode }) => {
	const config: UserConfig = {
		plugins: [
			react(),
			cloudflare({
				configPath: '../wrangler.toml',
				persistState: { path: '../.wrangler/state' }
			}),
			virtualMpaPlugin()
		],
		appType: 'mpa',
		esbuild: { target: 'esnext' },
		envPrefix: 'APP_',
		envDir: '../',
		root: 'src',
		publicDir: '../public',
		clearScreen: false,
		server: {
			host: '0.0.0.0',
			open: false,
			cors: true,
			port: 3000
		},
		build: {
			target: 'esnext',
			emptyOutDir: true,
			outDir: '../dist'
		},
		optimizeDeps: { esbuildOptions: { target: 'esnext' } },
		preview: {
			host: '0.0.0.0',
			open: false,
			port: 3000,
			cors: true
		}
	};

	return config;
});
