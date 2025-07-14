import { useState } from 'react';

export function useAsync<Data>(asyncFunction: Function) {
	const [data, setData] = useState<Data | undefined>(undefined);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const execute = async (...args: unknown[]) => {
		try {
			setIsLoading(true);
			setError(undefined);

			const result = await asyncFunction(...args);
			setData(result);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return { data, error, isLoading, execute };
}
