import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import '../../index.css';
import './style.css';
import NotificationBox from '../../components/NotificationBox/NotificationBox.tsx';

const root = document.getElementById('root') as HTMLDivElement;

const handleDismiss = () => {
	console.log('Close button clicked');
};

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<h1>Notification boxes</h1>
					<p>
						Notification boxes are helpful elements which identify points of interest to the user and explain the interest reason, whether it's a helping message, a
						warning sign or a success confirmation. Notification boxes have different colors and icons, according to its context; they may contain optional titles above
						its textual content, and can also be dismissable when possible.
					</p>
					<hr />
					<time>Last revision: 2025-06-03</time>
					<div className='component-wrapper'>
						<NotificationBox variant='info' title='Notification box title' onDismiss={handleDismiss}>
							Notification box content
						</NotificationBox>
						<NotificationBox variant='success' title='Notification box title' onDismiss={handleDismiss}>
							Notification box content
						</NotificationBox>
						<NotificationBox variant='warning' title='Notification box title' onDismiss={handleDismiss}>
							Notification box content
						</NotificationBox>
						<NotificationBox variant='error' title='Notification box title' onDismiss={handleDismiss}>
							Notification box content
						</NotificationBox>
					</div>
				</div>
			</div>
		</StrictMode>
	)
);
