export const handleLogOut = async () => {
	try {
		const response = await fetch('/api/auth/sign-out', {
			method: 'POST',
			credentials: 'include'
		});

		if (response.status === 200) {
			window.location.href = '/pages/sign-in';
		}
	} catch (err) {
		console.error(err);
	}
};
