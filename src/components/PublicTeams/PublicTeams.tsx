import { useEffect, useState } from 'react';
import type { PaginatedResponse, PublicTeam } from '../../types/public.ts';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import PublicLayout from '../PublicLayout/PublicLayout.tsx';
import PublicPagination from '../PublicPagination/PublicPagination.tsx';
import TeamCard from '../TeamCard/TeamCard.tsx';
import './PublicTeams.css';

const FIRST_PAGE = 1;
const PAGE_SIZE = 20;

const getMemberCountLabel = ({ memberCount }: PublicTeam): string => {
	if (memberCount === undefined) { return ''; }
	return `${memberCount} ${memberCount === 1 ? 'member' : 'members'}`;
};

const PublicTeams = (): React.JSX.Element => {
	const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
	const [error, setError] = useState<string | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [lastPage, setLastPage] = useState(FIRST_PAGE);
	const [teams, setTeams] = useState<PublicTeam[]>([]);

	useEffect(() => {
		const controller = new AbortController();

		const fetchTeams = async (): Promise<void> => {
			setError(null);
			setIsLoaded(false);

			try {
				const response = await fetch(`/api/teams?limit=${PAGE_SIZE}&page=${currentPage}`, { signal: controller.signal });
				if (!response.ok) { throw new Error('Failed to fetch teams'); }

				const result = await response.json() as PaginatedResponse<PublicTeam>;
				setTeams(result.data);
				setLastPage(result.lastPage);
			} catch (fetchError) {
				if (fetchError instanceof Error && fetchError.name === 'AbortError') { return; }
				setError('Unable to load teams. Please try refreshing the page.');
				console.error('Error fetching public teams:', fetchError);
			} finally {
				if (!controller.signal.aborted) { setIsLoaded(true); }
			}
		};

		void fetchTeams();
		return () => controller.abort();
	}, [currentPage]);

	let content: React.JSX.Element;

	if (!isLoaded) {
		content = <div className='public-status' aria-live='polite' role='status'>Loading teams...</div>;
	} else if (error) {
		content = <div className='public-status' aria-live='polite' role='status'>{error}</div>;
	} else if (teams.length === 0) {
		content = (
			<div className='public-empty-state'>
				<EmptyIcon />
				<p>No teams to display yet.</p>
			</div>
		);
	} else {
		content = (
			<ul className='public-card-grid public-teams-grid'>
				{teams.map((team) => (
					<TeamCard
						key={team.id}
						href={`/pages/public-team/?id=${encodeURIComponent(team.id)}`}
						name={team.name}
						memberCountLabel={getMemberCountLabel(team)}
						description={team.description ?? 'No team description has been added yet.'}
					/>
				))}
			</ul>
		);
	}

	return (
		<PublicLayout activePage='teams'>
			<header className='public-page-header'>
				<h1>Community teams</h1>
				<p>Explore the teams working together across TorontoJS.</p>
			</header>
			<section aria-label='TorontoJS community teams'>{content}</section>
			{isLoaded && !error && <PublicPagination currentPage={currentPage} lastPage={lastPage} label='Teams pagination' onChange={setCurrentPage} />}
		</PublicLayout>
	);
};

export default PublicTeams;
