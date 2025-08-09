import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';
import { useState } from 'react';

export function Lesson04() {
  const [ruleActivity, setRuleActivity] = useState<string[]>([]);
  const [pasteEvents, setPasteEvents] = useState<string[]>([]);
  
  // TODO: Students will implement custom input and paste rules
  const editor = useEditor({
    extensions: [
      StarterKit,
      // TODO: Add custom extensions with input/paste rules here
    ],
    content: `
      <h2>Input Rules & Paste Rules Demo</h2>
      <p>Try these markdown-style shortcuts:</p>
      <ul>
        <li>Type <strong># </strong> at the start of a line for heading</li>
        <li>Type <strong>** text **</strong> for bold text</li>
        <li>Type <strong>* text *</strong> for italic text</li>
        <li>Type <strong>--- </strong> for horizontal rule</li>
        <li>Type <strong>> </strong> for blockquote</li>
      </ul>
      <p>Try pasting different content types:</p>
      <ul>
        <li>Paste plain text</li>
        <li>Paste HTML from another website</li>
        <li>Paste markdown content</li>
        <li>Paste URL for auto-linking</li>
      </ul>
    `,
    // TODO: Add paste handling
    editorProps: {
      handlePaste: (view, event) => {
        // TODO: Implement custom paste handling
        const pastedText = event.clipboardData?.getData('text/plain') || '';
        const pastedHtml = event.clipboardData?.getData('text/html') || '';
        
        const logEntry = `Paste: ${pastedText.slice(0, 50)}${pastedText.length > 50 ? '...' : ''}`;
        setPasteEvents(prev => [...prev.slice(-4), logEntry]);
        
        // Let default paste handling continue
        return false;
      },
    },
    // TODO: Add transaction listener to monitor rule applications
    onTransaction: ({ transaction }) => {
      // Check if transaction has input rule metadata
      if (transaction.getMeta('inputRule')) {
        const ruleInfo = transaction.getMeta('inputRule');
        const logEntry = `Input rule triggered: ${JSON.stringify(ruleInfo)}`;
        setRuleActivity(prev => [...prev.slice(-4), logEntry]);
      }
    },
  });

  // TODO: Implement custom input rule testing
  const testCustomInputRules = () => {
    if (!editor) return;
    
    // TODO: Programmatically trigger input rules
    // This is typically done through typing, but can be simulated
    editor
      .chain()
      .focus()
      .insertContent('# ')
      .run();
    
    setRuleActivity(prev => [...prev, 'Simulated heading input rule']);
  };

  const clearEditor = () => {
    if (!editor) return;
    editor.chain().focus().clearContent().run();
    setRuleActivity([]);
    setPasteEvents([]);
  };

  const insertSampleContent = () => {
    if (!editor) return;
    
    const sampleContent = `
Try these examples:

**Bold text** and *italic text*

# This becomes a heading

> This becomes a blockquote

---

* List item 1
* List item 2
`;
    
    editor
      .chain()
      .focus()
      .clearContent()
      .insertContent(`<p>Sample content for testing rules:</p><p>${sampleContent.replace(/\n/g, '</p><p>')}</p>`)
      .run();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 04: Input Rules & Paste Rules
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/extensions/functionality/typography"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Learn to create auto-formatting rules, handle paste events, and transform content as users type or paste.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Understand input rules for markdown-style shortcuts</li>
          <li>• Implement paste rules for content transformation</li>
          <li>• Create auto-formatting patterns and triggers</li>
          <li>• Handle different paste content types (text, HTML, markdown)</li>
        </ul>
      </div>

      {/* Prerequisites */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete Lessons 01, 02, and 03 before starting this lesson.
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
            <li>Create custom input rules for markdown-style formatting</li>
            <li>Implement paste rules for content transformation</li>
            <li>Add auto-linking functionality for URLs</li>
            <li>Build pattern-based text replacement rules</li>
          </ul>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor - Rules & Auto-formatting</h3>
        </div>
        <div className="p-4">
          <EditorContent 
            editor={editor} 
            className={cn(
              "prose prose-sm max-w-none focus:outline-none",
              "min-h-[350px] p-3 border rounded-md"
            )}
          />
        </div>
        {/* Rule Controls */}
        <div className="bg-gray-50 px-4 py-2 border-t">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={testCustomInputRules}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Test Input Rules
            </button>
            <button 
              onClick={insertSampleContent}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Insert Sample Content
            </button>
            <button 
              onClick={clearEditor}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Clear & Reset
            </button>
          </div>
        </div>
      </div>

      {/* Rule Activity Display */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h3 className="text-sm font-medium text-gray-700">Input Rule Activity</h3>
          </div>
          <div className="p-4">
            <div className="text-xs bg-gray-50 p-3 rounded border min-h-[120px] overflow-auto">
              {ruleActivity.length > 0 ? (
                <ul className="space-y-1">
                  {ruleActivity.map((activity, index) => (
                    <li key={index} className="text-green-700">
                      {activity}
                    </li>
                  ))}
                </ul>
              ) : (
                'Type markdown shortcuts to see input rule activity...'
              )}
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h3 className="text-sm font-medium text-gray-700">Paste Events</h3>
          </div>
          <div className="p-4">
            <div className="text-xs bg-gray-50 p-3 rounded border min-h-[120px] overflow-auto">
              {pasteEvents.length > 0 ? (
                <ul className="space-y-1">
                  {pasteEvents.map((event, index) => (
                    <li key={index} className="text-blue-700">
                      {event}
                    </li>
                  ))}
                </ul>
              ) : (
                'Paste content to see paste rule activity...'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-400 p-4">
        <h3 className="text-sm font-medium text-indigo-800 mb-2">
          📋 Quick Reference
        </h3>
        <div className="text-sm text-indigo-700 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <strong>Input Shortcuts:</strong>
            <ul className="mt-1 space-y-1 text-xs">
              <li>• <code># </code> → Heading 1</li>
              <li>• <code>## </code> → Heading 2</li>
              <li>• <code>**text**</code> → Bold</li>
              <li>• <code>*text*</code> → Italic</li>
            </ul>
          </div>
          <div>
            <strong>More Shortcuts:</strong>
            <ul className="mt-1 space-y-1 text-xs">
              <li>• <code>&gt; </code> → Blockquote</li>
              <li>• <code>--- </code> → Horizontal Rule</li>
              <li>• <code>* </code> → Bullet List</li>
              <li>• <code>1. </code> → Numbered List</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Input Rules</strong>: Pattern-based transformations triggered by typing specific sequences</li>
          <li>• <strong>Paste Rules</strong>: Content transformations applied when pasting text or HTML</li>
          <li>• <strong>Auto-formatting</strong>: Automatic content conversion based on user input patterns</li>
          <li>• <strong>Pattern Matching</strong>: Regular expressions that detect when rules should apply</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-03" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-05" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}