/**
 * Test Utilities for TipTap Tutorial
 *
 * This file provides helper functions for testing React components using Vitest Browser Mode.
 *
 * ## About Vitest Browser Mode
 *
 * Vitest Browser Mode runs tests in a real browser environment using Playwright, providing:
 * - Real browser DOM and APIs (not jsdom simulation)
 * - Accurate rendering and interaction testing
 * - Access to browser-specific features
 * - Better confidence that tests match production behavior
 *
 * ## Writing Tests with Vitest Browser Mode
 *
 * ### Basic Test Structure:
 * ```typescript
 * import { describe, it, expect } from 'vitest';
 * import { page } from 'vitest/browser';  // Browser API
 * import { renderWithRouter } from '../../test/test-utils';
 * import { MyComponent } from './my-component';
 *
 * describe('MyComponent', () => {
 *   it('should render correctly', async () => {
 *     await renderWithRouter(<MyComponent />);
 *
 *     // Query elements using page.getBy* methods
 *     const heading = page.getByRole('heading', { name: 'My Title' });
 *     await expect.element(heading).toBeVisible();
 *   });
 * });
 * ```
 *
 * ### Key Testing Patterns:
 *
 * 1. **Querying Elements:**
 *    - `page.getByRole()` - Query by ARIA role (preferred)
 *    - `page.getByText()` - Query by text content
 *    - `page.getByLabelText()` - Query form elements by label
 *    - `page.getByPlaceholder()` - Query by placeholder text
 *    - `page.getByTestId()` - Query by data-testid attribute
 *
 * 2. **Assertions:**
 *    - `await expect.element(el).toBeVisible()` - Element is visible
 *    - `await expect.element(el).toHaveTextContent('text')` - Has specific text
 *    - `await expect.element(el).toBeDisabled()` - Element is disabled
 *    - `await expect.element(el).toHaveAttribute('attr', 'value')` - Has attribute
 *
 * 3. **User Interactions:**
 *    - `await element.click()` - Click an element
 *    - `await element.fill('text')` - Type in an input
 *    - `await element.press('Enter')` - Press a key
 *    - `await element.hover()` - Hover over an element
 *
 * ### Example Test for TipTap Editor:
 * ```typescript
 * it('should allow typing in editor', async () => {
 *   await renderWithRouter(<EditorComponent />);
 *
 *   // Find the editor content area
 *   const editor = page.getByRole('textbox');
 *
 *   // Type some text
 *   await editor.click();
 *   await editor.fill('Hello World');
 *
 *   // Verify the text appears
 *   await expect.element(editor).toHaveTextContent('Hello World');
 *
 *   // Click a button
 *   const boldBtn = page.getByRole('button', { name: 'Bold' });
 *   await boldBtn.click();
 *
 *   // Verify button state
 *   await expect.element(boldBtn).toHaveClass(/active/);
 * });
 * ```
 *
 * ### Testing TipTap-Specific Features:
 *
 * When testing TipTap editors, focus on:
 * - Editor initialization and rendering
 * - Toolbar button functionality
 * - Content editing and formatting
 * - Menu interactions (BubbleMenu, FloatingMenu)
 * - Extension behavior
 * - Command execution
 *
 * ## Learn More:
 * - Vitest Browser Mode: https://vitest.dev/guide/browser/
 * - Testing Library Queries: https://testing-library.com/docs/queries/about
 * - Playwright API: https://playwright.dev/docs/api/class-page
 */

import { render } from 'vitest-browser-react'
import { BrowserRouter } from 'react-router'
import type { ReactElement } from 'react'

/**
 * Renders a React component wrapped in a BrowserRouter for testing.
 *
 * This is necessary for components that use React Router hooks or components
 * (like Link, useNavigate, useParams, etc.)
 *
 * @param component - The React element to render
 * @returns Promise that resolves when the component is rendered
 *
 * @example
 * ```typescript
 * import { renderWithRouter } from '../../test/test-utils';
 * import { MyComponent } from './my-component';
 *
 * it('should render with routing', async () => {
 *   await renderWithRouter(<MyComponent />);
 *
 *   // Now you can interact with the rendered component
 *   const link = page.getByRole('link', { name: 'Home' });
 *   await expect.element(link).toBeVisible();
 * });
 * ```
 */
export async function renderWithRouter(component: ReactElement) {
  return await render(<BrowserRouter>{component}</BrowserRouter>)
}
