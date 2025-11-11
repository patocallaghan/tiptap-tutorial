import { describe, it, expect, vi, afterEach } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson11 } from './lesson-11';

// Mock console.log for testing
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

describe('Lesson 11: Advanced ProseMirror Integration', () => {
  afterEach(() => {
    consoleSpy.mockClear();
    alertSpy.mockClear();
  });

  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/lesson 11: advanced prosemirror integration/i)).toBeInTheDocument();
    await expect.element(page.getByText(/master direct prosemirror api integration/i)).toBeInTheDocument();
  });

  it('renders learning objectives', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/access and manipulate prosemirror schema/i)).toBeInTheDocument();
    await expect.element(page.getByText(/create custom prosemirror plugins/i)).toBeInTheDocument();
    await expect.element(page.getByText(/handle transactions with filters/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 1-10/i)).toBeInTheDocument();
    await expect.element(page.getByText(/deep understanding of tiptap architecture/i)).toBeInTheDocument();
  });

  it('renders todo section with implementation tasks', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/access prosemirror view and state/i)).toBeInTheDocument();
    await expect.element(page.getByText(/create custom schema modifications/i)).toBeInTheDocument();
    await expect.element(page.getByText(/implement transaction filters/i)).toBeInTheDocument();
  });

  it('renders advanced controls section', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/advanced controls/i)).toBeInTheDocument();
    await expect.element(page.getByText(/schema information/i)).toBeInTheDocument();
    await expect.element(page.getByText(/transaction info/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/tiptap editor - advanced prosemirror/i)).toBeInTheDocument();
    await expect.element(page.getByText(/welcome to advanced prosemirror integration/i)).toBeInTheDocument();
    await expect.element(page.getByText(/prosemirror schema customization/i)).toBeInTheDocument();
  });

  it('renders advanced toolbar with prosemirror controls', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/🔧 custom plugin \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/🎨 decorations \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/🔄 transaction filter \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/🧪 schema modification \(todo\)/i)).toBeInTheDocument();
  });

  it('renders debug information section', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/debug information/i)).toBeInTheDocument();
    await expect.element(page.getByText(/editor view:/i)).toBeInTheDocument();
    await expect.element(page.getByText(/current selection:/i)).toBeInTheDocument();
    await expect.element(page.getByText(/document size:/i)).toBeInTheDocument();
  });

  it('handles log schema button click', async () => {
    await renderWithRouter(<Lesson11 />);

    // Wait a bit for editor to initialize
    await new Promise(resolve => setTimeout(resolve, 100));

    const logSchemaButton = page.getByText(/🏗️ log schema/i);
    await userEvent.click(logSchemaButton);

    expect(alertSpy).toHaveBeenCalledWith('Schema logged to console');
  });

  it('handles log state button click', async () => {
    await renderWithRouter(<Lesson11 />);

    // Wait a bit for editor to initialize
    await new Promise(resolve => setTimeout(resolve, 100));

    const logStateButton = page.getByText(/📊 log state/i);
    await userEvent.click(logStateButton);

    expect(alertSpy).toHaveBeenCalledWith('State logged to console');
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for key concept text
    await expect.element(page.getByText('ProseMirror Schema', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Transactions', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Plugins', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Decorations', { exact: true })).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson11 />);
    const prevLink = page.getByRole('link', { name: /← previous lesson/i });
    const nextLink = page.getByRole('link', { name: /next lesson →/i });

    await expect.element(prevLink).toHaveAttribute('href', '/lesson-10');
    await expect.element(nextLink).toHaveAttribute('href', '/lesson-12');
  });

  it('renders documentation link', async () => {
    await renderWithRouter(<Lesson11 />);
    const docLink = page.getByRole('link', { name: /📖 view docs/i });
    await expect.element(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/prosemirror');
    await expect.element(docLink).toHaveAttribute('target', '_blank');
  });

  it('has disabled toolbar buttons indicating TODO implementation', async () => {
    await renderWithRouter(<Lesson11 />);
    const pluginButton = page.getByRole('button', { name: /🔧 custom plugin \(todo\)/i });
    const decorationsButton = page.getByRole('button', { name: /🎨 decorations \(todo\)/i });
    const transactionButton = page.getByRole('button', { name: /🔄 transaction filter \(todo\)/i });
    const schemaButton = page.getByRole('button', { name: /🧪 schema modification \(todo\)/i });

    await expect.element(pluginButton).toBeDisabled();
    await expect.element(decorationsButton).toBeDisabled();
    await expect.element(transactionButton).toBeDisabled();
    await expect.element(schemaButton).toBeDisabled();
  });

  it('renders content that explains prosemirror concepts', async () => {
    await renderWithRouter(<Lesson11 />);
    await expect.element(page.getByText(/transaction handling and filtering/i)).toBeInTheDocument();
    await expect.element(page.getByText(/custom plugins and decorations/i)).toBeInTheDocument();
    await expect.element(page.getByText(/direct view manipulation/i)).toBeInTheDocument();
  });

  it('logs prosemirror view and state on editor creation', async () => {
    await renderWithRouter(<Lesson11 />);

    // Wait for editor to be created
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(consoleSpy).toHaveBeenCalledWith('ProseMirror view:', expect.any(Object));
    expect(consoleSpy).toHaveBeenCalledWith('ProseMirror state:', expect.any(Object));
  });
});
