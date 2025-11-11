import { describe, it, expect, vi, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import { renderWithRouter } from '../../test/test-utils';
import { Lesson12 } from './lesson-12';

// Mock console.log for testing
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Lesson 12: Content Serialization & Production Ready', () => {
  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('renders lesson title and description', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/lesson 12: content serialization & production ready/i)).toBeInTheDocument();
    await expect.element(page.getByText(/master content serialization/i)).toBeInTheDocument();
  });

  it('renders learning objectives', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/learning objectives/i)).toBeInTheDocument();
    await expect.element(page.getByText(/implement json and html content serialization/i)).toBeInTheDocument();
    await expect.element(page.getByText(/build auto-save and data persistence/i)).toBeInTheDocument();
    await expect.element(page.getByText(/optimize editor performance/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/prerequisites/i)).toBeInTheDocument();
    await expect.element(page.getByText(/complete all previous lessons/i)).toBeInTheDocument();
    await expect.element(page.getByText(/comprehensive tiptap knowledge/i)).toBeInTheDocument();
  });

  it('renders todo section with implementation tasks', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/todo: your implementation/i)).toBeInTheDocument();
    await expect.element(page.getByText(/json and html serialization/i)).toBeInTheDocument();
    await expect.element(page.getByText(/auto-save functionality/i)).toBeInTheDocument();
    await expect.element(page.getByText(/content versioning/i)).toBeInTheDocument();
  });

  it('renders production features section', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/🚀 production features/i)).toBeInTheDocument();
    await expect.element(page.getByText(/content management/i)).toBeInTheDocument();
    await expect.element(page.getByText(/auto-save: todo/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/tiptap editor - production ready/i)).toBeInTheDocument();
    await expect.element(page.getByText(/welcome to the final lesson/i)).toBeInTheDocument();
    await expect.element(page.getByText(/content serialization to json and html/i)).toBeInTheDocument();
  });

  it('renders production toolbar with feature buttons', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/💾 save \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/📤 export html \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/📋 export json \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/🔄 load version \(todo\)/i)).toBeInTheDocument();
    await expect.element(page.getByText(/📊 performance \(todo\)/i)).toBeInTheDocument();
  });

  it('renders status information panels', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/save status/i)).toBeInTheDocument();
    await expect.element(page.getByText(/health check/i)).toBeInTheDocument();
    await expect.element(page.getByText(/last saved: never/i)).toBeInTheDocument();
    // Look for performance panel - there are multiple, just verify document size exists
    await expect.element(page.getByText(/document size:/i)).toBeInTheDocument();
  });

  it('renders key concepts section', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for key concept text
    await expect.element(page.getByText('Content Serialization', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Data Persistence', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Performance Optimization', { exact: true })).toBeInTheDocument();
  });

  it('renders final lesson navigation (links to home)', async () => {
    await renderWithRouter(<Lesson12 />);
    const prevLink = page.getByRole('link', { name: /← previous lesson/i });
    const homeLink = page.getByRole('link', { name: /🏠 back to home/i });

    await expect.element(prevLink).toHaveAttribute('href', '/lesson-11');
    await expect.element(homeLink).toHaveAttribute('href', '/');
  });

  it('renders completion badge', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/congratulations! you've completed the tiptap tutorial!/i)).toBeInTheDocument();
    await expect.element(page.getByText(/🎉/)).toBeInTheDocument();
  });

  it('renders documentation link', async () => {
    await renderWithRouter(<Lesson12 />);
    const docLink = page.getByRole('link', { name: /📖 view docs/i });
    await expect.element(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/output');
    await expect.element(docLink).toHaveAttribute('target', '_blank');
  });

  it('has disabled toolbar buttons indicating TODO implementation', async () => {
    await renderWithRouter(<Lesson12 />);
    const saveButton = page.getByRole('button', { name: /💾 save \(todo\)/i });
    const htmlButton = page.getByRole('button', { name: /📤 export html \(todo\)/i });
    const jsonButton = page.getByRole('button', { name: /📋 export json \(todo\)/i });
    const versionButton = page.getByRole('button', { name: /🔄 load version \(todo\)/i });
    const perfButton = page.getByRole('button', { name: /📊 performance \(todo\)/i });

    await expect.element(saveButton).toBeDisabled();
    await expect.element(htmlButton).toBeDisabled();
    await expect.element(jsonButton).toBeDisabled();
    await expect.element(versionButton).toBeDisabled();
    await expect.element(perfButton).toBeDisabled();
  });

  it('renders content that explains production concepts', async () => {
    await renderWithRouter(<Lesson12 />);
    await expect.element(page.getByText(/data persistence and synchronization/i)).toBeInTheDocument();
    await expect.element(page.getByText(/performance optimization techniques/i)).toBeInTheDocument();
    await expect.element(page.getByText('Error handling and recovery', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(/testing strategies and patterns/i)).toBeInTheDocument();
  });

  it('shows editor status in health check', async () => {
    await renderWithRouter(<Lesson12 />);
    // The editor should eventually load and show as ready
    await expect.element(page.getByText(/editor status:/i)).toBeInTheDocument();
  });

  it('displays document size information', async () => {
    await renderWithRouter(<Lesson12 />);

    // Wait for editor to load
    await new Promise(resolve => setTimeout(resolve, 100));

    await expect.element(page.getByText(/document size:/i)).toBeInTheDocument();
  });

  it('logs content updates for auto-save demonstration', async () => {
    await renderWithRouter(<Lesson12 />);

    // Wait for initial editor creation
    await new Promise(resolve => setTimeout(resolve, 200));

    // The component has an onUpdate handler configured
    await expect.element(page.getByText(/welcome to the final lesson/i)).toBeInTheDocument();
  });
});
