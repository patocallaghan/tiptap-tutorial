# Lesson 07: Suggestion System & Typeahead

## Overview

This lesson covers the implementation of advanced input features including @mentions, slash commands, and autocomplete functionality. You'll learn how to build suggestion systems that provide typeahead search capabilities, making your editor more interactive and user-friendly.

## Learning Objectives

By the end of this lesson, you will be able to:
- Implement @mention system with typeahead search
- Create slash commands menu for quick content insertion
- Build autocomplete functionality with keyboard navigation
- Handle suggestion popups and positioning
- Integrate suggestion systems with external data sources

## Prerequisites

- Complete Lesson 06: Custom Menus & UI Controls
- Understanding of menus and editor events
- Basic knowledge of React components and state management

## Implementation Guide

### Step 1: Basic Mention System

Start by adding the Mention extension to your editor:

```tsx
import { Mention } from '@tiptap/extension-mention';

const editor = useEditor({
  extensions: [
    StarterKit,
    Mention.configure({
      HTMLAttributes: {
        class: 'bg-blue-100 text-blue-700 px-1 rounded',
      },
      suggestion: {
        items: ({ query }) => {
          return [
            { id: 'user1', label: 'John Doe' },
            { id: 'user2', label: 'Jane Smith' },
            { id: 'user3', label: 'Alice Johnson' },
          ].filter(item =>
            item.label.toLowerCase().includes(query.toLowerCase())
          );
        },
      },
    }),
  ],
});
```

### Step 2: Custom Mention List Component

Create a custom component for rendering mention suggestions:

```tsx
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

interface MentionListProps {
  items: Array<{ id: string; label: string }>;
  command: (item: any) => void;
}

const MentionList = forwardRef<
  { onKeyDown: (props: { event: KeyboardEvent }) => boolean },
  MentionListProps
>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="bg-white border rounded-lg shadow-lg p-2 max-w-xs">
      <div className="text-xs text-gray-500 mb-2">People</div>
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            key={item.id}
            className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
              index === selectedIndex 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => selectItem(index)}
          >
            @{item.label}
          </button>
        ))
      ) : (
        <div className="text-sm text-gray-500 px-2 py-1">No matches found</div>
      )}
    </div>
  );
});
```

### Step 3: Advanced Suggestion Rendering

Implement custom suggestion rendering with proper positioning:

```tsx
const editor = useEditor({
  extensions: [
    StarterKit,
    Mention.configure({
      suggestion: {
        items: ({ query }) => {
          // Your data source
          return MENTION_DATA.filter(item =>
            item.label.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 5);
        },
        
        render: () => {
          let component: any;
          let popup: HTMLDivElement;

          return {
            onStart: (props: any) => {
              component = new MentionList(props);
              
              if (!props.clientRect) return;

              // Create popup element
              popup = document.createElement('div');
              document.body.appendChild(popup);
              
              // Position popup
              const rect = props.clientRect();
              popup.style.position = 'fixed';
              popup.style.top = `${rect.bottom}px`;
              popup.style.left = `${rect.left}px`;
              popup.style.zIndex = '1000';
              
              // Render component
              ReactDOM.render(<MentionList {...props} ref={component} />, popup);
            },

            onUpdate: (props: any) => {
              if (!popup) return;
              
              const rect = props.clientRect();
              if (rect) {
                popup.style.top = `${rect.bottom}px`;
                popup.style.left = `${rect.left}px`;
              }
            },

            onKeyDown: (props: any) => {
              if (props.event.key === 'Escape') {
                popup?.remove();
                return true;
              }
              return component?.onKeyDown?.(props) || false;
            },

            onExit: () => {
              popup?.remove();
            },
          };
        },
      },
    }),
  ],
});
```

### Step 4: Slash Commands Implementation

Create a slash command system for quick content insertion:

