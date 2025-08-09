# Lesson 11: Advanced ProseMirror Integration

## Overview
Master direct ProseMirror API integration within TipTap. This lesson covers advanced schema manipulation, custom plugin development, transaction handling, and direct access to ProseMirror's powerful features. Learn to work with the underlying architecture that powers TipTap.

## Learning Objectives
By the end of this lesson, you will be able to:
- Access and manipulate ProseMirror schema and document structure directly
- Create custom ProseMirror plugins with decorations and state management
- Handle transactions with filters, transformations, and validation
- Implement advanced document analysis and content manipulation
- Integrate third-party ProseMirror plugins and functionality

## Prerequisites
- Complete Lesson 01-10
- Deep understanding of TipTap architecture and extension system
- Strong JavaScript/TypeScript skills
- Familiarity with functional programming concepts

## Implementation Guide

### Step 1: Access ProseMirror Directly

Learn to access the underlying ProseMirror instance:

```typescript
import { useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

const editor = useEditor({
  extensions: [StarterKit],
  onCreate: ({ editor }) => {
    // Access ProseMirror view
    const view = editor.view
    console.log('ProseMirror EditorView:', view)
    
    // Access current state
    const state = editor.state
    console.log('Current document:', state.doc)
    console.log('Current selection:', state.selection)
    
    // Access schema
    const schema = editor.schema
    console.log('Schema nodes:', schema.nodes)
    console.log('Schema marks:', schema.marks)
  },
  onUpdate: ({ editor, transaction }) => {
    // Handle transactions
    console.log('Transaction:', transaction)
    console.log('Document changed:', !transaction.docChanged)
  },
})
```

### Step 2: Create Custom ProseMirror Plugins

Build plugins that extend editor functionality:

```typescript
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Extension } from '@tiptap/core'

// Custom plugin for word count
const wordCountPluginKey = new PluginKey('wordCount')

const WordCountPlugin = new Plugin({
  key: wordCountPluginKey,
  
  state: {
    init(config, state) {
      return {
        wordCount: this.countWords(state.doc),
        characterCount: state.doc.textContent.length,
      }
    },
    
    apply(transaction, prevPluginState, oldState, newState) {
      if (!transaction.docChanged) {
        return prevPluginState
      }
      
      return {
        wordCount: this.countWords(newState.doc),
        characterCount: newState.doc.textContent.length,
      }
    },
  },
  
  countWords(doc) {
    const text = doc.textContent
    return text.trim() ? text.trim().split(/\s+/).length : 0
  },
  
  view(editorView) {
    // Create UI element for word count display
    const dom = document.createElement('div')
    dom.className = 'word-count-display'
    
    const update = () => {
      const pluginState = wordCountPluginKey.getState(editorView.state)
      dom.textContent = `Words: ${pluginState.wordCount} | Characters: ${pluginState.characterCount}`
    }
    
    update()
    
    return {
      update,
      destroy() {
        dom.remove()
      },
    }
  },
})

// TipTap extension wrapper
export const WordCount = Extension.create({
  name: 'wordCount',
  
  addProseMirrorPlugins() {
    return [WordCountPlugin]
  },
  
  addStorage() {
    return {
      getWordCount: () => {
        const pluginState = wordCountPluginKey.getState(this.editor.state)
        return pluginState?.wordCount || 0
      },
      getCharacterCount: () => {
        const pluginState = wordCountPluginKey.getState(this.editor.state)
        return pluginState?.characterCount || 0
      },
    }
  },
})
```

### Step 3: Implement Decorations

Create visual overlays that don't modify the document:

