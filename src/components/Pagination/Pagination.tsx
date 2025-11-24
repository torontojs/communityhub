import { useState } from 'react';
import './Pagination.css';

interface Props {
	pages?: number;
}

const Pagination = ({ pages = 1 }: Props) => {
	const [page, setPage] = useState(1);

	return (
		<div>
			<button
				disabled={page <= 1}
				onClick={() => setPage(page - 1)}
			>
				{'<'}
			</button>
			<select
				name='page-number'
				value={page}
				onChange={(event) => {
					setPage(Number(event.currentTarget.value));
				}}
			>
				{Array.from({ length: pages }, (_, i) => <option key={i + 1} value={i + 1} selected={i === 0}>{i + 1}</option>)}
			</select>
			<button
				disabled={page >= pages}
				onClick={() => setPage(page + 1)}
			>
				{'>'}
			</button>
		</div>
	);
};

export default Pagination;
