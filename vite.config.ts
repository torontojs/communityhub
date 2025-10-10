/* eslint-env node */
/* eslint-disable camelcase */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';

import { defineConfig, type UserConfig } from 'vite';
import { createLogger } from 'vite';
const logger = createLogger();

let cachedInputs: Record<string, string> | null = null;

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
					if (cachedInputs) {
						return cachedInputs;
					}

					const inputs: Record<string, string> = {
						index: path.resolve('src', 'index.html')
					};
					logger.info(`✓ Added main entry: ${path.resolve('src', 'index.html')}`);

					const pagesDir = path.resolve('src', 'pages');
					if (!fs.existsSync(pagesDir)) {
						logger.info('ℹ No pages directory found, using main entry only');
						cachedInputs = inputs;
						return inputs;
					}

					for (const folder of fs.readdirSync(pagesDir)) {
						if (folder.startsWith('_')) {
							logger.info(`⊘ Skipped ${folder}: private directory (underscore prefix)`);
							continue;
						}

						const folderPath = path.join(pagesDir, folder);
						const htmlEntry = path.join(folderPath, 'index.html');

						try {
							const stats = fs.statSync(folderPath);
							if (stats.isDirectory()) {
								if (fs.existsSync(htmlEntry)) {
									inputs[folder] = htmlEntry;
									logger.info(`✓ Added page: ${folder}`);
								} else {
									logger.info(`⊘ Skipped ${folder}: no index.html found`);
								}
							}
						} catch (error: any) {
							logger.warn(`⚠ Error processing ${folder}: ${error.message}`);
						}
					}

					cachedInputs = inputs;
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
