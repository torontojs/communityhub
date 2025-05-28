import '../../components/Home/Home.css';
import { useHeartBeat } from '../../hooks/useHeartBeat.ts';
import { handleLogOut } from '../../utilities/handleLogOut.ts';

export const Home = () => {
	useHeartBeat();
	return (
		<>
			<nav>
				<button type='button' onClick={handleLogOut}>Log Out button</button>
			</nav>
			<div>Home Page</div>
		</>
	);
};
