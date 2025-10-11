import React, { forwardRef, type ParamHTMLAttributes } from 'react';
import './Label.css';

type LabelColor =
	| 'accent'
	| 'default'
	| 'error'
	| 'warning'
	| 'success'
	| 'info';

type LabelComponentTones = 'dark' | 'light';

interface Props extends ParamHTMLAttributes<HTMLSpanElement> {
	variant?: LabelColor;
	tone?: LabelComponentTones;
	hasIcon?: boolean;
	icon?: React.JSX.Element;
}

const Label = forwardRef<HTMLSpanElement, Props>(({
	variant = 'default',
	tone = 'dark',
	hasIcon,
	icon,
	children,
	...rest
}) => (
	<span className='detail-tab' {...rest} data-variant={variant} data-tone={tone} data-icon={hasIcon}>
		{hasIcon && !icon &&
			(
				<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
					<g clip-path='url(#clip0_3317_7306)'>
						<path d='M13.3334 4L6.00008 11.3333L2.66675 8' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
					</g>
					<defs>
						<clipPath id='clip0_3317_7306'>
							<rect width='16' height='16' fill='currentColor' />
						</clipPath>
					</defs>
				</svg>
			)}
		{icon}
		{children}
	</span>
));

export default Label;
