# Security Scan Report - 2026-06-03

## Scope

Local security scan for the Community Hub repository at `/home/ken-beaudin/Programming/test/communityhub`.

Focus areas requested:

- Snyk-style dependency scanning
- OWASP Top 10 coverage
- Local security scanning libraries/tools
- Tooling summary with links and purpose

## Executive Summary

The highest-confidence finding is vulnerable/outdated dependencies. `npm audit` reported **27 known dependency vulnerabilities**: **3 critical**, **15 high**, **8 moderate**, and **1 low**. These mostly affect development and build tooling, but several tools are used in local dev, tests, preview/build flows, or API testing, so they should still be addressed.

Source-level OWASP static checks found no confirmed exploit, but they did identify review-worthy patterns:

- SVG text fetched from `/scripts/icon-definitions.svg` is inserted with `insertAdjacentHTML`.
- Profile social links are rendered directly into anchor `href` values.
- Several object-indexing warnings were raised by heuristic security rules; most appear lower risk because the keys are typed enums or constants.

Snyk is installed and authenticated. The Snyk dependency scan completed against `package-lock.json` and found **32 issues** across **33 vulnerable dependency paths**: **5 high**, **27 medium**, and **1 low** findings. OWASP Dependency-Check was run natively from the official `12.2.2` release and found **168 vulnerability records** across **27 vulnerable dependencies**. Semgrep is installed user-locally and its OWASP Top Ten scan completed with **0 findings**.

## Tools Utilized

| Tool                         | Link                                                       | What it does                                                                                                     | Command / status                                                                                            |
| ---------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| npm audit                    | https://docs.npmjs.com/cli/commands/npm-audit              | Checks `package-lock.json` dependencies against the npm advisory database.                                       | Completed: `npm audit --json`                                                                               |
| Snyk CLI                     | https://docs.snyk.io/snyk-cli                              | Commercial/open-source dependency and code security scanner.                                                     | Installed: `1.1305.1`; completed authenticated scan with 32 issues / 33 vulnerable paths.                   |
| Retire.js                    | https://retirejs.github.io/retire.js/                      | Finds vulnerable JavaScript libraries, especially bundled/browser JS.                                            | Completed: `npx retire --path . --outputformat json`                                                        |
| eslint-plugin-security       | https://github.com/eslint-community/eslint-plugin-security | Static analysis for common JS security patterns such as unsafe regex, object injection, and child process usage. | Completed through temporary ESLint config.                                                                  |
| eslint-plugin-no-unsanitized | https://github.com/mozilla/eslint-plugin-no-unsanitized    | Detects unsafe DOM sinks such as `innerHTML` and `insertAdjacentHTML`.                                           | Completed through temporary ESLint config.                                                                  |
| lockfile-lint                | https://github.com/lirantal/lockfile-lint                  | Validates lockfile package URLs and protocols to reduce dependency confusion / lockfile tampering risk.          | Completed: no issues detected.                                                                              |
| Semgrep OWASP Top Ten rules  | https://semgrep.dev/p/owasp-top-ten                        | Static analysis rules mapped to OWASP Top 10 categories.                                                         | Installed: `1.164.0`; rerun completed with 0 findings.                                                      |
| OWASP Dependency-Check       | https://owasp.org/www-project-dependency-check/            | Dependency CVE scanner using NVD, CISA KEV, npm audit, and other ecosystem metadata.                             | Completed natively using official release `12.2.2`; found 168 vulnerability records across 27 dependencies. |

## OWASP Top 10 Mapping

| OWASP category                                  | Evidence found                                                                                                                 | Risk                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| A03: Injection                                  | `insertAdjacentHTML` with fetched SVG text; profile social links rendered into `href`.                                         | Medium review priority.                        |
| A05: Security Misconfiguration                  | Lockfile source/protocol check passed.                                                                                       | Low from current scans.                        |
| A06: Vulnerable and Outdated Components         | `npm audit`, Snyk, Retire.js, and Dependency-Check found vulnerable packages, including critical/high issues.                  | High priority.                                 |
| A07: Identification and Authentication Failures | Password hashing/constant-time comparison exists; scanner timing warning appears to be a false positive on a null token check. | Low from current scan.                         |
| A01/A04/A08/A09/A10                             | No confirmed finding from completed local scans.                                                                               | No confirmed finding from current scan set.    |

