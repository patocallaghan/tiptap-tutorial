# Lesson 10: Custom Nodes Development

## Overview
Master the creation of custom block-level nodes in TipTap. This lesson covers building interactive content blocks, implementing node views with React components, and handling complex node behaviors. Learn to create card components, interactive buttons, and advanced code blocks.

## Learning Objectives
By the end of this lesson, you will be able to:
- Create custom block nodes with complex content structures
- Implement React-based node views for interactive rendering
- Build card components with editable titles and content
- Handle node attributes, validation, and data persistence
- Create interactive nodes with click handlers and state

## Prerequisites
- Complete Lesson 01-09
- Understanding of custom marks and ProseMirror schema
- Knowledge of React components and event handling
- Familiarity with TipTap extensions and commands

## Implementation Guide

### Step 1: Create a Card Node Extension

Build a card component that can contain editable content:

```typescript
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const CardNode = Node.create({
  name: 'cardNode',

  group: 'block',

  content: 'block+',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      title: {
        default: 'Card Title',
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => ({
          'data-title': attributes.title,
        }),
      },
      variant: {
        default: 'default',
        parseHTML: element => element.getAttribute('data-variant'),
        renderHTML: attributes => ({
          'data-variant': attributes.variant,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="card"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        {
          'data-type': 'card',
          class: 'card-node',
        },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      ['div', { class: 'card-header' }, ['h3', HTMLAttributes['data-title']]],
      ['div', { class: 'card-content' }, 0],
    ]
  },

  addCommands() {
    return {
      setCard:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes)
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CardComponent)
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-c': () => this.editor.commands.setCard({ title: 'New Card' }),
    }
  },
})
```

### Step 2: Create the Card React Component

Build the React component for the card node view:

```typescript
import React, { useState } from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

const CardComponent = ({ node, updateAttributes, selected }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(node.attrs.title)

  const handleTitleSubmit = () => {
    updateAttributes({ title })
    setIsEditing(false)
  }

  const variants = {
    default: 'border border-gray-200 bg-white',
    success: 'border border-green-200 bg-green-50',
    warning: 'border border-yellow-200 bg-yellow-50',
    error: 'border border-red-200 bg-red-50',
  }

  return (
    <NodeViewWrapper className={`card-wrapper ${selected ? 'ProseMirror-selectednode' : ''}`}>
      <div className={`rounded-lg p-4 ${variants[node.attrs.variant] || variants.default}`}>
        <div className="flex items-center justify-between mb-3">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
              className="text-lg font-semibold bg-transparent border-b border-gray-300 outline-none"
              autoFocus
            />
          ) : (
            <h3
              className="text-lg font-semibold cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {node.attrs.title}
            </h3>
          )}
          <select
            value={node.attrs.variant}
            onChange={(e) => updateAttributes({ variant: e.target.value })}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="default">Default</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
        <NodeViewContent className="card-content" />
      </div>
    </NodeViewWrapper>
  )
}
```

### Step 3: Build an Interactive Button Node

Create a button node with click handlers:

```typescript
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const ButtonNode = Node.create({
  name: 'buttonNode',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      label: {
        default: 'Button',
        parseHTML: element => element.textContent,
        renderHTML: attributes => attributes.label,
      },
      variant: {
        default: 'primary',
        parseHTML: element => element.getAttribute('data-variant'),
        renderHTML: attributes => ({
          'data-variant': attributes.variant,
        }),
      },
      url: {
        default: null,
        parseHTML: element => element.getAttribute('href'),
        renderHTML: attributes => ({
          href: attributes.url,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'button[data-type="button"]',
      },
      {
        tag: 'a[data-type="button"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const tag = HTMLAttributes.href ? 'a' : 'button'
    return [
      tag,
      mergeAttributes(
        {
          'data-type': 'button',
          class: 'custom-button',
        },
        HTMLAttributes
      ),
      HTMLAttributes.label || 'Button',
    ]
  },

  addCommands() {
    return {
      setButton:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes)
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ButtonComponent)
  },
})

const ButtonComponent = ({ node, updateAttributes, selected }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  const handleClick = () => {
    if (node.attrs.url) {
      window.open(node.attrs.url, '_blank')
    } else {
      alert(`Button "${node.attrs.label}" clicked!`)
    }
  }

  return (
    <NodeViewWrapper className={`button-wrapper ${selected ? 'ProseMirror-selectednode' : ''}`}>
      <div className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50">
        <button
          onClick={handleClick}
          className={`px-4 py-2 rounded font-medium ${variants[node.attrs.variant] || variants.primary}`}
        >
          {node.attrs.label}
        </button>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Button text"
            value={node.attrs.label}
            onChange={(e) => updateAttributes({ label: e.target.value })}
            className="px-2 py-1 text-sm border rounded"
          />
          <input
            type="url"
            placeholder="URL (optional)"
            value={node.attrs.url || ''}
            onChange={(e) => updateAttributes({ url: e.target.value || null })}
            className="px-2 py-1 text-sm border rounded"
          />
          <select
            value={node.attrs.variant}
            onChange={(e) => updateAttributes({ variant: e.target.value })}
            className="px-2 py-1 text-sm border rounded"
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
            <option value="danger">Danger</option>
          </select>
        </div>
      </div>
    </NodeViewWrapper>
  )
}
```

