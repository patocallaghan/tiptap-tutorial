import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson01 } from './lesson-01';

describe('Lesson 01: Basic Editor Setup', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson01 />);
    await expect.element(page.getByText(/lesson 01: basic editor setup/i)).toBeInTheDocument();
    await expect.element(page.getByText(/learn the fundamentals of setting up a tiptap editor/i)).toBeInTheDocument();
  });

  it('renders learning objectives section', async () => {
    await renderWithRouter(<Lesson01 />);
    await expect.element(page.getByText(/🎯 learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/understand how to initialize a tiptap editor/i)).toBeInTheDocument();
    await expect.element(page.getByText(/configure the starterkit extension/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson01 />);
    await expect.element(page.getByText(/welcome to tiptap!/i)).toBeInTheDocument();
  });

  it('renders todo section', async () => {
    await renderWithRouter(<Lesson01 />);
    await expect.element(page.getByText(/📝 todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/add a placeholder to the editor configuration/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson01 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    await expect.element(page.getByText('useEditor Hook', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('StarterKit', { exact: true })).toBeInTheDocument();
  });

  it('renders editor controls', async () => {
    await renderWithRouter(<Lesson01 />);
    await expect.element(page.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /focus/i })).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson01 />);
    await expect.element(page.getByRole('link', { name: /← home/i })).toBeInTheDocument();
    await expect.element(page.getByRole('link', { name: /next lesson →/i })).toBeInTheDocument();
  });

  it('includes link to documentation', async () => {
    await renderWithRouter(<Lesson01 />);
    const docLink = page.getByRole('link', { name: /📖 view docs/i });
    await expect.element(docLink).toBeInTheDocument();
    await expect.element(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/introduction');
    await expect.element(docLink).toHaveAttribute('target', '_blank');
  });
});
