import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson02 } from './lesson-02';

describe('Lesson 02: Content & Document Structure', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByRole('heading', { name: /lesson 02: content & document structure/i })).toBeInTheDocument();
    await expect.element(page.getByText(/understand prosemirror's document model/i)).toBeInTheDocument();
  });

  it('renders learning objectives section', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByText(/🎯 learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/understand the prosemirror document model/i)).toBeInTheDocument();
    await expect.element(page.getByText(/explore the editor schema/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByText(/⚠️ prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lesson 01/i)).toBeInTheDocument();
  });

  it('renders editor with structured content', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByRole('heading', { name: 'Document Structure', exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(/this is a paragraph with/i)).toBeInTheDocument();
    await expect.element(page.getByText(/first list item/i)).toBeInTheDocument();
  });

  it('renders todo section', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByText(/📝 todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/add transaction listener to monitor document changes/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for key concepts by looking within the key concepts section
    await expect.element(page.getByRole('heading', { name: /document structure/i, exact: false })).toBeInTheDocument();
  });

  it('renders schema exploration controls', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByRole('button', { name: /explore schema/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /validate content/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('renders document json structure display', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByRole('heading', { name: /document json structure/i })).toBeInTheDocument();
    // Just verify the section exists
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson02 />);
    await expect.element(page.getByRole('link', { name: /← previous lesson/i })).toBeInTheDocument();
    await expect.element(page.getByRole('link', { name: /next lesson →/i })).toBeInTheDocument();
  });

  it('includes link to documentation', async () => {
    await renderWithRouter(<Lesson02 />);
    const docLink = page.getByRole('link', { name: /📖 view docs/i });
    await expect.element(docLink).toBeInTheDocument();
    await expect.element(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/prosemirror');
    await expect.element(docLink).toHaveAttribute('target', '_blank');
  });
});