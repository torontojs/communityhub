import '../../components/Home/Home.css';
import { useEffect } from 'react';
import { getApiUrl } from '../../utilities/getApiUrl.ts';
import { getHeartBeat } from '../../utilities/getHeartbeat.ts';
import { handleLogOut } from '../../utilities/handleLogOut.ts';

export const Home = () => {
	const { APP_URL } = getApiUrl();

	useEffect(() => {
		getHeartBeat(APP_URL);
	}, []);

	return (
		<>
			<nav>
				<button type='button' onClick={() => handleLogOut(APP_URL)}>Log Out button</button>
			</nav>
			<div>Home Page</div>
		</>
	);
};
