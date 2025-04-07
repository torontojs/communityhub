import { CheckIcon } from './icons/CheckIcon';
import './StepBar.css';

interface Props {
	step: number;
}

const StepBar = ({ step }: Props) => (
	<ol className='step-bar'>
		<li className={`step-item ${step === 1 ? 'current' : ''} inactive done`}>
			<span className='step-number'>
				<CheckIcon />
			</span>
			{step === 1 ? <span className='step-text'>Account confirmed</span> : ''}
		</li>
		<li className={`step-item ${step === 2 ? 'current active' : 'inactive'} ${step > 2 ? 'done' : ''}`}>
			<span className='step-number'>{step > 2 ? <CheckIcon /> : '2'}</span>
			{step === 2 ? <span className='step-text'>Check the conduct code</span> : ''}
		</li>
		<li className={`step-item ${step === 3 ? 'current active' : 'inactive'}`}>
			<span className='step-number'>3</span>
			{step === 3 ? <span className='step-text'>Complete your profile</span> : ''}
		</li>
	</ol>
);

export default StepBar;
