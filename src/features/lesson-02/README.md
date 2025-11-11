# Lesson 02: Content & Document Structure

## Overview
Understand ProseMirror's document model, explore schema structure, and learn how nodes and marks define content validation. This lesson dives deep into how TipTap represents and validates content internally.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand the ProseMirror document model and JSON representation
- Explore the editor schema and available nodes/marks
- Learn the difference between nodes (structural) and marks (formatting)
- Implement content validation and structure analysis
- Monitor document changes using transaction listeners

## Prerequisites
- Complete Lesson 01: Basic Editor Setup
- Understanding of JSON data structures
- Basic knowledge of tree-like data structures

## Implementation Guide

### Step 1: Add Transaction Listener

Implement a transaction listener to monitor document changes and display the JSON structure:

```tsx
const [documentInfo, setDocumentInfo] = useState<string>('');

const editor = useEditor({
  extensions: [StarterKit],
  content: `...your content...`,
  onUpdate: ({ editor }) => {
    // Get the document as JSON
    const doc = editor.getJSON();
    setDocumentInfo(JSON.stringify(doc, null, 2));
    
    // TODO: Add more detailed transaction analysis
    // - Track specific changes
    // - Monitor selection changes
    // - Count different node types
  },
  onTransaction: ({ transaction }) => {
    // TODO: Implement transaction inspection
    console.log('Transaction:', transaction);
    console.log('Steps:', transaction.steps);
  }
});
```

### Step 2: Implement Schema Exploration

Create functionality to explore the editor's schema and available nodes/marks:

```tsx
const exploreSchema = () => {
  if (!editor) return;
  
  const schema = editor.schema;
  console.log('Editor Schema:', schema);
  console.log('Available Nodes:', Object.keys(schema.nodes));
  console.log('Available Marks:', Object.keys(schema.marks));
  
  // TODO: Display this information in the UI
  // - Show node specifications
  // - Display mark capabilities
  // - Show content expressions
  
  // Example: Log detailed node information
  Object.entries(schema.nodes).forEach(([name, nodeType]) => {
    console.log(`Node "${name}":`, {
      spec: nodeType.spec,
      contentExpr: nodeType.contentMatch?.toString(),
    });
  });
};
```

### Step 3: Understanding Validation Types

Before implementing validation, it's important to understand the two types of validation available:

#### Schema Validation (`doc.check()`)
ProseMirror's built-in validation that enforces **structural/syntactic constraints** defined in the schema:
- Ensures nodes are properly nested (e.g., list items inside lists)
- Validates that only allowed child nodes are present
- Checks that marks are compatible with their nodes
- Verifies document structure matches schema rules

**When it's used:**
- Automatically during normal editing operations (commands, transforms)
- Explicitly when calling `doc.check()`
- Rarely fails in production unless manually constructing invalid documents

**Example schema violations:**
```tsx
// These would violate schema rules:
// - A list item outside a list
// - A blockquote containing an invalid node type
// - Incompatible marks applied to text
```

#### Custom Validation (Business Logic)
Application-specific validation rules that enforce **business requirements** beyond schema:
- Content length limits (min/max characters)
- Required content patterns (must have heading, must not be empty)
- Forbidden words or phrases
- Custom nesting or ordering requirements
- Domain-specific content rules

**When you need it:**
- Enforcing application-specific policies
- User-facing validation messages
- Content quality requirements
- Compliance or moderation rules

### Step 3: Create Content Validation Checker

Implement both types of validation to ensure document integrity:

