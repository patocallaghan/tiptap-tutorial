# Lesson 09: Custom Marks Development

## Overview
Learn to create custom marks for inline text formatting in TipTap. This lesson covers building highlight marks, annotation systems, and custom styling. You'll understand how marks differ from nodes and how to implement reusable mark extensions.

## Learning Objectives
By the end of this lesson, you will be able to:
- Create custom mark extensions with configurable attributes
- Build a highlight mark with multiple color options
- Implement an annotation system for inline comments
- Handle mark parsing, rendering, and serialization
- Add keyboard shortcuts and toolbar integration for marks

## Prerequisites
- Complete Lesson 01-08
- Understanding of TipTap extensions and StarterKit
- Basic knowledge of ProseMirror schema concepts
- Familiarity with editor commands and event handling

## Implementation Guide

### Step 1: Create a Highlight Mark Extension

First, create a custom highlight mark that allows multiple colors:

```typescript
import { Mark, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlight: {
      setHighlight: (attributes?: { color: string }) => ReturnType
      toggleHighlight: (attributes?: { color: string }) => ReturnType
      unsetHighlight: () => ReturnType
    }
  }
}

export const Highlight = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      multicolor: true,
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      color: {
        default: 'yellow',
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => {
          if (!attributes.color) {
            return {}
          }
          return {
            'data-color': attributes.color,
            style: `background-color: ${attributes.color}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'mark[data-color]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setHighlight:
        (attributes = {}) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes)
        },
      toggleHighlight:
        (attributes = {}) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes)
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-h': () => this.editor.commands.toggleHighlight(),
    }
  },
})
```

### Step 2: Build an Annotation Mark

Create an annotation system for inline comments:

```typescript
import { Mark, mergeAttributes } from '@tiptap/core'

export const Annotation = Mark.create({
  name: 'annotation',

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-annotation-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {}
          }
          return { 'data-annotation-id': attributes.id }
        },
      },
      comment: {
        default: '',
        parseHTML: element => element.getAttribute('data-comment'),
        renderHTML: attributes => {
          if (!attributes.comment) {
            return {}
          }
          return { 'data-comment': attributes.comment }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-annotation-id]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        {
          class: 'annotation',
          style: 'border-bottom: 2px dotted #3b82f6; cursor: help;',
        },
        HTMLAttributes
      ),
      0,
    ]
  },

  addCommands() {
    return {
      setAnnotation:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes)
        },
      toggleAnnotation:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes)
        },
      unsetAnnotation:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },
})
```

### Step 3: Implement Custom Underline Mark

Add an underline mark with custom styling options:

```typescript
import { Mark, mergeAttributes } from '@tiptap/core'

export const CustomUnderline = Mark.create({
  name: 'customUnderline',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      style: {
        default: 'solid',
        parseHTML: element => element.getAttribute('data-underline-style'),
        renderHTML: attributes => {
          if (!attributes.style) {
            return {}
          }
          return { 'data-underline-style': attributes.style }
        },
      },
    }
  },

  parseHTML() {
    return [
      { tag: 'u' },
      { tag: 'span[data-underline-style]' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const style = HTMLAttributes['data-underline-style'] || 'solid'
    const underlineStyle = {
      solid: 'underline',
      dotted: 'underline dotted',
      dashed: 'underline dashed',
      wavy: 'underline wavy',
    }[style] || 'underline'

    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: `text-decoration: ${underlineStyle};`,
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setCustomUnderline:
        (attributes = {}) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes)
        },
      toggleCustomUnderline:
        (attributes = {}) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes)
        },
      unsetCustomUnderline:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-u': () => this.editor.commands.toggleCustomUnderline(),
    }
  },
})
```

### Step 4: Integrate Custom Marks in Editor

Update your editor configuration to include the custom marks:

```typescript
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Highlight } from './extensions/highlight'
import { Annotation } from './extensions/annotation'
import { CustomUnderline } from './extensions/custom-underline'

const editor = useEditor({
  extensions: [
    StarterKit,
    Highlight.configure({
      multicolor: true,
    }),
    Annotation,
    CustomUnderline,
  ],
  content: '<p>Your initial content here</p>',
})
```

### Step 5: Create Toolbar Integration

Build toolbar buttons for your custom marks:

```typescript
const MarkToolbar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="flex gap-2 p-2 border-b">
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: 'yellow' }).run()}
        className={cn(
          'px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100',
          editor.isActive('highlight', { color: 'yellow' }) && 'bg-yellow-100'
        )}
      >
        🟡 Highlight
      </button>
      
      <button
        onClick={() => {
          const comment = prompt('Enter comment:')
          if (comment) {
            editor.chain().focus().setAnnotation({ 
              id: Date.now().toString(), 
              comment 
            }).run()
          }
        }}
        className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100"
      >
        💬 Annotate
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleCustomUnderline().run()}
        className={cn(
          'px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100',
          editor.isActive('customUnderline') && 'bg-blue-100'
        )}
      >
        📑 Underline
      </button>
    </div>
  )
}
```

### Step 6: Handle Mark Events

Add event handling for custom mark interactions:

```typescript
const editor = useEditor({
  extensions: [/* your extensions */],
  onUpdate: ({ editor }) => {
    // Handle content updates with custom marks
    console.log('Content updated:', editor.getHTML())
  },
  onCreate: ({ editor }) => {
    // Add click listeners for annotations
    editor.view.dom.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (target.dataset.annotationId) {
        const comment = target.dataset.comment
        alert(`Annotation: ${comment}`)
      }
    })
  },
})
```

## Key Concepts

- **Mark Extensions**: Inline formatting that can span across text ranges, unlike nodes which are block-level
- **Mark Attributes**: Data stored within marks for customization (colors, IDs, metadata)
- **Mark Commands**: Programmatic ways to apply, toggle, or remove marks from selected text
- **Mark Parsing**: Converting HTML elements or JSON data back into mark instances
- **Mark Rendering**: How marks are displayed in the editor and exported to HTML
- **Mark Shortcuts**: Keyboard combinations for quick mark application

## Common Pitfalls

- **Overlapping Marks**: Be careful with mark precedence and how they interact with each other
- **Attribute Validation**: Always validate mark attributes to prevent XSS and ensure data integrity
- **Performance**: Avoid heavy computations in mark rendering functions as they run frequently
- **Serialization**: Ensure your custom marks can be properly serialized to and from JSON/HTML

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-09
```

Test your custom marks by:
1. Selecting text and applying highlight marks
2. Creating annotations with comments
3. Using keyboard shortcuts (Ctrl+Shift+H, Ctrl+U)
4. Verifying marks persist through content serialization

## Next Steps

Continue to [Lesson 10: Custom Nodes Development](../lesson-10/README.md) to learn about creating custom block-level content elements.

## Additional Resources

- [TipTap Custom Extensions Guide](https://tiptap.dev/docs/editor/guide/custom-extensions#marks)
- [ProseMirror Mark Documentation](https://prosemirror.net/docs/ref/#model.Mark)
- [Mark Schema Specification](https://prosemirror.net/docs/guide/#schema.marks)