```tsx
// First, create a custom extension for slash commands
import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';

const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

// Then use it in your editor
const editor = useEditor({
  extensions: [
    StarterKit,
    SlashCommand.configure({
      suggestion: {
        items: ({ query }) => {
          const commands = [
            {
              id: 'heading1',
              label: 'Heading 1',
              description: 'Large heading',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
              },
            },
            {
              id: 'paragraph',
              label: 'Paragraph',
              description: 'Regular text',
              command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setParagraph().run();
              },
            },
          ];
          
          return commands.filter(item =>
            item.label.toLowerCase().includes(query.toLowerCase())
          );
        },
        
        render: () => {
          // Similar rendering logic as mentions
        },
      },
    }),
  ],
});
```

### Step 5: External Data Integration

Integrate with external data sources for dynamic suggestions:

```tsx
// Example API integration
const fetchUsers = async (query: string) => {
  try {
    const response = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};

const editor = useEditor({
  extensions: [
    StarterKit,
    Mention.configure({
      suggestion: {
        items: async ({ query }) => {
          if (query.length < 2) return [];
          
          // Debounce API calls
          return new Promise((resolve) => {
            setTimeout(async () => {
              const users = await fetchUsers(query);
              resolve(users);
            }, 300);
          });
        },
        
        // ... rest of configuration
      },
    }),
  ],
});
```

### Step 6: Advanced Features

Add advanced features like fuzzy search and multiple suggestion types:

```tsx
// Fuzzy search implementation
import Fuse from 'fuse.js';

const fuzzySearch = (items: any[], query: string) => {
  const fuse = new Fuse(items, {
    keys: ['label', 'email'],
    threshold: 0.3,
  });
  
  return fuse.search(query).map(result => result.item);
};

// Multiple suggestion types
const editor = useEditor({
  extensions: [
    StarterKit,
    Mention.configure({
      suggestion: {
        items: ({ query }) => {
          const users = fuzzySearch(USER_DATA, query);
          const hashtags = fuzzySearch(HASHTAG_DATA, query);
          
          return [
            ...users.map(user => ({ ...user, type: 'user' })),
            ...hashtags.map(tag => ({ ...tag, type: 'hashtag' })),
          ].slice(0, 10);
        },
        
        render: () => ({
          // Custom rendering for different types
        }),
      },
    }),
  ],
});
```

## Key Concepts

- **Mentions**: @-triggered suggestions for referencing people, tags, or other entities in content
- **Slash Commands**: /-triggered quick commands for inserting content blocks and applying formatting
- **Typeahead**: Real-time search and filtering of suggestions as the user types
- **Suggestion Rendering**: Custom popup components that display filtered results with keyboard navigation
- **Command Integration**: Converting suggestion selections into actual editor content and commands

## Common Pitfalls

- **Performance**: Avoid making API calls on every keystroke - implement debouncing and minimum query length
- **Memory Leaks**: Always clean up DOM elements and event listeners in suggestion render functions
- **Positioning**: Handle popup positioning in scrollable containers and near viewport edges
- **Keyboard Navigation**: Ensure arrow keys, Enter, and Escape work consistently across all suggestion types
- **Focus Management**: Maintain editor focus when interacting with suggestion popups

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-07
```

The tests will verify:
- Mention extension is properly configured
- Suggestion components render correctly
- Keyboard navigation works as expected
- Proper component structure and accessibility

## Next Steps

Continue to [Lesson 08: StarterKit Extensions & Configuration](../lesson-08/README.md) to learn how to customize and configure TipTap's built-in extensions.

## Additional Resources

- [TipTap Mention Extension](https://tiptap.dev/docs/editor/extensions/functionality/mention)
- [Suggestion Plugin API](https://tiptap.dev/docs/editor/extensions/utilities/suggestion)
- [Building Custom Suggestions](https://tiptap.dev/docs/editor/guide/custom-suggestions)
- [Typeahead UI Patterns](https://www.nngroup.com/articles/autocomplete-design/)