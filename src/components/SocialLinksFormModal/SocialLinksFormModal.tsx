import './SocialLinksFormModal.css';
interface Props {
	onClose(): void;
	onSubmit(Event: React.FormEvent<HTMLFormElement>): void;
}

const SocialLinksFormModal = ({ onClose, onSubmit }: Props): React.JSX.Element => (
	<div className='social-links-modal'>
		<form
			className='social-links-form-modal-container'
			onSubmit={(event) => {
				onSubmit(event);
				onClose();
			}}
		>
			<div className='title-close'>
				<h2>Edit Social Links</h2>
				<button type='button' onClick={onClose}>
					<img src='/black-x.png' alt='Black X icon' />
				</button>
			</div>
			<p>Connect your social or portfolio links so others can find and follow your work.</p>

			<div className='social-links-modal-inputs-container'>
				<div className='input-block'>
					<label className='label' htmlFor='input'>
						Slack
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>

				<div className='input-block'>
					<label className='label' htmlFor='input'>
						Site/Porfolio
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>

				<div className='input-block'>
					<label className='label' htmlFor='input'>
						Linkedin
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>

				<div className='input-block'>
					<label className='label' htmlFor='input'>
						Github
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>

				<div className='input-block'>
					<label className='label' htmlFor='input'>
						X/Twitter
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>

				<div className='input-block'>
					<label className='label' htmlFor='input'>
						Instagram
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>

				<div className='input-block'>
					<label className='label' htmlFor='input'>
						Slack
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>

				<div className='input-block'>
					<label className='label' htmlFor='input'>
						Dev To
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>

				<div className='input-block'>
					<label className='label' htmlFor='input'>
						Facebook
					</label>
					<input id='input' type='url' name='url' placeholder='https://'></input>
				</div>
			</div>

			<div className='social-links-form-modal-button-container'>
				<button onClick={onClose}>Cancel</button>
				<button type='submit'>
					Submit
				</button>
			</div>
		</form>
	</div>
);

export default SocialLinksFormModal;
