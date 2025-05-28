import '../../components/Home/Home.css';
import { useEffect } from 'react';
import { getHeartBeat } from '../../utilities/getHeartbeat.ts';
import { handleLogOut } from '../../utilities/handleLogOut.ts';

export const Home = () => {
	useEffect(() => {
		getHeartBeat();
	}, []);

	return (
		<>
			<nav>
				<button type='button' onClick={handleLogOut}>Log Out button</button>
			</nav>
			<div>Home Page</div>
		</>
	);
};
