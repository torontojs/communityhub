import { useEffect, useState } from 'react';

interface Links {
	platform: string;
	url: string;
}

type LinksArray = Links[];

export const ProtectedProfile = (): React.JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [isBasedOnGTA, setIsBasedOnGTA] = useState<boolean | null>(null);
	const [canJoinLocalEvents, setCanJoinLocalEvents] = useState<boolean | null>(null);
	const [pronouns, setPronoun] = useState<string>('');
	const [birthday, setBirthday] = useState<string>('');
	const [skills, setSkills] = useState<string[]>([]);
	const [links, setLinks] = useState<LinksArray>([]);

	useEffect(() => {
		async function fetchProtectedProfile() {
			const url = '/api/profiles/self';

			try {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error('Error Fetching Protected Profile');
				}

				const data = await response.json();

				console.log(data);
			} catch (err) {
				console.error(err);
			}
		}

		const data = fetchProtectedProfile();
	});

	if (isLoading) { return <h1>Is Loading...</h1>; }

	return <h1>Protected Profile</h1>;
};

//     "email": "king.arthur@camelot.uk",
//     "name": "King Arthur",
//     "description": "Gallant monarch forever seeking sacred drinkware.",
//     "isBasedOnGTA": true,
//     "canJoinLocalEvents": true,
//     "pronouns": "he/him",
//     "birthday": "03-14",
//     "links": [
//         {
//             "platform": "twitter",
//             "url": "arthur_king"
//         },
//         {
//             "platform": "github",
//             "url": "arthur-king"
//         },
//         {
//             "platform": "linkedin",
//             "url": "arthur.king"
//         },
//         {
//             "platform": "mastodon",
//             "url": "arthur_king@mastodon.social"
//         },
//         {
//             "platform": "instagram",
//             "url": "arthur_king"
//         },
//         {
//             "platform": "slack",
//             "url": "arthur_king"
//         }
//     ],
//     "skills": [
//         "Leadership",
//         "Questing",
//         "Table Management"
//     ]
// }
