export const getInitials = (name: string): string =>
	name
		.split(' ')
		.map((word) => word[0])
		.filter(Boolean)
		.slice(0, 2)
		.join('')
		.toUpperCase();
