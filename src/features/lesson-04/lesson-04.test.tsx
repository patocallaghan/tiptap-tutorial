import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson04 } from './lesson-04';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 04: Input Rules & Paste Rules', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByText(/lesson 04: input rules & paste rules/i)).toBeInTheDocument();
    expect(screen.getByText(/learn to create auto-formatting rules/i)).toBeInTheDocument();
  });

  it('renders learning objectives section', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByText(/🎯 learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/understand input rules for markdown-style shortcuts/i)).toBeInTheDocument();
    expect(screen.getByText(/implement paste rules for content transformation/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByText(/⚠️ prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 01, 02, and 03/i)).toBeInTheDocument();
  });

  it('renders editor with instructional content', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByText(/input rules & paste rules demo/i)).toBeInTheDocument();
    expect(screen.getByText(/try these markdown-style shortcuts/i)).toBeInTheDocument();
    expect(screen.getByText(/try pasting different content types/i)).toBeInTheDocument();
  });

  it('renders todo section', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByText(/📝 todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/create custom input rules for markdown-style formatting/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByText(/💡 key concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/input rules/i)).toBeInTheDocument();
    expect(screen.getByText(/paste rules/i)).toBeInTheDocument();
    expect(screen.getByText(/auto-formatting/i)).toBeInTheDocument();
  });

  it('renders rule control buttons', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByRole('button', { name: /test input rules/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /insert sample content/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear & reset/i })).toBeInTheDocument();
  });

  it('renders activity tracking displays', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByText(/input rule activity/i)).toBeInTheDocument();
    expect(screen.getByText(/paste events/i)).toBeInTheDocument();
    expect(screen.getByText(/type markdown shortcuts to see input rule activity/i)).toBeInTheDocument();
    expect(screen.getByText(/paste content to see paste rule activity/i)).toBeInTheDocument();
  });

  it('renders quick reference guide', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByText(/📋 quick reference/i)).toBeInTheDocument();
    expect(screen.getByText(/input shortcuts:/i)).toBeInTheDocument();
    expect(screen.getByText(/more shortcuts:/i)).toBeInTheDocument();
    expect(screen.getByText(/→ heading 1/i)).toBeInTheDocument();
    expect(screen.getByText(/→ bold/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson04 />);
    expect(screen.getByRole('link', { name: /← previous lesson/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next lesson →/i })).toBeInTheDocument();
  });

  it('includes link to documentation', () => {
    renderWithRouter(<Lesson04 />);
    const docLink = screen.getByRole('link', { name: /📖 view docs/i });
    expect(docLink).toBeInTheDocument();
    expect(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/extensions/functionality/typography');
    expect(docLink).toHaveAttribute('target', '_blank');
  });
});