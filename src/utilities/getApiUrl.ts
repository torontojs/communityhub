export function getApiUrl() {
	return import.meta.env['APP_API_URL'] ?? 'https://community-hub.torontojs.com/';
}
