import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson07 } from './lesson-07';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 07: Suggestion System & Typeahead', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson07 />);
    expect(screen.getByText(/lesson 07: suggestion system & typeahead/i)).toBeInTheDocument();
    expect(screen.getByText(/learn how to implement advanced input features/i)).toBeInTheDocument();
  });

  it('renders learning objectives', () => {
    renderWithRouter(<Lesson07 />);
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/implement @mention system/i)).toBeInTheDocument();
    expect(screen.getByText(/create slash commands menu/i)).toBeInTheDocument();
    expect(screen.getByText(/build autocomplete functionality/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson07 />);
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 1-6/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson07 />);
    expect(screen.getByText(/suggestion system & typeahead/i)).toBeInTheDocument();
    expect(screen.getByText(/try typing @ followed by a name/i)).toBeInTheDocument();
  });

  it('renders todo section', () => {
    renderWithRouter(<Lesson07 />);
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/enhanced @mention system/i)).toBeInTheDocument();
    expect(screen.getByText(/slash commands menu/i)).toBeInTheDocument();
    expect(screen.getByText(/autocomplete with fuzzy search/i)).toBeInTheDocument();
  });

  it('renders interactive demo section', () => {
    renderWithRouter(<Lesson07 />);
    expect(screen.getByText(/interactive demo/i)).toBeInTheDocument();
    expect(screen.getByText(/type @ followed by a name/i)).toBeInTheDocument();
    expect(screen.getByText(/use arrow keys to navigate/i)).toBeInTheDocument();
  });

  it('renders implementation status section', () => {
    renderWithRouter(<Lesson07 />);
    expect(screen.getByText(/current implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/@mention system with typeahead/i)).toBeInTheDocument();
    expect(screen.getByText(/keyboard navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/todo implementation/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson07 />);
    expect(screen.getByText(/key concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/mentions/i)).toBeInTheDocument();
    expect(screen.getByText(/slash commands/i)).toBeInTheDocument();
    expect(screen.getByText(/typeahead/i)).toBeInTheDocument();
    expect(screen.getByText(/suggestion rendering/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson07 />);
    const prevLink = screen.getByRole('link', { name: /previous lesson/i });
    const nextLink = screen.getByRole('link', { name: /next lesson/i });
    
    expect(prevLink).toHaveAttribute('href', '/lesson-06');
    expect(nextLink).toHaveAttribute('href', '/lesson-08');
  });

  it('renders documentation link', () => {
    renderWithRouter(<Lesson07 />);
    const docsLink = screen.getByRole('link', { name: /view docs/i });
    expect(docsLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/extensions/functionality/mention');
    expect(docsLink).toHaveAttribute('target', '_blank');
  });

  it('renders editor with proper styling classes', () => {
    renderWithRouter(<Lesson07 />);
    const editorContainer = screen.getByRole('textbox');
    expect(editorContainer).toHaveClass('ProseMirror');
  });

  it('displays code examples in demo section', () => {
    renderWithRouter(<Lesson07 />);
    
    // Check for inline code examples
    const codeElements = screen.getAllByText(/@/, { selector: 'code' });
    expect(codeElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText(/@j/, { selector: 'code' })).toBeInTheDocument();
    expect(screen.getByText(/@al/, { selector: 'code' })).toBeInTheDocument();
  });

  it('provides proper accessibility for interactive elements', () => {
    renderWithRouter(<Lesson07 />);
    
    // Editor should be accessible
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    
    // Links should be accessible
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('shows proper heading structure', () => {
    renderWithRouter(<Lesson07 />);
    
    // Main heading
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/lesson 07: suggestion system & typeahead/i);
    
    // Section headings should be present
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
  });

  it('renders demo instructions with proper formatting', () => {
    renderWithRouter(<Lesson07 />);
    
    // Check for gradient background styling
    const demoSection = screen.getByText(/interactive demo/i).closest('div');
    expect(demoSection).toHaveClass('bg-gradient-to-r');
    
    // Check for status sections
    expect(screen.getByText(/current implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/todo implementation/i)).toBeInTheDocument();
  });

  it('mentions the mention extension is configured', () => {
    // This test verifies the component renders without errors,
    // which implies the Mention extension is properly configured
    renderWithRouter(<Lesson07 />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles editor interaction without errors', () => {
    renderWithRouter(<Lesson07 />);
    
    const editorContent = screen.getByRole('textbox');
    
    // Test basic interaction doesn't throw errors
    fireEvent.focus(editorContent);
    fireEvent.blur(editorContent);
    
    expect(editorContent).toBeInTheDocument();
  });
});