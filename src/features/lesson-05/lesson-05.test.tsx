import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Lesson05 } from './lesson-05';

// Mock console methods to test event logging
const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => {});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Lesson 05: Events & Editor Lifecycle', () => {
  beforeEach(() => {
    consoleMock.mockClear();
  });

  it('renders lesson title and description', () => {
    renderWithRouter(<Lesson05 />);
    expect(screen.getByText(/lesson 05: events & editor lifecycle/i)).toBeInTheDocument();
    expect(screen.getByText(/learn how to handle editor events/i)).toBeInTheDocument();
  });

  it('renders learning objectives', () => {
    renderWithRouter(<Lesson05 />);
    expect(screen.getByText(/learning objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/understand editor lifecycle events/i)).toBeInTheDocument();
    expect(screen.getByText(/implement event handlers/i)).toBeInTheDocument();
    expect(screen.getByText(/work with prosemirror transactions/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter(<Lesson05 />);
    expect(screen.getByText(/prerequisites/i)).toBeInTheDocument();
    expect(screen.getByText(/complete lessons 1-4/i)).toBeInTheDocument();
  });

  it('renders editor with initial content', () => {
    renderWithRouter(<Lesson05 />);
    expect(screen.getByText(/start typing to see editor events/i)).toBeInTheDocument();
  });

  it('renders todo section', () => {
    renderWithRouter(<Lesson05 />);
    expect(screen.getByText(/todo: your implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/custom event handlers/i)).toBeInTheDocument();
    expect(screen.getByText(/transaction listeners/i)).toBeInTheDocument();
    expect(screen.getByText(/state management/i)).toBeInTheDocument();
  });

  it('renders event log display section', () => {
    renderWithRouter(<Lesson05 />);
    expect(screen.getByText(/event log/i)).toBeInTheDocument();
    expect(screen.getByText(/check browser console/i)).toBeInTheDocument();
  });

  it('renders key concepts section', () => {
    renderWithRouter(<Lesson05 />);
    expect(screen.getByText(/key concepts/i)).toBeInTheDocument();
    expect(screen.getByText(/editor events/i)).toBeInTheDocument();
    expect(screen.getByText(/transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/lifecycle management/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Lesson05 />);
    const prevLink = screen.getByRole('link', { name: /previous lesson/i });
    const nextLink = screen.getByRole('link', { name: /next lesson/i });
    
    expect(prevLink).toHaveAttribute('href', '/lesson-04');
    expect(nextLink).toHaveAttribute('href', '/lesson-06');
  });

  it('renders documentation link', () => {
    renderWithRouter(<Lesson05 />);
    const docsLink = screen.getByRole('link', { name: /view docs/i });
    expect(docsLink).toHaveAttribute('href', 'https://tiptap.dev/docs/editor/api/events');
    expect(docsLink).toHaveAttribute('target', '_blank');
  });

  it('logs editor creation event', async () => {
    renderWithRouter(<Lesson05 />);
    
    // Wait for editor to be created and events to be logged
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(consoleMock).toHaveBeenCalledWith(expect.stringMatching(/editor created/i), expect.any(Object));
  });

  it('handles editor interaction events', () => {
    renderWithRouter(<Lesson05 />);
    
    const editorContent = screen.getByRole('textbox');
    
    // Test focus event
    fireEvent.focus(editorContent);
    expect(consoleMock).toHaveBeenCalledWith('Editor focused');
    
    // Test blur event
    fireEvent.blur(editorContent);
    expect(consoleMock).toHaveBeenCalledWith('Editor blurred');
  });

  it('provides proper accessibility attributes', () => {
    renderWithRouter(<Lesson05 />);
    
    // Check that the editor is accessible
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
  });
});