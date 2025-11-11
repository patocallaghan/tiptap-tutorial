# Lesson 04: Input Rules & Paste Rules

## Overview
Learn to create auto-formatting rules, handle paste events, and transform content as users type or paste. This lesson covers TipTap's powerful rule system that enables markdown-style shortcuts and intelligent content processing.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand input rules for markdown-style shortcuts and auto-formatting
- Implement paste rules for content transformation and cleaning
- Create pattern-based text replacement rules
- Handle different paste content types (text, HTML, markdown)
- Build auto-linking functionality for URLs and other patterns

## Prerequisites
- Complete Lesson 01: Basic Editor Setup
- Complete Lesson 02: Content & Document Structure
- Complete Lesson 03: Commands & Node Positions
- Basic understanding of regular expressions

## Why Separate Input Rules and Paste Rules?

You might wonder why TipTap separates InputRules and PasteRules instead of having one unified system. There are several good reasons for this design:

### Different Triggering Contexts

**InputRules** trigger during typing:
- Activated character-by-character as the user types
- Pattern matches against the text immediately before the cursor
- Designed for short, predictable patterns (e.g., `# ` for heading)
- Usually transform the text that was just typed

**PasteRules** trigger during paste operations:
- Activated when content is pasted from clipboard
- Pattern matches against the entire pasted content
- Handle potentially large amounts of text at once
- Process both plain text and rich HTML content

### Performance Considerations

- InputRules run on every keystroke, so they need to be fast and lightweight
- PasteRules can be more expensive since they run less frequently
- Separating them allows optimization for each use case

### Different Use Cases

**InputRules are ideal for:**
- Markdown-style shortcuts (typing patterns)
- Real-time auto-corrections (smart quotes, em dashes)
- Character-based transformations (emoji shortcuts)

**PasteRules are ideal for:**
- Auto-linking URLs in pasted content
- Cleaning unwanted formatting from external sources
- Converting markdown/HTML to editor format
- Processing large blocks of pasted text

### Greater Control and Flexibility

Having separate systems gives you:
- Fine-grained control over when transformations happen
- Ability to handle typing and pasting differently if needed
- Clearer code organization and purpose
- Better debugging (know whether an issue is input or paste related)

## Implementation Guide

### Step 1: Create Custom Input Rules

Implement input rules that trigger formatting based on typing patterns:

```tsx
import { InputRule } from '@tiptap/core';

// TODO: Create custom input rules extension
const CustomInputRules = Extension.create({
  name: 'customInputRules',
  
  addInputRules() {
    return [
      // Heading rule: # text → heading
      new InputRule({
        find: /^# (.*)$/,
        handler: ({ state, range, match }) => {
          const [, text] = match;
          const { tr } = state;
          
          tr.delete(range.from, range.to);
          tr.setBlockType(range.from, range.from, this.editor.schema.nodes.heading, { level: 1 });
          tr.insertText(text);
        },
      }),
      
      // Bold rule: **text** → bold
      new InputRule({
        find: /\*\*([^*]+)\*\*$/,
        handler: ({ state, range, match }) => {
          const [, text] = match;
          const { tr } = state;
          
          tr.delete(range.from, range.to);
          tr.insertText(text);
          tr.addMark(range.from, range.from + text.length, this.editor.schema.marks.bold.create());
        },
      }),
      
      // TODO: Add more input rules
      // - Italic: *text* → italic
      // - Blockquote: > text → blockquote
      // - Horizontal rule: --- → hr
      // - Code: `code` → code mark
    ];
  },
});
```

### Step 2: Implement Paste Rules

Create paste rules that process content when pasted:

```tsx
import { PasteRule } from '@tiptap/core';

const CustomPasteRules = Extension.create({
  name: 'customPasteRules',
  
  addPasteRules() {
    return [
      // Auto-link URLs
      new PasteRule({
        find: /(https?:\/\/[^\s]+)/g,
        handler: ({ state, range, match }) => {
          const [url] = match;
          const { tr } = state;
          
          // TODO: Implement URL linking
          tr.addMark(range.from, range.to, this.editor.schema.marks.link.create({ href: url }));
        },
      }),
      
      // Clean up pasted HTML
      new PasteRule({
        find: /<[^>]+>/g,
        handler: ({ state, range, match }) => {
          // TODO: Implement HTML cleaning logic
          const { tr } = state;
          tr.delete(range.from, range.to);
        },
      }),
      
      // TODO: Add more paste rules
      // - Email auto-linking
      // - Markdown formatting conversion
      // - Special character replacement
    ];
  },
});
```

### Step 3: Advanced Input Rule Patterns

Create more sophisticated input rules with complex patterns:

