import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson08 } from './lesson-08';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 08: StarterKit Extensions & Configuration', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/lesson 08: starterkit extensions & configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/learn how to configure starterkit extensions/i)).toBeInTheDocument();
  });

  it('renders learning objectives', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/understand starterkit's included extensions/i)).toBeInTheDocument();
    expect(screen.getByText(/configure individual extensions/i)).toBeInTheDocument();
    expect(screen.getByText(/load extensions individually/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 1-7/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/starterkit extensions & configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/the starterkit provides a comprehensive set/i)).toBeInTheDocument();
  });

  it('renders todo section', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/custom starterkit configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/individual extension loading/i)).toBeInTheDocument();
    expect(screen.getByText(/performance optimization/i)).toBeInTheDocument();
  });

  it('renders configuration toggle controls', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/configuration comparison/i)).toBeInTheDocument();
    
    const starterKitRadio = screen.getByRole('radio', { name: /starterkit \(default\)/i });
    const individualRadio = screen.getByRole('radio', { name: /individual extensions \(custom\)/i });
    
    expect(starterKitRadio).toBeInTheDocument();
    expect(individualRadio).toBeInTheDocument();
    expect(starterKitRadio).toBeChecked();
  });

  it('handles configuration toggle functionality', () => {
    renderWithRouter(<Lesson08 />);
    
    const starterKitRadio = screen.getByRole('radio', { name: /starterkit \(default\)/i });
    const individualRadio = screen.getByRole('radio', { name: /individual extensions \(custom\)/i });
    
    // Initially StarterKit should be selected
    expect(starterKitRadio).toBeChecked();
    expect(individualRadio).not.toBeChecked();
    
    // Click individual extensions radio
    fireEvent.click(individualRadio);
    
    expect(individualRadio).toBeChecked();
    expect(starterKitRadio).not.toBeChecked();
  });

  it('renders extension overview section', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/starterkit extensions/i)).toBeInTheDocument();
    
    // Check for extension categories
    expect(screen.getByText(/text & formatting/i)).toBeInTheDocument();
    expect(screen.getByText(/structure & elements/i)).toBeInTheDocument();
    
    // Check for specific extensions
    expect(screen.getByText(/document/i)).toBeInTheDocument();
    expect(screen.getByText(/paragraph/i)).toBeInTheDocument();
    expect(screen.getByText(/bold/i)).toBeInTheDocument();
    expect(screen.getByText(/heading/i)).toBeInTheDocument();
  });

  it('displays current configuration information', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/starterkit configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/using starterkit with configured extension options/i)).toBeInTheDocument();
  });

  it('renders performance considerations section', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/performance considerations/i)).toBeInTheDocument();
    expect(screen.getByText(/convenient but includes all extensions/i)).toBeInTheDocument();
    expect(screen.getByText(/more control and smaller bundle size/i)).toBeInTheDocument();
    expect(screen.getByText(/tree shaking/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson08 />);
    expect(screen.getByText(/key concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/starterkit/i)).toBeInTheDocument();
    expect(screen.getByText(/extension configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/individual loading/i)).toBeInTheDocument();
    expect(screen.getByText(/bundle optimization/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson08 />);
    const prevLink = screen.getByRole('link', { name: /previous lesson/i });
    const nextLink = screen.getByRole('link', { name: /next lesson/i });
    
    expect(prevLink).toHaveAttribute('href', '/lesson-07');
    expect(nextLink).toHaveAttribute('href', '/lesson-09');
  });

  it('renders documentation link', () => {
    renderWithRouter(<Lesson08 />);
    const docsLink = screen.getByRole('link', { name: /view docs/i });
    expect(docsLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/extensions/functionality/starterkit');
    expect(docsLink).toHaveAttribute('target', '_blank');
  });

  it('updates editor header based on configuration', () => {
    renderWithRouter(<Lesson08 />);
    
    // Initially should show StarterKit default
    expect(screen.getByText(/starterkit default/i)).toBeInTheDocument();
    
    // Switch to custom configuration
    const individualRadio = screen.getByRole('radio', { name: /individual extensions \(custom\)/i });
    fireEvent.click(individualRadio);
    
    // Should now show Custom Configuration
    expect(screen.getByText(/custom configuration/i)).toBeInTheDocument();
  });

  it('shows code examples for different configurations', () => {
    renderWithRouter(<Lesson08 />);
    
    // Check for code snippets
    expect(screen.getByText(/extensions: \[StarterKit\.configure/i)).toBeInTheDocument();
  });

  it('updates configuration display when toggling', () => {
    renderWithRouter(<Lesson08 />);
    
    // Initially should show StarterKit configuration
    expect(screen.getByText(/starterkit configuration/i)).toBeInTheDocument();
    
    // Switch to individual extensions
    const individualRadio = screen.getByRole('radio', { name: /individual extensions \(custom\)/i });
    fireEvent.click(individualRadio);
    
    // Should show individual extensions
    expect(screen.getByText(/individual extensions/i)).toBeInTheDocument();
    expect(screen.getByText(/using individually loaded extensions/i)).toBeInTheDocument();
  });

  it('renders editor with proper styling classes', () => {
    renderWithRouter(<Lesson08 />);
    const editorContainer = screen.getByRole('textbox');
    expect(editorContainer).toHaveClass('ProseMirror');
  });

  it('provides proper accessibility for interactive elements', () => {
    renderWithRouter(<Lesson08 />);
    
    // Radio buttons should be accessible
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(2);
    
    // Editor should be accessible
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    
    // Links should be accessible
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('displays proper heading structure', () => {
    renderWithRouter(<Lesson08 />);
    
    // Main heading
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/lesson 08: starterkit extensions & configuration/i);
  });

  it('shows extension code samples', () => {
    renderWithRouter(<Lesson08 />);
    
    // Check for extension name code snippets
    const codeElements = screen.getAllByText(/Document|Paragraph|Text|Bold/, { selector: 'code' });
    expect(codeElements.length).toBeGreaterThan(0);
  });
});