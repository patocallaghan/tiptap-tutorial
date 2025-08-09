# Lesson 06: Custom Menus & UI Controls

## Overview

This lesson focuses on building interactive user interface elements for the TipTap editor. You'll learn how to create custom toolbars, bubble menus, and floating menus that provide intuitive formatting controls and contextual actions. These UI components are essential for creating a professional editing experience.

## Learning Objectives

By the end of this lesson, you will be able to:
- Build custom formatting toolbars with action buttons
- Implement bubble menus that appear when text is selected
- Create floating menus for contextual actions on empty content
- Design responsive UI controls that reflect editor state
- Handle toolbar button states and interactions properly

## Prerequisites

- Complete Lesson 05: Events & Editor Lifecycle
- Understanding of editor events and commands
- Basic knowledge of CSS styling and React event handling

## Implementation Guide

### Step 1: Basic Toolbar Implementation

Create a fixed toolbar with common formatting actions:

```tsx
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

export function BasicToolbar() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Content with toolbar...</p>',
  });

  if (!editor) return null;

  return (
    <div>
      {/* Fixed Toolbar */}
      <div className="border rounded-lg p-2 mb-4 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-blue-100' : ''}
        >
          Bold
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-blue-100' : ''}
        >
          Italic
        </button>
      </div>
      
      <EditorContent editor={editor} />
    </div>
  );
}
```

### Step 2: Advanced Toolbar with Button States

Implement a comprehensive toolbar with proper state management:

```tsx
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive = false, children }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-blue-100 text-blue-700 border border-blue-200"
          : "text-gray-600 hover:bg-gray-100 border border-transparent"
      )}
    >
      {children}
    </button>
  );
}

export function AdvancedToolbar() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Advanced toolbar example...</p>',
  });

  if (!editor) return null;

  return (
    <div>
      <div className="bg-white border rounded-lg p-3 mb-4 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          Bold
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          Italic
        </ToolbarButton>

        {/* Separator */}
        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        >
          H1
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        >
          H2
        </ToolbarButton>

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          • List
        </ToolbarButton>
      </div>
      
      <EditorContent editor={editor} />
    </div>
  );
}
```

### Step 3: Bubble Menu Implementation

Create a bubble menu that appears when text is selected:

```tsx
import { BubbleMenu } from '@tiptap/react';

export function EditorWithBubbleMenu() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Select text to see bubble menu...</p>',
  });

  if (!editor) return null;

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="bg-black text-white px-2 py-1 rounded-lg shadow-lg flex gap-1"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "px-2 py-1 text-xs rounded",
            editor.isActive('bold') ? "bg-white text-black" : "hover:bg-gray-700"
          )}
        >
          Bold
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "px-2 py-1 text-xs rounded",
            editor.isActive('italic') ? "bg-white text-black" : "hover:bg-gray-700"
          )}
        >
          Italic
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "px-2 py-1 text-xs rounded",
            editor.isActive('strike') ? "bg-white text-black" : "hover:bg-gray-700"
          )}
        >
          Strike
        </button>
      </BubbleMenu>
      
      <EditorContent editor={editor} />
    </>
  );
}
```

### Step 4: Floating Menu for Empty Content

Implement a floating menu that appears on empty paragraphs:

```tsx
import { FloatingMenu } from '@tiptap/react';

export function EditorWithFloatingMenu() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p></p>',
  });

  if (!editor) return null;

  return (
    <>
      <FloatingMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="bg-gray-100 border rounded-lg p-2 shadow-lg"
      >
        <div className="text-xs text-gray-500 mb-2">Add content:</div>
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
          >
            Heading 1
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
          >
            Bullet List
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
          >
            Quote
          </button>
        </div>
      </FloatingMenu>
      
      <EditorContent editor={editor} />
    </>
  );
}
```

### Step 5: Complete Menu System

Combine all menu types for a comprehensive editing experience:

```tsx
export function CompleteMenuSystem() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>Complete Menu System</h2>
      <p>This editor demonstrates all three types of menus working together.</p>
      <p>Try the toolbar, select text for bubble menu, or click empty lines for floating menu.</p>
    `,
  });

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Fixed Toolbar */}
      <div className="bg-white border rounded-lg p-3 mb-4 flex flex-wrap gap-1">
        {/* Implementation from Step 2... */}
      </div>

      {/* Bubble Menu */}
      <BubbleMenu editor={editor} /* ... bubble menu config ... */>
        {/* Implementation from Step 3... */}
      </BubbleMenu>

      {/* Floating Menu */}
      <FloatingMenu editor={editor} /* ... floating menu config ... */>
        {/* Implementation from Step 4... */}
      </FloatingMenu>

      {/* Editor */}
      <EditorContent editor={editor} className="min-h-[300px] border rounded p-4" />
    </div>
  );
}
```

## Key Concepts

- **BubbleMenu**: A contextual menu that appears when text is selected, perfect for text formatting actions
- **FloatingMenu**: A menu that appears in empty paragraphs, ideal for content creation shortcuts
- **Toolbar**: A fixed UI element containing commonly-used commands and formatting options
- **Active States**: Visual feedback that shows which formatting is currently applied to selected content
- **Command Chaining**: Combining multiple commands (like `focus()` and `toggleBold()`) for smooth user interactions

## Common Pitfalls

- **Missing Focus**: Always chain `.focus()` before commands to ensure the editor maintains focus after button clicks
- **Conditional Rendering**: Check if editor exists before rendering menus to avoid runtime errors
- **Menu Positioning**: Be aware of menu positioning in scrollable containers or modal dialogs
- **Button State Updates**: Remember that active states update automatically based on cursor position and selection
- **Accessibility**: Ensure buttons have proper ARIA labels and keyboard navigation support

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-06
```

The tests will verify:
- Menu components render correctly
- Toolbar buttons respond to clicks
- Active states display properly
- Accessibility requirements are met

## Next Steps

Continue to [Lesson 07: Suggestion System & Typeahead](../lesson-07/README.md) to learn how to implement advanced input features like mentions and slash commands.

## Additional Resources

- [TipTap Menus Documentation](https://tiptap.dev/docs/editor/api/menus)
- [BubbleMenu API Reference](https://tiptap.dev/docs/editor/api/menus#bubble-menu)
- [FloatingMenu API Reference](https://tiptap.dev/docs/editor/api/menus#floating-menu)
- [Command Chaining Best Practices](https://tiptap.dev/docs/editor/api/commands)