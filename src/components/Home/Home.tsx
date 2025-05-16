import '../../components/Home/Home.css';
import { useEffect, useState } from 'react';
import { getApiUrl } from '../../utilities/getApiUrl'

export const Home = () => {

	const {BE_URL, FE_URL} = getApiUrl();
	const [authenticated, setAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const fetchHeartBeat = async () => {
			try {
				const response = await fetch(`${BE_URL}auth/heartbeat`);
				const data = await response.json();
				if (data.ok) {
					setAuthenticated(true);
				} else {
					window.location.href = `${FE_URL}pages/sign-in`;
				}
			} catch (err) {
				if(import.meta.env.MODE === 'development'){
					if (err instanceof Error) {
						console.error(err.name);
						console.error(err.cause);
						console.error(err.message);
						console.error(err.stack);
					} else {
						throw new Error('Error sign-up')
					}
				}
			}
		};

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchHeartBeat();
	}, []);

	const handleLogOut = () => console.log('haha');
	
	(
	<>
		<nav>
			<button type='button' onClick={handleLogOut}></button>
		</nav>
		<div>Is Authenticated: {authenticated}</div>;
	</>
)}
