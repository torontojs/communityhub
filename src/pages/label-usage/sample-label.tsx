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
				<h1>Label Usage</h1>
				<div>
					<fieldset>
						<legend>Accent Dark</legend>
						<Label variant='accent' hasIcon>Label</Label>
					</fieldset>
					<fieldset>
						<legend>Accent Light</legend>
						<Label variant='accent' tone='light' hasIcon>Label</Label>
					</fieldset>
					<fieldset>
						<legend>Error Dark</legend>
						<Label variant='error' hasIcon>Error</Label>
					</fieldset>
					<fieldset>
						<legend>Error Light</legend>
						<Label variant='error' tone='light' hasIcon>Error</Label>
					</fieldset>
					<fieldset>
						<legend>Warning Dark</legend>
						<Label variant='warning' hasIcon>Warning</Label>
					</fieldset>
					<fieldset>
						<legend>Warning Light</legend>
						<Label variant='warning' tone='light' hasIcon>Warning</Label>
					</fieldset>
					<fieldset>
						<legend>Success Dark</legend>
						<Label variant='success' hasIcon>Success</Label>
					</fieldset>
					<fieldset>
						<legend>Success Light</legend>
						<Label variant='success' tone='light' hasIcon>Success</Label>
					</fieldset>
					<fieldset>
						<legend>Info Dark</legend>
						<Label variant='info' hasIcon>Info</Label>
					</fieldset>
					<fieldset>
						<legend>Info Light</legend>
						<Label variant='info' tone='light' hasIcon>Info</Label>
					</fieldset>
					<fieldset>
						<legend>Default Dark</legend>
						<Label hasIcon>Default</Label>
					</fieldset>
					<fieldset>
						<legend>Default Light</legend>
						<Label tone='light' hasIcon>Default</Label>
					</fieldset>
				</div>
			</div>
		</StrictMode>
	)
);
