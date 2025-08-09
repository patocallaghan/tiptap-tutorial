# Lesson 01: Basic Editor Setup

## Overview
Learn the fundamentals of setting up a TipTap editor, understanding the useEditor hook, and configuring the StarterKit extension. This lesson provides the foundation for all subsequent TipTap development.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand how to initialize a TipTap editor with the useEditor hook
- Configure the StarterKit extension for basic functionality  
- Add a placeholder to guide user interaction
- Explore the editor instance and its methods
- Implement basic editor controls using the editor API

## Prerequisites
- Basic understanding of React hooks
- Familiarity with TypeScript (optional but recommended)
- Understanding of contenteditable elements

## Implementation Guide

### Step 1: Configure Editor with Placeholder

Add a placeholder to your editor configuration to guide users:

```tsx
const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Welcome to TipTap! Start typing to see the editor in action.</p>',
  editorProps: {
    attributes: {
      class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-3 border rounded-md',
    },
  },
  // Add placeholder configuration
  // TODO: Implement placeholder extension
});
```

**Hint**: You'll need to install and configure the `@tiptap/extension-placeholder` package.

### Step 2: Implement Editor Instance Methods

Add interactive controls to demonstrate editor methods:

```tsx
// Add these buttons to interact with the editor
<div className="bg-gray-50 px-4 py-2 border-t">
  <div className="flex gap-2">
    <button 
      onClick={() => editor?.chain().focus().clearContent().run()}
      className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
      disabled={!editor}
    >
      Clear
    </button>
    <button 
      onClick={() => editor?.chain().focus().run()}
      className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
      disabled={!editor}
    >
      Focus
    </button>
    {/* TODO: Add more editor controls */}
  </div>
</div>
```

### Step 3: Explore Editor State

Add functionality to display editor information:

```tsx
// TODO: Implement these features
// 1. Character count display
// 2. Word count display  
// 3. Current selection info
// 4. Editor focus state

// Example character count (already implemented):
<span className="text-xs text-gray-500 py-1 px-2">
  Characters: {editor?.storage.characterCount?.characters() || 0}
</span>
```

### Step 4: Add Basic Formatting Controls

Implement bold, italic, and other basic formatting:

```tsx
// TODO: Add these formatting buttons
<button 
  onClick={() => editor?.chain().focus().toggleBold().run()}
  className={cn(
    "px-3 py-1 text-xs border rounded hover:bg-gray-50",
    editor?.isActive('bold') ? 'bg-gray-200' : 'bg-white'
  )}
  disabled={!editor}
>
  Bold
</button>
```

## Key Concepts

- **useEditor Hook**: React hook that creates and manages an editor instance. It handles the editor lifecycle and provides methods to interact with the editor.

- **StarterKit**: Pre-configured bundle of essential TipTap extensions including basic formatting (bold, italic), paragraphs, headings, and more. Perfect for getting started quickly.

- **Editor Instance**: The core object containing all editor methods and state. Access it to run commands, check active states, and read content.

- **EditorContent**: React component that renders the editable content area. It connects your React component to the ProseMirror editor.

- **Commands**: Methods to manipulate editor content programmatically. Use `editor.chain()` to combine multiple commands.

## Common Pitfalls

- **Null Editor Instance**: Always check if the editor exists before calling methods (`editor?.method()`), as it's null during initial render.

- **Focus Management**: Remember to call `.focus()` when running commands to maintain proper cursor positioning.

- **Extension Loading**: Extensions must be added to the `extensions` array during editor initialization, not after.

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-01
```

The tests verify that:
- Editor renders with initial content
- All UI sections are present
- Editor controls are functional
- Navigation links are correct

## Next Steps

Continue to [Lesson 02: Content & Document Structure](../lesson-02/README.md) to learn about ProseMirror's document model, schemas, and content validation.

## Additional Resources

- [TipTap Editor Introduction](https://tiptap.dev/docs/editor/introduction)
- [useEditor Hook Documentation](https://tiptap.dev/docs/editor/api/editor)
- [StarterKit Extension](https://tiptap.dev/docs/editor/extensions/functionality/starterkit)
- [ProseMirror Guide](https://prosemirror.net/docs/guide/)