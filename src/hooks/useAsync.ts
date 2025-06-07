import { useCallback, useEffect, useState } from 'react';

interface UseAsyncOptions<T> {
	enabled?: boolean;
	onSuccess?(data: T): void;
	onError?(error: Error): void;
}

interface UseAsyncState<T, Args extends readonly unknown[]> {
	data: T | null;
	error: Error | null;
	isLoading: boolean;
	execute(...args: Args): Promise<void>;
	reset(): void;
}

export function useAsync<T, Args extends readonly unknown[] = []>(
	asyncFn: ((...args: Args) => Promise<T>) | null,
	options: UseAsyncOptions<T> = {}
): UseAsyncState<T, Args> {
	const { enabled = false, onSuccess, onError } = options;

	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const execute = useCallback(async (...args: Args): Promise<void> => {
		if (!asyncFn) { return; }

		try {
			setIsLoading(true);
			setError(null);

			const result = await asyncFn(...args);
			setData(result);
			onSuccess?.(result);
		} catch (err) {
			const resolvedError = err instanceof Error ? err : new Error('Something went wrong');
			setError(resolvedError);
			onError?.(resolvedError);
		} finally {
			setIsLoading(false);
		}
	}, [asyncFn, onSuccess, onError]);

	const reset = useCallback((): void => {
		setData(null);
		setError(null);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (enabled && asyncFn) {
			void (execute as () => Promise<void>)();
		}
	}, [enabled, execute]);

	return { data, error, isLoading, execute, reset };
}
