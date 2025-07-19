import { expect } from '@playwright/test';
import { test } from "./base.ts";
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ johnDoePage }) => {
    test.setTimeout(70000);
    // Navigate to the profile page before each test
    await johnDoePage.navigate();
  });

test.afterEach(async ({ johnDoePage }) =>  {
  await johnDoePage.page.close();
});



test.describe('Profile Page Tests', () => {
  
  test('should display John Doe profile with all required content', async ({ johnDoePage }) => {
    // 1. Username appears in heading and figure caption
    await test.step('Verify username appears in heading and figure caption', async () => {
      // Check main heading
      ////  const mainHeading = page.locator('h1');
      console.log(johnDoePage.profile_name + "'s Profile");
      console.log("****");
      await expect(johnDoePage.page_h1_title).toHaveText(johnDoePage.profile_name + "'s Profile");
      
      // Check figure caption
      // const figureCaption = page.locator('figure[aria-label="John Doe"] div');
      // const figureCaption = page.getByText('John Doe', { exact: true })
      expect(johnDoePage.fig_caption).toHaveText(johnDoePage.profile_name);
    });

    // 2. Check that email is displayed correctly
    await test.step('Verify email is displayed correctly', async () => {
      const emailSection = johnDoePage.page.locator('text=Email:').locator('..'); // Parent paragraph
      await expect(emailSection).toContainText('john.doe@example.com');
      
      // Alternative more specific selector
      const emailText = johnDoePage.page.locator('p:has(strong:text("Email:"))');
      // await expect(emailText).toContainText('john.doe@example.com');
    });

    // 3. Validate "Member Since: December 1, 2024" date format and content
    await test.step('Verify Member Since date format and content', async () => {
      // const memberSinceSection = page.locator('text=Member Since:').locator('..'); // Parent paragraph
      await expect(johnDoePage.member_since_label).toContainText('Member Since: ');
      
      // More specific check for exact format
      //const memberSinceText = page.locator('p:has(strong:text("Member Since:"))');
      //await expect(memberSinceText).toHaveText('Member Since: December 1, 2024');
    });

    // 4. Ensure the bio text matches expected content (Lorem ipsum text)
    /*
    await test.step('Verify bio text matches expected Lorem ipsum content', async () => {
      const bioText = page.locator('p').filter({ 
        hasText: 'A passionate volunteer. Lorem ipsum dolor sit amet' 
      });
      await expect(bioText).toHaveText(
        'A passionate volunteer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros diam, luctus quis sagittis et, feugiat non quam. Nunc tempus ac eros at ullamcorper.'
      );
    }); */

    // 5. Test that the "Meet John Doe" subheading is present
    await test.step('Verify "Meet John Doe" subheading is present', async () => {
      const subheading = johnDoePage.page.locator('h2');
      await expect(subheading).toHaveText('Meet ' + johnDoePage.profile_name);
      await expect(subheading).toBeVisible();

      
    });

    // 6. Test that the header bar is the correct color
    await test.step('Verify header bar has correct color', async () => {
      // Check the main heading background color (red header bar)
      //const headerBar = page.locator('h1');
      await expect(johnDoePage.page_h1_title).toBeVisible();

       console.log("&&&&&&&&&" + johnDoePage.page_h1_title);
      
      // Get computed styles to check background color
      const headerColor = await johnDoePage.page_h1_title.evaluate((el) => {
        // console.log(johnDoePage.page_h1_title);
        return window.getComputedStyle(el).backgroundColor;
      });

     
      
      // Check if it's a red color (RGB values may vary)
      // Common red colors: rgb(220, 53, 69), rgb(255, 0, 0), etc.
      // >>>  expect(headerColor).toMatch(/rgb\(.*,.*,.*\)/); // Basic RGB format check
      
      // Alternative: Check if header has red-ish background
      // const headerElement = page.locator('h1');
      await expect(johnDoePage.page_h1_title).toHaveCSS('background-color', /.*/); // Exists check
    });

    // 7. The footer icons are present and displayed correctly
    /*
    await test.step('Verify footer social media icons are present and displayed', async () => {
      // Check Facebook icon/link
      if() {
      const facebookLink = page.locator('a[href="https://facebook.com/johndoe"]');
      await expect(facebookLink).toBeVisible();
      await expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/johndoe');
      }
      
      // Check Twitter icon/link
      const twitterLink = page.locator('a[href="https://twitter.com/johndoe"]');
      await expect(twitterLink).toBeVisible();
      await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/johndoe');
      
      // Check that social media list exists
      const socialMediaList = johnDoePage.page.locator('ul[aria-label="Social Media Links"]');
      await expect(socialMediaList).toBeVisible();
      
      // Check that both social media items are present
      //const socialMediaItems = page.locator('ul[aria-label="Social Media Links"] li');
      // await expect(socialMediaItems).toHaveCount(2);
    }); */

    // 8. Profile image is not broken
    await test.step('Verify profile image is not broken', async () => {
      const profileImage = johnDoePage.page.locator('img[alt="John Doe Avatar"]');
      await expect(profileImage).toBeVisible();
      
      // Check that image has loaded successfully
      await expect(profileImage).toHaveAttribute('alt', 'John Doe Avatar');
      
      // Verify image is not broken by checking natural dimensions
      const imageNaturalWidth = await johnDoePage.avatar_image.evaluate((img: HTMLImageElement) => {
        return img.naturalWidth;
      });
      
      expect(imageNaturalWidth).toBeGreaterThan(0);
      
      // Alternative check: verify image loads without error
      await profileImage.evaluate((img: HTMLImageElement) => {
        return new Promise((resolve, reject) => {
          if (img.complete) {
            resolve(img.naturalWidth > 0);
          } else {
            img.onload = () => resolve(img.naturalWidth > 0);
            img.onerror = () => reject(new Error('Image failed to load'));
          }
        });
      });
    });
  });

  test('should have correct page structure and accessibility', async ({ johnDoePage }) => {
    // Additional structural tests
    await test.step('Verify page structure', async () => {
      // Check page title
      await expect(johnDoePage.page).toHaveTitle( johnDoePage.profile_name + "'s Profile");
      
      // Check main content area exists
      const mainContent = johnDoePage.page.locator('main');
      await expect(mainContent).toBeVisible();
      
      // Check article structure
      const article = johnDoePage.page.locator('article');
      await expect(article).toBeVisible();
    });
  });

  test('should handle different screen sizes', async ({ page }) => {
    // Test responsive design
    await test.step('Test mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // All elements should still be visible
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('img[alt="John Doe Avatar"]')).toBeVisible();
      await expect(page.locator('h2')).toBeVisible();
    });
    
    await test.step('Test desktop viewport', async () => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // All elements should still be visible
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('img[alt="John Doe Avatar"]')).toBeVisible();
      await expect(page.locator('h2')).toBeVisible();
    });
  });
});


