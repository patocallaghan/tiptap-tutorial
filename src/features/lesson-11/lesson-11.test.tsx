import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson11 } from './lesson-11';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock console.log for testing
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

describe('Lesson 11: Advanced ProseMirror Integration', () => {
  afterEach(() => {
    consoleSpy.mockClear();
    alertSpy.mockClear();
  });

  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/lesson 11: advanced prosemirror integration/i)).toBeInTheDocument();
    expect(screen.getByText(/master direct prosemirror api integration/i)).toBeInTheDocument();
  });

  it('renders learning objectives', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/access and manipulate prosemirror schema/i)).toBeInTheDocument();
    expect(screen.getByText(/create custom prosemirror plugins/i)).toBeInTheDocument();
    expect(screen.getByText(/handle transactions with filters/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 1-10/i)).toBeInTheDocument();
    expect(screen.getByText(/deep understanding of tiptap architecture/i)).toBeInTheDocument();
  });

  it('renders todo section with implementation tasks', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/access prosemirror view and state/i)).toBeInTheDocument();
    expect(screen.getByText(/create custom schema modifications/i)).toBeInTheDocument();
    expect(screen.getByText(/implement transaction filters/i)).toBeInTheDocument();
  });

  it('renders advanced controls section', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/advanced controls/i)).toBeInTheDocument();
    expect(screen.getByText(/schema information/i)).toBeInTheDocument();
    expect(screen.getByText(/transaction info/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/tiptap editor - advanced prosemirror/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to advanced prosemirror integration/i)).toBeInTheDocument();
    expect(screen.getByText(/prosemirror schema customization/i)).toBeInTheDocument();
  });

  it('renders advanced toolbar with prosemirror controls', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/🔧 custom plugin \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/🎨 decorations \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/🔄 transaction filter \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/🧪 schema modification \(todo\)/i)).toBeInTheDocument();
  });

  it('renders debug information section', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/debug information/i)).toBeInTheDocument();
    expect(screen.getByText(/editor view:/i)).toBeInTheDocument();
    expect(screen.getByText(/current selection:/i)).toBeInTheDocument();
    expect(screen.getByText(/document size:/i)).toBeInTheDocument();
  });

  it('handles log schema button click', async () => {
    renderWithRouter(<Lesson11 />);
    
    // Wait a bit for editor to initialize
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const logSchemaButton = screen.getByText(/🏗️ log schema/i);
    fireEvent.click(logSchemaButton);
    
    expect(alertSpy).toHaveBeenCalledWith('Schema logged to console');
  });

  it('handles log state button click', async () => {
    renderWithRouter(<Lesson11 />);
    
    // Wait a bit for editor to initialize
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const logStateButton = screen.getByText(/📊 log state/i);
    fireEvent.click(logStateButton);
    
    expect(alertSpy).toHaveBeenCalledWith('State logged to console');
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for at least some key concept text
    const keyConceptsSection = screen.getByText(/💡 key concepts/i).closest('div');
    expect(keyConceptsSection).toHaveTextContent('ProseMirror Schema');
    expect(keyConceptsSection).toHaveTextContent('Transactions');
    expect(keyConceptsSection).toHaveTextContent('Plugins');
    expect(keyConceptsSection).toHaveTextContent('Decorations');
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson11 />);
    const prevLink = screen.getByRole('link', { name: /← previous lesson/i });
    const nextLink = screen.getByRole('link', { name: /next lesson →/i });
    
    expect(prevLink).toHaveAttribute('href', '/lesson-10');
    expect(nextLink).toHaveAttribute('href', '/lesson-12');
  });

  it('renders documentation link', () => {
    renderWithRouter(<Lesson11 />);
    const docLink = screen.getByRole('link', { name: /📖 view docs/i });
    expect(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/prosemirror');
    expect(docLink).toHaveAttribute('target', '_blank');
  });

  it('has disabled toolbar buttons indicating TODO implementation', () => {
    renderWithRouter(<Lesson11 />);
    const pluginButton = screen.getByRole('button', { name: /🔧 custom plugin \(todo\)/i });
    const decorationsButton = screen.getByRole('button', { name: /🎨 decorations \(todo\)/i });
    const transactionButton = screen.getByRole('button', { name: /🔄 transaction filter \(todo\)/i });
    const schemaButton = screen.getByRole('button', { name: /🧪 schema modification \(todo\)/i });
    
    expect(pluginButton).toBeDisabled();
    expect(decorationsButton).toBeDisabled();
    expect(transactionButton).toBeDisabled();
    expect(schemaButton).toBeDisabled();
  });

  it('renders content that explains prosemirror concepts', () => {
    renderWithRouter(<Lesson11 />);
    expect(screen.getByText(/transaction handling and filtering/i)).toBeInTheDocument();
    expect(screen.getByText(/custom plugins and decorations/i)).toBeInTheDocument();
    expect(screen.getByText(/direct view manipulation/i)).toBeInTheDocument();
  });

  it('logs prosemirror view and state on editor creation', async () => {
    renderWithRouter(<Lesson11 />);
    
    // Wait for editor to be created
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(consoleSpy).toHaveBeenCalledWith('ProseMirror view:', expect.any(Object));
    expect(consoleSpy).toHaveBeenCalledWith('ProseMirror state:', expect.any(Object));
  });
});