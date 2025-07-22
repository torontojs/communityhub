import './HelperMessageComponent.css';

type HelperMessageComponentVariants = 'default' | 'info' | 'success' | 'warning' | 'error';

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

const HelperMessageComponent = ({ variant = 'default', labelText }: Props) => {
	return (
		<div className='helper-container' data-variant={variant}>
			<svg className='helper-icon'>
				<use href={`#${iconMap[variant]}`} />
			</svg>
			<span className='helper-content'>{labelText}</span>
		</div>
	);
};

export default HelperMessageComponent;
