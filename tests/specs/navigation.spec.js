import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('verify navigation menu links', async ({ page }) => {
    const navLinks = [
      { href: '#header', text: 'Home' },
      { href: '#about', text: 'About' },
      { href: '#resume', text: 'Resume' },
      { href: '#contact', text: 'Contacts' },
      { href: '#tools', text: 'Projects' },
      { href: '#blog', text: 'Blog' }
    ];

    for (const link of navLinks) {
      const element = await page.locator(`a[href="${link.href}"]`);
      await expect(element).toBeVisible();
      await expect(element).toHaveText(link.text);
    }
  });
});