import { useEffect, useState } from 'react';
import './TeamDetail.css';
import AddTeamFormModal from '../AddTeamFormModal/AddTeamFormModal.tsx';
import AuthenticatedLayout from '../AuthenticatedLayout/AuthenticatedLayout.tsx';
import Button from '../Button/Button.tsx';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import TrashIcon from '../Icons/Utilities/TrashIcon.tsx';

interface Props {
	teamId: string;
}

interface Team {
	id: string;
	name: string;
	description?: string;
}

interface TeamMember {
	email: string;
	id: string;
	isBasedOnGTA: boolean;
	joinedTeamAt: string;
	name: string;
	profileId: string;
	profileName: string;
	teamNames?: string;
	avatar?: string;
}

interface ProfileOption {
	avatar?: string;
	email: string;
	id: string;
	name: string;
}

interface DataResponse<T> {
	data: T;
}

interface PaginatedResponse<T> {
	currentPage: number;
	data: T[];
	lastPage: number;
	total: number;
}

type AccessLevel = 'admin' | 'organizer' | 'volunteer';

const FIRST_PAGE = 1;
const MAXIMUM_VISIBLE_MEMBER_TEAMS = 2;
const TEAM_MEMBERS_PAGE_SIZE_LARGE = 25;
const TEAM_MEMBERS_PAGE_SIZE_MAXIMUM = 50;
const TEAM_MEMBERS_PAGE_SIZE_SMALL = 5;
const TEAM_MEMBERS_PAGE_SIZE = 10;
const TEAM_MEMBERS_PAGE_SIZE_OPTIONS = [TEAM_MEMBERS_PAGE_SIZE_SMALL, TEAM_MEMBERS_PAGE_SIZE, TEAM_MEMBERS_PAGE_SIZE_LARGE, TEAM_MEMBERS_PAGE_SIZE_MAXIMUM];

const canManage = (access: AccessLevel | null): boolean => access === 'admin' || access === 'organizer';

const getMemberTeamNames = (member: TeamMember, fallbackTeamName: string): string[] => (member.teamNames ?? fallbackTeamName).split('||').filter(Boolean);

const getInitials = (name: string): string =>
	name
		.split(' ')
		.map((word) => word[0])
		.filter(Boolean)
		.slice(0, 2)
		.join('')
		.toUpperCase();

const formatJoinedDate = (value: string): string => {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date);
};

