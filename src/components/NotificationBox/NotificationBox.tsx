import React from 'react';
import './NotificationBox.css';

type Variant = 'error' | 'info' | 'success' | 'warning';

interface NotificationBoxProps {
	title: string;
	variant: Variant;
	onDismiss?(event?: React.MouseEvent<HTMLButtonElement>): void;
	children?: React.ReactNode;
}

function SuccessIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M21.801 9.99999C22.2577 12.2413 21.9322 14.5714 20.8789 16.6018C19.8255 18.6322 18.1079 20.24 16.0125 21.1573C13.9171 22.0746 11.5706 22.2458 9.36431 21.6424C7.15798 21.0389 5.2252 19.6974 3.88828 17.8414C2.55137 15.9854 1.89113 13.7272 2.01767 11.4434C2.14421 9.15952 3.04989 6.98808 4.58366 5.29116C6.11743 3.59424 8.18659 2.47442 10.4461 2.11844C12.7056 1.76247 15.0188 2.19185 17 3.33499'
				stroke='#06D6A0'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path d='M9 11L12 14L22 4' stroke='#06D6A0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
		</svg>
	);
}

function InfoIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
				stroke='#3388FF'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path d='M12 16V12' stroke='#3388FF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
			<path d='M12 8H12.01' stroke='#3388FF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
		</svg>
	);
}

function WarningIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M21.73 18.0002L13.73 4.00022C13.5556 3.69243 13.3026 3.43641 12.9969 3.25829C12.6912 3.08017 12.3438 2.98633 11.99 2.98633C11.6362 2.98633 11.2887 3.08017 10.9831 3.25829C10.6774 3.43641 10.4244 3.69243 10.25 4.00022L2.24999 18.0002C2.07367 18.3056 1.98122 18.6521 1.982 19.0047C1.98278 19.3573 2.07677 19.7035 2.25444 20.008C2.43211 20.3126 2.68714 20.5648 2.99369 20.7391C3.30023 20.9133 3.6474 21.0034 3.99999 21.0002H20C20.3509 20.9999 20.6955 20.9072 20.9993 20.7315C21.303 20.5558 21.5552 20.3033 21.7305 19.9993C21.9058 19.6954 21.998 19.3506 21.9979 18.9997C21.9978 18.6488 21.9054 18.3041 21.73 18.0002Z'
				stroke='#DE9502'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path d='M12 9V13' stroke='#DE9502' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
			<path d='M12 17H12.01' stroke='#DE9502' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
		</svg>
	);
}

function ErrorIcon() {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M15 9L9 15' stroke='#E51429' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
			<path
				d='M2.586 16.726C2.2109 16.351 2.00011 15.8424 2 15.312V8.688C2.00011 8.15761 2.2109 7.64899 2.586 7.274L7.274 2.586C7.64899 2.2109 8.15761 2.00011 8.688 2H15.312C15.8424 2.00011 16.351 2.2109 16.726 2.586L21.414 7.274C21.7891 7.64899 21.9999 8.15761 22 8.688V15.312C21.9999 15.8424 21.7891 16.351 21.414 16.726L16.726 21.414C16.351 21.7891 15.8424 21.9999 15.312 22H8.688C8.15761 21.9999 7.64899 21.7891 7.274 21.414L2.586 16.726Z'
				stroke='#E51429'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path d='M9 9L15 15' stroke='#E51429' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect x='0.5' y='0.5' width='15' height='15' rx='1.5' stroke='#333333' />
			<path d='M12 4L4 12' stroke='#333333' stroke-linecap='round' stroke-linejoin='round' />
			<path d='M4 4L12 12' stroke='#333333' stroke-linecap='round' stroke-linejoin='round' />
		</svg>
	);
}

const ICONS: Record<Variant, React.ReactNode> = {
	info: <InfoIcon />,
	success: <SuccessIcon />,
	warning: <WarningIcon />,
	error: <ErrorIcon />
};

export default function NotificationBox({ title, variant = 'info', onDismiss, children }: NotificationBoxProps) {
	return (
		<div className={`wrapper ${variant}`} role={variant === 'error' ? 'alert' : 'status'} aria-live='polite' aria-atomic='true'>
			<div className='header'>
				<h2 className='title'>{title}</h2>
				<span className='icon'>
					{ICONS[variant]}
				</span>
			</div>
			<div className='content'>{children}</div>
			<button aria-label='Dismiss notification' onClick={onDismiss}>
				<CloseIcon />
				<span>Close</span>
			</button>
		</div>
	);
}