## Dependency Findings

### npm audit

Result: **failed due to vulnerabilities**.

Summary:

- Critical: 3
- High: 15
- Moderate: 8
- Low: 1
- Total: 27

Important direct packages involved:

| Package                           | Severity | Notes / fix direction                                                                                                       |
| --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `vitest`                          | Critical | Advisory: arbitrary file read/execution when Vitest UI server is listening. Audit suggests `vitest@4.1.8`, a major upgrade. |
| `@vitest/coverage-v8`             | Critical | Affected through Vitest. Audit suggests `@vitest/coverage-v8@4.1.8`, a major upgrade.                                       |
| `@cloudflare/vitest-pool-workers` | Critical | Affected through `devalue`, `miniflare`, `vitest`, and `wrangler`. Audit suggests `0.16.12`, a major upgrade.               |
| `vite`                            | High     | Multiple dev-server/file-read/path traversal advisories. Audit reports a fix is available.                                  |
| `wrangler`                        | High     | Includes a Wrangler OS command injection advisory and transitive Miniflare issues.                                          |
| `@cloudflare/vite-plugin`         | High     | Affected through Miniflare/Wrangler/ws. Audit suggests `1.39.2`.                                                            |
| `@orangeopensource/hurl`          | High     | Affected through `axios` and `tar`. Audit suggests `8.0.1`, a major upgrade.                                                |

Other notable transitive packages reported: `axios`, `tar`, `undici`, `rollup`, `postcss`, `picomatch`, `devalue`, `defu`, `ajv`, `brace-expansion`, `ws`, and `yaml`.

Recommended action:

1. Upgrade Vite/Vitest/Cloudflare tooling together and rerun `npm run lint`, `npm run test:unit`, and API tests.
2. Upgrade `@orangeopensource/hurl` and confirm existing `.hurl` tests still run.
3. Re-run `npm audit` after upgrades and review any remaining production dependency findings separately from dev-only findings.

### Snyk

Result: **failed due to vulnerabilities**.

Command:

```shell
npx snyk test --json-file-output=/tmp/snyk-communityhub.json
```

Summary:

- Dependencies tested: 32
- Vulnerable dependency paths: 33
- Unique issues: 32
- High: 5
- Medium: 27
- Low: 1
- Organization: `beaudin.ken.mathieu`
- Package manager: npm
- Target file: `package-lock.json`

Findings by package:

| Package  | Current version |                   Findings | Severity mix             | Remediation                                                                                                                  |
| -------- | --------------- | -------------------------: | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `hono`   | `4.8.5`         |                         30 | 5 high, 24 medium, 1 low | Upgrade to `hono@4.12.21`.                                                                                                   |
| `yaml`   | `2.8.0`         | 2 paths for the same issue | 2 medium paths           | Upgrade transitive path through `@hono/zod-openapi` / `openapi3-ts` so `yaml` reaches `2.8.3+`; Snyk suggested `yaml@2.9.0`. |
| `zxcvbn` | `4.4.2`         |                          1 | 1 medium                 | No direct upgrade or patch available; consider replacing or constraining input length before calling `zxcvbn`.               |

High-severity Snyk findings:

| Package      | Issue                                                | Snyk ID                 | Fixed in  |
| ------------ | ---------------------------------------------------- | ----------------------- | --------- |
| `hono@4.8.5` | Use of Incorrectly-Resolved Name or Reference        | `SNYK-JS-HONO-12485162` | `4.9.6`   |
| `hono@4.8.5` | Unverified Ownership                                 | `SNYK-JS-HONO-13669873` | `4.10.2`  |
| `hono@4.8.5` | Improper Verification of Cryptographic Signature     | `SNYK-JS-HONO-14927373` | `4.11.4`  |
| `hono@4.8.5` | Use of a Broken or Risky Cryptographic Algorithm     | `SNYK-JS-HONO-14927374` | `4.11.4`  |
| `hono@4.8.5` | Allocation of Resources Without Limits or Throttling | `SNYK-JS-HONO-16438966` | `4.12.16` |