```tsx
const validateContent = () => {
  if (!editor) return;

  const doc = editor.state.doc;

  // 1. Schema Validation - checks structural integrity
  try {
    doc.check(); // Throws error if document violates schema
    console.log('✓ Document passes schema validation');
  } catch (error) {
    console.error('✗ Schema validation failed:', error);
    // This indicates a serious bug - normal editing shouldn't create invalid docs
  }

  // 2. Custom Validation - checks business rules
  const validateDocument = (node: any) => {
    let issues: string[] = [];
    let stats = { paragraphs: 0, emptyParagraphs: 0, totalChars: 0 };

    node.descendants((childNode: any, pos: number) => {
      // Track statistics
      if (childNode.type.name === 'paragraph') {
        stats.paragraphs++;
        if (childNode.content.size === 0) {
          stats.emptyParagraphs++;
          issues.push(`Empty paragraph at position ${pos}`);
        }
      }

      // Count characters in text nodes
      if (childNode.isText) {
        stats.totalChars += childNode.text?.length || 0;
      }

      // TODO: Add more custom validation rules:
      // - Minimum content length requirement
      // - Maximum content length limit
      // - Required heading at start
      // - Forbidden content patterns
    });

    // Business rule: Document must have content
    if (stats.totalChars === 0) {
      issues.push('Document cannot be empty');
    }

    // Business rule: Too many empty paragraphs
    if (stats.emptyParagraphs > 2) {
      issues.push(`Too many empty paragraphs (${stats.emptyParagraphs})`);
    }

    return { issues, stats };
  };

  const validation = validateDocument(doc);
  console.log('Custom validation results:', validation);

  // TODO: Display validation results in UI instead of console
  if (validation.issues.length > 0) {
    console.warn('Validation issues found:', validation.issues);
  } else {
    console.log('✓ Document passes all custom validation rules');
  }
};
```

### Step 4: Display Document Structure Information

Enhance the UI to show detailed document analysis:

```tsx
// TODO: Add these features to your component

// 1. Node count display
const getNodeCounts = () => {
  if (!editor) return {};
  
  const counts: Record<string, number> = {};
  editor.state.doc.descendants((node) => {
    counts[node.type.name] = (counts[node.type.name] || 0) + 1;
  });
  return counts;
};

// 2. Mark analysis
const getActiveMarks = () => {
  if (!editor) return [];
  
  const { from, to } = editor.state.selection;
  const marks = editor.state.doc.rangeHasMark(from, to, null);
  return marks;
};

// 3. Selection information
const getSelectionInfo = () => {
  if (!editor) return null;
  
  const { selection } = editor.state;
  return {
    from: selection.from,
    to: selection.to,
    empty: selection.empty,
    type: selection.constructor.name,
  };
};
```

## Key Concepts

- **Document Model**: ProseMirror represents content as a tree of nodes with marks. Unlike HTML's DOM, this model is designed specifically for rich text editing with strict validation rules.

- **Nodes**: Block-level elements that define document structure (paragraphs, headings, lists, etc.). Nodes can contain other nodes and have specific content rules.

- **Marks**: Inline formatting applied to content ranges (bold, italic, links, etc.). Multiple marks can be applied to the same content.

- **Schema**: Defines which nodes and marks are allowed, their attributes, and how they can be nested. Acts as the "grammar" for your document.

- **Transactions**: Atomic changes to the document. All modifications go through transactions, enabling features like undo/redo and collaborative editing.

- **Content Expressions**: Define what content is allowed inside each node type (e.g., "paragraph+" means one or more paragraphs).

## Common Pitfalls

- **Schema Violations**: Attempting to create content that violates the schema will fail. Always check schema rules when programmatically generating content.

- **Node vs Mark Confusion**: Remember that nodes are structural (paragraphs, headings) while marks are formatting (bold, italic). You can't nest nodes inside marks.

- **Transaction Batching**: Multiple rapid changes should be batched into single transactions for better performance and cleaner undo/redo history.

- **JSON Serialization**: The JSON representation is lossy for some complex content. Use ProseMirror's native document format for full fidelity.

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-02
```

The tests verify that:
- Document structure is displayed correctly
- Schema exploration controls are functional
- JSON representation updates dynamically
- All UI sections render properly

## Next Steps

Continue to [Lesson 03: Commands & Node Positions](../lesson-03/README.md) to learn about programmatically manipulating content and understanding node positioning.

## Additional Resources

- [ProseMirror Document Model](https://prosemirror.net/docs/guide/#doc)
- [TipTap Schema Guide](https://tiptap.dev/docs/editor/guide/prosemirror#schema)
- [ProseMirror Schema Documentation](https://prosemirror.net/docs/ref/#model.Schema)
- [Understanding Transactions](https://prosemirror.net/docs/guide/#transform)