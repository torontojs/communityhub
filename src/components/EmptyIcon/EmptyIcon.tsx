import './EmptyIcon.css';

const EmptyIcon = () => (
	<div className='container'>
		<picture className='empty-icon-container'>
			<img className='empty-icon' src='/empty-icon.png' alt='Empty icon' />
		</picture>
		<picture className='empty-icon-ellipse-container'>
			<img className='empty-icon-ellipse' src='/empty-icon-ellipse.png' alt='Empty icon ellipse' />
		</picture>
	</div>
);

export default EmptyIcon;