Primary remediation:

1. Upgrade `hono` to at least `4.12.21`, then rerun API/unit tests.
2. Upgrade the OpenAPI dependency path so `yaml` reaches `2.8.3` or newer.
3. Review `zxcvbn` usage because Snyk reports ReDoS with no fixed version.

### Retire.js

Result: **failed due to vulnerable JavaScript library detections**.

Retire.js confirmed vulnerable `axios@1.8.2` under:

- `node_modules/@orangeopensource/hurl/node_modules/axios/dist/axios.js`
- `node_modules/@orangeopensource/hurl/node_modules/axios/dist/axios.min.js`
- `node_modules/@orangeopensource/hurl/node_modules/axios/dist/esm/axios.min.js`

This aligns with the `npm audit` finding that `@orangeopensource/hurl` should be upgraded.

### lockfile-lint

Result: **passed**.

Command:

```shell
npx lockfile-lint --path package-lock.json --type npm --validate-https --allowed-hosts npm
```

Output: `No issues detected`.

## Source Static Analysis Findings

### Potential DOM XSS sink: fetched SVG inserted as HTML

Files:

- `src/components/HelperMessageComponent/initialize-icon-definitions-helper-msg.ts:8`
- `src/components/NotificationBox/initialize-icon-definitions.ts:6`

Pattern:

```ts
document.body.insertAdjacentHTML('afterbegin', svgText);
```

The SVG comes from `/scripts/icon-definitions.svg`. If that file is ever user-controlled, CDN-modified, or served from an untrusted path, this is a DOM XSS sink.

Recommendation:

- Prefer importing the SVG as a trusted static asset at build time, or parse it with `DOMParser` and allow only expected `<svg>/<symbol>/<path>` content before insertion.
- If it remains runtime-fetched, treat the fetched SVG as executable HTML and keep the source strictly controlled.

### Potential unsafe links from profile data

File:

- `src/components/ProfileCard/ProfileCard.tsx:135`

Pattern:

```tsx
<a aria-label={`${key} for ${profileData.name}`} href={value}>{socialIconsMap[key]}</a>;
```

`href` is populated from profile JSON. React escapes text, but it does not make an unsafe URL scheme safe.

Recommendation:

- Validate social URLs before rendering.
- Allow only `https://` URLs and known social platforms.
- Consider adding `rel="noopener noreferrer"` when `target="_blank"` is introduced.

### Heuristic object-injection warnings

Files flagged:

- `api/src/middleware/access.ts:19`
- `api/src/routes/documents/data.ts:17`
- `api/src/utils/password-hashing.ts:77`
- `api/src/utils/password-hashing.ts:78`
- `api/src/utils/testing.ts:94`
- `plugins/vite-plugin-virtual-mpa.ts:37`
- `src/components/HelperMessageComponent/HelperMessageComponent.tsx:22`
- `src/components/NotificationBox/NotificationBox.tsx:26`

Most of these appear lower risk because the keys are typed enum values, constants, array indexes, or local build-time filesystem entries. The most useful follow-up is to keep runtime user-controlled keys validated before map/index access.

### Non-literal filesystem access in Vite plugin

File:

- `plugins/vite-plugin-virtual-mpa.ts:33`
- `plugins/vite-plugin-virtual-mpa.ts:36`

This is build-time page discovery using paths under `src/pages`. It is probably acceptable, but it should remain scoped to project-owned directories.

### Non-literal RegExp constructor

File:

- `src/hooks/useProfileRedirect.ts:57`

This appears to be a false positive because the RegExp source comes from the constant `REGEX_REMOVE_TRAILING_SLASHES`.

