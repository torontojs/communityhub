import { useEffect, useState } from 'react';

const ONE_SECOND_IN_MS = 1000;

export function useCountdown(seconds: number) {
	const [remaningTime, setRemainingTime] = useState(seconds);

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime(remainingTime - 1);

			if (remainingTime <= 0) {
				clearInterval(interval);
			}
		}, seconds * ONE_SECOND_IN_MS);
	}, [seconds]);

	return { isFinished: remainingTime <= 0, remainingTime };
}
