import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson09 } from './lesson-09';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 09: Custom Marks Development', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson09 />);
    expect(screen.getByText(/lesson 09: custom marks development/i)).toBeInTheDocument();
    expect(screen.getByText(/learn to create custom marks/i)).toBeInTheDocument();
  });

  it('renders learning objectives', () => {
    renderWithRouter(<Lesson09 />);
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/create a custom highlight mark/i)).toBeInTheDocument();
    expect(screen.getByText(/build an annotation system/i)).toBeInTheDocument();
    expect(screen.getByText(/implement keyboard shortcuts/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson09 />);
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 1-8/i)).toBeInTheDocument();
  });

  it('renders todo section with implementation tasks', () => {
    renderWithRouter(<Lesson09 />);
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/create a highlight mark/i)).toBeInTheDocument();
    expect(screen.getByText(/build an annotation mark/i)).toBeInTheDocument();
    expect(screen.getByText(/implement an underline mark/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson09 />);
    expect(screen.getByText(/tiptap editor - custom marks/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to custom marks development/i)).toBeInTheDocument();
  });

  it('renders custom toolbar with mark buttons', () => {
    renderWithRouter(<Lesson09 />);
    expect(screen.getByText(/🖍️ highlight \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/💬 annotate \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/📑 underline \(todo\)/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson09 />);
    expect(screen.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for at least some key concept text
    const keyConceptsSection = screen.getByText(/💡 key concepts/i).closest('div');
    expect(keyConceptsSection).toHaveTextContent('Mark Extensions');
    expect(keyConceptsSection).toHaveTextContent('Mark Attributes');
    expect(keyConceptsSection).toHaveTextContent('Mark Parsing');
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson09 />);
    const prevLink = screen.getByRole('link', { name: /← previous lesson/i });
    const nextLink = screen.getByRole('link', { name: /next lesson →/i });
    
    expect(prevLink).toHaveAttribute('href', '/lesson-08');
    expect(nextLink).toHaveAttribute('href', '/lesson-10');
  });

  it('renders documentation link', () => {
    renderWithRouter(<Lesson09 />);
    const docLink = screen.getByRole('link', { name: /📖 view docs/i });
    expect(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/custom-extensions#marks');
    expect(docLink).toHaveAttribute('target', '_blank');
  });

  it('has disabled toolbar buttons indicating TODO implementation', () => {
    renderWithRouter(<Lesson09 />);
    const highlightButton = screen.getByRole('button', { name: /🖍️ highlight \(todo\)/i });
    const annotateButton = screen.getByRole('button', { name: /💬 annotate \(todo\)/i });
    const underlineButton = screen.getByRole('button', { name: /📑 underline \(todo\)/i });
    
    expect(highlightButton).toBeDisabled();
    expect(annotateButton).toBeDisabled();
    expect(underlineButton).toBeDisabled();
  });

  it('renders content that explains custom marks', () => {
    renderWithRouter(<Lesson09 />);
    expect(screen.getByText(/try implementing the following custom marks/i)).toBeInTheDocument();
    expect(screen.getByText(/highlight mark for text highlighting/i)).toBeInTheDocument();
    expect(screen.getByText(/annotation mark for adding comments/i)).toBeInTheDocument();
  });
});