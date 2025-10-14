import React from 'react';
import './CloseButton.css';

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'error' | 'outline' | 'warning' | 'dismiss';
	ariaLabel?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({
	variant = 'default',
	ariaLabel = 'Close',
	...rest
}) => (
	<button
		className={`close-button`}
		data-variant={variant}
		aria-label={ariaLabel}
		{...rest}
	>
		<svg
			className='close-icon'
			viewBox='0 0 16 16'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path
				d='M4 4 L12 12 M12 4 L4 12'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
			/>
		</svg>
	</button>
);

export default CloseButton;
