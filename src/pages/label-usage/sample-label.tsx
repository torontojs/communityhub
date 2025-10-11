import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';
import '../../index.css';
import Label from '../../components/Label/Label.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='parent'>
				<h2>Label Usage</h2>
				<div className='label-collection'>
					<div>
						<p>Accent Dark</p>
						<Label variant='accent' hasIcon>Label</Label>
					</div>
					<div>
						<p>Accent Light</p>
						<Label variant='accent' tone='light' hasIcon>Label</Label>
					</div>
					<div>
						<p>Error Dark</p>
						<Label variant='error' hasIcon>Error</Label>
					</div>
					<div>
						<p>Error Light</p>
						<Label variant='error' tone='light' hasIcon>Error</Label>
					</div>
				</div>

				<div className='label-collection'>
					<div>
						<p>Warning Dark</p>
						<Label variant='warning' hasIcon>Warning</Label>
					</div>
					<div>
						<p>Warning Light</p>
						<Label variant='warning' tone='light' hasIcon>Warning</Label>
					</div>
					<div>
						<p>Success Dark</p>
						<Label variant='success' hasIcon>Success</Label>
					</div>
					<div>
						<p>Success Light</p>
						<Label variant='success' tone='light' hasIcon>Success</Label>
					</div>
				</div>

				<div className='label-collection'>
					<div>
						<p>Info Dark</p>
						<Label variant='info' hasIcon>Info</Label>
					</div>
					<div>
						<p>Info Light</p>
						<Label variant='info' tone='light' hasIcon>Info</Label>
					</div>
					<div>
						<p>Default Dark</p>
						<Label hasIcon>Default</Label>
					</div>
					<div>
						<p>Default Light</p>
						<Label tone='light' hasIcon>Default</Label>
					</div>
				</div>
			</div>
		</StrictMode>
	)
);
