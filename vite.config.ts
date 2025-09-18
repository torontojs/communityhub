/* eslint-env node */
/* eslint-disable camelcase */

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
				input: {
					'index': fileURLToPath(new URL('./src/index.html', import.meta.url)),
					'profile': fileURLToPath(new URL('./src/pages/profile/index.html', import.meta.url)),
					'team': fileURLToPath(new URL('./src/pages/team/index.html', import.meta.url)),
					'complete-profile': fileURLToPath(new URL('./src/pages/complete-profile/index.html', import.meta.url)),
					'check-steps': fileURLToPath(new URL('./src/pages/check-steps/index.html', import.meta.url)),
					'review-conduct-code': fileURLToPath(new URL('./src/pages/review-conduct-code/index.html', import.meta.url)),
					'sign-up': fileURLToPath(new URL('./src/pages/sign-up/index.html', import.meta.url)),
					'sign-in': fileURLToPath(new URL('./src/pages/sign-in/index.html', import.meta.url)),
					'confirm-account': fileURLToPath(new URL('./src/pages/confirm-account/index.html', import.meta.url)),
					'check-your-email': fileURLToPath(new URL('./src/pages/check-your-email/index.html', import.meta.url)),
					'home': fileURLToPath(new URL('./src/pages/home/index.html', import.meta.url)),
					'button-usage': fileURLToPath(new URL('./src/pages/button-usage/index.html', import.meta.url)),
					'print-documents': fileURLToPath(new URL('./src/pages/print-documents/index.html', import.meta.url)),
					'input-usage': fileURLToPath(new URL('./src/pages/text-input-usage/index.html', import.meta.url)),
					'reset-password': fileURLToPath(new URL('./src/pages/reset-password/index.html', import.meta.url)),
					'date-usage': fileURLToPath(new URL('./src/pages/date-usage/index.html', import.meta.url)),
					'helper-message': fileURLToPath(new URL('./src/pages/usage-helper-message/index.html', import.meta.url)),
					'protected-profile': fileURLToPath(new URL('./src/pages/protected-profile/index.html', import.meta.url)),
					'protected-profile-edit': fileURLToPath(new URL('./src/pages/protected-profile-edit/index.html', import.meta.url)),
					'protected-page-all': fileURLToPath(new URL('./src/pages/protected-page-all/index.html', import.meta.url)),
					'protected-page-organizers': fileURLToPath(new URL('./src/pages/protected-page-organizers/index.html', import.meta.url)),
					'protected-page-admins': fileURLToPath(new URL('./src/pages/protected-page-admins/index.html', import.meta.url))
				}
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
