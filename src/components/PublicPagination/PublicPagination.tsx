import './PublicPagination.css';

interface Props {
	currentPage: number;
	label: string;
	lastPage: number;
	onChange(page: number): void;
}

const FIRST_PAGE = 1;

const PublicPagination = ({ currentPage, label, lastPage, onChange }: Props): React.JSX.Element | null => {
	if (lastPage <= FIRST_PAGE) { return null; }

	return (
		<nav className='public-pagination' aria-label={label}>
			{Array.from({ length: lastPage }, (_, index) => index + FIRST_PAGE).map((page) => (
				<button
					type='button'
					aria-current={page === currentPage ? 'page' : undefined}
					key={page}
					onClick={() => onChange(page)}
				>
					{page}
				</button>
			))}
		</nav>
	);
};

export default PublicPagination;
