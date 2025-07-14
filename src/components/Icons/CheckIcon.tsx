interface Props {
	title?: string;
}

export const CheckIcon = ({ title }: Props) => {
	const titleId = crypto.randomUUID();

	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-labelledby={`icon-id-${titleId}`}>
			<title id={`icon-id-${titleId}`}>{title ?? ''}</title>
			<path d='M20 6L9 17L4 12' stroke='#999999' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
};
