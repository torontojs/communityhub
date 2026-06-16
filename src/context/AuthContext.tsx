import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { safeAvatarUrl } from '../utils/safeAvatarUrl.ts';

type AccessLevel = 'admin' | 'organizer' | 'volunteer';

interface AuthState {
	accessLevel: AccessLevel | null;
	avatar: string;
}

const DEFAULT_AVATAR = '/default-avatar.png';

const AuthContext = createContext<AuthState>({
	accessLevel: null,
	avatar: DEFAULT_AVATAR
});

export const AuthProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
	const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR);
	const [accessLevel, setAccessLevel] = useState<AccessLevel | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchAuth = async (): Promise<void> => {
			try {
				const response = await fetch('/api/auth/heartbeat', {
					credentials: 'include',
					signal: controller.signal
				});

				if (!response.ok) { return; }

				const data = await response.json() as { avatar?: string | null, access?: AccessLevel };
				if (data.avatar) { setAvatar(safeAvatarUrl(data.avatar)); }
				if (data.access) { setAccessLevel(data.access); }
			} catch (error) {
				if (error instanceof Error && error.name !== 'AbortError') {
					console.error('Failed to load auth state:', error);
				}
			}
		};

		void fetchAuth();

		return () => controller.abort();
	}, []);

	return (
		<AuthContext.Provider value={{ avatar, accessLevel }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthState => useContext(AuthContext);
