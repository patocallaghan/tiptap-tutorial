import { describe, it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson10 } from './lesson-10';

describe('Lesson 10: Custom Nodes Development', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/lesson 10: custom nodes development/i)).toBeInTheDocument();
    await expect.element(page.getByText(/master custom node creation/i)).toBeInTheDocument();
  });

  it('renders learning objectives', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/create custom block nodes/i)).toBeInTheDocument();
    await expect.element(page.getByText(/implement node views/i)).toBeInTheDocument();
    await expect.element(page.getByText(/build card components/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 1-9/i)).toBeInTheDocument();
    await expect.element(page.getByText(/understanding of custom marks/i)).toBeInTheDocument();
  });

  it('renders todo section with implementation tasks', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/create a card node/i)).toBeInTheDocument();
    await expect.element(page.getByText(/build an interactive button node/i)).toBeInTheDocument();
    await expect.element(page.getByText(/implement a code block node/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/tiptap editor - custom nodes/i)).toBeInTheDocument();
    await expect.element(page.getByText(/welcome to custom node development/i)).toBeInTheDocument();
    await expect.element(page.getByText(/interactive card components/i)).toBeInTheDocument();
  });

  it('renders custom toolbar with node insertion buttons', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/📋 insert card \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/🔘 insert button \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/💻 code block \(todo\)/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for key concept text
    await expect.element(page.getByText('Custom Nodes', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Node Views', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Node Attributes', { exact: true })).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson10 />);
    const prevLink = page.getByRole('link', { name: /← previous lesson/i });
    const nextLink = page.getByRole('link', { name: /next lesson →/i });

    await expect.element(prevLink).toHaveAttribute('href', '/lesson-09');
    await expect.element(nextLink).toHaveAttribute('href', '/lesson-11');
  });

  it('renders documentation link', async () => {
    await renderWithRouter(<Lesson10 />);
    const docLink = page.getByRole('link', { name: /📖 view docs/i });
    await expect.element(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/node-views');
    await expect.element(docLink).toHaveAttribute('target', '_blank');
  });

  it('has disabled toolbar buttons indicating TODO implementation', async () => {
    await renderWithRouter(<Lesson10 />);
    const cardButton = page.getByRole('button', { name: /📋 insert card \(todo\)/i });
    const buttonButton = page.getByRole('button', { name: /🔘 insert button \(todo\)/i });
    const codeButton = page.getByRole('button', { name: /💻 code block \(todo\)/i });

    await expect.element(cardButton).toBeDisabled();
    await expect.element(buttonButton).toBeDisabled();
    await expect.element(codeButton).toBeDisabled();
  });

  it('renders content that explains custom nodes', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/custom button elements/i)).toBeInTheDocument();
    await expect.element(page.getByText(/advanced code blocks/i)).toBeInTheDocument();
    await expect.element(page.getByText(/node views for complex rendering/i)).toBeInTheDocument();
  });

  it('explains the difference between nodes and marks', async () => {
    await renderWithRouter(<Lesson10 />);
    await expect.element(page.getByText(/rich, interactive content blocks/i)).toBeInTheDocument();
  });
});
