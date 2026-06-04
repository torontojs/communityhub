import './GeneralInfoFormModal.css';
import Button from '../Button/Button.tsx';
import TextInputComponent from '../TextInputComponent/TextInputComponent.tsx';

interface Props {
	name: string;
	email: string;
	pronouns: string;
	isBasedOnGTA: boolean | null;
	canJoinLocalEvents: boolean | null;
	onClose(): void;
	onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<boolean>;
}

const pronounOptions = [
	'',
	'he/him',
	'she/her',
	'they/them'
];

const GeneralInfoFormModal = ({ name, email, pronouns, isBasedOnGTA, canJoinLocalEvents, onClose, onSubmit }: Props): React.JSX.Element => (
	<div className='general-info-modal'>
		<form
			className='general-info-form-modal-container'
			onSubmit={async (event) => {
				const isSaved = await onSubmit(event);
				if (isSaved) {
					onClose();
				}
			}}
		>
			<div className='title-close'>
				<h2>Edit General Information</h2>
				<Button className='general-info-modal-close-button' type='button' onClick={onClose} aria-label='Close edit general information modal'>
					<img src='/black-x.png' alt='Black X icon' />
				</Button>
			</div>
			<p>Update your personal details below. Changes will be saved to your profile once you click Save.</p>

			<div className='general-info-section'>
				<h3>General Information</h3>
				<div className='general-info-avatar-row'>
					<div className='general-info-avatar-placeholder'>
						{name.split(' ').map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()}
					</div>
					<div className='general-info-fields'>
						<div className='general-info-inputs'>
							<TextInputComponent
								label='Name'
								name='name'
								value={name}
								required
							/>
							<TextInputComponent
								label='E-mail'
								name='email'
								value={email}
								disabled
								required
							/>
						</div>
						<div className='general-info-pronouns'>
							<label htmlFor='pronouns-select'>Pronouns</label>
							<select id='pronouns-select' name='pronouns' defaultValue={pronouns}>
								{pronounOptions.map((option) => (
									<option key={option} value={option}>
										{option || 'Select pronouns'}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>

			<div className='other-info-section'>
				<h3>Other Information</h3>
				<div className='slider-wrapper'>
					<div className='slider-checkbox-row'>
						<input
							type='checkbox'
							id='canJoinLocalEvents'
							name='canJoinLocalEvents'
							className='slider-checkbox'
							defaultChecked={canJoinLocalEvents ?? false}
						/>
						<label htmlFor='canJoinLocalEvents'>Available for TorontoJS's local events</label>
					</div>
					<div className='slider-checkbox-row'>
						<input
							type='checkbox'
							id='isBasedOnGTA'
							name='isBasedOnGTA'
							className='slider-checkbox'
							defaultChecked={isBasedOnGTA ?? false}
						/>
						<label htmlFor='isBasedOnGTA'>Based in Greater Toronto Area</label>
					</div>
				</div>
			</div>

			<div className='general-info-form-modal-button-container'>
				<Button type='button' hasOutline onClick={onClose}>Cancel</Button>
				<Button type='submit' isPrimary>Save</Button>
			</div>
		</form>
	</div>
);

export default GeneralInfoFormModal;
