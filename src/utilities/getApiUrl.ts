export function getApiUrl() {
	const BE_URL = import.meta.env['APP_API_URL_DEV'] ?? 'https://community-hub.torontojs.com/';
	const FE_URL = import.meta.env['APP_URL_DEV'] ?? '';
	return { BE_URL, FE_URL };
}
