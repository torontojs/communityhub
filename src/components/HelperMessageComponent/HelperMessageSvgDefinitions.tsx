import './HelperMessageSvgDefinitions.css';

export const HelperMessageSvgDefinitions = () => {
	return (
		// Global SVG Icon Definitions
		<svg xmlns='http://www.w3.org/2000/svg' id='icon-definitions' aria-hidden='true' role='none' focusable='false'>
			<defs>
				{/* Default (Gray Info) */}
				<symbol id='icon-default' viewBox='0 0 16 16' fill='none'>
					<g clipPath='url(#clip-default)'>
						<path
							d='M8 14.6666C11.6819 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6819 1.33325 8 1.33325C4.3181 1.33325 1.33333 4.31802 1.33333 7.99992C1.33333 11.6818 4.3181 14.6666 8 14.6666Z'
							stroke='#999999'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path d='M8 10.6667V8' stroke='#999999' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
						<path d='M8 5.33325H8.00667' stroke='#999999' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
					</g>
					<defs>
						<clipPath id='clip-default'>
							<rect width='16' height='16' fill='white' />
						</clipPath>
					</defs>
				</symbol>

				{/* Info (Blue Info) */}
				<symbol id='icon-info' viewBox='0 0 16 16' fill='none'>
					<g clipPath='url(#clip-info)'>
						<path
							d='M8 14.6668C11.6819 14.6668 14.6666 11.6821 14.6666 8.00016C14.6666 4.31826 11.6819 1.3335 8 1.3335C4.3181 1.3335 1.33333 4.31826 1.33333 8.00016C1.33333 11.6821 4.3181 14.6668 8 14.6668Z'
							stroke='#3388FF'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path d='M8 10.6667V8' stroke='#3388FF' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
						<path d='M8 5.3335H8.00667' stroke='#3388FF' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
					</g>
					<defs>
						<clipPath id='clip-info'>
							<rect width='16' height='16' fill='white' />
						</clipPath>
					</defs>
				</symbol>

				{/* Error (X Icon) */}
				<symbol id='icon-error' viewBox='0 0 16 16' fill='none'>
					<path d='M12 4L4 12' stroke='#E51429' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
					<path d='M4 4L12 12' stroke='#E51429' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
				</symbol>

				{/* Success (Checkmark) */}
				<symbol id='icon-success' viewBox='0 0 16 16' fill='none'>
					<path d='M13.3334 4L6.00002 11.3333L2.66669 8' stroke='#06D6A0' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
				</symbol>

				{/* Warning */}
				<symbol id='icon-warning' viewBox='0 0 16 16' fill='none'>
					<path
						d='M14.4867 12L9.15335 2.66665C9.03706 2.46146 8.86842 2.29078 8.66463 2.17203C8.46084 2.05329 8.22921 1.99072 7.99335 1.99072C7.75749 1.99072 7.52585 2.05329 7.32206 2.17203C7.11828 2.29078 6.94964 2.46146 6.83335 2.66665L1.50001 12C1.38247 12.2036 1.32083 12.4346 1.32135 12.6697C1.32187 12.9047 1.38453 13.1355 1.50298 13.3385C1.62142 13.5416 1.79145 13.7097 1.99581 13.8259C2.20018 13.942 2.43162 14.0021 2.66668 14H13.3333C13.5673 13.9997 13.797 13.938 13.9995 13.8208C14.202 13.7037 14.3702 13.5354 14.487 13.3327C14.6039 13.1301 14.6654 12.9002 14.6653 12.6663C14.6653 12.4324 14.6036 12.2026 14.4867 12Z'
						stroke='#DE9502'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path d='M8 6V8.66667' stroke='#DE9502' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
					<path d='M8 11.3335H8.00667' stroke='#DE9502' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
				</symbol>
			</defs>
		</svg>
	);
};
