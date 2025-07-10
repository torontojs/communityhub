import { test as base } from "@playwright/test";
import { CheckEmailPage } from "../page_object_models/pom_check_email.ts";
import { CheckStepsPage } from "../page_object_models/pom_check-steps.ts";
import { CompleteProfilePage } from "../page_object_models/pom_complete_profile.ts";
import { PrintConductPage } from "../page_object_models/pom_print_conduct.ts";
import { PrintImageReleasePage } from "../page_object_models/pom_print_image_release.ts";
import { PrintVolunteerPage } from "../page_object_models/pom_print_volunteer.ts";
import { ProfilesPages } from "../page_object_models/pom_profiles.ts";
import { ReviewConductPage } from "../page_object_models/pom_review_conduct.ts";
import { SignInPage } from "../page_object_models/pom_sign-in";
import { SignUpPage } from "../page_object_models/pom_sign-up";
import { TeamsPage } from "../page_object_models/pom_teams.ts";


export type TestOptions = {
    checkEmailPage: CheckEmailPage;
    checkStepsPage: CheckStepsPage;
    completeProfilePage: CompleteProfilePage;
    printConductPage: PrintConductPage;
    printImageReleasePage: PrintImageReleasePage;
    printVolunteerPage: PrintVolunteerPage;
    profilesPage: ProfilesPages;
    reviewConductPage: ReviewConductPage;
    signUpPage: SignUpPage;
    signInPage: SignInPage;
    teamsPage: TeamsPage;

};

export const test = base.extend<TestOptions>({
    checkEmailPage: async ({page}, use) => {
        const checkEmailPage = new CheckEmailPage(page);
        await use(checkEmailPage);
    },
    checkStepsPage: async ({page}, use) => {
        const checkStepsPage = new CheckStepsPage(page);
        await use(checkStepsPage);
    },
    completeProfilePage: async ({page}, use) => {
        const completeProfilePage = new CompleteProfilePage(page);
        await use(completeProfilePage);
    },
    printConductPage: async ({page}, use) => {
        const printConductPage = new PrintConductPage(page);
        await use(printConductPage);
    },
    printImageReleasePage: async ({page}, use) => {
        const printImageReleasePage = new PrintImageReleasePage(page);
        await use(printImageReleasePage);
    },
    printVolunteerPage: async ({page}, use) => {
        const printVolunteerPage = new PrintVolunteerPage(page);
        await use(printVolunteerPage);
    },
    profilesPage: async ({page}, use) => {
        const profilesPage = new ProfilesPages(page);
        await use(profilesPage);
    },
    reviewConductPage: async ({page}, use) => {
        const reviewConductPage = new ReviewConductPage(page);
        await use(reviewConductPage);
    },
    signInPage: async ({page}, use) => {
        const signInPage = new SignInPage(page);
        await use(signInPage);
    },
    signUpPage: async ({page}, use) => {
        const signUpPage = new SignUpPage(page);
        await use(signUpPage);
    },
    teamsPage: async ({page}, use) => {
        const teamsPage = new TeamsPage(page);
        await use(teamsPage);
    }
    
});

export type Complete_Profile_Type = {
    name: string,
    email: string,
    slack_handle: string,
    pronouns: string,

    birth_month: string,
    birth_day: string,
    toronto_based: boolean,
    join_locally: boolean,

    site_portfolio: string,
    github: string,
    linkedin_profile: string,
    skills_field: string,
    linkedin_other: string,
  
    facebook: string,
    threads: string,
    twitter_x: string,
    bluesky: string,
    instagram: string,
    devto: string
}

export type Enable_Profile_Footer_Type = {
    linkedin_other: boolean,
    facebook: boolean,
    threads: boolean,
    twitter_x: boolean,
    bluesky: boolean,
    instagram: boolean,
    devto: boolean
}

// export { expect } from "@playwright/test";