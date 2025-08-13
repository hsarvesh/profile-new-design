import { test, expect } from '@playwright/test';

test.describe('Social Media Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('verify social media links', async ({ page }) => {
    const socialLinks = [
      { url: 'https://www.linkedin.com/in/hsarvesh/', platform: 'linkedin' },
      { url: 'https://twitter.com/hsarvesh', platform: 'twitter' },
      { url: 'https://www.facebook.com/hsarvesh', platform: 'facebook' },
      { url: 'https://www.youtube.com/hsarvesh', platform: 'youtube' },
      { url: 'https://www.instagram.com/sarveshhuddedar', platform: 'instagram' }
    ];

    for (const link of socialLinks) {
      const element = await page.locator(`a[href="${link.url}"]`);
      await expect(element).toBeVisible();
      await expect(element).toHaveAttribute('target', '_blank');
    }
  });
});