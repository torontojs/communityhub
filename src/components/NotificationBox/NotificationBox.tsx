import React from 'react';
import './NotificationBox.css';
import './initialize-icon-definitions.ts';

type Variant = 'error' | 'info' | 'success' | 'warning';

interface NotificationBoxProps {
	title: string;
	variant: Variant;
	onDismiss?(event?: React.MouseEvent<HTMLButtonElement>): void;
	children?: React.ReactNode;
}

const iconMap: Record<Variant, string> = {
	info: 'icon-info',
	success: 'icon-success-with-border',
	warning: 'icon-warning',
	error: 'icon-error-with-border'
};

export default function NotificationBox({ title, variant, onDismiss, children }: NotificationBoxProps) {
	return (
		<div className={`notification-box-wrapper`} data-variant={variant} role={variant === 'error' ? 'alert' : 'status'} aria-live='polite' aria-atomic='true'>
			<h2 className='title text-h2'>{title}</h2>
			<svg>
				<use href={`#${iconMap[variant]}`} />
			</svg>
			<div className='content'>{children}</div>
			<button aria-label='Dismiss notification' onClick={onDismiss}>
				<svg>
					<use href='#icon-close' />
				</svg>
				<span aria-hidden='true'>Close</span>
			</button>
		</div>
	);
}
