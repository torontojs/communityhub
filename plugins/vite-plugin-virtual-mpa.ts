import fs from 'node:fs';
import path from 'node:path';
import { createLogger } from 'vite';

import type { PluginOption } from 'vite';

const logger = createLogger();

declare global {
	var inputs: Record<string, string>;
}

if (!globalThis.inputs) {
	const inputs: Record<string, string> = {
		index: path.resolve('src', 'index.html')
	};
	logger.info(`✓ Added main entry: ${inputs.index}`);

	const pagesDir = path.resolve('src', 'pages');
	if (!fs.existsSync(pagesDir)) {
		logger.info('ℹ No pages directory found, using main entry only');
	} else {
		for (const folder of fs.readdirSync(pagesDir)) {
			if (folder.startsWith('_')) {
				logger.info(`⊘ Skipped ${folder}: private directory (underscore prefix)`);
				continue;
			}

			const folderPath = path.join(pagesDir, folder);
			const htmlEntry = path.join(folderPath, 'index.html');

			try {
				const stats = fs.statSync(folderPath);
				if (!stats.isDirectory()) { continue; }

				if (fs.existsSync(htmlEntry)) {
					inputs[folder] = htmlEntry;
					logger.info(`✓ Added page: ${folder}`);
				} else {
					logger.info(`⊘ Skipped ${folder}: no index.html found`);
				}
			} catch (error: any) {
				logger.warn(`⚠ Error processing ${folder}: ${error.message}`);
			}
		}
	}

	globalThis.inputs = inputs;
}

export const virtualMpaPlugin = (): PluginOption => {
	return {
		name: 'multi-page-logger',
		config() {
			return {
				build: {
					rollupOptions: {
						input: inputs
					}
				}
			};
		}
	};
};
