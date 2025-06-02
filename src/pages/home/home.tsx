import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Footer from '../../components/Footer/Footer.tsx';
import { Home } from '../../components/Home/Home.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<Home />
			<Footer />
		</StrictMode>
	)
);
