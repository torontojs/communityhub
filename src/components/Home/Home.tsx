import '../../components/Home/Home.css';
import { useEffect, useState } from 'react';

const [authenticated, setAuthenticated] = useState<boolean>(false);

useEffect(() => {
	const fetchHeartBeat = async () => {
		try {
			const response = await fetch('');
			const data = await response.json();
			if (data.ok) {
				setAuthenticated(true);
			} else {
				window.location.href = 'sign-in';
			}
		} catch (err) {
			throw new Error();
		}
	};

	const isAuthenticated = fetchHeartBeat();
}, []);

const handleLogOut = () => console.log('haha');

export const Home = () => (
	<>
		<nav>
			<button type='button' onClick={handleLogOut}></button>
		</nav>
		<div>Is Authenticated: {authenticated}</div>;
	</>
);
