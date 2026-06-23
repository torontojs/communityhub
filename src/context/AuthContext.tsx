import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { AccessLevel, ProfileStatus } from '../types/index.ts';
import { safeAvatarUrl } from '../utils/safeAvatarUrl.ts';

interface AuthState {
	accessLevel: AccessLevel | null;
	avatar: string;
	isLoading: boolean;
	profileStatus: ProfileStatus | null;
}

const DEFAULT_AVATAR = '/default-avatar.png';

const AuthContext = createContext<AuthState>({
	accessLevel: null,
	avatar: DEFAULT_AVATAR,
	isLoading: true,
	profileStatus: null
});

export const AuthProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
	const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR);
	const [accessLevel, setAccessLevel] = useState<AccessLevel | null>(null);
	const [profileStatus, setProfileStatus] = useState<ProfileStatus | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		let cancelled = false;

		const fetchAuth = async (): Promise<void> => {
			try {
				const response = await fetch('/api/auth/heartbeat', {
					credentials: 'include',
					signal: controller.signal
				});

				if (cancelled) { return; }

				if (!response.ok) {
					setIsLoading(false);
					return;
				}

				const data = await response.json() as { avatar?: string | null, access?: AccessLevel, status?: ProfileStatus };
				if (data.avatar) { setAvatar(safeAvatarUrl(data.avatar)); }
				if (data.access) { setAccessLevel(data.access); }
				if (data.status) { setProfileStatus(data.status); }
				setIsLoading(false);
			} catch (error) {
				if (!cancelled && error instanceof Error && error.name !== 'AbortError') {
					console.error('Failed to load auth state:', error);
					setIsLoading(false);
				}
			}
		};

		void fetchAuth();

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, []);

	const value = useMemo(
		() => ({ avatar, accessLevel, isLoading, profileStatus }),
		[avatar, accessLevel, isLoading, profileStatus]
	);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthState => useContext(AuthContext);
