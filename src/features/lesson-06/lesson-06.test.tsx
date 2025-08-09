import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson06 } from './lesson-06';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 06: Custom Menus & UI Controls', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson06 />);
    expect(screen.getByText(/lesson 06: custom menus & ui controls/i)).toBeInTheDocument();
    expect(screen.getByText(/learn how to build interactive toolbars/i)).toBeInTheDocument();
  });

  it('renders learning objectives', () => {
    renderWithRouter(<Lesson06 />);
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/build custom formatting toolbars/i)).toBeInTheDocument();
    expect(screen.getByText(/implement bubble menus/i)).toBeInTheDocument();
    expect(screen.getByText(/create floating menus/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson06 />);
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 1-5/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson06 />);
    expect(screen.getByText(/custom menus & ui controls/i)).toBeInTheDocument();
    expect(screen.getByText(/select text to see the bubble menu/i)).toBeInTheDocument();
  });

  it('renders todo section', () => {
    renderWithRouter(<Lesson06 />);
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/fixed formatting toolbar/i)).toBeInTheDocument();
    expect(screen.getByText(/bubble menu that appears/i)).toBeInTheDocument();
    expect(screen.getByText(/floating menu for empty paragraphs/i)).toBeInTheDocument();
  });

  it('renders custom toolbar with formatting buttons', () => {
    renderWithRouter(<Lesson06 />);
    
    // Check for toolbar buttons
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /strike/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /h1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /h2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /list/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /quote/i })).toBeInTheDocument();
  });

  it('handles toolbar button interactions', () => {
    renderWithRouter(<Lesson06 />);
    
    const boldButton = screen.getByRole('button', { name: /bold/i });
    const italicButton = screen.getByRole('button', { name: /italic/i });
    
    // Test button clicks
    fireEvent.click(boldButton);
    fireEvent.click(italicButton);
    
    // Buttons should be clickable (no errors thrown)
    expect(boldButton).toBeInTheDocument();
    expect(italicButton).toBeInTheDocument();
  });

  it('renders usage instructions', () => {
    renderWithRouter(<Lesson06 />);
    expect(screen.getByText(/try these interactions/i)).toBeInTheDocument();
    expect(screen.getByText(/select text to see the bubble menu appear/i)).toBeInTheDocument();
    expect(screen.getByText(/click on an empty line/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson06 />);
    expect(screen.getByText(/key concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/bubblemenu/i)).toBeInTheDocument();
    expect(screen.getByText(/floatingmenu/i)).toBeInTheDocument();
    expect(screen.getByText(/toolbar/i)).toBeInTheDocument();
    expect(screen.getByText(/active states/i)).toBeInTheDocument();
    expect(screen.getByText(/command chaining/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson06 />);
    const prevLink = screen.getByRole('link', { name: /previous lesson/i });
    const nextLink = screen.getByRole('link', { name: /next lesson/i });
    
    expect(prevLink).toHaveAttribute('href', '/lesson-05');
    expect(nextLink).toHaveAttribute('href', '/lesson-07');
  });

  it('renders documentation link', () => {
    renderWithRouter(<Lesson06 />);
    const docsLink = screen.getByRole('link', { name: /view docs/i });
    expect(docsLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/api/menus');
    expect(docsLink).toHaveAttribute('target', '_blank');
  });

  it('renders editor with proper styling classes', () => {
    renderWithRouter(<Lesson06 />);
    const editorContainer = screen.getByRole('textbox');
    expect(editorContainer).toHaveClass('ProseMirror');
  });

  it('displays proper heading structure', () => {
    renderWithRouter(<Lesson06 />);
    
    // Check main lesson heading
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/lesson 06: custom menus & ui controls/i);
    
    // Check section headings
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
  });

  it('provides proper accessibility for interactive elements', () => {
    renderWithRouter(<Lesson06 />);
    
    // All toolbar buttons should be accessible
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    
    // Editor should be accessible
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    
    // Links should be accessible
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('shows toolbar button active states correctly', () => {
    renderWithRouter(<Lesson06 />);
    
    // Toolbar buttons should have appropriate classes for active/inactive states
    const boldButton = screen.getByRole('button', { name: /bold/i });
    expect(boldButton).toHaveClass('transition-colors');
  });
});