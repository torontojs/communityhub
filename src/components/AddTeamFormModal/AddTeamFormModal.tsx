import './AddTeamFormModal.css';
import Button from '../Button/Button.tsx';
import TextInputComponent from '../TextInputComponent/TextInputComponent.tsx';

interface Props {
	error?: string | null;
	initialDescription?: string;
	initialName?: string;
	mode?: 'add' | 'edit';
	onClose(): void;
	onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<boolean>;
}

const getInitials = (name: string): string =>
	name
		.split(' ')
		.map((word) => word[0])
		.filter(Boolean)
		.slice(0, 2)
		.join('')
		.toUpperCase();

const AddTeamFormModal = ({
	error,
	initialDescription = '',
	initialName = '',
	mode = 'add',
	onClose,
	onSubmit
}: Props): React.JSX.Element => (
	<div className='add-team-modal'>
		<form
			className='add-team-form-modal-container'
			onSubmit={async (event) => {
				const isSaved = await onSubmit(event);
				if (isSaved) {
					onClose();
				}
			}}
		>
			<div className='title-close'>
				<h2>{mode === 'add' ? 'Add New Team' : 'Edit Team Info'}</h2>
				<Button className='add-team-modal-close-button' type='button' onClick={onClose} aria-label='Close add team modal'>
					<img src='/black-x.png' alt='Black X icon' />
				</Button>
			</div>
			<p>
				{mode === 'add' ?
					'Create a new team for your TorontoJS community. Add a team name and optional description.' :
					'Update this team name and optional description.'}
			</p>

			<div className='general-info-section add-team-section'>
				<h3>Team Information</h3>
				<div className='general-info-avatar-row add-team-avatar-row'>
					<div className='general-info-avatar-placeholder add-team-avatar-placeholder'>
						{mode === 'add' ? <img src='/teams-icon.png' alt='' /> : getInitials(initialName)}
					</div>
					<div className='general-info-fields add-team-fields'>
						<div className='general-info-inputs add-team-inputs'>
							<TextInputComponent
								label='Team Name'
								name='name'
								placeholder='Give a name to your new team'
								value={initialName}
								required
							/>
						</div>
						<div className='add-team-textarea-container'>
							<span className='add-team-textarea-label-container'>
								<label htmlFor='add-team-description'>Description</label>
							</span>
							<textarea
								id='add-team-description'
								name='description'
								placeholder="Describe the team's purpose and what they do"
								defaultValue={initialDescription}
							/>
						</div>
						{error && <p className='add-team-modal-error' role='alert'>{error}</p>}
					</div>
				</div>
			</div>

			<div className='add-team-form-modal-button-container'>
				<Button type='button' hasOutline size='small' onClick={onClose}>Cancel</Button>
				<Button type='submit' isPrimary size='small'>{mode === 'add' ? 'Create' : 'Save'}</Button>
			</div>
		</form>
	</div>
);

export default AddTeamFormModal;
