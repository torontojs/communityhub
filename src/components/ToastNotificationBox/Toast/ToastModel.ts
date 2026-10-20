import { useEffect, useState } from 'react';

type ToastVariants = 'error' | 'info' | 'success' | 'warning';

export interface ToastNotificationProps {
	title: string;
	variant: ToastVariants;
	onDismiss?(event?: React.MouseEvent<HTMLButtonElement>): void;
	children?: React.ReactNode;
	isToastActive?: boolean;
	timer?: number;
}

const DEFAULT_TIMER = 100;
const TIMER_DECREMENT = 3;
const TIMER_INTERVAL_MS = 90;

const useToastNotificationModel = ({
	title,
	variant,
	onDismiss,
	children,
	isToastActive = false,
	timer = DEFAULT_TIMER
}: ToastNotificationProps) => {
	const [currentTimer, setCurrentTimer] = useState(timer);
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

		setCurrentTimer(timer);
		setIsToastHidden(false);

		if (timer <= 0) {
			setIsToastHidden(true);
			return;
		}

		let remainingTime = timer;
		const intervalId = window.setInterval(() => {
			remainingTime = Math.max(0, remainingTime - TIMER_DECREMENT);
			setCurrentTimer(remainingTime);

			if (remainingTime === 0) {
				setIsToastHidden(true);
				window.clearInterval(intervalId);
			}
		}, TIMER_INTERVAL_MS);

		return () => window.clearInterval(intervalId);
	}, [isToastActive, isToastHidden, timer]);

	return {
		title,
		variant,
		onDismiss: dismissToast,
		children,
		isToastActive,
		isToastHidden,
		timer: currentTimer
	};
};

export default useToastNotificationModel;