### Step 4: Create an Advanced Code Block Node

Build a code block with syntax highlighting:

```typescript
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const AdvancedCodeBlock = Node.create({
  name: 'advancedCodeBlock',

  group: 'block',

  content: 'text*',

  marks: '',

  code: true,

  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'javascript',
        parseHTML: element => element.getAttribute('data-language'),
        renderHTML: attributes => ({
          'data-language': attributes.language,
        }),
      },
      filename: {
        default: null,
        parseHTML: element => element.getAttribute('data-filename'),
        renderHTML: attributes => ({
          'data-filename': attributes.filename,
        }),
      },
      showLineNumbers: {
        default: true,
        parseHTML: element => element.getAttribute('data-line-numbers') === 'true',
        renderHTML: attributes => ({
          'data-line-numbers': attributes.showLineNumbers,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'pre[data-type="advanced-code-block"]',
        preserveWhitespace: 'full',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(
        {
          'data-type': 'advanced-code-block',
          class: 'advanced-code-block',
        },
        HTMLAttributes
      ),
      ['code', {}, 0],
    ]
  },

  addCommands() {
    return {
      setAdvancedCodeBlock:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes)
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(AdvancedCodeBlockComponent)
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-c': () => this.editor.commands.setAdvancedCodeBlock(),
    }
  },
})

const AdvancedCodeBlockComponent = ({ node, updateAttributes, selected }) => {
  const languages = [
    'javascript', 'typescript', 'html', 'css', 'python', 
    'java', 'cpp', 'rust', 'go', 'php'
  ]

  return (
    <NodeViewWrapper className={`code-block-wrapper ${selected ? 'ProseMirror-selectednode' : ''}`}>
      <div className="border rounded-lg overflow-hidden bg-gray-900 text-gray-100">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="filename.js"
              value={node.attrs.filename || ''}
              onChange={(e) => updateAttributes({ filename: e.target.value || null })}
              className="bg-gray-700 text-gray-100 px-2 py-1 text-sm rounded border-none outline-none"
            />
            <select
              value={node.attrs.language}
              onChange={(e) => updateAttributes({ language: e.target.value })}
              className="bg-gray-700 text-gray-100 px-2 py-1 text-sm rounded border-none outline-none"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={node.attrs.showLineNumbers}
              onChange={(e) => updateAttributes({ showLineNumbers: e.target.checked })}
            />
            Line numbers
          </label>
        </div>
        <div className="relative">
          <NodeViewContent className="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap" />
        </div>
      </div>
    </NodeViewWrapper>
  )
}
```

### Step 5: Integrate Custom Nodes in Editor

Update your editor configuration:

```typescript
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { CardNode } from './extensions/card-node'
import { ButtonNode } from './extensions/button-node'
import { AdvancedCodeBlock } from './extensions/advanced-code-block'

const editor = useEditor({
  extensions: [
    StarterKit,
    CardNode,
    ButtonNode,
    AdvancedCodeBlock,
  ],
  content: '<p>Your initial content here</p>',
})
```

### Step 6: Create Node Insertion Toolbar

Build a toolbar for inserting custom nodes:

```typescript
const NodeToolbar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="flex gap-2 p-2 border-b">
      <button
        onClick={() => editor.chain().focus().setCard({ title: 'New Card' }).run()}
        className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100"
      >
        📋 Insert Card
      </button>
      
      <button
        onClick={() => editor.chain().focus().setButton({ 
          label: 'Click me', 
          variant: 'primary' 
        }).run()}
        className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100"
      >
        🔘 Insert Button
      </button>
      
      <button
        onClick={() => editor.chain().focus().setAdvancedCodeBlock({ 
          language: 'javascript',
          filename: 'example.js'
        }).run()}
        className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100"
      >
        💻 Code Block
      </button>
    </div>
  )
}
```

## Key Concepts

- **Custom Nodes**: Block-level content elements that can contain other nodes or be atomic
- **Node Views**: React components that provide custom rendering and interaction for nodes
- **Node Attributes**: Configuration data stored within node instances
- **Content Expressions**: Definitions of what content a node can contain (e.g., 'block+', 'text*')
- **Atomic Nodes**: Nodes that cannot contain other content and are treated as single units
- **Node Commands**: Methods to insert, update, and manipulate node instances

## Common Pitfalls

- **Content Model**: Ensure your node's content expression matches what it should contain
- **Node Selection**: Handle node selection states properly in your React components
- **Attribute Updates**: Use updateAttributes correctly to persist node changes
- **Performance**: Avoid heavy computations in node view render methods

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-10
```

Test your custom nodes by:
1. Inserting card, button, and code block nodes
2. Editing node attributes and content
3. Verifying node selection and deletion
4. Testing keyboard shortcuts for node insertion

## Next Steps

Continue to [Lesson 11: Advanced ProseMirror Integration](../lesson-11/README.md) to learn direct ProseMirror API usage and advanced schema manipulation.

## Additional Resources

- [TipTap Node Views Guide](https://tiptap.dev/docs/editor/guide/node-views)
- [ProseMirror Node Documentation](https://prosemirror.net/docs/ref/#model.Node)
- [React Node View Renderer](https://tiptap.dev/docs/editor/guide/node-views/react)