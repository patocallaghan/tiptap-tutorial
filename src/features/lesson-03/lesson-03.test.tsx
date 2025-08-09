import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson03 } from './lesson-03';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 03: Commands & Node Positions', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByText(/lesson 03: commands & node positions/i)).toBeInTheDocument();
    expect(screen.getByText(/master tiptap's command system/i)).toBeInTheDocument();
  });

  it('renders learning objectives section', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByText(/🎯 learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/understand tiptap's command system/i)).toBeInTheDocument();
    expect(screen.getByText(/learn about node positions/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByText(/⚠️ prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 01 and 02/i)).toBeInTheDocument();
  });

  it('renders editor with structured content', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByText(/commands & node positions/i)).toBeInTheDocument();
    expect(screen.getByText(/click anywhere in this text/i)).toBeInTheDocument();
    expect(screen.getByText(/first item in a list/i)).toBeInTheDocument();
  });

  it('renders todo section', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByText(/📝 todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/add selection change listener/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByText(/💡 key concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/commands/i)).toBeInTheDocument();
    expect(screen.getByText(/command chaining/i)).toBeInTheDocument();
    expect(screen.getByText(/node positions/i)).toBeInTheDocument();
  });

  it('renders command control buttons', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByRole('button', { name: /test basic commands/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /test node commands/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze position/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /insert at position/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /replace with node/i })).toBeInTheDocument();
  });

  it('renders selection and command result displays', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByText(/selection & position info/i)).toBeInTheDocument();
    expect(screen.getByText(/command results/i)).toBeInTheDocument();
    expect(screen.getByText(/click in the editor to see selection information/i)).toBeInTheDocument();
    expect(screen.getByText(/execute commands to see results/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson03 />);
    expect(screen.getByRole('link', { name: /← previous lesson/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next lesson →/i })).toBeInTheDocument();
  });

  it('includes link to documentation', () => {
    renderWithRouter(<Lesson03 />);
    const docLink = screen.getByRole('link', { name: /📖 view docs/i });
    expect(docLink).toBeInTheDocument();
    expect(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/commands');
    expect(docLink).toHaveAttribute('target', '_blank');
  });
});