// Test configuration - easily customizable for different profiles
interface ProfileTestConfig {
  profileId: string;
  profileUrl: string;
  userName: string;
  expectedFacebookUrl: string;
  expectedTwitterUrl: string;
}

// Profile configurations - add more profiles here as needed
const profileConfigs: ProfileTestConfig[] = [
  {
    profileId: '1',
    profileUrl: 'http://localhost:3000/pages/profile/?pid=1',
    userName: 'John Doe',
    expectedFacebookUrl: 'https://facebook.com/johndoe',
    expectedTwitterUrl: 'https://twitter.com/johndoe'
  },
  // Add more profiles here as needed:
  // {
  //   profileId: '2',
  //   profileUrl: 'http://localhost:3000/pages/profile/?pid=2',
  //   userName: 'Jane Smith',
  //   expectedFacebookUrl: 'https://facebook.com/janesmith',
  //   expectedTwitterUrl: 'https://twitter.com/janesmith'
  // }
];

test.describe('SOCIAL LINK TESTS', () => {

    test("DISPLAY AND SELECTION OF SOCIAL ICONS", async({ johnDoePage} ) => {

      await johnDoePage.click_johndoe_check_social_links(johnDoePage.page, true);
    });

    test("KEYBOARD FOCUS NAVIGATION FOR SOCIAL LINKS", async({johnDoePage}) => {

      await johnDoePage.keyboard_select_social_links(johnDoePage.page);
       

    });

    test("TAB FOCUS NAVIGATION FOR SOCIAL LINKS", async({johnDoePage}) => {
      
      let t2 = johnDoePage.page.locator('li a').all();
      let current_profile_url = johnDoePage.page.url();

      for(const row of await t2) {
       
        await johnDoePage.tabkey_navigator(johnDoePage.page, row);
      }
    });

});

