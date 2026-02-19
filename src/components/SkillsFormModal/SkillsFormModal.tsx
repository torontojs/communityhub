import './SkillsFormModal.css';
import Button from '../Button/Button.tsx';

interface Props {
	skills: string[];
	onClose(): void;
	onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

const SkillsFormModal = ({ skills, onClose, onSubmit }: Props): React.JSX.Element => (
	<div className='skills-modal'>
		<form
			className='skills-form-modal-container'
			onSubmit={(event) => {
				onSubmit(event);
				onClose();
			}}
		>
			<div className='title-close'>
				<h2>Edit Skills</h2>
				<button type='button' onClick={onClose}>
					<img src='/black-x.png' alt='Black X icon' />
				</button>
			</div>
			<p>
				You can add up to 10 skills here and separate them with commas, to help others know where you shine. (e.g. HTML, CSS, JavaScript, UX Design etc)
			</p>
			<textarea
				className='skills-form-modal-textarea'
				name='skills'
				defaultValue={skills.join(', ')}
			>
			</textarea>
			<div className='skills-form-modal-button-container'>
				<Button type='button' hasOutline onClick={onClose}>Cancel</Button>
				<Button type='submit' isPrimary>Save</Button>
			</div>
		</form>
	</div>
);

export default SkillsFormModal;
