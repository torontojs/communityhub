import '../../components/Home/Home.css';
import { handleLogOut } from '../../utilities/handleLogOut.ts';

export const Home = () => (
	<>
		<nav>
			<button type='button' onClick={handleLogOut}>Log Out button</button>
		</nav>
		<h1>Home Page</h1>
	</>
);
