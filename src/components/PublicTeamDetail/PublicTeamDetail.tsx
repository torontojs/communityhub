import { useCallback, useEffect, useState } from 'react';
import type { DataResponse, PaginatedResponse, PublicTeam, PublicTeamMember } from '../../types/public.ts';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import PublicLayout from '../PublicLayout/PublicLayout.tsx';
import PublicPagination from '../PublicPagination/PublicPagination.tsx';
import TeamCard from '../TeamCard/TeamCard.tsx';
import TeamMemberCard from '../TeamMemberCard/TeamMemberCard.tsx';
import './PublicTeamDetail.css';

interface Props {
	teamId: string;
}

const FIRST_PAGE = 1;
const PAGE_SIZE = 20;
const UUID_RE = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu;

const PublicTeamDetail = ({ teamId }: Props): React.JSX.Element => {
	const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
	const [error, setError] = useState<string | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [lastPage, setLastPage] = useState(FIRST_PAGE);
	const [members, setMembers] = useState<PublicTeamMember[]>([]);
	const [team, setTeam] = useState<PublicTeam | null>(null);
	const [totalMembers, setTotalMembers] = useState(0);

	const fetchTeam = useCallback(async (page: number, signal: AbortSignal): Promise<void> => {
		if (!UUID_RE.test(teamId)) {
			setError('Team not found.');
			setIsLoaded(true);
			return;
		}

		setError(null);
		setIsLoaded(false);

		try {
			const [teamResponse, membersResponse] = await Promise.all([
				fetch(`/api/teams/${encodeURIComponent(teamId)}`, { signal }),
				fetch(`/api/teams/${encodeURIComponent(teamId)}/members?limit=${PAGE_SIZE}&page=${page}`, { signal })
			]);

			if (!teamResponse.ok || !membersResponse.ok) { throw new Error('Failed to fetch team'); }

			const teamResult = await teamResponse.json() as DataResponse<PublicTeam>;
			const membersResult = await membersResponse.json() as PaginatedResponse<PublicTeamMember>;
			setTeam(teamResult.data);
			setMembers(membersResult.data);
			setLastPage(membersResult.lastPage);
			setTotalMembers(membersResult.total);
			document.title = `${teamResult.data.name} | TorontoJS Community`;
		} catch (fetchError) {
			if (fetchError instanceof Error && fetchError.name === 'AbortError') { return; }
			setError('Unable to load this team. Please try refreshing the page.');
			console.error('Error fetching public team:', fetchError);
		} finally {
			if (!signal.aborted) { setIsLoaded(true); }
		}
	}, [teamId]);

	useEffect(() => {
		const controller = new AbortController();
		void fetchTeam(currentPage, controller.signal);
		return () => controller.abort();
	}, [currentPage, fetchTeam]);

	let content: React.JSX.Element;

	if (!isLoaded) {
		content = <div className='public-status' aria-live='polite' role='status'>Loading team...</div>;
	} else if (error || !team) {
		content = <div className='public-status' aria-live='polite' role='status'>{error ?? 'Team not found.'}</div>;
	} else {
		content = (
			<>
				<ul className='public-team-summary'>
					<TeamCard
						name={team.name}
						memberCountLabel={`${team.memberCount ?? totalMembers} ${(team.memberCount ?? totalMembers) === 1 ? 'member' : 'members'}`}
						description={team.description ?? 'No team description has been added yet.'}
					/>
				</ul>
				<section className='public-team-members' aria-labelledby='public-team-members-heading'>
					<h2 id='public-team-members-heading'>Members ({totalMembers})</h2>
					{members.length > 0 ?
						(
							<ul className='public-card-grid'>
								{members.map((member) => (
									<li key={member.id}>
										<TeamMemberCard {...member} profileHref={`/pages/public-profile/?id=${encodeURIComponent(member.profileId)}`} />
									</li>
								))}
							</ul>
						) :
						(
							<div className='public-empty-state'>
								<EmptyIcon />
								<p>No members to display yet.</p>
							</div>
						)}
					<PublicPagination currentPage={currentPage} lastPage={lastPage} label='Team members pagination' onChange={setCurrentPage} />
				</section>
			</>
		);
	}

	return (
		<PublicLayout activePage='teams'>
			<a className='public-back-link' href='/pages/public-teams/'>Back to teams</a>
			{content}
		</PublicLayout>
	);
};

export default PublicTeamDetail;
