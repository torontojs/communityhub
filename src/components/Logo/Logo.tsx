import './Logo.css';

interface Props {
	isLarge?: boolean;
}

const Logo = ({ isLarge = true }: Props) => (
	<picture className={`logo ${isLarge ? 'large' : 'small'}`}>
		<img src='/torontojs-logo.png' alt='TorontoJS Logo' />
	</picture>
);

export default Logo;