const TeamDetail = ({ teamId }: Props): React.JSX.Element => {
	const [access, setAccess] = useState<AccessLevel | null>(null);
	const [addMemberError, setAddMemberError] = useState<string | null>(null);
	const [addMemberQuery, setAddMemberQuery] = useState<string>('');
	const [availableProfiles, setAvailableProfiles] = useState<ProfileOption[]>([]);
	const [editError, setEditError] = useState<string | null>(null);
	const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [members, setMembers] = useState<TeamMember[]>([]);
	const [membersCurrentPage, setMembersCurrentPage] = useState<number>(FIRST_PAGE);
	const [membersLastPage, setMembersLastPage] = useState<number>(FIRST_PAGE);
	const [membersPageSize, setMembersPageSize] = useState<number>(TEAM_MEMBERS_PAGE_SIZE);
	const [membersTotal, setMembersTotal] = useState<number>(0);
	const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
	const [pageError, setPageError] = useState<string | null>(null);
	const [removeError, setRemoveError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedProfile, setSelectedProfile] = useState<ProfileOption | null>(null);
	const [showRemovedToast, setShowRemovedToast] = useState<boolean>(false);
	const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
	const [team, setTeam] = useState<Team | null>(null);

	const canManageTeams = canManage(access);
	const hasMembers = members.length > 0;
	const memberProfileIds = new Set(members.map((member) => member.profileId));
	const visibleProfileOptions = availableProfiles
		.filter((profile) => !memberProfileIds.has(profile.id))
		.filter((profile) => {
			const query = addMemberQuery.trim().toLowerCase();

			if (!query) {
				return false;
			}

			return profile.name.toLowerCase().includes(query) || profile.email.toLowerCase().includes(query);
		})
		.slice(0, 5);
	const visibleMembers = members.filter((member) => {
		const query = searchQuery.trim().toLowerCase();

		if (!query) {
			return true;
		}

		return member.profileName.toLowerCase().includes(query) || member.email.toLowerCase().includes(query);
	});

	const fetchTeamDetail = async (page = FIRST_PAGE, pageSize = membersPageSize): Promise<void> => {
		setPageError(null);

		try {
			const [teamResponse, membersResponse] = await Promise.all([
				fetch(`/api/teams/${teamId}`),
				fetch(`/api/teams/${teamId}/members?limit=${pageSize}&page=${page}`)
			]);

			if (!teamResponse.ok) {
				throw new Error('Failed to fetch team');
			}

			if (!membersResponse.ok) {
				throw new Error('Failed to fetch team members');
			}

			const teamData = await teamResponse.json() as DataResponse<Team>;
			const membersData = await membersResponse.json() as PaginatedResponse<TeamMember>;

			setTeam(teamData.data);
			setMembers(membersData.data);
			setMembersCurrentPage(membersData.currentPage);
			setMembersLastPage(membersData.lastPage);
			setMembersTotal(membersData.total);
		} catch (error) {
			setPageError('Unable to load team. Please try refreshing the page.');
			console.error('Error fetching team detail:', error);
		} finally {
			setIsLoaded(true);
		}
	};

	useEffect(() => {
		const fetchAccess = async (): Promise<void> => {
			try {
				const response = await fetch('/api/auth/heartbeat', {
					method: 'GET',
					credentials: 'include'
				});

				if (!response.ok) {
					setAccess(null);
					return;
				}

				const data = await response.json() as { access?: AccessLevel };
				setAccess(data.access ?? null);
			} catch (error) {
				setAccess(null);
				console.error('Error fetching current user access:', error);
			}
		};

		void fetchAccess();
		void fetchTeamDetail();
	}, [teamId]);

	useEffect(() => {
		if (!isAddMemberModalOpen) {
			return;
		}

		const fetchProfiles = async (): Promise<void> => {
			try {
				const response = await fetch('/api/profiles', { credentials: 'include' });
				if (!response.ok) {
					throw new Error('Failed to fetch profiles');
				}

				const profiles = await response.json() as PaginatedResponse<ProfileOption>;
				setAvailableProfiles(profiles.data);
			} catch (error) {
				setAddMemberError('Unable to load profiles.');
				console.error('Error fetching profiles for add member modal:', error);
			}
		};

		void fetchProfiles();
	}, [isAddMemberModalOpen]);

	useEffect(() => {
		if (!showSuccessToast) {
			return;
		}

		const timer = setTimeout(() => setShowSuccessToast(false), 4000);
		return () => clearTimeout(timer);
	}, [showSuccessToast]);

	useEffect(() => {
		if (!showRemovedToast) {
			return;
		}

		const timer = setTimeout(() => setShowRemovedToast(false), 4000);
		return () => clearTimeout(timer);
	}, [showRemovedToast]);

	const handleMembersPageChange = (page: number): void => {
		setIsLoaded(false);
		fetchTeamDetail(page).catch((error: unknown) => console.error('Error changing team members page:', error));
	};

	const handleMembersPageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		const pageSize = Number(event.target.value);
		setMembersPageSize(pageSize);
		setIsLoaded(false);
		fetchTeamDetail(FIRST_PAGE, pageSize).catch((error: unknown) => console.error('Error changing team members page size:', error));
	};

	const handleEditTeamSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
		event.preventDefault();
		setEditError(null);

		if (!canManageTeams) {
			setEditError('You do not have permission to update teams.');
			return false;
		}

		const formData = new FormData(event.currentTarget);
		const name = (formData.get('name') as string)?.trim();
		const description = (formData.get('description') as string)?.trim();

		if (!name) {
			setEditError('Team name is required.');
			return false;
		}

		try {
			const response = await fetch(`/api/teams/${teamId}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(description ? { name, description } : { name })
			});

			if (!response.ok) {
				setEditError(response.status === 409 ? 'A team with this name already exists.' : 'Unable to update team. Please try again.');
				return false;
			}

			await fetchTeamDetail(membersCurrentPage, membersPageSize);
			return true;
		} catch (error) {
			setEditError('Unable to update team. Please try again.');
			console.error('Error updating team:', error);
			return false;
		}
	};

	const handleRemoveMember = async (): Promise<void> => {
		if (!memberToRemove) {
			return;
		}

		setRemoveError(null);

		try {
			const response = await fetch(`/api/teams/${teamId}/members`, {
				method: 'DELETE',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify([memberToRemove.id])
			});

			if (!response.ok) {
				setRemoveError('Unable to remove member. Please try again.');
				return;
			}

			setMemberToRemove(null);
			setShowRemovedToast(true);
			await fetchTeamDetail(membersCurrentPage, membersPageSize);
		} catch (error) {
			setRemoveError('Unable to remove member. Please try again.');
			console.error('Error removing team member:', error);
		}
	};

	const handleAddMember = async (profile: ProfileOption): Promise<void> => {
		setAddMemberError(null);

		try {
			const response = await fetch(`/api/teams/${teamId}/members`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify([{ name: 'Member', profileId: profile.id }])
			});

			if (!response.ok) {
				setAddMemberError('Unable to add member.');
				return;
			}

			setIsAddMemberModalOpen(false);
			setAddMemberQuery('');
			setSelectedProfile(null);
			setShowSuccessToast(true);
			await fetchTeamDetail(membersCurrentPage, membersPageSize);
		} catch (error) {
			setAddMemberError('Unable to add member.');
			console.error('Error adding team member:', error);
		}
	};

	if (!isLoaded) {
		return (
			<AuthenticatedLayout activePage='teams' mainClassName='team-detail-page'>
				<div aria-live='polite' role='status' className='team-detail-status'>Loading team...</div>
			</AuthenticatedLayout>
		);
	}

	if (pageError || !team) {
		return (
			<AuthenticatedLayout activePage='teams' mainClassName='team-detail-page'>
				<div aria-live='polite' role='status' className='team-detail-status'>{pageError ?? 'Team not found.'}</div>
			</AuthenticatedLayout>
		);
	}

	return (
		<AuthenticatedLayout activePage='teams' mainClassName='team-detail-page'>
			<div className='team-detail-page-header'>
				<nav className='team-detail-breadcrumb' aria-label='Breadcrumb'>
					<a href='/pages/home'>Community</a>
					<a href='/pages/team'>Teams</a>
					<span>{team.name}</span>
				</nav>
				<div className='team-detail-title-row'>
					<h1>{team.name}</h1>
					{canManageTeams && (
						<div className='team-detail-actions'>
							<Button type='button' hasOutline size='small' className='team-detail-edit-button' onClick={() => setIsEditModalOpen(true)}>
								Edit info
							</Button>
							<Button type='button' isPrimary size='small' className='team-detail-add-member-button' onClick={() => setIsAddMemberModalOpen(true)}>
								Add member
							</Button>
						</div>
					)}
				</div>
			</div>

			<section className='team-detail-members-card' aria-labelledby='team-members-heading'>
				<div className='team-detail-members-header'>
					<h2 id='team-members-heading'>Members ({membersTotal})</h2>
					{hasMembers && (
						<label className='team-detail-search'>
							<span className='visually-hidden'>Search members</span>
							<span className='team-detail-search-icon' aria-hidden='true' />
							<input
								type='search'
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder='Search by name or email'
							/>
						</label>
					)}
				</div>

				{visibleMembers.length > 0 ?
					(
						<div className='team-detail-members-table' role='table' aria-label={`${team.name} members`} data-manageable={canManageTeams}>
							<div className='team-detail-members-row team-detail-members-row-heading' role='row'>
								<span role='columnheader'>Name</span>
								<span role='columnheader'>Team(s)</span>
								<span role='columnheader'>Role(s)</span>
								<span role='columnheader'>Based in the GTA?</span>
								<span role='columnheader'>Joined the team</span>
								{canManageTeams && <span role='columnheader' />}
							</div>
							{visibleMembers.map((member) => {
								const teamNames = getMemberTeamNames(member, team.name);
								const additionalTeamCount = teamNames.length - MAXIMUM_VISIBLE_MEMBER_TEAMS;

								return (
									<div className='team-detail-members-row' role='row' key={member.id}>
										<a className='team-detail-member-name' href={`/pages/profile?id=${member.profileId}`} role='cell'>
											{member.avatar ?
												<img src={member.avatar} alt='' /> :
												<span className='team-detail-member-avatar'>{getInitials(member.profileName)}</span>}
											<span className='team-detail-member-name-text'>{member.profileName}</span>
										</a>
										<div className='team-detail-member-teams' role='cell'>
											{teamNames.slice(0, MAXIMUM_VISIBLE_MEMBER_TEAMS).map((teamName) => <span key={teamName}>{teamName}</span>)}
											{additionalTeamCount > 0 && <span className='team-detail-member-teams-overflow'>+{additionalTeamCount}</span>}
										</div>
										<span className='team-detail-member-role' role='cell'>{member.name}</span>
										<span className='team-detail-member-location' role='cell'>{member.isBasedOnGTA ? 'Yes' : 'No'}</span>
										<span className='team-detail-member-joined-date' role='cell'>{formatJoinedDate(member.joinedTeamAt)}</span>
										{canManageTeams && (
											<button
												type='button'
												className='team-detail-member-remove-btn'
												aria-label={`Remove ${member.profileName} from team`}
												onClick={() => setMemberToRemove(member)}
											>
												<TrashIcon />
											</button>
										)}
									</div>
								);
							})}
						</div>
					) :
					(
						<div className='team-detail-empty-state'>
							<EmptyIcon />
							<p>{hasMembers ? 'No members match your search.' : 'No members to display yet.'}</p>
						</div>
					)}
			</section>

			<div className='team-detail-pagination'>
				<label>
					<span>Results per page</span>
					<select value={membersPageSize} onChange={handleMembersPageSizeChange}>
						{TEAM_MEMBERS_PAGE_SIZE_OPTIONS.map((pageSize) => <option key={pageSize} value={pageSize}>{pageSize}</option>)}
					</select>
				</label>
				<nav aria-label='Team members pagination'>
					{Array.from({ length: membersLastPage }, (_, index) => index + FIRST_PAGE).map((page) => (
						<button
							type='button'
							aria-current={page === membersCurrentPage ? 'page' : undefined}
							key={page}
							onClick={() => handleMembersPageChange(page)}
						>
							{page}
						</button>
					))}
				</nav>
			</div>

			{isAddMemberModalOpen && (
				<div className='team-detail-add-member-modal'>
					<div className='team-detail-add-member-dialog'>
						<div className='team-detail-add-member-title-row'>
							<h2>Add member to {team.name} team</h2>
							<button
								type='button'
								aria-label='Close add member modal'
								onClick={() => {
									setIsAddMemberModalOpen(false);
									setAddMemberQuery('');
									setAddMemberError(null);
									setSelectedProfile(null);
								}}
							>
								<img src='/black-x.png' alt='' />
							</button>
						</div>
						<label className='team-detail-add-member-search'>
							<span>Search for a member to add to this team</span>
							<span className='team-detail-add-member-search-input'>
								<span className='team-detail-search-icon' aria-hidden='true' />
								<input
									type='search'
									value={addMemberQuery}
									onChange={(event) => {
										setAddMemberQuery(event.target.value);
										setSelectedProfile(null);
									}}
									placeholder='Search by name or email'
									autoFocus
								/>
							</span>
						</label>
						<div className='team-detail-add-member-results'>
							{visibleProfileOptions.map((profile) => (
								<button
									type='button'
									key={profile.id}
									aria-pressed={selectedProfile?.id === profile.id}
									onClick={() => setSelectedProfile(profile)}
								>
									{profile.avatar ?
										<img src={profile.avatar} alt='' /> :
										<span>{getInitials(profile.name)}</span>}
									<span>
										<strong>{profile.name}</strong>
										<small>{profile.email}</small>
									</span>
								</button>
							))}
							{addMemberQuery.trim() && visibleProfileOptions.length === 0 && <p>No members found</p>}
						</div>
						{selectedProfile && (
							<Button
								type='button'
								isPrimary
								size='small'
								className='team-detail-add-member-confirm'
									onClick={() => {
										handleAddMember(selectedProfile).catch((error: unknown) => console.error('Error confirming team member:', error));
									}}
							>
								Confirm
							</Button>
						)}
						{addMemberError && <p className='team-detail-add-member-error' role='alert'>{addMemberError}</p>}
					</div>
				</div>
			)}

			{isEditModalOpen && (
				<AddTeamFormModal
					mode='edit'
					error={editError}
					initialName={team.name}
					initialDescription={team.description ?? ''}
					onSubmit={handleEditTeamSubmit}
					onClose={() => {
						setEditError(null);
						setIsEditModalOpen(false);
					}}
				/>
			)}

			{memberToRemove && (
				<div className='team-detail-remove-modal'>
					<div className='team-detail-remove-dialog' role='dialog' aria-modal='true' aria-labelledby='remove-member-title'>
						<div className='team-detail-remove-title-row'>
							<h2 id='remove-member-title'>Remove {memberToRemove.profileName} from {team.name}?</h2>
							<button
								type='button'
								aria-label='Close remove member modal'
								onClick={() => {
									setMemberToRemove(null);
									setRemoveError(null);
								}}
							>
								<img src='/black-x.png' alt='' />
							</button>
						</div>
						<p className='team-detail-remove-description'>They will lose access to this team.</p>
						{removeError && <p className='team-detail-remove-error' role='alert'>{removeError}</p>}
						<div className='team-detail-remove-actions'>
							<Button
								type='button'
								hasOutline
								size='small'
								onClick={() => {
									setMemberToRemove(null);
									setRemoveError(null);
								}}
							>
								Cancel
							</Button>
							<Button
								type='button'
								isPrimary
								size='small'
								onClick={() => {
									handleRemoveMember().catch((error: unknown) => console.error('Error removing team member:', error));
								}}
							>
								Yes
							</Button>
						</div>
					</div>
				</div>
			)}

			{showSuccessToast && (
				<div className='team-detail-success-toast' role='status' aria-live='polite'>
					<button
						type='button'
						className='team-detail-success-toast-close'
						aria-label='Dismiss notification'
						onClick={() => setShowSuccessToast(false)}
					>
						<img src='/black-x.png' alt='' />
					</button>
					<strong>Member added</strong>
					<p>They're part of the team now</p>
				</div>
			)}

			{showRemovedToast && (
				<div className='team-detail-success-toast' role='status' aria-live='polite'>
					<button
						type='button'
						className='team-detail-success-toast-close'
						aria-label='Dismiss notification'
						onClick={() => setShowRemovedToast(false)}
					>
						<img src='/black-x.png' alt='' />
					</button>
					<strong>Member removed</strong>
					<p>They're no longer part of this team.</p>
				</div>
			)}
		</AuthenticatedLayout>
	);
};

export default TeamDetail;