```tsx
// TODO: Implement these advanced patterns

// List item rule
const listItemRule = new InputRule({
  find: /^(\*|\-|\+) (.*)$/,
  handler: ({ state, range, match }) => {
    const [, bullet, text] = match;
    const { tr } = state;
    
    // Convert to bullet list
    tr.delete(range.from, range.to);
    tr.setBlockType(range.from, range.from, this.editor.schema.nodes.bulletList);
    tr.setBlockType(range.from, range.from, this.editor.schema.nodes.listItem);
    tr.insertText(text);
  },
});

// Numbered list rule
const numberedListRule = new InputRule({
  find: /^(\d+)\. (.*)$/,
  handler: ({ state, range, match }) => {
    const [, number, text] = match;
    const { tr } = state;
    
    // TODO: Implement numbered list creation
    tr.delete(range.from, range.to);
    tr.setBlockType(range.from, range.from, this.editor.schema.nodes.orderedList);
    tr.setBlockType(range.from, range.from, this.editor.schema.nodes.listItem);
    tr.insertText(text);
  },
});

// Code block rule
const codeBlockRule = new InputRule({
  find: /^```([a-z]*)\n(.*)$/s,
  handler: ({ state, range, match }) => {
    const [, language, code] = match;
    const { tr } = state;
    
    // TODO: Implement code block creation
    tr.delete(range.from, range.to);
    tr.setBlockType(range.from, range.from, this.editor.schema.nodes.codeBlock, { language });
    tr.insertText(code);
  },
});
```

### Step 4: Handle Custom Paste Events

Implement advanced paste handling with content transformation:

```tsx
const editor = useEditor({
  extensions: [StarterKit, CustomInputRules, CustomPasteRules],
  editorProps: {
    handlePaste: (view, event, slice) => {
      const pastedText = event.clipboardData?.getData('text/plain') || '';
      const pastedHtml = event.clipboardData?.getData('text/html') || '';
      
      // TODO: Implement custom paste logic
      
      // Handle markdown content
      if (pastedText.includes('**') || pastedText.includes('*') || pastedText.includes('#')) {
        return handleMarkdownPaste(pastedText);
      }
      
      // Handle URL pasting
      if (/^https?:\/\//.test(pastedText.trim())) {
        return handleUrlPaste(pastedText);
      }
      
      // Handle structured data (JSON, CSV, etc.)
      if (pastedText.startsWith('{') || pastedText.includes('\t')) {
        return handleStructuredPaste(pastedText);
      }
      
      // Let default handling continue
      return false;
    },
    
    // TODO: Add more paste customization
    transformPastedHTML: (html) => {
      // Clean up pasted HTML
      return html
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<style[^>]*>.*?<\/style>/gi, '')
        .replace(/style="[^"]*"/gi, '');
    },
  },
});

// Helper functions for paste handling
const handleMarkdownPaste = (text: string) => {
  // TODO: Convert markdown to TipTap format
  const converted = text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>');
  
  return editor?.commands.insertContent(converted);
};

const handleUrlPaste = (url: string) => {
  // TODO: Create link from pasted URL
  const domain = new URL(url).hostname;
  return editor?.commands.insertContent(`<a href="${url}">${domain}</a>`);
};
```

### Step 5: Monitor Rule Activity

Implement tracking to see when rules are triggered:

```tsx
const [ruleActivity, setRuleActivity] = useState<string[]>([]);

const editor = useEditor({
  // ... other config
  onTransaction: ({ transaction }) => {
    // Check for input rule metadata
    if (transaction.getMeta('inputRule')) {
      const ruleInfo = transaction.getMeta('inputRule');
      setRuleActivity(prev => [...prev.slice(-9), `Input rule: ${ruleInfo.type}`]);
    }
    
    // Check for paste rule metadata
    if (transaction.getMeta('pasteRule')) {
      const ruleInfo = transaction.getMeta('pasteRule');
      setRuleActivity(prev => [...prev.slice(-9), `Paste rule: ${ruleInfo.type}`]);
    }
  },
});
```

## Key Concepts

- **Input Rules**: Pattern-based transformations triggered by typing specific sequences. They use regular expressions to detect patterns and apply formatting automatically.

- **Paste Rules**: Content transformations applied when pasting text, HTML, or other content. They can clean, format, or enhance pasted content.

- **Auto-formatting**: Automatic content conversion based on user input patterns, enabling markdown-style shortcuts and intelligent text processing.

- **Pattern Matching**: Regular expressions that detect when rules should apply. Patterns can be simple (exact matches) or complex (with capture groups).

- **Transaction Metadata**: Rules can add metadata to transactions to track their activity and provide debugging information.

- **Rule Priority**: Rules are processed in order, and the first matching rule wins. Order matters when multiple rules could match the same pattern.

## Common Pitfalls

- **Greedy Patterns**: Be careful with regex patterns that might match too much. Use specific patterns and test thoroughly.

- **Rule Conflicts**: Multiple rules matching the same pattern can cause conflicts. Design patterns to be mutually exclusive.

- **Performance**: Too many complex rules can impact typing performance. Keep rules efficient and consider debouncing.

- **Undo Behavior**: Input rules create new undo steps. Users might need to undo twice to remove auto-formatted content.

- **Schema Violations**: Rules must respect the editor schema. Invalid transformations will fail or cause errors.

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-04
```

The tests verify that:
- Rule activity tracking displays work
- Paste event monitoring functions
- All UI controls render properly
- Quick reference guide is complete

## Next Steps

Continue to [Lesson 05: Events & Editor Lifecycle](../lesson-05/README.md) to learn about event handling, transaction hooks, and editor lifecycle management.

## Additional Resources

- [TipTap Input Rules](https://tiptap.dev/docs/editor/extensions/functionality/typography)
- [ProseMirror Input Rules](https://prosemirror.net/docs/ref/#inputrules)
- [Regular Expressions Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Content Transformation Patterns](https://tiptap.dev/docs/editor/guide/custom-extensions#paste-rules)