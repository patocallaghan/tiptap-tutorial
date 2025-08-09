import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson01 } from './lesson-01';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 01: Basic Editor Setup', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson01 />);
    expect(screen.getByText(/lesson 01: basic editor setup/i)).toBeInTheDocument();
    expect(screen.getByText(/learn the fundamentals of setting up a tiptap editor/i)).toBeInTheDocument();
  });

  it('renders learning objectives section', () => {
    renderWithRouter(<Lesson01 />);
    expect(screen.getByText(/🎯 learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/understand how to initialize a tiptap editor/i)).toBeInTheDocument();
    expect(screen.getByText(/configure the starterkit extension/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson01 />);
    expect(screen.getByText(/welcome to tiptap!/i)).toBeInTheDocument();
  });

  it('renders todo section', () => {
    renderWithRouter(<Lesson01 />);
    expect(screen.getByText(/📝 todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/add a placeholder to the editor configuration/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson01 />);
    expect(screen.getByText(/💡 key concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/useeditor hook/i)).toBeInTheDocument();
    expect(screen.getByText(/starterkit/i)).toBeInTheDocument();
  });

  it('renders editor controls', () => {
    renderWithRouter(<Lesson01 />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /focus/i })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson01 />);
    expect(screen.getByRole('link', { name: /← home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next lesson →/i })).toBeInTheDocument();
  });

  it('includes link to documentation', () => {
    renderWithRouter(<Lesson01 />);
    const docLink = screen.getByRole('link', { name: /📖 view docs/i });
    expect(docLink).toBeInTheDocument();
    expect(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/introduction');
    expect(docLink).toHaveAttribute('target', '_blank');
  });
});