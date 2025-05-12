export const VolunteerAgreement = () => {
	const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' });

	return (
		<>
			<p>
				<strong>The Volunteer and Toronto JS</strong>
				(hereinafter the "organization") have agreed to enter into a volunteer relationship and wish to reflect the terms of their agreement in writing.
			</p>
			<p>
				This Volunteer Agreement confirms that the Parties have mutually agreed as follows:
			</p>

			<h3>Volunteer and Terms</h3>
			<p>
				I acknowledge that the work performed is on a volunteer basis and that there is no employment relationship with the Organization. I am not entitled to receive a
				salary, remuneration or employee benefits. This agreement will commence on
				<strong>{dateFormatter.format(new Date())}</strong> and continue indefinitely until terminated in accordance with the terms set out below.
			</p>

			<h3>The work</h3>
			<p>
				I further agree to perform the work as noted in the Scope of Volunteer Duties. I agree to work under the assigned supervisor's direction and understand that I have
				a right to refuse to engage in any work that is not deemed safe as per the{' '}
				<a href='https://www.ontario.ca/laws/statute/90o01'>Occupational Health & Safety Act, R.S.O. 1990, c. O.1</a>.
			</p>

			<h3>Assumption of Risk</h3>
			<p>
				I acknowledge that there may be risks associated with or related to the duties described above. These risks include, but are not limited to, any manner of injury
				resulting from use or misuse of equipment/tools required to perform the duties.
			</p>

			<h3>Confidentiality</h3>
			<p>
				I acknowledge that, in the course of performing my volunteer duties, I may have access to information that may be confidential. I will observe and comply with the
				Organization's rules and regulations respecting confidentiality. I will not disclose or give to any person, institution, or source any information or document that
				comes to my knowledge or into my possession by reason of my service to the Organization. This duty to protect confidential information extends beyond the
				termination of my association with the Organization.
			</p>

			<h3>Intellectual Property</h3>
			<p>
				Copyright and any other intellectual property rights in all written material (including material in electronic format), software, databases, brands and other works
				produced by the Volunteer will be owned solely by the organization, who will have the right to use, reproduce or distribute such material and works, or any part
				thereof, for any purpose it wishes. Upon the request of the organization or termination of this Agreement, the volunteer will return all confidential information
				and propriety information received in written or tangible form, including copies, or reproductions or other media, immediately of such request.
			</p>

			<h3>Termination</h3>
			<p>The volunteer may be terminated in the following ways:</p>
			<ol>
				<li>
					<strong>Voluntary termination.</strong>
					You may terminate your agreement to volunteer for the organization with prior written notice.
				</li>
				<li>
					<strong>Termination with clause.</strong>
					The organization may terminate your agreement to volunteering at anytime without notice for breach of the Code of Conduct set out by the organization.
				</li>
				<li>
					<strong>Termination based on false promises.</strong>
					In the case the volunteer consecutively engaged in scheduled events and neglected to provide support. The organization may provide warnings and terminate your
					agreement to volunteering at a case-by-case base.
				</li>
			</ol>

			<h3>Assignment</h3>
			<p>
				The volunteer will not assign, either directly or indirectly, any obligation or entitlement that it has under this Agreement without express written consent of the
				organization.
			</p>

			<h3>General</h3>
			<p>The volunteer herby agrees to abide by the terms and conditions outlined in this Agreement. To evidence their agreement, the volunteer has signed this Agreement.</p>
		</>
	);
};
