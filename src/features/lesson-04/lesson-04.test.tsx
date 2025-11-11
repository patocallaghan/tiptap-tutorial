import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson04 } from './lesson-04';

describe('Lesson 04: Input Rules & Paste Rules', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByText(/lesson 04: input rules & paste rules/i)).toBeInTheDocument();
    await expect.element(page.getByText(/learn to create auto-formatting rules/i)).toBeInTheDocument();
  });

  it('renders learning objectives section', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByText(/🎯 learning objectives/i)).toBeInTheDocument();
    // Check that learning objectives list item exists
    await expect.element(page.getByText(/• understand input rules for markdown-style shortcuts/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByText(/⚠️ prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 01, 02, and 03/i)).toBeInTheDocument();
  });

  it('renders editor with instructional content', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByText(/input rules & paste rules demo/i)).toBeInTheDocument();
    await expect.element(page.getByText(/try these markdown-style shortcuts/i)).toBeInTheDocument();
    await expect.element(page.getByText(/try pasting different content types/i)).toBeInTheDocument();
  });

  it('renders todo section', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByText(/📝 todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText('Create custom input rules for markdown-style formatting', { exact: true })).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Verify key concepts section exists
    await expect.element(page.getByRole('heading', { name: /input rules & paste rules/i })).toBeInTheDocument();
  });

  it('renders rule control buttons', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByRole('button', { name: /test input rules/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /insert sample content/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /clear & reset/i })).toBeInTheDocument();
  });

  it('renders activity tracking displays', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByRole('heading', { name: /input rule activity/i })).toBeInTheDocument();
    await expect.element(page.getByRole('heading', { name: /paste events/i })).toBeInTheDocument();
    await expect.element(page.getByText(/paste content to see paste rule activity/i)).toBeInTheDocument();
  });

  it('renders quick reference guide', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByText(/📋 quick reference/i)).toBeInTheDocument();
    await expect.element(page.getByText(/input shortcuts:/i)).toBeInTheDocument();
    await expect.element(page.getByText(/more shortcuts:/i)).toBeInTheDocument();
    await expect.element(page.getByText(/→ heading 1/i)).toBeInTheDocument();
    await expect.element(page.getByText(/→ bold/i)).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson04 />);
    await expect.element(page.getByRole('link', { name: /← previous lesson/i })).toBeInTheDocument();
    await expect.element(page.getByRole('link', { name: /next lesson →/i })).toBeInTheDocument();
  });

  it('includes link to documentation', async () => {
    await renderWithRouter(<Lesson04 />);
    const docLink = page.getByRole('link', { name: /📖 view docs/i });
    await expect.element(docLink).toBeInTheDocument();
    await expect.element(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/extensions/functionality/typography');
    await expect.element(docLink).toHaveAttribute('target', '_blank');
  });
});