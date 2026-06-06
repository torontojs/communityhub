import { useCallback, useEffect, useState } from 'react';
import './Teams.css';
import AddTeamFormModal from '../AddTeamFormModal/AddTeamFormModal.tsx';
import AuthenticatedLayout from '../AuthenticatedLayout/AuthenticatedLayout.tsx';
import Button from '../Button/Button.tsx';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import TeamCard from '../TeamCard/TeamCard.tsx';
interface Team {
	id: string;
	name: string;
	description?: string;
}

export interface TeamMemberProfile {
	id: string;
	profileId: string;
	profileName: string;
	name: string;
	avatar?: string;
}

interface PaginatedResponse<T> {
	currentPage: number;
	data: T[];
	lastPage: number;
	total: number;
}

interface TeamMembersState {
	count: number;
	error: string | null;
	isLoaded: boolean;
}

type AccessLevel = 'admin' | 'organizer' | 'volunteer';

const FIRST_PAGE = 1;
const TEAMS_PAGE_SIZE_LARGE = 25;
const TEAMS_PAGE_SIZE_MAXIMUM = 50;
const TEAMS_PAGE_SIZE_SMALL = 5;
const TEAMS_PAGE_SIZE = 10;
const TEAMS_PAGE_SIZE_OPTIONS = [TEAMS_PAGE_SIZE_SMALL, TEAMS_PAGE_SIZE, TEAMS_PAGE_SIZE_LARGE, TEAMS_PAGE_SIZE_MAXIMUM];

