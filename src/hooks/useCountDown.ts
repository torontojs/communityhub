import { useEffect } from 'react';

const MS = 1000;

export function useCountdown(
	seconds: number,
	setSeconds: (s: number) => void
) {
	useEffect(() => {
		if (seconds <= 0) { return; }
		const timer = setTimeout(() => {
			setSeconds(seconds - 1);
		}, MS);
		return () => clearTimeout(timer);
	}, [seconds, setSeconds]);

	return { isFinished: seconds <= 0 };
}
