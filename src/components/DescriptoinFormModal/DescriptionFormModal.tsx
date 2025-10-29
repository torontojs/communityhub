import './DescriptionFormModal.css';
interface Props {
	onClose(): void;
	onSubmit(): void;
}

const DescriptionFormModal = ({ onClose, onSubmit }: Props): React.JSX.Element => (
	<form className='description-form-modal-container'>
		<header>
			<h2>Edit About</h2>
			<p>Introduce yourself in a few lines -- your background, interests, or experience. Changes will be saved to your profile once your click Save.</p>
		</header>
		<textarea className='description-form-modal-textarea'></textarea>
		<div className='description-form-modal-button-container'>
			<button onClick={() => onClose()}>Cancel</button>
			<button
				onClick={() => {
					onSubmit();
					onClose();
				}}
			>
				Submit
			</button>
		</div>
	</form>
);

export default DescriptionFormModal;
