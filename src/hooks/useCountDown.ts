import { useCallback, useEffect, useState } from 'react';

const ONE_MINUTE_IN_MS = 60000;

export const useCountdown = (initialMinutes = 0) => {
	const [minutes, setMinutes] = useState(initialMinutes);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (isActive && minutes > 0) {
			const timer = setTimeout(() => {
				setMinutes(minutes - 1);
			}, ONE_MINUTE_IN_MS);
			return () => clearTimeout(timer);
		} else if (minutes === 0) {
			setIsActive(false);
		}
		return () => undefined;
	}, [minutes, isActive]);

	const start = useCallback((mins: number = initialMinutes) => {
		setMinutes(mins);
		setIsActive(true);
	}, [initialMinutes]);

	return {
		minutes,
		isFinished: minutes === 0,
		start
	};
};
