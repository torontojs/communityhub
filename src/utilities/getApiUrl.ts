export function getApiUrl() {
	const APP_URL = import.meta.env['APP_API_URL'] ?? 'https://community-hub.torontojs.com/';
	return APP_URL;
}
