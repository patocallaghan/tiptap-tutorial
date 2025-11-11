import { describe, it, expect, vi, beforeEach } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson05 } from './lesson-05';

// Mock console methods to test event logging
const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Lesson 05: Events & Editor Lifecycle', () => {
  beforeEach(() => {
    consoleMock.mockClear();
  });

  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson05 />);
    await expect.element(page.getByText(/lesson 05: events & editor lifecycle/i)).toBeInTheDocument();
    await expect.element(page.getByText(/learn how to handle editor events/i)).toBeInTheDocument();
  });

  it('renders learning objectives', async () => {
    await renderWithRouter(<Lesson05 />);
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/understand editor lifecycle events/i)).toBeInTheDocument();
    await expect.element(page.getByText(/implement event handlers/i)).toBeInTheDocument();
    await expect.element(page.getByText(/work with prosemirror transactions/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson05 />);
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 1-4/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson05 />);
    await expect.element(page.getByText(/start typing to see editor events/i)).toBeInTheDocument();
  });

  it('renders understanding section', async () => {
    await renderWithRouter(<Lesson05 />);
    await expect.element(page.getByText(/understanding this implementation/i)).toBeInTheDocument();
    // Check for implementation details (using more specific text to avoid multiple matches)
    await expect.element(page.getByText(/onCreate - Editor initialization logging/i)).toBeInTheDocument();
    await expect.element(page.getByText(/onUpdate - Content change tracking/i)).toBeInTheDocument();
  });

  it('renders try it yourself section', async () => {
    await renderWithRouter(<Lesson05 />);
    await expect.element(page.getByText(/try it yourself: extension challenges/i)).toBeInTheDocument();
    await expect.element(page.getByText(/visible event log ui/i)).toBeInTheDocument();
  });

  it('renders event log display section', async () => {
    await renderWithRouter(<Lesson05 />);
    await expect.element(page.getByRole('heading', { name: /🔍 event log/i })).toBeInTheDocument();
    await expect.element(page.getByText(/check browser console/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson05 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Verify key concepts section exists
    await expect.element(page.getByRole('heading', { name: /lesson 05: events & editor lifecycle/i })).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson05 />);
    const prevLink = page.getByRole('link', { name: /previous lesson/i });
    const nextLink = page.getByRole('link', { name: /next lesson/i });

    await expect.element(prevLink).toHaveAttribute('href', '/lesson-04');
    await expect.element(nextLink).toHaveAttribute('href', '/lesson-06');
  });

  it('renders documentation link', async () => {
    await renderWithRouter(<Lesson05 />);
    const docsLink = page.getByRole('link', { name: /view docs/i });
    await expect.element(docsLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/api/events');
    await expect.element(docsLink).toHaveAttribute('target', '_blank');
  });

  it('logs editor creation event', async () => {
    await renderWithRouter(<Lesson05 />);

    // Wait for editor to be created and events to be logged
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(consoleMock).toHaveBeenCalledWith(expect.stringMatching(/editor created/i), expect.any(Object));
  });

  it('handles editor interaction events', async () => {
    await renderWithRouter(<Lesson05 />);

    const editorContent = page.getByRole('textbox');

    // Test focus event
    await userEvent.click(editorContent);
    expect(consoleMock).toHaveBeenCalledWith('Editor focused');

    // Test blur event - click outside to trigger blur
    await userEvent.click(page.getByText(/lesson 05: events & editor lifecycle/i));
    expect(consoleMock).toHaveBeenCalledWith('Editor blurred');
  });

  it('provides proper accessibility attributes', async () => {
    await renderWithRouter(<Lesson05 />);

    // Check that the editor is accessible
    const editor = page.getByRole('textbox');
    await expect.element(editor).toBeInTheDocument();
  });
});