# Lesson 03: Commands & Node Positions

## Overview
Master TipTap's command system, understand node positioning, and learn to manipulate content programmatically. This lesson teaches you how to programmatically control the editor and implement advanced content operations.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand TipTap's command system and method chaining
- Learn about node positions and ProseMirror's coordinate system
- Implement position-based content operations
- Master programmatic content manipulation
- Handle selection changes and position tracking

## Prerequisites
- Complete Lesson 01: Basic Editor Setup
- Complete Lesson 02: Content & Document Structure
- Understanding of cursor/selection concepts in text editors

## Implementation Guide

### Step 1: Add Selection Change Listener

Implement selection tracking to monitor cursor position and text selection:

```tsx
const [selectionInfo, setSelectionInfo] = useState<string>('');

const editor = useEditor({
  extensions: [StarterKit],
  content: `...your content...`,
  onSelectionUpdate: ({ editor }) => {
    const { selection } = editor.state;
    const info = {
      from: selection.from,
      to: selection.to,
      empty: selection.empty,
      anchor: selection.anchor,
      head: selection.head,
      type: selection.constructor.name,
    };
    
    // TODO: Add more detailed position analysis
    // - Parent node information
    // - Depth in document tree
    // - Content around selection
    
    setSelectionInfo(JSON.stringify(info, null, 2));
  },
});
```

### Step 2: Implement Command Chaining

Create functions that demonstrate command chaining and atomic operations:

```tsx
const testBasicCommands = () => {
  if (!editor) return;
  
  // Chain multiple commands together
  editor
    .chain()
    .focus()
    .toggleBold()
    .toggleItalic()
    .run();
  
  // TODO: Implement more complex command chains
  // - Conditional formatting
  // - Multi-step operations
  // - Command validation
};

const testAdvancedChaining = () => {
  if (!editor) return;
  
  // TODO: Advanced command chaining examples
  editor
    .chain()
    .focus()
    .selectAll()
    .toggleHeading({ level: 1 })
    .setTextSelection(0)
    .run();
};
```

### Step 3: Position-Based Operations

Implement functions that work with specific positions in the document:

```tsx
const testPositionCommands = () => {
  if (!editor) return;
  
  const { doc, selection } = editor.state;
  const pos = selection.from;
  
  // Resolve position to get detailed information
  const resolvedPos = doc.resolve(pos);
  const nodeAtPos = resolvedPos.parent;
  
  console.log('Position analysis:', {
    pos: resolvedPos.pos,
    depth: resolvedPos.depth,
    parentOffset: resolvedPos.parentOffset,
    nodeBefore: resolvedPos.nodeBefore?.type.name,
    nodeAfter: resolvedPos.nodeAfter?.type.name,
    parent: resolvedPos.parent.type.name,
  });
  
  // TODO: Implement more position operations
  // - Find specific node types
  // - Navigate to document positions
  // - Analyze content around positions
};
```

### Step 4: Content Insertion and Replacement

Build advanced content manipulation functions:

```tsx
const insertContentAtPosition = () => {
  if (!editor) return;
  
  const currentPos = editor.state.selection.from;
  
  // Insert content at specific position
  editor
    .chain()
    .focus()
    .insertContentAt(currentPos, '**[INSERTED]** ')
    .run();
  
  // TODO: Implement more insertion patterns
  // - Insert based on node type
  // - Replace specific content ranges
  // - Insert with position validation
};

const replaceRangeWithContent = () => {
  if (!editor) return;
  
  const { from, to } = editor.state.selection;
  
  // TODO: Replace selection with custom content
  editor
    .chain()
    .focus()
    .deleteRange({ from, to })
    .insertContent('<p>Replacement content</p>')
    .run();
};

const findAndReplace = (searchTerm: string, replacement: string) => {
  if (!editor) return;
  
  // TODO: Implement find and replace functionality
  const { doc } = editor.state;
  let pos = 0;
  let found = false;
  
  doc.descendants((node, nodePos) => {
    if (node.isText && node.text?.includes(searchTerm)) {
      const start = nodePos + node.text.indexOf(searchTerm);
      const end = start + searchTerm.length;
      
      editor
        .chain()
        .setTextSelection({ from: start, to: end })
        .insertContent(replacement)
        .run();
      
      found = true;
      return false; // Stop traversal
    }
  });
  
  return found;
};
```

### Step 5: Advanced Selection Manipulation

Implement selection-based operations:

```tsx
const selectSpecificContent = () => {
  if (!editor) return;
  
  // TODO: Implement various selection patterns
  
  // Select entire document
  editor.chain().focus().selectAll().run();
  
  // Select specific node types
  const selectFirstParagraph = () => {
    const { doc } = editor.state;
    doc.descendants((node, pos) => {
      if (node.type.name === 'paragraph') {
        editor.chain().setTextSelection(pos, pos + node.nodeSize).run();
        return false; // Stop at first paragraph
      }
    });
  };
  
  // Select content around position
  const selectWordAtCursor = () => {
    const { selection } = editor.state;
    const { from, to } = selection;
    
    // TODO: Expand selection to word boundaries
    // This is a simplified example - implement proper word boundary detection
    editor.chain().setTextSelection(from - 5, to + 5).run();
  };
};
```

## Key Concepts

- **Commands**: Functions that modify editor state through transactions. All content changes go through commands for consistency and undo/redo support.

- **Command Chaining**: Using `.chain()` to combine multiple commands into atomic operations. All commands in a chain succeed or fail together.

- **Node Positions**: Absolute positions in the document tree. Position 0 is before the first node, position 1 is inside the first node, etc.

- **Selection**: Represents cursor position (empty selection) or text selection (from/to range). Has anchor (start) and head (end) positions.

- **Resolved Positions**: Detailed position information including parent nodes, depth, and surrounding content. Use `doc.resolve(pos)` to get detailed position data.

- **Transaction**: Atomic document modification. Commands create transactions that can be applied, reversed, or combined.

## Common Pitfalls

- **Invalid Positions**: Always validate positions are within document bounds. Out-of-bounds positions will cause errors.

- **Selection Timing**: Selection changes are async. Don't rely on immediate selection state after running commands.

- **Command Failures**: Commands can fail silently if they violate schema rules. Always check command success when needed.

- **Position Calculation**: Positions change when content is inserted/deleted. Recalculate positions after modifications.

- **Node Boundaries**: Be aware of node boundaries when calculating positions. Text positions are different from node positions.

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-03
```

The tests verify that:
- Command control buttons render and function
- Selection information displays correctly
- Position tracking works properly
- All UI sections are present and functional

## Next Steps

Continue to [Lesson 04: Input Rules & Paste Rules](../lesson-04/README.md) to learn about auto-formatting, paste handling, and content transformation.

## Additional Resources

- [TipTap Commands Guide](https://tiptap.dev/docs/editor/guide/commands)
- [ProseMirror Commands](https://prosemirror.net/docs/ref/#commands)
- [Selection and Positions](https://prosemirror.net/docs/guide/#doc.selection)
- [Document Positions](https://prosemirror.net/docs/guide/#doc.positions)