### Timing warning

File:

- `src/components/ResetPassword/ResetPassword.tsx:62`

The scanner flagged `token === null` as a possible timing issue. This is not comparing a secret and appears to be a false positive.

## Semgrep OWASP Top Ten

Semgrep was installed user-locally at `/home/ken-beaudin/.local/bin/semgrep`.

Version:

```text
1.164.0
```

Command:

```shell
env PATH=/home/ken-beaudin/.local/bin:$PATH /home/ken-beaudin/.local/bin/semgrep --config p/owasp-top-ten --json --exclude node_modules --exclude coverage --exclude dist .
```

Result:

- Scan completed successfully.
- Findings: 0.
- Rules run: 100.
- Targets scanned: 421.
- Parsed lines: ~99.9%.
- Warning: one partial parse warning in `src/pages/dev-links/index.html` around line 37.

### OWASP Dependency-Check

Result: **failed due to vulnerabilities**.

Dependency-Check was run natively from the official GitHub release ZIP:

```shell
/tmp/dependency-check-12.2.2/dependency-check/bin/dependency-check.sh \
  --project communityhub \
  --scan package.json \
  --scan package-lock.json \
  --out /tmp/dependency-check-communityhub \
  --format JSON \
  --format HTML \
  --data /tmp/dependency-check-data \
  --disableAssembly
```

Release verification:

- Version: `12.2.2`
- Release ZIP: `dependency-check-12.2.2-release.zip`
- SHA-256 matched GitHub release digest: `bf07fefd81af3094c5f6850423b014df44db62ce2dbad0f79079a90df675e44a`

Reports:

- JSON: `/tmp/dependency-check-communityhub/dependency-check-report.json`
- HTML: `/tmp/dependency-check-communityhub/dependency-check-report.html`

Summary:

- Dependencies analyzed: 451
- Vulnerable dependencies: 27
- Vulnerability records: 168
- Critical: 7
- High: 67
- Medium/moderate: 81
- Low: 13

Top vulnerable dependencies by number of records:

| Dependency        | Vulnerability records | Highest severity |
| ----------------- | --------------------: | ---------------- |
| `hono:4.8.5`      |                    51 | critical         |
| `axios:1.8.2`     |                    39 | critical         |
| `undici:7.14.0`   |                    12 | critical         |
| `vite:7.0.5`      |                    10 | high             |
| `minimatch:9.0.5` |                     6 | high             |
| `tar:7.4.3`       |                     6 | high             |
| `undici:5.29.0`   |                     6 | critical         |
| `devalue:4.3.3`   |                     5 | high             |
| `flatted:3.3.3`   |                     4 | high             |
| `picomatch:4.0.3` |                     4 | high             |

Notes:

- First run required a full NVD sync of 355,159 records and was slow because no NVD API key was configured.
- CISA Known Exploited Vulnerability data was downloaded.
- Sonatype OSS Index Analyzer was disabled because credentials are now required.
- Several optional platform-specific npm packages were skipped because they are not installed on this Linux environment.

## Other Validation

`npm run lint` completed successfully with **0 errors** and **74 warnings**. These are mostly existing code-quality warnings such as magic numbers, TODO comments, shadowed variables, and console usage.

`npm run test:unit` was attempted twice, but Vitest exited after Cloudflare worker runtime startup without printing test failures. This should be rerun directly in a normal terminal if needed:

```shell
npm run test:unit -- --reporter verbose
```

## Recommended Next Steps

1. Upgrade the vulnerable dev/build/test tooling reported by `npm audit`, starting with Vitest, Vite, Wrangler/Cloudflare tooling, and Hurl.
2. Replace or constrain the runtime SVG `insertAdjacentHTML` pattern.
3. Validate social link URLs before rendering profile links.
4. Authenticate Snyk with `npx snyk auth` and rerun `npx snyk test`.
5. Re-run Dependency-Check after dependency upgrades; subsequent runs should be faster because the NVD data is cached in `/tmp/dependency-check-data` for this session.
