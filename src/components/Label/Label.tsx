import { forwardRef, type ParamHTMLAttributes } from 'react';
import './Label.css';

interface Props extends ParamHTMLAttributes<HTMLParagraphElement> {
	isPrimary?: boolean;
}

const Label = forwardRef<HTMLParagraphElement, Props>(({
	isPrimary = false,
	children,
	...rest
}, ref) => (
	<p ref={ref} className='label' {...rest} data-primary={isPrimary}>
		{children}
	</p>
));

export default Label;
