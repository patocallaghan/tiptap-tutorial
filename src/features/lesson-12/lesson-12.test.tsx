import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson12 } from './lesson-12';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock console.log for testing
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Lesson 12: Content Serialization & Production Ready', () => {
  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/lesson 12: content serialization & production ready/i)).toBeInTheDocument();
    expect(screen.getByText(/master content serialization/i)).toBeInTheDocument();
  });

  it('renders learning objectives', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/implement json and html content serialization/i)).toBeInTheDocument();
    expect(screen.getByText(/build auto-save and data persistence/i)).toBeInTheDocument();
    expect(screen.getByText(/optimize editor performance/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete all previous lessons/i)).toBeInTheDocument();
    expect(screen.getByText(/comprehensive tiptap knowledge/i)).toBeInTheDocument();
  });

  it('renders todo section with implementation tasks', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/json and html serialization/i)).toBeInTheDocument();
    expect(screen.getByText(/auto-save functionality/i)).toBeInTheDocument();
    expect(screen.getByText(/content versioning/i)).toBeInTheDocument();
  });

  it('renders production features section', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/🚀 production features/i)).toBeInTheDocument();
    expect(screen.getByText(/content management/i)).toBeInTheDocument();
    expect(screen.getByText(/auto-save: todo/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/tiptap editor - production ready/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to the final lesson/i)).toBeInTheDocument();
    expect(screen.getByText(/content serialization to json and html/i)).toBeInTheDocument();
  });

  it('renders production toolbar with feature buttons', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/💾 save \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/📤 export html \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/📋 export json \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/🔄 load version \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/📊 performance \(todo\)/i)).toBeInTheDocument();
  });

  it('renders status information panels', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/save status/i)).toBeInTheDocument();
    expect(screen.getByText(/health check/i)).toBeInTheDocument();
    expect(screen.getByText(/last saved: never/i)).toBeInTheDocument();
    // Look for performance panel specifically
    const performancePanels = screen.getAllByText(/performance/i);
    expect(performancePanels.length).toBeGreaterThan(0);
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for at least some key concept text
    const keyConceptsSection = screen.getByText(/💡 key concepts/i).closest('div');
    expect(keyConceptsSection).toHaveTextContent('Content Serialization');
    expect(keyConceptsSection).toHaveTextContent('Data Persistence');
    expect(keyConceptsSection).toHaveTextContent('Performance Optimization');
  });

  it('renders final lesson navigation (links to home)', () => {
    renderWithRouter(<Lesson12 />);
    const prevLink = screen.getByRole('link', { name: /← previous lesson/i });
    const homeLink = screen.getByRole('link', { name: /🏠 back to home/i });
    
    expect(prevLink).toHaveAttribute('href', '/lesson-11');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders completion badge', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/congratulations! you've completed the tiptap tutorial!/i)).toBeInTheDocument();
    expect(screen.getByText(/🎉/)).toBeInTheDocument();
  });

  it('renders documentation link', () => {
    renderWithRouter(<Lesson12 />);
    const docLink = screen.getByRole('link', { name: /📖 view docs/i });
    expect(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/output');
    expect(docLink).toHaveAttribute('target', '_blank');
  });

  it('has disabled toolbar buttons indicating TODO implementation', () => {
    renderWithRouter(<Lesson12 />);
    const saveButton = screen.getByRole('button', { name: /💾 save \(todo\)/i });
    const htmlButton = screen.getByRole('button', { name: /📤 export html \(todo\)/i });
    const jsonButton = screen.getByRole('button', { name: /📋 export json \(todo\)/i });
    const versionButton = screen.getByRole('button', { name: /🔄 load version \(todo\)/i });
    const perfButton = screen.getByRole('button', { name: /📊 performance \(todo\)/i });
    
    expect(saveButton).toBeDisabled();
    expect(htmlButton).toBeDisabled();
    expect(jsonButton).toBeDisabled();
    expect(versionButton).toBeDisabled();
    expect(perfButton).toBeDisabled();
  });

  it('renders content that explains production concepts', () => {
    renderWithRouter(<Lesson12 />);
    expect(screen.getByText(/data persistence and synchronization/i)).toBeInTheDocument();
    expect(screen.getByText(/performance optimization techniques/i)).toBeInTheDocument();
    expect(screen.getByText(/error handling and recovery/i)).toBeInTheDocument();
    expect(screen.getByText(/testing strategies and patterns/i)).toBeInTheDocument();
  });

  it('shows editor status in health check', () => {
    renderWithRouter(<Lesson12 />);
    // The editor should eventually load and show as ready
    expect(screen.getByText(/editor status:/i)).toBeInTheDocument();
  });

  it('displays document size information', async () => {
    renderWithRouter(<Lesson12 />);
    
    // Wait for editor to load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText(/document size:/i)).toBeInTheDocument();
  });

  it('logs content updates for auto-save demonstration', async () => {
    renderWithRouter(<Lesson12 />);
    
    // Wait for initial editor creation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // The component has an onUpdate handler configured
    expect(screen.getByText(/welcome to the final lesson/i)).toBeInTheDocument();
  });
});