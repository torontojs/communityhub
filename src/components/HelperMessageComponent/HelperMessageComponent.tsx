import './HelperMessageComponent.css';

type HelperMessageComponentVariants = 'default' | 'info' | 'success' | 'warning' | 'error';

interface Props {
	variant?: HelperMessageComponentVariants;
	labelText: string;
}

const HelperMessageComponent = ({ variant = 'default', labelText }: Props) => {
	return (
		<div className='helper-container' data-variant={variant}>
			<span className='helper-icon' />
			<span className='helper-content'>{labelText}</span>
		</div>
	);
};

export default HelperMessageComponent;
