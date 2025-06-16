import { test as base } from "@playwright/test";
import { CheckEmailPage } from "../page_object_models/pom_check_email.ts";
import { CheckStepsPage } from "../page_object_models/pom_check-steps.ts";
import { CompleteProfilePage } from "../page_object_models/pom_complete_profile.ts";
import { PrintConductPage } from "../page_object_models/pom_print_conduct.ts";
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

export { expect } from "@playwright/test";