const Teams = () => {
	const [isLoadedTeamsData, setIsLoadedTeamsData] = useState<boolean>(false);
	const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState<boolean>(false);
	const [editingTeam, setEditingTeam] = useState<Team | null>(null);
	const [currentUserAccess, setCurrentUserAccess] = useState<AccessLevel | null>(null);
	const [teamsData, setTeamsData] = useState<Team[]>([]);
	const [teamsCurrentPage, setTeamsCurrentPage] = useState<number>(FIRST_PAGE);
	const [teamsLastPage, setTeamsLastPage] = useState<number>(FIRST_PAGE);
	const [teamsPageSize, setTeamsPageSize] = useState<number>(TEAMS_PAGE_SIZE);
	const [teamMembersByTeamId, setTeamMembersByTeamId] = useState<Record<string, TeamMembersState>>({});
	const [addTeamError, setAddTeamError] = useState<string | null>(null);
	const [teamsDataError, setTeamsDataError] = useState<string | null>(null);
	const canManageTeams = currentUserAccess === 'admin' || currentUserAccess === 'organizer';

	const fetchTeamsData = useCallback(
		async (
			{ page = teamsCurrentPage, pageSize = teamsPageSize, showLoading = true }: { page?: number, pageSize?: number, showLoading?: boolean } = {}
		): Promise<void> => {
			if (showLoading) {
				setIsLoadedTeamsData(false);
			}
			setTeamsDataError(null);

			try {
				const responseTeams = await fetch(`/api/teams?limit=${pageSize}&page=${page}`);
				if (!responseTeams.ok) {
					throw new Error('Failed to fetch teams data');
				}

				const teamsResponse = await responseTeams.json() as PaginatedResponse<Team>;

				setTeamsData(teamsResponse.data);
				setTeamsCurrentPage(teamsResponse.currentPage);
				setTeamsLastPage(teamsResponse.lastPage);
			} catch (error) {
				setTeamsDataError('Unable to load teams. Please try refreshing the page.');
				console.error('Error fetching teams data:', error);
			} finally {
				setIsLoadedTeamsData(true);
			}
		},
		[teamsCurrentPage, teamsPageSize]
	);

	useEffect(() => {
		void fetchTeamsData();
	}, [fetchTeamsData]);

	useEffect(() => {
		const fetchCurrentUserAccess = async (): Promise<void> => {
			try {
				const response = await fetch('/api/auth/heartbeat', {
					method: 'GET',
					credentials: 'include'
				});

				if (!response.ok) {
					setCurrentUserAccess(null);
					return;
				}

				const data = await response.json() as { access?: AccessLevel };
				setCurrentUserAccess(data.access ?? null);
			} catch (error) {
				setCurrentUserAccess(null);
				console.error('Error fetching current user access:', error);
			}
		};

		void fetchCurrentUserAccess();
	}, []);

	const handleAddTeamSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
		event.preventDefault();
		setAddTeamError(null);

		if (!canManageTeams) {
			setAddTeamError('You do not have permission to create teams.');
			return false;
		}

		const formData = new FormData(event.currentTarget);
		const name = (formData.get('name') as string)?.trim();
		const description = (formData.get('description') as string)?.trim();

		if (!name) {
			setAddTeamError('Team name is required.');
			return false;
		}

		const body = description ? { name, description } : { name };

		try {
			const response = await fetch('/api/teams', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

			if (!response.ok) {
				setAddTeamError(response.status === 409 ? 'A team with this name already exists.' : 'Unable to create team. Please try again.');
				return false;
			}

			await fetchTeamsData({ showLoading: false });
			return true;
		} catch (error) {
			setAddTeamError('Unable to create team. Please try again.');
			console.error('Error creating team:', error);
			return false;
		}
	};

	const openAddTeamModal = (): void => {
		if (!canManageTeams) {
			return;
		}

		setAddTeamError(null);
		setIsAddTeamModalOpen(true);
	};

	const handleTeamsPageChange = (page: number): void => {
		setTeamsCurrentPage(page);
	};

	const handleTeamsPageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setTeamsPageSize(Number(event.target.value));
		setTeamsCurrentPage(FIRST_PAGE);
	};

	const handleEditTeamSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
		event.preventDefault();
		setAddTeamError(null);

		if (!canManageTeams) {
			setAddTeamError('You do not have permission to update teams.');
			return false;
		}

		if (!editingTeam) {
			setAddTeamError('Unable to update team. Please try again.');
			return false;
		}

		const formData = new FormData(event.currentTarget);
		const name = (formData.get('name') as string)?.trim();
		const description = (formData.get('description') as string)?.trim();

		if (!name) {
			setAddTeamError('Team name is required.');
			return false;
		}

		const body = description ? { name, description } : { name };

		try {
			const response = await fetch(`/api/teams/${editingTeam.id}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

			if (!response.ok) {
				setAddTeamError(response.status === 409 ? 'A team with this name already exists.' : 'Unable to update team. Please try again.');
				return false;
			}

			await fetchTeamsData({ showLoading: false });
			return true;
		} catch (error) {
			setAddTeamError('Unable to update team. Please try again.');
			console.error('Error updating team:', error);
			return false;
		}
	};

	useEffect(() => {
		if (!isLoadedTeamsData || teamsData.length === 0) {
			return;
		}

		let isMounted = true;

		setTeamMembersByTeamId(
			Object.fromEntries(teamsData.map((team) => [team.id, { count: 0, error: null, isLoaded: false }]))
		);

		teamsData.forEach((team) => {
			const fetchTeamMembersData = async (): Promise<void> => {
				try {
					const responseTeamMembers = await fetch(`/api/teams/${team.id}/members`);
					if (!responseTeamMembers.ok) {
						throw new Error(`Failed to fetch team members for ${team.id}`);
					}

					const teamMembersResponse = await responseTeamMembers.json() as PaginatedResponse<TeamMemberProfile>;

					if (isMounted) {
						setTeamMembersByTeamId((current) => ({
							...current,
							[team.id]: {
								count: teamMembersResponse.total,
								error: null,
								isLoaded: true
							}
						}));
					}
				} catch (error) {
					if (isMounted) {
						setTeamMembersByTeamId((current) => ({
							...current,
							[team.id]: {
								count: 0,
								error: 'Unable to load team members. Please try refreshing the page.',
								isLoaded: true
							}
						}));
					}
					console.error('Error fetching team members data:', error);
				}
			};

			void fetchTeamMembersData();
		});

		return () => {
			isMounted = false;
		};
	}, [isLoadedTeamsData, teamsData]);

	const getMemberCountLabel = (team: Team): string => {
		const teamMembersData = teamMembersByTeamId[team.id];

		if (!teamMembersData?.isLoaded) {
			return 'Loading members';
		}

		if (teamMembersData.error) {
			return 'Members unavailable';
		}

		return `${teamMembersData.count} ${teamMembersData.count === 1 ? 'member' : 'members'}`;
	};

	// If data not yet loaded
	if (!isLoadedTeamsData) {
		return (
			<AuthenticatedLayout activePage='teams' className='teams-grid-container' mainClassName='teams-page'>
				<div aria-live='polite' role='status' className='teams-page-status'>Loading teams...</div>
			</AuthenticatedLayout>
		);
	}

	// If error encountered
	if (teamsDataError) {
		return (
			<AuthenticatedLayout activePage='teams' className='teams-grid-container' mainClassName='teams-page'>
				<div aria-live='polite' role='status' className='teams-page-status'>
					{teamsDataError}
				</div>
			</AuthenticatedLayout>
		);
	}

	return (
		<AuthenticatedLayout activePage='teams' className='teams-grid-container' mainClassName='teams-page'>
			<div className='teams-page-header'>
				<nav className='teams-breadcrumb' aria-label='Breadcrumb'>
					<a href='/pages/home'>Community</a>
					<span>Teams</span>
				</nav>
				<div className='teams-title-row'>
					<h1>Teams</h1>
					{canManageTeams && teamsData.length > 0 && (
						<Button
							type='button'
							className='teams-add-button'
							isPrimary
							size='small'
							onClick={openAddTeamModal}
						>
							Add Team
						</Button>
					)}
				</div>
			</div>
			<section aria-label='TorontoJS teams'>
				{teamsData.length > 0 ?
					<ul className='teams-list'>
						{teamsData.map((team: Team) => (
							<TeamCard
								key={team.id}
								href={`/pages/team?id=${team.id}`}
								name={team.name}
								memberCountLabel={getMemberCountLabel(team)}
								description={team.description ?? 'No team description has been added yet.'}
								onEdit={canManageTeams ?
									() => {
										setAddTeamError(null);
										setEditingTeam(team);
									} :
									undefined}
							/>
						))}
					</ul> :
					(
						<div className='teams-empty-state'>
							<EmptyIcon />
							<p>No teams to display yet.</p>
							{canManageTeams && <button type='button' onClick={openAddTeamModal}>Create Team</button>}
						</div>
					)}
			</section>
			<div className='teams-pagination'>
				<label>
					<span>Results per page</span>
					<select value={teamsPageSize} onChange={handleTeamsPageSizeChange}>
						{TEAMS_PAGE_SIZE_OPTIONS.map((pageSize) => <option key={pageSize} value={pageSize}>{pageSize}</option>)}
					</select>
				</label>
				<nav aria-label='Teams pagination'>
					{Array.from({ length: teamsLastPage }, (_, index) => index + FIRST_PAGE).map((page) => (
						<button
							type='button'
							aria-current={page === teamsCurrentPage ? 'page' : undefined}
							key={page}
							onClick={() => handleTeamsPageChange(page)}
						>
							{page}
						</button>
					))}
				</nav>
			</div>
			{isAddTeamModalOpen && (
				<AddTeamFormModal
					error={addTeamError}
					onSubmit={handleAddTeamSubmit}
					onClose={() => {
						setAddTeamError(null);
						setIsAddTeamModalOpen(false);
					}}
				/>
			)}
			{editingTeam && (
				<AddTeamFormModal
					mode='edit'
					error={addTeamError}
					initialName={editingTeam.name}
					initialDescription={editingTeam.description ?? ''}
					onSubmit={handleEditTeamSubmit}
					onClose={() => {
						setAddTeamError(null);
						setEditingTeam(null);
					}}
				/>
			)}
		</AuthenticatedLayout>
	);
};

export default Teams;
