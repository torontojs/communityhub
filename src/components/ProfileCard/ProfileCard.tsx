import { useEffect, useState } from "react";

export interface MemberProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    socialLinks?: Record<string, string>;
    description?: string;
    happenedAt: string;
    insertedAt: string;
}

const ProfileCard = () => {
    const [isLoadedProfileData, setIsLoadedProfileData] = useState(false);
    const [profileData, setProfileData] = useState<MemberProfile | null>();
    const [isErrorProfile, setIsErrorProfile] = useState(false);

    const queryParameters = new URLSearchParams(window.location.search);    
    const profileId = queryParameters.get("pid");

    const dateFormatter = new Intl.DateTimeFormat('en-CA', { dateStyle: 'long' }).format;

    useEffect(() => {
        setIsLoadedProfileData(false);
        // Fetch data from the JSON file in the public directory
		const fetchProfileData = async (): Promise<void> => {
			try {
				const responseProfile = await fetch('/profiles.json');
				if (!responseProfile.ok) {
                    setIsErrorProfile(true);
				}
                const jsonDataProfile = await responseProfile.json();
                // REMOVE: Filtering won't be required with API, remove filtering when integrating with backend
				setProfileData(jsonDataProfile.filter((profile: MemberProfile) => profile.id === profileId)[0]);
			} catch (error) {
                setIsErrorProfile(true);
				console.error('Error fetching profile data:', error);
			} finally {
				setIsLoadedProfileData(true);
			}
		};
		void fetchProfileData();
    },[]);

    useEffect(() => {        
        document.title = (isLoadedProfileData && !isErrorProfile && profileData && profileData.id === profileId) ?
             `${profileData.name}'s Profile`
        : `User Profile`;        
    }, [profileData]);

    let content = <></>;

    // If data not yet loaded
	if (!isLoadedProfileData) {
		content = <div aria-live='polite' role='status'>Loading profile...</div>
	}

	// If error encountered
	if (isErrorProfile) {
		content = 
			<div aria-live='polite' role='status'>
				Unable to load profile. Please try refreshing the page.
			</div>
	}

    // If not profile data returned
    if(isLoadedProfileData && !isErrorProfile && (!profileData || (profileData.id !== profileId))) {
        content =
            <div aria-live="polite" role="status">
                The profile was not found. Please try refreshing the page or contact an administrator.
            </div>        
    }
    
    // If data loaded
    if(isLoadedProfileData && !isErrorProfile && profileData && profileData.id === profileId) {
        content = <>
                <h1>User Profile: {profileData.name}</h1>
                <div>
                    <header>
                        <h2>Profile Card</h2>
                    </header>
                    <picture>
                        <img
                            className='avatar'
                            src={profileData.avatar ?? '/default-avatar.png'}
                            alt={`Team ${profileData.name} Avatar`}
                        />
                    </picture>
                    <div>
                        <p>Name: {profileData.name}</p>
                        <p>Email: {profileData.email}</p>
                        <p>Description: {profileData.description}</p>
                        <p>Created At: {dateFormatter(new Date (profileData.happenedAt))}</p>
                        <p>Inserted At: {dateFormatter(new Date(profileData.insertedAt))}</p>
                    </div>
                </div>
            </>
    };
    
    return (
      <main>
        {content}        
      </main>
    );
}

export default ProfileCard;
