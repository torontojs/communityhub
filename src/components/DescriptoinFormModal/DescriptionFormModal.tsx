import './DescriptionFormModal.css';
interface Props {
	onClose(): void;
	onSubmit(): void;
}

const DescriptionFormModal = ({ onClose, onSubmit }: Props): React.JSX.Element => (
	<div className='description-modal'>
		<form className='description-form-modal-container'>
			<div className='title-close'>
				<h2>Edit About</h2>
				<button onClick={() => onClose()}>
					<img src='/black-x.png' alt='Black X icon' />
				</button>
			</div>
			<p>Introduce yourself in a few lines -- your background, interests, or experience. Changes will be saved to your profile once you click save.</p>
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
	</div>
);

export default DescriptionFormModal;
