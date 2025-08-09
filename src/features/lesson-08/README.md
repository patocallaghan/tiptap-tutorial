# Lesson 08: StarterKit Extensions & Configuration

## Overview

This lesson covers TipTap's StarterKit bundle and how to configure its individual extensions. You'll learn the difference between using StarterKit as a convenient bundle versus loading extensions individually for maximum control and bundle optimization. Understanding extension configuration is crucial for customizing your editor's behavior and appearance.

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand StarterKit's included extensions and their purposes
- Configure individual extensions within StarterKit
- Load extensions individually for custom configurations
- Optimize bundle size by selective extension loading
- Customize extension behavior and styling through HTMLAttributes

## Prerequisites

- Complete Lesson 07: Suggestion System & Typeahead
- Understanding of editor configuration and extensions
- Basic knowledge of bundling and performance optimization

## Implementation Guide

### Step 1: Understanding StarterKit

StarterKit is a convenience package that includes the most commonly used TipTap extensions:

```tsx
import { StarterKit } from '@tiptap/starter-kit';

const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Hello World!</p>',
});
```

StarterKit includes these extensions:
- Document, Paragraph, Text (core structure)
- Bold, Italic, Strike, Code (text formatting)
- Heading, BulletList, OrderedList, ListItem (content blocks)
- Blockquote, CodeBlock, HorizontalRule, HardBreak (special elements)
- History (undo/redo functionality)

### Step 2: Configuring StarterKit Extensions

You can configure individual extensions within StarterKit:

```tsx
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      // Configure specific extensions
      heading: {
        levels: [1, 2, 3], // Only allow H1, H2, H3
      },
      bulletList: {
        keepMarks: true,
        keepAttributes: true,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: true,
      },
      blockquote: {
        HTMLAttributes: {
          class: 'border-l-4 border-gray-300 pl-4 italic text-gray-700',
        },
      },
      codeBlock: {
        HTMLAttributes: {
          class: 'bg-gray-900 text-green-400 p-4 rounded font-mono',
        },
      },
      history: {
        depth: 100,
        newGroupDelay: 1000,
      },
    }),
  ],
});
```

### Step 3: Individual Extension Loading

For maximum control, load extensions individually:

```tsx
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Heading } from '@tiptap/extension-heading';
import { History } from '@tiptap/extension-history';

const editor = useEditor({
  extensions: [
    Document,
    Paragraph.configure({
      HTMLAttributes: {
        class: 'my-paragraph-class',
      },
    }),
    Text,
    Bold.configure({
      HTMLAttributes: {
        class: 'font-bold text-blue-700',
      },
    }),
    Italic.configure({
      HTMLAttributes: {
        class: 'italic text-purple-600',
      },
    }),
    Heading.configure({
      levels: [1, 2],
      HTMLAttributes: {
        class: 'font-bold text-gray-900',
      },
    }),
    History.configure({
      depth: 50,
      newGroupDelay: 500,
    }),
  ],
});
```

### Step 4: Selective Extension Loading

Load only the extensions you need for optimal bundle size:

```tsx
// Minimal setup - only basic text editing
const minimalEditor = useEditor({
  extensions: [
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
  ],
});

// Rich text setup - includes lists and formatting
const richEditor = useEditor({
  extensions: [
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
    Strike,
    Code,
    Heading.configure({ levels: [1, 2, 3] }),
    BulletList,
    OrderedList,
    ListItem,
    History,
  ],
});

// Full-featured setup - includes all common extensions
const fullEditor = useEditor({
  extensions: [
    // Core
    Document,
    Paragraph,
    Text,
    
    // Text formatting
    Bold,
    Italic,
    Strike,
    Code,
    
    // Block elements
    Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    Blockquote,
    CodeBlock,
    HorizontalRule,
    
    // Lists
    BulletList,
    OrderedList,
    ListItem,
    
    // Utilities
    HardBreak,
    History,
  ],
});
```

### Step 5: Advanced Extension Configuration

Implement more sophisticated extension configurations:

