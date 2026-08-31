export interface PublicProfileLink {
	platform: string;
	url: string;
}

export interface PublicProfileTeam {
	description?: string;
	id: string;
	memberCount: number;
	name: string;
	role: string;
}

export interface PublicProfile {
	avatar?: string;
	canJoinLocalEvents: boolean;
	description?: string;
	id: string;
	isBasedOnGTA: boolean;
	links?: PublicProfileLink[];
	name: string;
	pronouns?: string;
	skills?: string[];
	teams?: PublicProfileTeam[];
}

export interface PublicTeam {
	description?: string;
	id: string;
	memberCount?: number;
	name: string;
}

export interface PublicTeamMember {
	avatar?: string;
	id: string;
	isBasedOnGTA: boolean;
	joinedTeamAt: string;
	name: string;
	profileId: string;
	profileName: string;
	teamNames?: string[];
}

export interface DataResponse<T> {
	data: T;
}

export interface PaginatedResponse<T> {
	currentPage: number;
	data: T[];
	lastPage: number;
	total: number;
}
