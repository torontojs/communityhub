import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { CodeOfConduct } from '../../components/Documents/CodeOfConduct.tsx';
import { ImageReleaseForm } from '../../components/Documents/ImageReleaseForm.tsx';
import { VolunteerAgreement } from '../../components/Documents/VolunteerAgreement.tsx';

type WaiverParam = 'code-of-conduct' | 'image-release' | 'volunteer-agreement' | null;

const root = document.getElementById('root') as HTMLDivElement;
const selectedWaiver = new URLSearchParams(document.location.search).get('document') as WaiverParam;
let Waiver;

switch (selectedWaiver) {
	case 'code-of-conduct':
		Waiver = () => <CodeOfConduct />;
		document.title = 'Toronto JS - Code of Conduct';
		break;
	case 'image-release':
		Waiver = () => <ImageReleaseForm />;
		document.title = 'Toronto JS - Image Release Form';
		break;
	case 'volunteer-agreement':
		Waiver = () => <VolunteerAgreement />;
		document.title = 'Toronto JS - Volunteer Agreement';
		break;
	case null:
	default:
		Waiver = () => <p>Invalid document selected</p>;
		document.title = 'Toronto JS - Invalid Document';
		break;
}

createRoot(root).render(
	(
		<StrictMode>
			<nav className='hide-on-print'>
				<button aria-label='Print document' onClick={() => window.print()}>🖨️</button>
			</nav>
			<Waiver />
		</StrictMode>
	)
);
