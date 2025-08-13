import '../../components/Home/Home.css';
import { useEffect } from 'react';
import { handleLogOut } from '../../utilities/handleLogOut.ts';

async function getHeartBeat(): Promise<boolean> {
	try {
		const response = await fetch('/api/auth/heartbeat', {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status !== 200) {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}
export const Home = () => {
	useEffect(() => {
		const check = async () => {
			const auth = await getHeartBeat();
			if (auth) { window.location.href = '/pages/sign-in'; }
		};
		void check();
	}, []);
	return (
		<>
			<nav>
				<button type='button' onClick={handleLogOut}>Log Out button</button>
			</nav>
			<h1>Home Page</h1>
		</>
	);
};
