import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';
import { useState } from 'react';

export function Lesson02() {
  const [documentInfo, setDocumentInfo] = useState<string>('');
  
  // Basic document inspection is provided - students will enhance it
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h1>Document Structure</h1>
      <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
      <ul>
        <li>First list item</li>
        <li>Second list item with <code>inline code</code></li>
      </ul>
      <blockquote>
        <p>This is a blockquote containing structured content.</p>
      </blockquote>
    `,
    // Basic onUpdate handler - TODO: Enhance with transaction analysis
    onUpdate: ({ editor }) => {
      // Basic JSON display is working
      const doc = editor.getJSON();
      setDocumentInfo(JSON.stringify(doc, null, 2));

      // TODO: Add more detailed inspection:
      // - Document size
      // - Node count by type
      // - Mark usage statistics
    },
  });

  // Example schema exploration - working but basic
  const exploreSchema = () => {
    if (!editor) return;

    const schema = editor.schema;
    console.log('Editor Schema:', schema);
    console.log('Available Nodes:', Object.keys(schema.nodes));
    console.log('Available Marks:', Object.keys(schema.marks));

    // TODO: Display schema information in the UI instead of just console
    // TODO: Show schema spec details (content expressions, attributes)
  };

  // Example validation - working but basic
  const validateContent = () => {
    if (!editor) return;

    // Basic schema validation is working
    console.log('Document is valid:', editor.state.doc.check());

    // TODO: Add custom validation beyond doc.check():
    // - Check for empty paragraphs
    // - Validate content length limits
    // - Check for required content patterns
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 02: Content & Document Structure
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/guide/prosemirror"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Understand ProseMirror's document model, explore schema structure, and learn how nodes and marks define content validation.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Understand the ProseMirror document model and JSON representation</li>
          <li>• Explore the editor schema and available nodes/marks</li>
          <li>• Learn the difference between nodes and marks</li>
          <li>• Implement content validation and structure analysis</li>
        </ul>
      </div>

      {/* Prerequisites */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete Lesson 01: Basic Editor Setup before starting this lesson.
        </p>
      </div>

      {/* Understanding the Scaffolding */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-purple-800 mb-2">
          🏗️ Understanding This Lesson
        </h3>
        <div className="text-sm text-purple-700 space-y-2">
          <p><strong>Pre-built for you:</strong> Basic document inspection (onUpdate displays JSON), three control buttons, and console logging for schema/validation.</p>
          <p><strong>Your task:</strong> Enhance the document inspector to display more detailed information, implement better validation UI feedback, and add custom validation rules beyond doc.check().</p>
        </div>
      </div>

      {/* TODO Section - Where students implement */}
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          📝 TODO: Your Implementation
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Follow the README.md guide to implement:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Add transaction listener to monitor document changes</li>
            <li>Implement schema exploration functionality</li>
            <li>Create content validation checker</li>
            <li>Display document structure information</li>
          </ul>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor - Document Structure</h3>
        </div>
        <div className="p-4">
          <EditorContent 
            editor={editor} 
            className={cn(
              "prose prose-sm max-w-none focus:outline-none",
              "min-h-[300px] p-3 border rounded-md"
            )}
          />
        </div>
        {/* Editor Controls */}
        <div className="bg-gray-50 px-4 py-2 border-t">
          <div className="flex gap-2">
            <button 
              onClick={exploreSchema}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Explore Schema
            </button>
            <button 
              onClick={validateContent}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Validate Content
            </button>
            <button 
              onClick={() => editor?.chain().focus().clearContent().run()}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Document JSON Display */}
      <div className="mt-6 border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">Document JSON Structure</h3>
        </div>
        <div className="p-4">
          <pre className="text-xs bg-gray-50 p-3 rounded border overflow-auto max-h-60">
            {documentInfo || 'Edit the content above to see the document structure...'}
          </pre>
        </div>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Document Model</strong>: ProseMirror represents content as a tree of nodes with marks</li>
          <li>• <strong>Nodes</strong>: Block-level elements like paragraphs, headings, lists (structural)</li>
          <li>• <strong>Marks</strong>: Inline formatting like bold, italic, links (decorative)</li>
          <li>• <strong>Schema</strong>: Defines which nodes and marks are allowed and their structure</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-01" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-03" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}