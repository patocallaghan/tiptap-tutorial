# Lesson 05: Events & Editor Lifecycle

## Overview

This lesson covers the TipTap editor's event system and lifecycle management. You'll learn how to handle editor events, implement transaction hooks, and monitor the editor's state changes throughout its lifecycle. Understanding these concepts is crucial for building reactive applications that respond to user interactions and content changes.

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand editor lifecycle events and when they occur
- Implement event handlers for content changes and user interactions  
- Work with ProseMirror transactions and transaction hooks
- Monitor editor state changes and selection updates
- Debug editor behavior using event logging

## Prerequisites

- Complete Lesson 04: Input Rules & Paste Rules
- Understanding of commands and content manipulation
- Basic knowledge of JavaScript event handling

## Implementation Guide

### Step 1: Basic Event Handlers

Start by implementing the core editor event handlers in your `useEditor` configuration:

```tsx
const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Start typing to see events...</p>',
  
  // Editor lifecycle events
  onCreate: ({ editor }) => {
    console.log('Editor created:', editor);
    // Initialize any state or perform setup tasks
  },
  
  onDestroy: () => {
    console.log('Editor destroyed');
    // Clean up resources, save state, etc.
  }
});
```

### Step 2: Content Change Events

Implement handlers for content-related events:

```tsx
const editor = useEditor({
  // ... other configuration
  
  onUpdate: ({ editor }) => {
    console.log('Content updated:', editor.getHTML());
    // React to content changes
    // Update external state, auto-save, etc.
  },
  
  onTransaction: ({ editor, transaction }) => {
    console.log('Transaction occurred:', transaction);
    // Monitor all document changes
    // Implement undo/redo tracking, etc.
  }
});
```

### Step 3: User Interaction Events

Add handlers for user interaction events:

```tsx
const editor = useEditor({
  // ... other configuration
  
  onSelectionUpdate: ({ editor }) => {
    console.log('Selection updated:', editor.state.selection);
    // Update toolbar states, show/hide UI elements
  },
  
  onFocus: ({ editor }) => {
    console.log('Editor focused');
    // Show formatting toolbar, update UI state
  },
  
  onBlur: ({ editor }) => {
    console.log('Editor blurred');
    // Hide toolbar, save draft, etc.
  }
});
```

### Step 4: Advanced Event Handling

Implement more sophisticated event handling patterns:

```tsx
import { useState, useCallback } from 'react';

export function AdvancedEventHandling() {
  const [editorState, setEditorState] = useState({
    isFocused: false,
    wordCount: 0,
    lastModified: null
  });

  const handleUpdate = useCallback(({ editor }) => {
    const text = editor.getText();
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    
    setEditorState(prev => ({
      ...prev,
      wordCount,
      lastModified: new Date()
    }));
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Advanced event handling example...</p>',
    onUpdate: handleUpdate,
    onFocus: () => setEditorState(prev => ({ ...prev, isFocused: true })),
    onBlur: () => setEditorState(prev => ({ ...prev, isFocused: false }))
  });

  return (
    <div>
      <div className="editor-stats">
        <span>Words: {editorState.wordCount}</span>
        <span>Focused: {editorState.isFocused ? 'Yes' : 'No'}</span>
        {editorState.lastModified && (
          <span>Last modified: {editorState.lastModified.toLocaleTimeString()}</span>
        )}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
```

### Step 5: Transaction Analysis

Implement detailed transaction analysis for debugging:

```tsx
const editor = useEditor({
  // ... other configuration
  
  onTransaction: ({ editor, transaction }) => {
    // Analyze transaction details
    console.group('Transaction Analysis');
    console.log('Steps:', transaction.steps);
    console.log('Selection before:', transaction.before.selection);
    console.log('Selection after:', transaction.selection);
    console.log('Document changed:', transaction.docChanged);
    console.log('Selection changed:', transaction.selectionSet);
    console.groupEnd();
    
    // Track performance
    const startTime = performance.now();
    // Process transaction...
    const endTime = performance.now();
    console.log(`Transaction processed in ${endTime - startTime}ms`);
  }
});
```

## Key Concepts

- **Editor Events**: Lifecycle hooks that allow you to respond to specific editor state changes and user interactions
- **Transactions**: ProseMirror's atomic units of document change that represent all modifications to the editor state
- **Event Handlers**: Functions that are called when specific events occur, allowing you to implement reactive behavior
- **Lifecycle Management**: Properly handling editor creation, updates, and destruction to prevent memory leaks and ensure proper cleanup
- **State Monitoring**: Tracking selections, content changes, and editor focus to update UI components and application state

## Common Pitfalls

- **Memory Leaks**: Always clean up event listeners and subscriptions in the `onDestroy` handler to prevent memory leaks
- **Infinite Loops**: Be careful not to trigger editor updates within update handlers, which can cause infinite loops
- **Performance**: Avoid heavy computations in frequently-called event handlers like `onTransaction` and `onSelectionUpdate`
- **Stale Closures**: Use `useCallback` for event handlers to prevent stale closure issues with React state
- **Event Order**: Understand the order of events - some events may fire before others, affecting the editor state you're reading

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-05
```

The tests will verify:
- Event handlers are properly configured
- Console logging works as expected
- Editor responds to user interactions
- Component renders all required sections

## Next Steps

Continue to [Lesson 06: Custom Menus & UI Controls](../lesson-06/README.md) to learn how to build interactive toolbars and menus that respond to editor events.

## Additional Resources

- [TipTap Events Documentation](https://tiptap.dev/docs/editor/api/events)
- [ProseMirror Transaction Guide](https://prosemirror.net/docs/guide/#doc.transactions)
- [Editor Lifecycle Best Practices](https://tiptap.dev/docs/editor/core-concepts/lifecycle)