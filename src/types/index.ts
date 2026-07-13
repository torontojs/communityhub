export type AccessLevel = 'admin' | 'organizer' | 'volunteer';

export type ProfileStatus = 'activated' | 'created' | 'deleted' | 'error' | 'profile-completed' | 'social-handle-provided' | 'tos-accepted';

export interface MemberProfile {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	socialLinks?: Record<string, string>;
	description?: string;
	happenedAt: string;
	insertedAt: string;
}

export interface TeamMemberProfile {
	id: string;
	profileId: string;
	profileName: string;
	name: string;
	avatar?: string;
}
