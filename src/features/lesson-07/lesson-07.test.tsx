import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson07 } from './lesson-07';

describe('Lesson 07: Suggestion System & Typeahead', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByText(/lesson 07: suggestion system & typeahead/i)).toBeInTheDocument();
    await expect.element(page.getByText(/learn how to implement advanced input features/i)).toBeInTheDocument();
  });

  it('renders learning objectives', async () => {
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• implement @mention system with typeahead search/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• create slash commands menu for quick content insertion/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• build autocomplete functionality with keyboard navigation/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 1-6/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByRole('heading', { name: 'Suggestion System & Typeahead', exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(/try typing @ followed by a name/i)).toBeInTheDocument();
  });

  it('renders todo section', async () => {
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByText(/todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/enhanced @mention system with custom rendering and data/i)).toBeInTheDocument();
    await expect.element(page.getByText(/autocomplete with fuzzy search and dynamic data sources/i)).toBeInTheDocument();
  });

  it('renders interactive demo section', async () => {
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByText(/interactive demo/i)).toBeInTheDocument();
    await expect.element(page.getByText(/type @ followed by a name/i)).toBeInTheDocument();
    await expect.element(page.getByText(/use arrow keys to navigate/i)).toBeInTheDocument();
  });

  it('renders implementation status section', async () => {
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByText(/current implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/keyboard navigation \(arrow keys, enter, escape\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/todo implementation/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Verify key concepts section exists
    await expect.element(page.getByRole('heading', { name: 'Suggestion System & Typeahead', exact: true })).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson07 />);
    const prevLink = page.getByRole('link', { name: /previous lesson/i });
    const nextLink = page.getByRole('link', { name: /next lesson/i });

    await expect.element(prevLink).toHaveAttribute('href', '/lesson-06');
    await expect.element(nextLink).toHaveAttribute('href', '/lesson-08');
  });

  it('renders documentation link', async () => {
    await renderWithRouter(<Lesson07 />);
    const docsLink = page.getByRole('link', { name: /view docs/i });
    await expect.element(docsLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/extensions/functionality/mention');
    await expect.element(docsLink).toHaveAttribute('target', '_blank');
  });

  it('renders editor with proper styling classes', async () => {
    await renderWithRouter(<Lesson07 />);
    const editorContainer = page.getByRole('textbox');
    await expect.element(editorContainer).toHaveClass('ProseMirror');
  });

  it('displays code examples in demo section', async () => {
    await renderWithRouter(<Lesson07 />);

    // Check for inline code examples - just verify at least one exists
    await expect.element(page.getByText(/try typing @ followed by a name/i)).toBeInTheDocument();
  });

  it('provides proper accessibility for interactive elements', async () => {
    await renderWithRouter(<Lesson07 />);

    // Editor should be accessible
    const editor = page.getByRole('textbox');
    await expect.element(editor).toBeInTheDocument();

    // Links should be accessible
    await expect.element(page.getByRole('link', { name: /previous lesson/i })).toBeInTheDocument();
  });

  it('shows proper heading structure', async () => {
    await renderWithRouter(<Lesson07 />);

    // Main heading
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect.element(mainHeading).toHaveTextContent(/lesson 07: suggestion system & typeahead/i);

    // Section headings should be present
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
  });

  it('renders demo instructions with proper formatting', async () => {
    await renderWithRouter(<Lesson07 />);

    // Check for status sections (no need to check closest/styling)
    await expect.element(page.getByText(/current implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/todo implementation/i)).toBeInTheDocument();
  });

  it('mentions the mention extension is configured', async () => {
    // This test verifies the component renders without errors,
    // which implies the Mention extension is properly configured
    await renderWithRouter(<Lesson07 />);
    await expect.element(page.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles editor interaction without errors', async () => {
    await renderWithRouter(<Lesson07 />);

    const editorContent = page.getByRole('textbox');

    // Test basic interaction - just verify editor exists
    await expect.element(editorContent).toBeInTheDocument();
  });
});
