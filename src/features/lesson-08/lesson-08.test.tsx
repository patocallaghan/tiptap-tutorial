import { describe, it, expect } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson08 } from './lesson-08';

describe('Lesson 08: StarterKit Extensions & Configuration', () => {
  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByText(/lesson 08: starterkit extensions & configuration/i)).toBeInTheDocument();
    await expect.element(page.getByText(/learn how to configure starterkit extensions/i)).toBeInTheDocument();
  });

  it('renders learning objectives', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• understand starterkit's included extensions and features/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• configure individual extensions within starterkit/i)).toBeInTheDocument();
    await expect.element(page.getByText(/• load extensions individually for custom configuration/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete lessons 1-7/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByRole('heading', { name: 'StarterKit Extensions & Configuration', exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(/the starterkit provides a comprehensive set/i)).toBeInTheDocument();
  });

  it('renders todo section', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByText(/todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/individual extension loading for fine-grained control/i)).toBeInTheDocument();
    await expect.element(page.getByText(/performance optimization by removing unused extensions/i)).toBeInTheDocument();
  });

  it('renders configuration toggle controls', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByText(/configuration comparison/i)).toBeInTheDocument();

    const starterKitRadio = page.getByRole('radio', { name: /starterkit \(default\)/i });
    const individualRadio = page.getByRole('radio', { name: /individual extensions \(custom\)/i });

    await expect.element(starterKitRadio).toBeInTheDocument();
    await expect.element(individualRadio).toBeInTheDocument();
    await expect.element(starterKitRadio).toBeChecked();
  });

  it('handles configuration toggle functionality', async () => {
    await renderWithRouter(<Lesson08 />);

    const starterKitRadio = page.getByRole('radio', { name: /starterkit \(default\)/i });
    const individualRadio = page.getByRole('radio', { name: /individual extensions \(custom\)/i });

    // Initially StarterKit should be selected
    await expect.element(starterKitRadio).toBeChecked();
    await expect.element(individualRadio).not.toBeChecked();

    // Click individual extensions radio
    await userEvent.click(individualRadio);

    await expect.element(individualRadio).toBeChecked();
    await expect.element(starterKitRadio).not.toBeChecked();
  });

  it('renders extension overview section', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByRole('heading', { name: '📦 StarterKit Extensions', exact: true })).toBeInTheDocument();

    // Check for extension categories
    await expect.element(page.getByText(/text & formatting/i)).toBeInTheDocument();
    await expect.element(page.getByText(/structure & elements/i)).toBeInTheDocument();
  });

  it('displays current configuration information', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByRole('heading', { name: /📦 starterkit configuration/i })).toBeInTheDocument();
    await expect.element(page.getByText(/using starterkit with configured extension options/i)).toBeInTheDocument();
  });

  it('renders performance considerations section', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByText(/performance considerations/i)).toBeInTheDocument();
    await expect.element(page.getByText(/convenient but includes all extensions/i)).toBeInTheDocument();
    await expect.element(page.getByText(/more control and smaller bundle size/i)).toBeInTheDocument();
    await expect.element(page.getByText(/tree shaking/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson08 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Verify key concepts section exists
    await expect.element(page.getByRole('heading', { name: 'StarterKit Extensions & Configuration', exact: true })).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    await renderWithRouter(<Lesson08 />);
    const prevLink = page.getByRole('link', { name: /previous lesson/i });
    const nextLink = page.getByRole('link', { name: /next lesson/i });

    await expect.element(prevLink).toHaveAttribute('href', '/lesson-07');
    await expect.element(nextLink).toHaveAttribute('href', '/lesson-09');
  });

  it('renders documentation link', async () => {
    await renderWithRouter(<Lesson08 />);
    const docsLink = page.getByRole('link', { name: /view docs/i });
    await expect.element(docsLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/extensions/functionality/starterkit');
    await expect.element(docsLink).toHaveAttribute('target', '_blank');
  });

  it('updates editor header based on configuration', async () => {
    await renderWithRouter(<Lesson08 />);

    // Initially should show StarterKit default
    await expect.element(page.getByRole('heading', { name: 'TipTap Editor - StarterKit Default', exact: true })).toBeInTheDocument();

    // Switch to custom configuration
    const individualRadio = page.getByRole('radio', { name: /individual extensions \(custom\)/i });
    await userEvent.click(individualRadio);

    // Should now show Custom Configuration
    await expect.element(page.getByRole('heading', { name: 'TipTap Editor - Custom Configuration', exact: true })).toBeInTheDocument();
  });

  it('shows code examples for different configurations', async () => {
    await renderWithRouter(<Lesson08 />);

    // Check for code snippets
    await expect.element(page.getByText(/extensions: \[StarterKit\.configure/i)).toBeInTheDocument();
  });

  it('updates configuration display when toggling', async () => {
    await renderWithRouter(<Lesson08 />);

    // Initially should show StarterKit configuration
    await expect.element(page.getByRole('heading', { name: /📦 starterkit configuration/i })).toBeInTheDocument();

    // Switch to individual extensions
    const individualRadio = page.getByRole('radio', { name: /individual extensions \(custom\)/i });
    await userEvent.click(individualRadio);

    // Should show individual extensions
    await expect.element(page.getByRole('heading', { name: /🧩 individual extensions/i })).toBeInTheDocument();
    await expect.element(page.getByText(/using individually loaded extensions/i)).toBeInTheDocument();
  });

  it('renders editor with proper styling classes', async () => {
    await renderWithRouter(<Lesson08 />);
    const editorContainer = page.getByRole('textbox');
    await expect.element(editorContainer).toHaveClass('ProseMirror');
  });

  it('provides proper accessibility for interactive elements', async () => {
    await renderWithRouter(<Lesson08 />);

    // Radio buttons should be accessible
    await expect.element(page.getByRole('radio', { name: /starterkit \(default\)/i })).toBeInTheDocument();
    await expect.element(page.getByRole('radio', { name: /individual extensions \(custom\)/i })).toBeInTheDocument();

    // Editor should be accessible
    const editor = page.getByRole('textbox');
    await expect.element(editor).toBeInTheDocument();

    // Links should be accessible
    await expect.element(page.getByRole('link', { name: /previous lesson/i })).toBeInTheDocument();
  });

  it('displays proper heading structure', async () => {
    await renderWithRouter(<Lesson08 />);

    // Main heading
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect.element(mainHeading).toHaveTextContent(/lesson 08: starterkit extensions & configuration/i);
  });

  it('shows extension code samples', async () => {
    await renderWithRouter(<Lesson08 />);

    // Check for extension configuration code
    await expect.element(page.getByText(/extensions: \[StarterKit\.configure/i)).toBeInTheDocument();
  });
});
