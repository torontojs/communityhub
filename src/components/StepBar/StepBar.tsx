import { useEffect, useState } from 'react';
import { CheckIcon } from './icons/CheckIcon';
import './StepBar.css';

interface Props {
	step: number;
}

const StepBar = ({ step }: Props) => {
	const [width, setWidth] = useState(window.innerWidth);
	const isMobile = width <= 640;

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<ol className='step-bar'>
			<li className={`step-item ${step === 1 ? 'current' : ''} inactive done`}>
				<span className='step-number'>
					<CheckIcon />
				</span>
				{!isMobile || step === 1 ? <span className='step-text'>Account confirmed</span> : ''}
			</li>
			<li className={`step-item ${step === 2 ? 'current active' : 'inactive'} ${step > 2 ? 'done' : ''}`}>
				<span className='step-number'>{step > 2 ? <CheckIcon /> : '2'}</span>
				{!isMobile || step === 2 ? <span className='step-text'>Check the conduct code</span> : ''}
			</li>
			<li className={`step-item ${step === 3 ? 'current active' : 'inactive'}`}>
				<span className='step-number'>3</span>
				{!isMobile || step === 3 ? <span className='step-text'>Complete your profile</span> : ''}
			</li>
		</ol>
	);
};

export default StepBar;
