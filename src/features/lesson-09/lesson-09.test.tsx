import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson09 } from './lesson-09';

describe('Lesson 09: Custom Marks Development', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson09 />);
    await expect.element(page.getByText(/lesson 09: custom marks development/i)).toBeInTheDocument();
    await expect.element(page.getByText(/learn to create custom marks/i)).toBeInTheDocument();
  });

  it('renders learning objectives', async () => {
    await renderWithRouter(<Lesson09 />);
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/create a custom highlight mark/i)).toBeInTheDocument();
    await expect.element(page.getByText(/build an annotation system/i)).toBeInTheDocument();
    await expect.element(page.getByText(/implement keyboard shortcuts/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson09 />);
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 1-8/i)).toBeInTheDocument();
  });

  it('renders todo section with implementation tasks', async () => {
    await renderWithRouter(<Lesson09 />);
    await expect.element(page.getByText(/todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/create a highlight mark/i)).toBeInTheDocument();
    await expect.element(page.getByText(/build an annotation mark/i)).toBeInTheDocument();
    await expect.element(page.getByText(/implement an underline mark/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson09 />);
    await expect.element(page.getByText(/tiptap editor - custom marks/i)).toBeInTheDocument();
    await expect.element(page.getByText(/welcome to custom marks development/i)).toBeInTheDocument();
  });

  it('renders custom toolbar with mark buttons', async () => {
    await renderWithRouter(<Lesson09 />);
    await expect.element(page.getByText(/🖍️ highlight \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/💬 annotate \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/📑 underline \(todo\)/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson09 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for key concept text
    await expect.element(page.getByText('Mark Extensions', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Mark Attributes', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Mark Parsing', { exact: true })).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson09 />);
    const prevLink = page.getByRole('link', { name: /← previous lesson/i });
    const nextLink = page.getByRole('link', { name: /next lesson →/i });

    await expect.element(prevLink).toHaveAttribute('href', '/lesson-08');
    await expect.element(nextLink).toHaveAttribute('href', '/lesson-10');
  });

  it('renders documentation link', async () => {
    await renderWithRouter(<Lesson09 />);
    const docLink = page.getByRole('link', { name: /📖 view docs/i });
    await expect.element(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/custom-extensions#marks');
    await expect.element(docLink).toHaveAttribute('target', '_blank');
  });

  it('has disabled toolbar buttons indicating TODO implementation', async () => {
    await renderWithRouter(<Lesson09 />);
    const highlightButton = page.getByRole('button', { name: /🖍️ highlight \(todo\)/i });
    const annotateButton = page.getByRole('button', { name: /💬 annotate \(todo\)/i });
    const underlineButton = page.getByRole('button', { name: /📑 underline \(todo\)/i });

    await expect.element(highlightButton).toBeDisabled();
    await expect.element(annotateButton).toBeDisabled();
    await expect.element(underlineButton).toBeDisabled();
  });

  it('renders content that explains custom marks', async () => {
    await renderWithRouter(<Lesson09 />);
    await expect.element(page.getByText(/try implementing the following custom marks/i)).toBeInTheDocument();
    await expect.element(page.getByText(/highlight mark for text highlighting/i)).toBeInTheDocument();
    await expect.element(page.getByText(/annotation mark for adding comments/i)).toBeInTheDocument();
  });
});
