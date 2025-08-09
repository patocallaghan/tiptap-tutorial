import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson02 } from './lesson-02';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 02: Content & Document Structure', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByText(/lesson 02: content & document structure/i)).toBeInTheDocument();
    expect(screen.getByText(/understand prosemirror's document model/i)).toBeInTheDocument();
  });

  it('renders learning objectives section', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByText(/🎯 learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/understand the prosemirror document model/i)).toBeInTheDocument();
    expect(screen.getByText(/explore the editor schema/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByText(/⚠️ prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lesson 01/i)).toBeInTheDocument();
  });

  it('renders editor with structured content', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByText(/document structure/i)).toBeInTheDocument();
    expect(screen.getByText(/this is a paragraph with/i)).toBeInTheDocument();
    expect(screen.getByText(/first list item/i)).toBeInTheDocument();
  });

  it('renders todo section', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByText(/📝 todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/add transaction listener to monitor document changes/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByText(/💡 key concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/document model/i)).toBeInTheDocument();
    expect(screen.getByText(/nodes/i)).toBeInTheDocument();
    expect(screen.getByText(/marks/i)).toBeInTheDocument();
  });

  it('renders schema exploration controls', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByRole('button', { name: /explore schema/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /validate content/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('renders document json structure display', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByText(/document json structure/i)).toBeInTheDocument();
    expect(screen.getByText(/edit the content above to see the document structure/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson02 />);
    expect(screen.getByRole('link', { name: /← previous lesson/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next lesson →/i })).toBeInTheDocument();
  });

  it('includes link to documentation', () => {
    renderWithRouter(<Lesson02 />);
    const docLink = screen.getByRole('link', { name: /📖 view docs/i });
    expect(docLink).toBeInTheDocument();
    expect(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/prosemirror');
    expect(docLink).toHaveAttribute('target', '_blank');
  });
});