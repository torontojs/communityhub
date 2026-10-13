import { useEffect, useState } from 'react';
import type { PaginatedResponse, PublicProfile } from '../../types/public.ts';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import PublicLayout from '../PublicLayout/PublicLayout.tsx';
import PublicPagination from '../PublicPagination/PublicPagination.tsx';
import PublicProfileCard from '../PublicProfileCard/PublicProfileCard.tsx';

const FIRST_PAGE = 1;
const PAGE_SIZE = 20;

const PublicProfiles = (): React.JSX.Element => {
	const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
	const [error, setError] = useState<string | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [lastPage, setLastPage] = useState(FIRST_PAGE);
	const [profiles, setProfiles] = useState<PublicProfile[]>([]);

	useEffect(() => {
		const controller = new AbortController();

		const fetchProfiles = async (): Promise<void> => {
			setError(null);
			setIsLoaded(false);

			try {
				const response = await fetch(`/api/profiles?limit=${PAGE_SIZE}&page=${currentPage}`, { signal: controller.signal });
				if (!response.ok) { throw new Error('Failed to fetch profiles'); }

				const result = await response.json() as PaginatedResponse<PublicProfile>;
				setProfiles(result.data);
				setLastPage(result.lastPage);
			} catch (fetchError) {
				if (fetchError instanceof Error && fetchError.name === 'AbortError') { return; }
				setError('Unable to load profiles. Please try refreshing the page.');
				console.error('Error fetching public profiles:', fetchError);
			} finally {
				if (!controller.signal.aborted) { setIsLoaded(true); }
			}
		};

		void fetchProfiles();
		return () => controller.abort();
	}, [currentPage]);

	let content: React.JSX.Element;

	if (!isLoaded) {
		content = <div className='public-status' aria-live='polite' role='status'>Loading profiles...</div>;
	} else if (error) {
		content = <div className='public-status' aria-live='polite' role='status'>{error}</div>;
	} else if (profiles.length === 0) {
		content = (
			<div className='public-empty-state'>
				<EmptyIcon />
				<p>No profiles to display yet.</p>
			</div>
		);
	} else {
		content = <ul className='public-card-grid'>{profiles.map((profile) => <PublicProfileCard key={profile.id} {...profile} />)}</ul>;
	}

	return (
		<PublicLayout activePage='profiles'>
			<header className='public-page-header'>
				<h1>Community profiles</h1>
				<p>Meet the people who contribute to TorontoJS.</p>
			</header>
			<section aria-label='TorontoJS community profiles'>{content}</section>
			{isLoaded && !error && <PublicPagination currentPage={currentPage} lastPage={lastPage} label='Profiles pagination' onChange={setCurrentPage} />}
		</PublicLayout>
	);
};

export default PublicProfiles;
