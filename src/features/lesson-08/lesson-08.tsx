import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Strike } from '@tiptap/extension-strike';
import { Code } from '@tiptap/extension-code';
import { Heading } from '@tiptap/extension-heading';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Blockquote } from '@tiptap/extension-blockquote';
import { CodeBlock } from '@tiptap/extension-code-block';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { HardBreak } from '@tiptap/extension-hard-break';
import { History } from '@tiptap/extension-history';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';
import { useState } from 'react';

export function Lesson08() {
  const [useCustomConfig, setUseCustomConfig] = useState(false);

  // TODO: Students will implement custom StarterKit configuration here
  const defaultEditor = useEditor({
    extensions: [
      StarterKit.configure({
        // TODO: Add custom configurations for individual extensions
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'bg-gray-100 rounded p-2 font-mono text-sm',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 pl-4 italic text-gray-700',
          },
        },
        history: {
          depth: 100,
          newGroupDelay: 1000,
        },
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: `
      <h2>StarterKit Extensions & Configuration</h2>
      <p>The StarterKit provides a comprehensive set of extensions out of the box:</p>
      
      <h3>Text Formatting</h3>
      <p>You can make text <strong>bold</strong>, <em>italic</em>, <s>strikethrough</s>, or <code>code</code>.</p>
      
      <h3>Lists</h3>
      <ul>
        <li>Unordered lists work great</li>
        <li>With multiple items</li>
        <li>And nested capabilities</li>
      </ul>
      
      <ol>
        <li>Ordered lists are supported</li>
        <li>With proper numbering</li>
        <li>And customizable styling</li>
      </ol>
      
      <h3>Block Elements</h3>
      <blockquote>
        <p>Blockquotes are perfect for highlighting important information or quotes.</p>
      </blockquote>
      
      <pre><code>// Code blocks support syntax highlighting
function example() {
  return "Hello, World!";
}</code></pre>
      
      <hr>
      
      <p>Try the toggle below to see individual extension configuration.</p>
    `,
  });

  // Custom configuration with individual extensions
  const customEditor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'my-2',
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
      Strike.configure({
        HTMLAttributes: {
          class: 'line-through text-red-500',
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'bg-yellow-100 text-orange-700 px-1 rounded font-mono text-sm',
        },
      }),
      Heading.configure({
        levels: [1, 2],
        HTMLAttributes: {
          class: 'font-bold text-gray-900',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'ml-4 list-disc',
        },
        keepMarks: true,
        keepAttributes: true,
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'ml-4 list-decimal',
        },
        keepMarks: true,
        keepAttributes: true,
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'my-1',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-blue-500 pl-4 bg-blue-50 py-2 my-4 italic',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm my-4',
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'my-8 border-t-2 border-gray-300',
        },
      }),
      HardBreak,
      History.configure({
        depth: 50,
        newGroupDelay: 500,
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: `
      <h1>Custom Configuration Demo</h1>
      <p>This editor uses individual extension configurations with custom styling:</p>
      
      <p>Text formatting: <strong>bold blue text</strong>, <em>purple italics</em>, <s>red strikethrough</s>, and <code>highlighted code</code>.</p>
      
      <ul>
        <li>Custom bullet lists</li>
        <li>With enhanced styling</li>
      </ul>
      
      <blockquote>
        <p>Enhanced blockquotes with blue styling and background.</p>
      </blockquote>
      
      <pre><code>// Custom code blocks with terminal styling
console.log("Enhanced appearance!");</code></pre>
      
      <hr>
      
      <p>Each extension has been individually configured for demonstration.</p>
    `,
  });

  const currentEditor = useCustomConfig ? customEditor : defaultEditor;

  if (!currentEditor) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 08: StarterKit Extensions & Configuration
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/extensions/functionality/starterkit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Learn how to configure StarterKit extensions and selectively load individual extensions for optimal performance.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Understand StarterKit's included extensions and their purposes</li>
          <li>• Configure individual extensions within StarterKit</li>
          <li>• Load extensions individually for custom configurations</li>
          <li>• Optimize bundle size by selective extension loading</li>
          <li>• Customize extension behavior and styling</li>
        </ul>
      </div>

      {/* Prerequisites - If applicable */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete lessons 1-7 before starting this lesson. Understanding of editor configuration and extensions is required.
        </p>
      </div>

      {/* TODO Section - Where students implement */}
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          📝 TODO: Your Implementation
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Follow the README.md guide to implement:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Custom StarterKit configuration with extension options</li>
            <li>Individual extension loading for maximum control</li>
            <li>Performance optimization through selective loading</li>
            <li>Custom styling and behavior for each extension</li>
            <li>Bundle analysis and size optimization</li>
          </ul>
        </div>
      </div>

      {/* Configuration Toggle */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-green-800 mb-3">🎛️ Configuration Comparison</h4>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="config"
              checked={!useCustomConfig}
              onChange={() => setUseCustomConfig(false)}
              className="mr-2"
            />
            <span className="text-sm text-green-700">StarterKit (Default)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="config"
              checked={useCustomConfig}
              onChange={() => setUseCustomConfig(true)}
              className="mr-2"
            />
            <span className="text-sm text-green-700">Individual Extensions (Custom)</span>
          </label>
        </div>
        <p className="text-xs text-green-600 mt-2">
          Toggle between configurations to see the difference in styling and behavior.
        </p>
      </div>

      {/* Extension Overview */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-800 mb-3">📦 StarterKit Extensions + Additional</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Text & Formatting</h5>
            <ul className="space-y-1 text-gray-600">
              <li>• <code className="text-xs bg-gray-100 px-1">Document</code> - Root document node</li>
              <li>• <code className="text-xs bg-gray-100 px-1">Paragraph</code> - Basic paragraph blocks</li>
              <li>• <code className="text-xs bg-gray-100 px-1">Text</code> - Plain text content</li>
              <li>• <code className="text-xs bg-gray-100 px-1">Bold</code> - Bold text formatting</li>
              <li>• <code className="text-xs bg-gray-100 px-1">Italic</code> - Italic text formatting</li>
              <li>• <code className="text-xs bg-gray-100 px-1">Strike</code> - Strikethrough text</li>
              <li>• <code className="text-xs bg-gray-100 px-1">Code</code> - Inline code formatting</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Structure & Elements</h5>
            <ul className="space-y-1 text-gray-600">
              <li>• <code className="text-xs bg-gray-100 px-1">Heading</code> - H1-H6 headings</li>
              <li>• <code className="text-xs bg-gray-100 px-1">BulletList</code> - Unordered lists</li>
              <li>• <code className="text-xs bg-gray-100 px-1">OrderedList</code> - Ordered lists</li>
              <li>• <code className="text-xs bg-gray-100 px-1">ListItem</code> - List item containers</li>
              <li>• <code className="text-xs bg-gray-100 px-1">Blockquote</code> - Quote blocks</li>
              <li>• <code className="text-xs bg-gray-100 px-1">CodeBlock</code> - Code blocks</li>
              <li>• <code className="text-xs bg-gray-100 px-1">HorizontalRule</code> - HR dividers</li>
              <li>• <code className="text-xs bg-gray-100 px-1">HardBreak</code> - Line breaks</li>
              <li>• <code className="text-xs bg-gray-100 px-1">History</code> - Undo/redo support</li>
              <li>• <code className="text-xs bg-blue-100 px-1">CharacterCount</code> - Track character/word count</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Configuration Display */}
      <div className={cn(
        "border rounded-lg p-3 mb-4",
        useCustomConfig ? "bg-purple-50 border-purple-200" : "bg-gray-50 border-gray-200"
      )}>
        <h4 className="text-sm font-medium mb-2">
          {useCustomConfig ? "🎨 Individual Extensions" : "📦 StarterKit Configuration"}
        </h4>
        <p className="text-xs text-gray-600 mb-2">
          {useCustomConfig 
            ? "Using individually loaded extensions with custom styling and configuration"
            : "Using StarterKit with configured extension options"
          }
        </p>
        <div className="text-xs font-mono bg-white p-2 rounded border">
          {useCustomConfig ? (
            <span>extensions: [Document, Paragraph, Text, Bold.configure(&#123;...&#125;), ...]</span>
          ) : (
            <span>extensions: [StarterKit.configure(&#123; heading: &#123; levels: [1,2,3] &#125;, ... &#125;)]</span>
          )}
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">
            TipTap Editor - {useCustomConfig ? 'Custom Configuration' : 'StarterKit Default'}
          </h3>
        </div>
        <div className="p-4">
          <EditorContent
            editor={currentEditor}
            className={cn(
              "prose prose-sm max-w-none focus:outline-none",
              "min-h-[400px] p-3 border rounded-md"
            )}
          />
        </div>
        <div className="bg-gray-50 px-4 py-2 border-t">
          <div className="flex gap-4 text-xs text-gray-600">
            <span>
              <strong>Characters:</strong> {currentEditor?.storage.characterCount?.characters() || 0}
            </span>
            <span>
              <strong>Words:</strong> {currentEditor?.storage.characterCount?.words() || 0}
            </span>
            <span className={cn(
              "ml-auto",
              (currentEditor?.storage.characterCount?.characters() || 0) > 9500 && "text-orange-600 font-medium",
              (currentEditor?.storage.characterCount?.characters() || 0) >= 10000 && "text-red-600 font-bold"
            )}>
              <strong>Limit:</strong> {currentEditor?.storage.characterCount?.characters() || 0} / 10,000
            </span>
          </div>
        </div>
      </div>

      {/* Performance Notes */}
      <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-orange-800 mb-2">⚡ Performance Considerations</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• <strong>StarterKit</strong>: Convenient but includes all extensions (larger bundle)</li>
          <li>• <strong>Individual Extensions</strong>: More control and smaller bundle size</li>
          <li>• <strong>Tree Shaking</strong>: Modern bundlers can eliminate unused extensions</li>
          <li>• <strong>Lazy Loading</strong>: Consider loading extensions on demand for better performance</li>
        </ul>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>StarterKit</strong>: Pre-configured bundle of essential extensions for rapid development</li>
          <li>• <strong>Extension Configuration</strong>: Customizing extension behavior and appearance</li>
          <li>• <strong>Individual Loading</strong>: Loading extensions separately for maximum control</li>
          <li>• <strong>Bundle Optimization</strong>: Selecting only needed extensions to reduce bundle size</li>
          <li>• <strong>HTMLAttributes</strong>: Customizing the HTML output of extensions</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-07" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-09" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}