import { CheckIcon } from '../Icons/CheckIcon.tsx';
import './StepBar.css';

interface Props {
	currentStep: number;
	steps: { label: string }[];
}

const StepBar = ({ currentStep, steps }: Props) => (
	<nav aria-label='Registration Steps'>
		{/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
		<ol className='step-list' style={{ '--js-grid-items': steps.length.toString() } as React.CSSProperties}>
			{steps.map(({ label }, index) => (
				<li
					className={`step-item ${index + 1 < currentStep ? 'done' : ''}`}
					aria-disabled={index + 1 !== currentStep ? 'true' : 'false'}
					aria-current={index + 1 === currentStep ? 'step' : 'false'}
				>
					<a>
						<span className='step-icon'>
							<CheckIcon title='Status: complete' />
						</span>
						<span className='step-status sr-only'>Status: {index + 1 === currentStep ? 'current' : 'incomplete'}</span>
						<span className='step-number' role='none'>
							{index + 1}
						</span>
						<span className='step-text'>{label}</span>
					</a>
				</li>
			))}
		</ol>
	</nav>
);

export default StepBar;