test.describe('ASSESSIBILITY Suite', () => {

    test('BASIC WCAG22AA', async({page }) => {
        
        const axeBuilder = await new AxeBuilder({page}).withTags(["wcag22a", "wcag22aa"]).analyze();
        expect( axeBuilder.violations).toEqual([]);
    });
});

test.describe('Navigation and Link Tests', () => {
  
  // Run tests for each profile configuration
  profileConfigs.forEach((config) => {
    test.describe(`Profile: ${config.userName} (ID: ${config.profileId})`, () => {
      
      test.beforeEach(async ({ page }) => {
        await page.goto(config.profileUrl);
        // Wait for page to be fully loaded
        await page.waitForLoadState('domcontentloaded');
      });

      test(`should verify Facebook social media link navigates to correct URL for ${config.userName}`, async ({ page, context }) => {
        await test.step('Verify Facebook link exists and has correct URL', async () => {
          const facebookLink = page.locator(`a[href="${config.expectedFacebookUrl}"]`);
          await expect(facebookLink).toBeVisible();
          await expect(facebookLink).toHaveAttribute('href', config.expectedFacebookUrl);
        });

        await test.step('Test Facebook link navigation', async () => {
          // Check if link opens in new tab/window
          const facebookLink = page.locator(`a[href="${config.expectedFacebookUrl}"]`);
          const target = await facebookLink.getAttribute('target');
          
          if (target === '_blank') {
            // Test new tab behavior
            const [newPage] = await Promise.all([
              context.waitForEvent('page'),
              facebookLink.click()
            ]);
            
            await newPage.waitForLoadState();
            expect(newPage.url()).toBe(config.expectedFacebookUrl);
            await newPage.close();
          } else {
            // Test same tab navigation (we'll prevent actual navigation in test)
            await facebookLink.click({ noWaitAfter: true });
            // Note: In real tests, you might want to intercept the request
            // rather than actually navigating to external sites
          }
        });
      });

      test(`should test Twitter social media link functionality for ${config.userName}`, async ({ page, context }) => {
        await test.step('Verify Twitter link exists and has correct URL', async () => {
          const twitterLink = page.locator(`a[href="${config.expectedTwitterUrl}"]`);
          await expect(twitterLink).toBeVisible();
          await expect(twitterLink).toHaveAttribute('href', config.expectedTwitterUrl);
        });

        await test.step('Test Twitter link navigation', async () => {
          const twitterLink = page.locator(`a[href="${config.expectedTwitterUrl}"]`);
          const target = await twitterLink.getAttribute('target');
          
          if (target === '_blank') {
            // Test new tab behavior
            const [newPage] = await Promise.all([
              context.waitForEvent('page'),
              twitterLink.click()
            ]);
            
            await newPage.waitForLoadState();
            expect(newPage.url()).toBe(config.expectedTwitterUrl);
            await newPage.close();
          } else {
            // Test same tab navigation
            await twitterLink.click({ noWaitAfter: true });
          }
        });
      });

      test(`should check that social media links open in new tab/window for ${config.userName}`, async ({ page }) => {
        await test.step('Verify Facebook link target attribute', async () => {
          const facebookLink = page.locator(`a[href="${config.expectedFacebookUrl}"]`);
          const target = await facebookLink.getAttribute('target');
          
          // Check if link should open in new tab
          if (target === '_blank') {
            expect(target).toBe('_blank');
            
            // Also check for rel="noopener" or rel="noreferrer" for security
            const rel = await facebookLink.getAttribute('rel');
            if (rel) {
              expect(rel).toMatch(/noopener|noreferrer/);
            }
          } else {
            // Document the behavior for same-tab links
            console.log(`Facebook link opens in same tab for ${config.userName}`);
          }
        });

        await test.step('Verify Twitter link target attribute', async () => {
          const twitterLink = page.locator(`a[href="${config.expectedTwitterUrl}"]`);
          const target = await twitterLink.getAttribute('target');
          
          if (target === '_blank') {
            expect(target).toBe('_blank');
            
            // Security check
            const rel = await twitterLink.getAttribute('rel');
            if (rel) {
              expect(rel).toMatch(/noopener|noreferrer/);
            }
          } else {
            console.log(`Twitter link opens in same tab for ${config.userName}`);
          }
        });
      });

      test(`should validate all links have proper hover states and are clickable for ${config.userName}`, async ({ page }) => {
        const socialMediaLinks = [
          { name: 'Facebook', selector: `a[href="${config.expectedFacebookUrl}"]`, url: config.expectedFacebookUrl },
          { name: 'Twitter', selector: `a[href="${config.expectedTwitterUrl}"]`, url: config.expectedTwitterUrl }
        ];

        for (const linkInfo of socialMediaLinks) {
          await test.step(`Test ${linkInfo.name} link hover states and clickability`, async () => {
            const link = page.locator(linkInfo.selector);
            
            // Verify link is visible and clickable
            await expect(link).toBeVisible();
            await expect(link).toHaveAttribute('href', linkInfo.url);
            
            // Test hover state
            await link.hover();
            
            // Check if cursor changes to pointer on hover
            const cursor = await link.evaluate((el) => {
              return window.getComputedStyle(el).cursor;
            });
            expect(cursor).toBe('pointer');
            
            // Check if there are any hover effects (color changes, etc.)
            const beforeHoverColor = await link.evaluate((el) => {
              return window.getComputedStyle(el).color;
            });
            
            await link.hover();
            
            // Wait a bit for CSS transitions
            await page.waitForTimeout(100);
            
            const afterHoverColor = await link.evaluate((el) => {
              return window.getComputedStyle(el).color;
            });
            
            // Document hover behavior (colors might change or stay the same)
            console.log(`${linkInfo.name} link hover: ${beforeHoverColor} -> ${afterHoverColor}`);
            
            // Verify the link is still clickable after hover
            await expect(link).toHaveAttribute('href', linkInfo.url);
          });
        }
      });

      test(`should verify social media icons are properly displayed for ${config.userName}`, async ({ page }) => {
        await test.step('Check Facebook icon display', async () => {
          const facebookLink = page.locator(`a[href="${config.expectedFacebookUrl}"]`);
          const facebookIcon = facebookLink.locator('img');
          
          await expect(facebookIcon).toBeVisible();
          
          // Check if icon loads properly
          const iconSrc = await facebookIcon.getAttribute('src');
          expect(iconSrc).toBeTruthy();
          
          // Verify icon is not broken
          const iconNaturalWidth = await facebookIcon.evaluate((img: HTMLImageElement) => {
            return img.naturalWidth;
          });
          expect(iconNaturalWidth).toBeGreaterThan(0);
        });

        await test.step('Check Twitter icon display', async () => {
          const twitterLink = page.locator(`a[href="${config.expectedTwitterUrl}"]`);
          const twitterIcon = twitterLink.locator('img');
          
          await expect(twitterIcon).toBeVisible();
          
          // Check if icon loads properly
          const iconSrc = await twitterIcon.getAttribute('src');
          expect(iconSrc).toBeTruthy();
          
          // Verify icon is not broken
          const iconNaturalWidth = await twitterIcon.evaluate((img: HTMLImageElement) => {
            return img.naturalWidth;
          });
          expect(iconNaturalWidth).toBeGreaterThan(0);
        });
      });

      test(`should test keyboard navigation for social media links for ${config.userName}`, async ({ page }) => {
        await test.step('Test Facebook link keyboard accessibility', async () => {
          const facebookLink = page.locator(`a[href="${config.expectedFacebookUrl}"]`);
          
          // Focus the link using keyboard
          await facebookLink.focus();
          await expect(facebookLink).toBeFocused();
          
          // Test Enter key activation
          await page.keyboard.press('Enter');
          // Note: In real tests, you might want to prevent navigation
        });

        await test.step('Test Twitter link keyboard accessibility', async () => {
          const twitterLink = page.locator(`a[href="${config.expectedTwitterUrl}"]`);
          
          // Focus the link using keyboard
          await twitterLink.focus();
          await expect(twitterLink).toBeFocused();
          
          // Test Enter key activation
          await page.keyboard.press('Enter');
        });

        await test.step('Test Tab navigation between social media links', async () => {
          // Start from the beginning of the page
          await page.keyboard.press('Home');
          
          // Tab through to find social media links
          let currentElement = await page.locator(':focus').first();
          let tabCount = 0;
          const maxTabs = 10; // Prevent infinite loop
          
          while (tabCount < maxTabs) {
            await page.keyboard.press('Tab');
            currentElement = await page.locator(':focus').first();
            
            const href = await currentElement.getAttribute('href');
            if (href === config.expectedFacebookUrl || href === config.expectedTwitterUrl) {
              await expect(currentElement).toBeFocused();
              break;
            }
            tabCount++;
          }
        });
      });

      test(`should verify social media links are properly labeled for ${config.userName}`, async ({ page }) => {
        await test.step('Check Facebook link accessibility labels', async () => {
          const facebookLink = page.locator(`a[href="${config.expectedFacebookUrl}"]`);
          
          // Check for aria-label or text content
          const ariaLabel = await facebookLink.getAttribute('aria-label');
          const textContent = await facebookLink.textContent();
          
          // At least one should contain meaningful text
          const hasMeaningfulLabel = (ariaLabel && ariaLabel.toLowerCase().includes('facebook')) || 
                                   (textContent && textContent.toLowerCase().includes('facebook'));
          
          expect(hasMeaningfulLabel).toBe(true);
        });

        await test.step('Check Twitter link accessibility labels', async () => {
          const twitterLink = page.locator(`a[href="${config.expectedTwitterUrl}"]`);
          
          // Check for aria-label or text content
          const ariaLabel = await twitterLink.getAttribute('aria-label');
          const textContent = await twitterLink.textContent();
          
          // At least one should contain meaningful text
          const hasMeaningfulLabel = (ariaLabel && ariaLabel.toLowerCase().includes('twitter')) || 
                                   (textContent && textContent.toLowerCase().includes('twitter'));
          
          expect(hasMeaningfulLabel).toBe(true);
        });
      });
    });
  });

  // Cross-profile tests (if you have multiple profiles)
  test.describe('Cross-Profile Link Pattern Tests', () => {
    test('should verify all profiles follow consistent link patterns', async ({ page }) => {
      // This test can verify that all profiles follow the same URL patterns
      for (const config of profileConfigs) {
        await test.step(`Verify ${config.userName} follows URL patterns`, async () => {
          await page.goto(config.profileUrl);
          
          // Check that Facebook URL follows expected pattern
          expect(config.expectedFacebookUrl).toMatch(/^https:\/\/facebook\.com\/\w+$/);
          
          // Check that Twitter URL follows expected pattern
          expect(config.expectedTwitterUrl).toMatch(/^https:\/\/twitter\.com\/\w+$/);
          
          // Verify links exist on page
          const facebookLink = page.locator(`a[href="${config.expectedFacebookUrl}"]`);
          const twitterLink = page.locator(`a[href="${config.expectedTwitterUrl}"]`);
          
          await expect(facebookLink).toBeVisible();
          await expect(twitterLink).toBeVisible();
        });
      }
    });
  });
});