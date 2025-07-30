import './HelperMessageComponent.css';
import './initialize-icon-definitions-helper-msg.ts';

type HelperMessageComponentVariants = 'default' | 'error' | 'info' | 'success' | 'warning';

interface Props {
	variant?: HelperMessageComponentVariants;
	labelText: string;
}

const iconMap: Record<HelperMessageComponentVariants, string> = {
	default: 'icon-default',
	info: 'icon-info',
	success: 'icon-success',
	warning: 'icon-warning',
	error: 'icon-error'
};

const HelperMessageComponent = ({ variant = 'default', labelText }: Props) => (
	<div className='helper-container' data-variant={variant}>
		<svg className='helper-icon'>
			<use href={`#${iconMap[variant]}`} />
		</svg>
		<span className='helper-content'>{labelText}</span>
	</div>
);

export default HelperMessageComponent;
