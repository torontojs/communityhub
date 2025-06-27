# Prerequisites and tools

Here is a list of the tools used to develop the project, followed by details on each tool:

- **Required:** [`node.js`](https://nodejs.org/en/download/prebuilt-installer) (Preferably managed by [`volta`](https://docs.volta.sh/guide/getting-started), also work with [`nvm`](https://github.com/nvm-sh/nvm))
- **Required:** [Commit signing configured](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits), without it, the pull requests **WILL NOT BE ACCEPTED!**
- _Recommended:_ [VS Code](https://code.visualstudio.com/Download)
- _Optional:_ [Resend account](https://resend.com) (Used for sending emails)

## `node.js` and version managers.

Most of the tools used are based on `node.js`, so you should have it installed on your machine. It may be installed from an installer, or a version manager for node.

We highly suggest using a version manager for node, as it will avoid issues and version compatibilities. Our recommendation is for version manager is `volta` as is is cross platform, but the project also supports `nvm`.

Both version managers are already configured for the project, so you only need to install either on your machine and it will take care of downloading the correct version of `node` when you first try installing the dependencies (i.e. doing `npm install`).

If you have either version manager installed **DO NOT** install the other as it will cause conflicts and create issues.

## Commit signing

In order to improve the trust and security of the code contributed we require that all commits are signed. The easies option is to follow the [tutorial from GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) on how to configure commit signing.

### VS Code (recomended)

Our editor of choice is Visual Studio Code (VS Code), it is not required for working with the code, but is recommended for sharing code and contributing with others.

### Resend (optional)

A Resend account is not required, but if you want to test the email integration and actually send emails, it will be needed.

The project is configured for local testing without needing a Resend account. On local environments instead of sending an email, the email information will be outputted to the console.

1. Go to [Resend](https://resend.com/) and create an account.
2. Once logged in, navigate to "API Keys" in the left sidebar.
3. Click "Create API Key" and give it a name (e.g., "VMS Development").
4. Copy the API key immediately as it won't be shown again.
5. Keep the API key handy, you will need it later.