```typescript
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Extension } from '@tiptap/core'

const highlightPluginKey = new PluginKey('highlight')

const HighlightPlugin = new Plugin({
  key: highlightPluginKey,
  
  state: {
    init() {
      return DecorationSet.empty
    },
    
    apply(transaction, decorationSet, oldState, newState) {
      // Map decorations through document changes
      decorationSet = decorationSet.map(transaction.mapping, newState.doc)
      
      // Add new highlights based on search terms
      const searchTerm = transaction.getMeta('highlightSearch')
      if (searchTerm) {
        decorationSet = this.createHighlights(newState.doc, searchTerm)
      }
      
      return decorationSet
    },
  },
  
  createHighlights(doc, searchTerm) {
    const decorations = []
    const regex = new RegExp(searchTerm, 'gi')
    
    doc.descendants((node, pos) => {
      if (node.isText && node.text) {
        let match
        while ((match = regex.exec(node.text)) !== null) {
          const from = pos + match.index
          const to = from + match[0].length
          
          const decoration = Decoration.inline(from, to, {
            class: 'prosemirror-highlight',
            style: 'background-color: yellow; color: black;',
          })
          
          decorations.push(decoration)
        }
      }
    })
    
    return DecorationSet.create(doc, decorations)
  },
  
  props: {
    decorations(state) {
      return highlightPluginKey.getState(state)
    },
  },
})

export const SearchHighlight = Extension.create({
  name: 'searchHighlight',
  
  addProseMirrorPlugins() {
    return [HighlightPlugin]
  },
  
  addCommands() {
    return {
      highlightSearch:
        (searchTerm) =>
        ({ state, dispatch }) => {
          const transaction = state.tr.setMeta('highlightSearch', searchTerm)
          dispatch(transaction)
          return true
        },
    }
  },
})
```

### Step 4: Transaction Filtering and Transformation

Control and modify transactions before they're applied:

```typescript
import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

export const TransactionFilter = Extension.create({
  name: 'transactionFilter',
  
  addProseMirrorPlugins() {
    return [
      new Plugin({
        filterTransaction: (transaction, state) => {
          // Prevent certain types of changes
          if (transaction.getMeta('preventChange')) {
            return false
          }
          
          // Block deletions of specific nodes
          let blockDeletion = false
          transaction.steps.forEach((step) => {
            if (step.jsonID === 'replace') {
              const { from, to } = step
              state.doc.nodesBetween(from, to, (node) => {
                if (node.type.name === 'protectedNode') {
                  blockDeletion = true
                }
              })
            }
          })
          
          return !blockDeletion
        },
        
        appendTransaction: (transactions, oldState, newState) => {
          // Auto-format content after changes
          let tr = null
          
          transactions.forEach((transaction) => {
            if (transaction.docChanged) {
              // Add auto-corrections or formatting
              transaction.steps.forEach((step) => {
                if (step.jsonID === 'replace') {
                  const { from, to } = step
                  
                  // Example: Auto-capitalize sentences
                  newState.doc.nodesBetween(from - 10, to + 10, (node, pos) => {
                    if (node.isText && node.text) {
                      const corrected = node.text.replace(/\.\s+([a-z])/g, '. $1'.toUpperCase())
                      if (corrected !== node.text) {
                        if (!tr) tr = newState.tr
                        tr.insertText(corrected, pos, pos + node.text.length)
                      }
                    }
                  })
                }
              })
            }
          })
          
          return tr
        },
      }),
    ]
  },
})
```

### Step 5: Schema Manipulation

Extend or modify the document schema:

```typescript
import { Extension } from '@tiptap/core'

export const SchemaExtender = Extension.create({
  name: 'schemaExtender',
  
  extendNodeSchema(extension) {
    // Add custom attributes to all nodes
    return {
      addAttributes() {
        return {
          ...this.parent?.() || {},
          customId: {
            default: null,
            parseHTML: element => element.getAttribute('data-custom-id'),
            renderHTML: attributes => {
              if (!attributes.customId) return {}
              return { 'data-custom-id': attributes.customId }
            },
          },
          metadata: {
            default: {},
            parseHTML: element => {
              try {
                return JSON.parse(element.getAttribute('data-metadata') || '{}')
              } catch {
                return {}
              }
            },
            renderHTML: attributes => {
              if (!attributes.metadata || Object.keys(attributes.metadata).length === 0) {
                return {}
              }
              return { 'data-metadata': JSON.stringify(attributes.metadata) }
            },
          },
        }
      },
    }
  },
  
  onCreate() {
    // Access and log schema information
    console.log('Extended schema:', this.editor.schema)
    
    // Validate document against custom rules
    this.validateDocument()
  },
  
  validateDocument() {
    const { doc } = this.editor.state
    const errors = []
    
    doc.descendants((node, pos) => {
      // Custom validation rules
      if (node.type.name === 'heading' && node.textContent.length > 100) {
        errors.push({
          type: 'warning',
          message: 'Heading is too long',
          pos,
        })
      }
      
      if (node.type.name === 'paragraph' && node.textContent.length > 1000) {
        errors.push({
          type: 'warning',
          message: 'Paragraph is very long',
          pos,
        })
      }
    })
    
    if (errors.length > 0) {
      console.warn('Document validation errors:', errors)
    }
  },
})
```