```tsx
const editor = useEditor({
  extensions: [
    Document,
    Paragraph.configure({
      HTMLAttributes: {
        class: 'prose-paragraph',
      },
    }),
    Text,
    
    // Custom bold with enhanced styling
    Bold.configure({
      HTMLAttributes: {
        class: 'font-bold text-blue-700 hover:text-blue-800 transition-colors',
        'data-type': 'bold-text',
      },
    }),
    
    // Headings with size-specific classes
    Heading.configure({
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: 'heading-base',
      },
    }).extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          class: {
            default: null,
            parseHTML: element => element.getAttribute('class'),
            renderHTML: attributes => {
              const level = attributes.level;
              const baseClass = 'heading-base';
              const sizeClass = {
                1: 'text-4xl font-bold mb-6',
                2: 'text-3xl font-semibold mb-4',
                3: 'text-2xl font-medium mb-3',
              }[level] || '';
              
              return {
                class: `${baseClass} ${sizeClass}`.trim(),
              };
            },
          },
        };
      },
    }),
    
    // Lists with custom styling
    BulletList.configure({
      HTMLAttributes: {
        class: 'prose-ul ml-6 space-y-2',
      },
      keepMarks: true,
      keepAttributes: true,
    }),
    
    // Enhanced code blocks
    CodeBlock.configure({
      HTMLAttributes: {
        class: 'bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto',
        'data-language': 'javascript',
      },
      defaultLanguage: 'javascript',
    }),
    
    // Custom history configuration
    History.configure({
      depth: 100,
      newGroupDelay: 1000,
      // Track specific transactions
      onTransaction: ({ transaction, state }) => {
        console.log('History transaction:', transaction.steps.length);
      },
    }),
  ],
});
```

### Step 6: Dynamic Extension Loading

Implement dynamic extension loading based on user preferences or feature flags:

```tsx
function createEditor(features = {}) {
  const baseExtensions = [Document, Paragraph, Text];
  
  const conditionalExtensions = [];
  
  // Add formatting extensions based on features
  if (features.formatting) {
    conditionalExtensions.push(
      Bold.configure({
        HTMLAttributes: { class: 'font-bold' },
      }),
      Italic.configure({
        HTMLAttributes: { class: 'italic' },
      }),
      Strike
    );
  }
  
  // Add heading support
  if (features.headings) {
    conditionalExtensions.push(
      Heading.configure({
        levels: features.headingLevels || [1, 2, 3],
      })
    );
  }
  
  // Add list support
  if (features.lists) {
    conditionalExtensions.push(BulletList, OrderedList, ListItem);
  }
  
  // Add advanced blocks
  if (features.advancedBlocks) {
    conditionalExtensions.push(Blockquote, CodeBlock, HorizontalRule);
  }
  
  // Add history if needed
  if (features.history !== false) {
    conditionalExtensions.push(
      History.configure({
        depth: features.historyDepth || 100,
      })
    );
  }
  
  return useEditor({
    extensions: [...baseExtensions, ...conditionalExtensions],
  });
}

// Usage examples
const basicEditor = createEditor({
  formatting: true,
  headings: true,
});

const advancedEditor = createEditor({
  formatting: true,
  headings: true,
  headingLevels: [1, 2, 3, 4],
  lists: true,
  advancedBlocks: true,
  historyDepth: 200,
});
```

## Key Concepts

- **StarterKit**: A pre-configured bundle of essential extensions for rapid development and prototyping
- **Extension Configuration**: Customizing extension behavior, appearance, and functionality through options
- **Individual Loading**: Loading extensions separately for maximum control over functionality and bundle size
- **Bundle Optimization**: Selecting only needed extensions to reduce JavaScript bundle size
- **HTMLAttributes**: Customizing the HTML output of extensions with CSS classes and data attributes

## Common Pitfalls

- **Bundle Size**: Using StarterKit includes all extensions even if you don't need them - consider individual loading for production
- **Configuration Conflicts**: Some extension configurations may conflict - test thoroughly when customizing multiple extensions
- **Missing Dependencies**: When loading extensions individually, ensure you include all required dependencies (Document, Paragraph, Text)
- **Override Issues**: Extension configurations can override each other - be careful with conflicting HTMLAttributes or behaviors
- **Performance**: Too many extensions can impact editor performance - profile and optimize for your use case

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-08
```

The tests will verify:
- Both StarterKit and individual extension configurations work
- Configuration toggles function correctly
- Extension information displays properly
- Component renders all required sections

## Next Steps

Continue to [Lesson 09: Custom Marks Development](../lesson-09/README.md) to learn how to create your own custom marks for specialized text formatting.

## Additional Resources

- [TipTap StarterKit Documentation](https://tiptap.dev/docs/editor/extensions/functionality/starterkit)
- [Extension Configuration Guide](https://tiptap.dev/docs/editor/guide/configure-the-editor)
- [Bundle Optimization Strategies](https://tiptap.dev/docs/editor/guide/performance)
- [Individual Extension Documentation](https://tiptap.dev/docs/editor/extensions/overview)