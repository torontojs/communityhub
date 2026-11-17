import { useEffect, useState } from 'react';

type ToastVariants = 'error' | 'info' | 'success' | 'warning';

export interface ToastNotificationProps {
	title: string;
	variant: ToastVariants;
	onDismiss?(event?: React.MouseEvent<HTMLButtonElement>): void;
	children?: React.ReactNode;
	isToastActive?: boolean;
	initialCountdown?: number;
}

const DEFAULT_INITIAL_COUNTDOWN = 100;
const COUNTDOWN_DECREMENT = 3;
const TIMER_INTERVAL_MS = 90;

const useToastNotificationModel = ({
	title,
	variant,
	onDismiss,
	children,
	isToastActive = false,
	initialCountdown = DEFAULT_INITIAL_COUNTDOWN
}: ToastNotificationProps) => {
	const [countdown, setCountdown] = useState(initialCountdown);
	const [isToastHidden, setIsToastHidden] = useState(false);

	const dismissToast = (event?: React.MouseEvent<HTMLButtonElement>): void => {
		setIsToastHidden(true);
		onDismiss?.(event);
	};

	useEffect(() => {
		if (!isToastActive) {
			setIsToastHidden(false);
			return;
		}

		if (isToastHidden) {
			return;
		}

		setCountdown(initialCountdown);
		setIsToastHidden(false);

		if (initialCountdown <= 0) {
			setIsToastHidden(true);
			return;
		}

		let remainingCountdown = initialCountdown;
		const intervalId = window.setInterval(() => {
			remainingCountdown = Math.max(0, remainingCountdown - COUNTDOWN_DECREMENT);
			setCountdown(remainingCountdown);

			if (remainingCountdown === 0) {
				setIsToastHidden(true);
				window.clearInterval(intervalId);
			}
		}, TIMER_INTERVAL_MS);

		return () => window.clearInterval(intervalId);
	}, [isToastActive, isToastHidden, initialCountdown]);

	return {
		title,
		variant,
		onDismiss: dismissToast,
		children,
		isToastActive,
		isToastHidden,
		initialCountdown,
		countdown
	};
};

export default useToastNotificationModel;
