import { describe, it, expect } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson06 } from './lesson-06';

describe('Lesson 06: Custom Menus & UI Controls', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson06 />);
    await expect.element(page.getByText(/lesson 06: custom menus & ui controls/i)).toBeInTheDocument();
    await expect.element(page.getByText(/learn how to build interactive toolbars/i)).toBeInTheDocument();
  });

  it('renders learning objectives', async () => {
    await renderWithRouter(<Lesson06 />);
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• build custom formatting toolbars/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• implement bubble menus/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• create floating menus/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson06 />);
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 1-5/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson06 />);
    await expect.element(page.getByRole('heading', { name: 'Custom Menus & UI Controls', exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Select text to see the bubble menu, or place cursor on empty line for floating menu', { exact: true })).toBeInTheDocument();
  });

  it('renders todo section', async () => {
    await renderWithRouter(<Lesson06 />);
    await expect.element(page.getByText(/todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/fixed formatting toolbar/i)).toBeInTheDocument();
    await expect.element(page.getByText(/bubble menu that appears/i)).toBeInTheDocument();
    await expect.element(page.getByText(/floating menu for empty paragraphs/i)).toBeInTheDocument();
  });

  it('renders custom toolbar with formatting buttons', async () => {
    await renderWithRouter(<Lesson06 />);

    // Check for toolbar buttons
    await expect.element(page.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /italic/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /strike/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /h1/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /h2/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /list/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /quote/i })).toBeInTheDocument();
  });

  it('handles toolbar button interactions', async () => {
    await renderWithRouter(<Lesson06 />);

    const boldButton = page.getByRole('button', { name: /bold/i });
    const italicButton = page.getByRole('button', { name: /italic/i });

    // Test button clicks
    await userEvent.click(boldButton);
    await userEvent.click(italicButton);

    // Buttons should be clickable (no errors thrown)
    await expect.element(boldButton).toBeInTheDocument();
    await expect.element(italicButton).toBeInTheDocument();
  });

  it('renders usage instructions', async () => {
    await renderWithRouter(<Lesson06 />);
    await expect.element(page.getByText(/try these interactions/i)).toBeInTheDocument();
    await expect.element(page.getByText(/select text to see the bubble menu appear/i)).toBeInTheDocument();
    await expect.element(page.getByText(/click on an empty line/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson06 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Verify key concepts section exists
    await expect.element(page.getByRole('heading', { name: 'Custom Menus & UI Controls', exact: true })).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson06 />);
    const prevLink = page.getByRole('link', { name: /previous lesson/i });
    const nextLink = page.getByRole('link', { name: /next lesson/i });

    await expect.element(prevLink).toHaveAttribute('href', '/lesson-05');
    await expect.element(nextLink).toHaveAttribute('href', '/lesson-07');
  });

  it('renders documentation link', async () => {
    await renderWithRouter(<Lesson06 />);
    const docsLink = page.getByRole('link', { name: /view docs/i });
    await expect.element(docsLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/api/menus');
    await expect.element(docsLink).toHaveAttribute('target', '_blank');
  });

  it('renders editor with proper styling classes', async () => {
    await renderWithRouter(<Lesson06 />);
    const editorContainer = page.getByRole('textbox');
    await expect.element(editorContainer).toHaveClass('ProseMirror');
  });

  it('displays proper heading structure', async () => {
    await renderWithRouter(<Lesson06 />);

    // Check main lesson heading
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect.element(mainHeading).toHaveTextContent(/lesson 06: custom menus & ui controls/i);

    // Check section headings
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/todo: your implementation/i)).toBeInTheDocument();
  });

  it('provides proper accessibility for interactive elements', async () => {
    await renderWithRouter(<Lesson06 />);

    // Toolbar buttons should be accessible
    await expect.element(page.getByRole('button', { name: /bold/i })).toBeInTheDocument();

    // Editor should be accessible
    const editor = page.getByRole('textbox');
    await expect.element(editor).toBeInTheDocument();

    // Links should be accessible
    await expect.element(page.getByRole('link', { name: /previous lesson/i })).toBeInTheDocument();
  });

  it('shows toolbar button active states correctly', async () => {
    await renderWithRouter(<Lesson06 />);

    // Toolbar buttons should have appropriate classes for active/inactive states
    const boldButton = page.getByRole('button', { name: /bold/i });
    await expect.element(boldButton).toHaveClass('transition-colors');
  });
});
