import './DescriptionFormModal.css';
import Button from '../Button/Button.tsx';

interface Props {
	description: string;
	onClose(): void;
	onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<boolean>;
}

const DescriptionFormModal = ({ description, onClose, onSubmit }: Props): React.JSX.Element => (
	<div className='description-modal'>
		<form
			className='description-form-modal-container'
			onSubmit={async (event) => {
				const isSaved = await onSubmit(event);
				if (isSaved) {
					onClose();
				}
			}}
		>
			<div className='title-close'>
				<h2>Edit About</h2>
				<button type='button' onClick={onClose}>
					<img src='/black-x.png' alt='Black X icon' />
				</button>
			</div>
			<p>Introduce yourself in a few lines -- your background, interests, or experience. Changes will be saved to your profile once you click save.</p>
			<textarea className='description-form-modal-textarea' name='description' defaultValue={description}></textarea>
			<div className='description-form-modal-button-container'>
				<Button type='button' hasOutline onClick={onClose}>Cancel</Button>
				<Button type='submit' isPrimary>Save</Button>
			</div>
		</form>
	</div>
);

export default DescriptionFormModal;
