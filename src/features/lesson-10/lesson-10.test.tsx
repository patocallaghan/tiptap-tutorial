import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson10 } from './lesson-10';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 10: Custom Nodes Development', () => {
  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/lesson 10: custom nodes development/i)).toBeInTheDocument();
    expect(screen.getByText(/master custom node creation/i)).toBeInTheDocument();
  });

  it('renders learning objectives', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/create custom block nodes/i)).toBeInTheDocument();
    expect(screen.getByText(/implement node views/i)).toBeInTheDocument();
    expect(screen.getByText(/build card components/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 1-9/i)).toBeInTheDocument();
    expect(screen.getByText(/understanding of custom marks/i)).toBeInTheDocument();
  });

  it('renders todo section with implementation tasks', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/create a card node/i)).toBeInTheDocument();
    expect(screen.getByText(/build an interactive button node/i)).toBeInTheDocument();
    expect(screen.getByText(/implement a code block node/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/tiptap editor - custom nodes/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to custom node development/i)).toBeInTheDocument();
    expect(screen.getByText(/interactive card components/i)).toBeInTheDocument();
  });

  it('renders custom toolbar with node insertion buttons', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/📋 insert card \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/🔘 insert button \(todo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/💻 code block \(todo\)/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/💡 key concepts/i)).toBeInTheDocument();
    // Check for at least some key concept text
    const keyConceptsSection = screen.getByText(/💡 key concepts/i).closest('div');
    expect(keyConceptsSection).toHaveTextContent('Custom Nodes');
    expect(keyConceptsSection).toHaveTextContent('Node Views');
    expect(keyConceptsSection).toHaveTextContent('Node Attributes');
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson10 />);
    const prevLink = screen.getByRole('link', { name: /← previous lesson/i });
    const nextLink = screen.getByRole('link', { name: /next lesson →/i });
    
    expect(prevLink).toHaveAttribute('href', '/lesson-09');
    expect(nextLink).toHaveAttribute('href', '/lesson-11');
  });

  it('renders documentation link', () => {
    renderWithRouter(<Lesson10 />);
    const docLink = screen.getByRole('link', { name: /📖 view docs/i });
    expect(docLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/guide/node-views');
    expect(docLink).toHaveAttribute('target', '_blank');
  });

  it('has disabled toolbar buttons indicating TODO implementation', () => {
    renderWithRouter(<Lesson10 />);
    const cardButton = screen.getByRole('button', { name: /📋 insert card \(todo\)/i });
    const buttonButton = screen.getByRole('button', { name: /🔘 insert button \(todo\)/i });
    const codeButton = screen.getByRole('button', { name: /💻 code block \(todo\)/i });
    
    expect(cardButton).toBeDisabled();
    expect(buttonButton).toBeDisabled();
    expect(codeButton).toBeDisabled();
  });

  it('renders content that explains custom nodes', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/custom button elements/i)).toBeInTheDocument();
    expect(screen.getByText(/advanced code blocks/i)).toBeInTheDocument();
    expect(screen.getByText(/node views for complex rendering/i)).toBeInTheDocument();
  });

  it('explains the difference between nodes and marks', () => {
    renderWithRouter(<Lesson10 />);
    expect(screen.getByText(/rich, interactive content blocks/i)).toBeInTheDocument();
  });
});