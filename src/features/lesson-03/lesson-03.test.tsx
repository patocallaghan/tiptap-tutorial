import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson03 } from './lesson-03';

describe('Lesson 03: Commands & Node Positions', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByRole('heading', { name: /lesson 03: commands & node positions/i })).toBeInTheDocument();
    await expect.element(page.getByText(/master tiptap's command system/i)).toBeInTheDocument();
  });

  it('renders learning objectives section', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByText(/🎯 learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/understand tiptap's command system/i)).toBeInTheDocument();
    await expect.element(page.getByText(/learn about node positions/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByText(/⚠️ prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 01 and 02/i)).toBeInTheDocument();
  });

  it('renders editor with structured content', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByRole('heading', { name: 'Commands & Node Positions', exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(/click anywhere in this text/i)).toBeInTheDocument();
    await expect.element(page.getByText(/first item in a list/i)).toBeInTheDocument();
  });

  it('renders todo section', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByText(/📝 todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/add selection change listener/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Verify key concepts section exists
    await expect.element(page.getByRole('heading', { name: 'Commands & Node Positions', exact: true })).toBeInTheDocument();
  });

  it('renders command control buttons', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByRole('button', { name: /test basic commands/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /test node commands/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /analyze position/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /insert at position/i })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: /replace with node/i })).toBeInTheDocument();
  });

  it('renders selection and command result displays', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByText(/selection & position info/i)).toBeInTheDocument();
    await expect.element(page.getByText(/command results/i)).toBeInTheDocument();
    await expect.element(page.getByText(/click in the editor to see selection information/i)).toBeInTheDocument();
    await expect.element(page.getByText(/execute commands to see results/i)).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson03 />);
    await expect.element(page.getByRole('link', { name: /← previous lesson/i })).toBeInTheDocument();
    await expect.element(page.getByRole('link', { name: /next lesson →/i })).toBeInTheDocument();
  });

  it('includes link to documentation', async () => {
    await renderWithRouter(<Lesson03 />);
    const docLink = page.getByRole('link', { name: /📖 view docs/i });
    await expect.element(docLink).toBeInTheDocument();
    await expect.element(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/commands');
    await expect.element(docLink).toHaveAttribute('target', '_blank');
  });
});