### Step 6: Advanced Document Analysis

Implement comprehensive document analysis:

```typescript
export const DocumentAnalyzer = Extension.create({
  name: 'documentAnalyzer',
  
  addStorage() {
    return {
      analyze: () => this.analyzeDocument(),
      getStatistics: () => this.getDocumentStatistics(),
      findPatterns: (pattern) => this.findPatterns(pattern),
    }
  },
  
  analyzeDocument() {
    const { doc } = this.editor.state
    const analysis = {
      structure: this.analyzeStructure(doc),
      content: this.analyzeContent(doc),
      complexity: this.analyzeComplexity(doc),
      accessibility: this.analyzeAccessibility(doc),
    }
    
    return analysis
  },
  
  analyzeStructure(doc) {
    const structure = {
      nodeTypes: {},
      depth: 0,
      hierarchy: [],
    }
    
    doc.descendants((node, pos, parent, index) => {
      // Count node types
      structure.nodeTypes[node.type.name] = (structure.nodeTypes[node.type.name] || 0) + 1
      
      // Track document depth
      let depth = 0
      let current = parent
      while (current) {
        depth++
        current = current.parent
      }
      structure.depth = Math.max(structure.depth, depth)
      
      // Build hierarchy for headings
      if (node.type.name === 'heading') {
        structure.hierarchy.push({
          level: node.attrs.level,
          text: node.textContent,
          pos,
        })
      }
    })
    
    return structure
  },
  
  analyzeContent(doc) {
    const text = doc.textContent
    return {
      wordCount: text.trim() ? text.trim().split(/\s+/).length : 0,
      characterCount: text.length,
      readingTime: Math.ceil(text.trim().split(/\s+/).length / 200), // minutes
      sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
      averageWordsPerSentence: text.trim().split(/\s+/).length / text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 0,
    }
  },
  
  analyzeComplexity(doc) {
    // Implement readability scores, complexity metrics, etc.
    const text = doc.textContent
    const words = text.trim().split(/\s+/)
    const complexWords = words.filter(word => word.length > 6).length
    
    return {
      complexWords,
      complexityRatio: complexWords / words.length,
      averageWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
    }
  },
  
  findPatterns(pattern) {
    const { doc } = this.editor.state
    const matches = []
    const regex = new RegExp(pattern, 'gi')
    
    doc.descendants((node, pos) => {
      if (node.isText && node.text) {
        let match
        while ((match = regex.exec(node.text)) !== null) {
          matches.push({
            text: match[0],
            pos: pos + match.index,
            context: node.text.slice(Math.max(0, match.index - 20), match.index + match[0].length + 20),
          })
        }
      }
    })
    
    return matches
  },
})
```

## Key Concepts

- **ProseMirror Schema**: The blueprint that defines document structure, node types, and validation rules
- **Transactions**: Immutable document state changes that can be filtered, transformed, or blocked
- **Plugins**: Modular functionality that can add state management, decorations, and custom behaviors
- **Decorations**: Visual overlays that provide styling without modifying the actual document content
- **EditorView**: The DOM representation and user interaction layer of the editor
- **Plugin State**: Persistent data associated with plugins that survives document changes

## Common Pitfalls

- **Performance**: Heavy computations in plugin apply methods can slow down the editor
- **Transaction Conflicts**: Multiple plugins modifying the same transaction can cause issues
- **Memory Leaks**: Proper cleanup of plugin state and event listeners is essential
- **Schema Validation**: Custom schema modifications must maintain document validity

## Testing Your Implementation

Run the lesson tests to verify your implementation:

```bash
pnpm test lesson-11
```

Test your ProseMirror integration by:
1. Creating custom plugins with state management
2. Implementing decorations for visual feedback
3. Using transaction filters to control document changes
4. Analyzing document structure and content
5. Extending the schema with custom attributes

## Next Steps

Continue to [Lesson 12: Content Serialization & Production Ready](../lesson-12/README.md) to learn about content persistence, performance optimization, and production deployment.

## Additional Resources

- [ProseMirror Guide](https://prosemirror.net/docs/guide/)
- [TipTap ProseMirror Integration](https://tiptap.dev/docs/editor/guide/prosemirror)
- [ProseMirror Plugin System](https://prosemirror.net/docs/ref/#state.Plugin)
- [ProseMirror Schema](https://prosemirror.net/docs/guide/#schema)