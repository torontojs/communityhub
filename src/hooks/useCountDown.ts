import { useEffect } from 'react';

export function useCountdown(
	seconds: number,
	setSeconds: (s: number) => void
) {
	useEffect(() => {
		if (seconds <= 0) { return; }
		const timer = setTimeout(() => {
			setSeconds(seconds - 1);
		}, 1000);
		return () => clearTimeout(timer);
	}, [seconds, setSeconds]);

	return { isFinished: seconds <= 0 };
}
