/* eslint-env node */
/* eslint-disable camelcase */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';

import { defineConfig, type UserConfig } from 'vite';

export default defineConfig(({ mode }) => {
	const config: UserConfig = {
		plugins: [
			react(),
			cloudflare({
				configPath: '../wrangler.toml',
				persistState: { path: '../.wrangler/state' }
			})
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
			outDir: '../dist',
			rollupOptions: {
				input: (() => {
					const inputs: Record<string, string> = {
						index: path.resolve('src', 'index.html')
					};

					const pagesDir = path.resolve('src', 'pages');
					if (!fs.existsSync(pagesDir)) { return inputs; }

					for (const folder of fs.readdirSync(pagesDir)) {
						const folderPath = path.join(pagesDir, folder);
						const htmlEntry = path.join(folderPath, 'index.html');

						if (fs.statSync(folderPath).isDirectory() && fs.existsSync(htmlEntry)) {
							inputs[folder] = htmlEntry;
						}
					}

					return inputs;
				})()
			}
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
